import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"
import { groq } from "@ai-sdk/groq"

export type AIProvider = "openai" | "anthropic" | "google" | "groq" | "local"

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  model: string
}

export const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"],
    defaultModel: "gpt-4o",
    keyPrefix: "sk-",
    description: "Most advanced AI with excellent reasoning",
    icon: "🤖",
  },
  anthropic: {
    name: "Anthropic Claude",
    models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307", "claude-3-opus-20240229"],
    defaultModel: "claude-3-5-sonnet-20241022",
    keyPrefix: "sk-ant-",
    description: "Excellent for analysis and thoughtful responses",
    icon: "🧠",
  },
  google: {
    name: "Google Gemini",
    models: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"],
    defaultModel: "gemini-1.5-pro",
    keyPrefix: "AI",
    description: "Fast and efficient with good reasoning",
    icon: "✨",
  },
  groq: {
    name: "Groq",
    models: ["llama-3.1-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
    defaultModel: "llama-3.1-70b-versatile",
    keyPrefix: "gsk_",
    description: "Ultra-fast inference with open models",
    icon: "⚡",
  },
  local: {
    name: "Smart Algorithm",
    models: ["algorithmic-v1"],
    defaultModel: "algorithmic-v1",
    keyPrefix: "",
    description: "Local algorithmic insights (no API key needed)",
    icon: "🔧",
  },
}

export function getAIClient(config: AIConfig) {
  switch (config.provider) {
    case "openai":
      return openai(config.model, { apiKey: config.apiKey })
    case "anthropic":
      return anthropic(config.model, { apiKey: config.apiKey })
    case "google":
      return google(config.model, { apiKey: config.apiKey })
    case "groq":
      return groq(config.model, { apiKey: config.apiKey })
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`)
  }
}

export function validateAPIKey(provider: AIProvider, apiKey: string): boolean {
  if (provider === "local") return true

  const providerConfig = AI_PROVIDERS[provider]
  if (!providerConfig) return false

  return apiKey.startsWith(providerConfig.keyPrefix) && apiKey.length > providerConfig.keyPrefix.length + 10
}

export async function generateProductivityInsights(data: any, config?: AIConfig) {
  // Use local algorithm if no config or if it's local provider
  if (!config || config.provider === "local") {
    return generateLocalInsights(data)
  }

  try {
    const client = getAIClient(config)

    const { text } = await generateText({
      model: client,
      system: `You are an expert productivity coach and data analyst. Analyze user productivity data and provide actionable, personalized insights. 

Key principles:
- Be specific and data-driven
- Provide actionable recommendations
- Focus on patterns and trends
- Be encouraging but realistic
- Consider time of day, consistency, and work patterns

Return a JSON array of insights with this exact structure:
[
  {
    "id": "unique-id",
    "type": "productivity|timing|task|habit|focus|break",
    "title": "Clear, engaging title",
    "description": "Detailed analysis with specific data points",
    "confidence": 75-95,
    "actionable": "Specific action the user can take"
  }
]

Provide 3-4 insights maximum. Make them genuinely helpful and based on the actual data provided.`,

      prompt: `Analyze this productivity data and provide personalized insights:

Current Stats:
- Today: ${data.todayStats.sessions} sessions, ${data.todayStats.focusTime} minutes focused, ${data.todayStats.tasksCompleted} tasks completed
- Weekly pattern: ${JSON.stringify(data.weeklyData.map((d: any) => ({ day: d.date, sessions: d.sessions, focusTime: d.focusTime })))}
- Current time: ${data.timeOfDay}:00 (24h format)
- Day of week: ${data.dayOfWeek} (0=Sunday)

Task Analysis:
- Total tasks: ${data.totalTasks}
- Completed: ${data.completedTasks}
- Active: ${data.activeTasks}
- Completion rate: ${Math.round(data.averageTaskCompletion * 100)}%

Session Context:
- Current session count: ${data.currentSessionCount}
- Current session type: ${data.currentSessionType}

Focus on:
1. Time-based patterns (when they're most productive)
2. Task completion efficiency
3. Session consistency and quality
4. Break patterns and recovery
5. Habit formation progress

Be specific with numbers and percentages from the actual data.`,
    })

    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error(`Error generating insights with ${config.provider}:`, error)
    // Fallback to local insights
    return generateLocalInsights(data)
  }
}

function generateLocalInsights(data: any) {
  const insights: any[] = []
  const currentHour = new Date().getHours()

  // Time-based insights
  if (currentHour >= 9 && currentHour <= 11) {
    insights.push({
      id: "peak-time",
      type: "timing",
      title: "Peak Focus Window Active",
      description:
        "You're in your optimal focus window (9-11 AM). This is the perfect time for your most challenging tasks.",
      confidence: 92,
      actionable: "Schedule your most important work now for maximum productivity.",
    })
  }

  // Session-based insights
  if (data.sessionCount > 0) {
    const completionRate = data.sessionCount > 0 ? (data.todayStats.sessions / data.sessionCount) * 100 : 0
    if (completionRate > 80) {
      insights.push({
        id: "high-completion",
        type: "productivity",
        title: "Excellent Session Completion",
        description: `You've completed ${Math.round(completionRate)}% of your sessions today. Your focus consistency is outstanding!`,
        confidence: 88,
        actionable: "Keep this momentum going with regular breaks between sessions.",
      })
    }
  }

  // Task-based insights
  const activeTasks = data.tasks.filter((t: any) => t.status !== "done")
  if (activeTasks.length > 5) {
    insights.push({
      id: "task-overload",
      type: "task",
      title: "Task List Optimization",
      description: `You have ${activeTasks.length} active tasks. Consider focusing on 3-5 priority tasks to improve completion rates.`,
      confidence: 85,
      actionable: "Use the Eisenhower Matrix to prioritize your most important tasks.",
    })
  }

  // Break pattern insights
  if (data.todayStats.sessions > 3 && data.todayStats.breaks < data.todayStats.sessions * 0.8) {
    insights.push({
      id: "break-reminder",
      type: "break",
      title: "Break Pattern Analysis",
      description: "You're skipping breaks! Regular breaks improve focus quality by up to 23% in subsequent sessions.",
      confidence: 90,
      actionable: "Try taking a 5-minute walk or stretching during your next break.",
    })
  }

  return insights.slice(0, 4)
}

export async function generateTaskSuggestions(tasks: any[], config?: AIConfig) {
  if (!config || config.provider === "local") {
    return "Focus on your highest priority tasks first. Break large tasks into smaller, manageable chunks of 1-3 pomodoros each."
  }

  try {
    const client = getAIClient(config)

    const { text } = await generateText({
      model: client,
      system: "You are a task management expert. Help users optimize their task organization and prioritization.",
      prompt: `Analyze these tasks and provide specific suggestions for better organization:

Tasks: ${JSON.stringify(tasks.slice(0, 10))}

Provide suggestions for:
1. Task prioritization using Eisenhower Matrix
2. Breaking down large tasks (>4 pomodoros)
3. Optimal pomodoro estimates based on task complexity
4. Task grouping and batching strategies
5. Time-blocking recommendations

Be specific and actionable.`,
    })

    return text
  } catch (error) {
    console.error(`Error generating task suggestions with ${config.provider}:`, error)
    return "Focus on your highest priority tasks first. Break large tasks into smaller, manageable chunks of 1-3 pomodoros each."
  }
}

export async function generateFocusRecommendations(sessionData: any, config?: AIConfig) {
  if (!config || config.provider === "local") {
    return "Try the 25-minute Pomodoro technique with 5-minute breaks. Eliminate distractions and focus on one task at a time."
  }

  try {
    const client = getAIClient(config)

    const { text } = await generateText({
      model: client,
      system: "You are a focus and attention expert. Provide personalized recommendations for improving focus quality.",
      prompt: `Based on this session data, provide focus improvement recommendations:

Session Data: ${JSON.stringify(sessionData)}

Consider:
1. Optimal session lengths
2. Break timing and activities
3. Environment optimization
4. Distraction management
5. Energy level patterns

Provide 3-5 specific, actionable recommendations.`,
    })

    return text
  } catch (error) {
    console.error(`Error generating focus recommendations with ${config.provider}:`, error)
    return "Try the 25-minute Pomodoro technique with 5-minute breaks. Eliminate distractions and focus on one task at a time."
  }
}
