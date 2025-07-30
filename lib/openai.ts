import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateProductivityInsights(data: any) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
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
    console.error("Error generating AI insights:", error)
    return []
  }
}

export async function generateTaskSuggestions(tasks: any[]) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
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
    console.error("Error generating task suggestions:", error)
    return "Focus on your highest priority tasks first. Break large tasks into smaller, manageable chunks of 1-3 pomodoros each."
  }
}

export async function generateFocusRecommendations(sessionData: any) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
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
    console.error("Error generating focus recommendations:", error)
    return "Try the 25-minute Pomodoro technique with 5-minute breaks. Eliminate distractions and focus on one task at a time."
  }
}
