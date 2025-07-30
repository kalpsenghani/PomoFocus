"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Key, Sparkles, Shield, Zap, Settings, TestTube } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { AI_PROVIDERS, validateAPIKey, type AIProvider, type AIConfig } from "@/lib/ai-providers"

export function AISettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    aiInsightsEnabled: true,
    personalizedRecommendations: true,
    dataAnalysis: true,
    smartNotifications: false,
  })

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: "local" as AIProvider,
    apiKey: "",
    model: "algorithmic-v1",
  })

  const [showApiKey, setShowApiKey] = useState(false)
  const [isTestingKey, setIsTestingKey] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("ai-settings")
    const savedConfig = localStorage.getItem("ai-config")

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    if (savedConfig) {
      const config = JSON.parse(savedConfig)
      setAiConfig(config)
    }
  }, [])

  const handleSaveSettings = () => {
    localStorage.setItem("ai-settings", JSON.stringify(settings))
    localStorage.setItem("ai-config", JSON.stringify(aiConfig))

    toast({
      title: "AI settings saved",
      description: `Using ${AI_PROVIDERS[aiConfig.provider].name} for AI insights.`,
    })
  }

  const handleProviderChange = (provider: AIProvider) => {
    const providerConfig = AI_PROVIDERS[provider]
    setAiConfig({
      provider,
      apiKey: provider === "local" ? "" : aiConfig.apiKey,
      model: providerConfig.defaultModel,
    })
  }

  const handleModelChange = (model: string) => {
    setAiConfig((prev) => ({ ...prev, model }))
  }

  const handleApiKeyChange = (value: string) => {
    setAiConfig((prev) => ({ ...prev, apiKey: value }))
  }

  const testApiKey = async () => {
    if (aiConfig.provider === "local") {
      toast({
        title: "Local mode active",
        description: "No API key needed for algorithmic insights.",
      })
      return
    }

    if (!aiConfig.apiKey) {
      toast({
        title: "No API key provided",
        description: `Please enter your ${AI_PROVIDERS[aiConfig.provider].name} API key first.`,
        variant: "destructive",
      })
      return
    }

    setIsTestingKey(true)

    try {
      const isValid = validateAPIKey(aiConfig.provider, aiConfig.apiKey)

      if (isValid) {
        // Here you could make a test API call to verify the key works
        toast({
          title: "API key looks valid",
          description: `Your AI insights will be powered by ${AI_PROVIDERS[aiConfig.provider].name}!`,
        })
      } else {
        toast({
          title: "Invalid API key format",
          description: `Please check your ${AI_PROVIDERS[aiConfig.provider].name} API key format.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "API key test failed",
        description: "Please verify your API key is correct.",
        variant: "destructive",
      })
    } finally {
      setIsTestingKey(false)
    }
  }

  const isApiKeyValid = aiConfig.provider === "local" || validateAPIKey(aiConfig.provider, aiConfig.apiKey)
  const currentProvider = AI_PROVIDERS[aiConfig.provider]

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-[#7F5AF0]/10">
          <Brain className="w-5 h-5 text-[#7F5AF0]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">AI Settings</h3>
          <p className="text-sm text-neutral-400">Configure your AI-powered productivity features</p>
        </div>
      </div>

      <Tabs defaultValue="provider" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
          <TabsTrigger value="provider" className="data-[state=active]:bg-[#7F5AF0]/20">
            Provider
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-[#7F5AF0]/20">
            Features
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#7F5AF0]/20">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="provider" className="space-y-6">
          {/* AI Status */}
          <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <span className="text-lg">{currentProvider.icon}</span>
                <span>Current AI Provider</span>
              </h4>
              <Badge
                className={
                  isApiKeyValid
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                }
              >
                {currentProvider.name}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400">{currentProvider.description}</p>
          </div>

          {/* Provider Selection */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Select AI Provider</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                <button
                  key={key}
                  onClick={() => handleProviderChange(key as AIProvider)}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    aiConfig.provider === key
                      ? "border-[#7F5AF0]/50 bg-[#7F5AF0]/10"
                      : "border-neutral-700/40 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{provider.icon}</span>
                    <span className="text-white font-medium">{provider.name}</span>
                  </div>
                  <p className="text-xs text-neutral-400">{provider.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {aiConfig.provider !== "local" && (
            <div className="space-y-4">
              <h4 className="text-white font-medium">Model Selection</h4>
              <Select value={aiConfig.model} onValueChange={handleModelChange}>
                <SelectTrigger className="bg-white/5 border-neutral-700/40 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentProvider.models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* API Key Configuration */}
          {aiConfig.provider !== "local" && (
            <div className="space-y-4">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>{currentProvider.name} API Key</span>
              </h4>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-neutral-300">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={aiConfig.apiKey}
                      onChange={(e) => handleApiKeyChange(e.target.value)}
                      placeholder={`${currentProvider.keyPrefix}...`}
                      className="bg-white/5 border-neutral-700/40 text-white flex-1"
                    />
                    <Button
                      onClick={() => setShowApiKey(!showApiKey)}
                      variant="ghost"
                      size="sm"
                      className="px-3 text-neutral-400 hover:text-white"
                    >
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                    <Button
                      onClick={testApiKey}
                      disabled={isTestingKey}
                      variant="ghost"
                      size="sm"
                      className="px-3 text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    >
                      {isTestingKey ? <TestTube className="w-4 h-4 animate-spin" /> : "Test"}
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Your API key is stored locally and never sent to our servers.
                    {aiConfig.provider === "openai" && (
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FFFF] hover:underline ml-1"
                      >
                        Get OpenAI API key
                      </a>
                    )}
                    {aiConfig.provider === "anthropic" && (
                      <a
                        href="https://console.anthropic.com/account/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FFFF] hover:underline ml-1"
                      >
                        Get Anthropic API key
                      </a>
                    )}
                    {aiConfig.provider === "google" && (
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FFFF] hover:underline ml-1"
                      >
                        Get Google API key
                      </a>
                    )}
                    {aiConfig.provider === "groq" && (
                      <a
                        href="https://console.groq.com/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FFFF] hover:underline ml-1"
                      >
                        Get Groq API key
                      </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* AI Features */}
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Features</span>
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-neutral-300">AI Insights</Label>
                  <p className="text-sm text-neutral-500">Get personalized productivity insights and recommendations</p>
                </div>
                <Switch
                  checked={settings.aiInsightsEnabled}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, aiInsightsEnabled: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-neutral-300">Personalized recommendations</Label>
                  <p className="text-sm text-neutral-500">Receive tailored suggestions based on your work patterns</p>
                </div>
                <Switch
                  checked={settings.personalizedRecommendations}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, personalizedRecommendations: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-neutral-300">Data analysis</Label>
                  <p className="text-sm text-neutral-500">Analyze your productivity patterns for better insights</p>
                </div>
                <Switch
                  checked={settings.dataAnalysis}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, dataAnalysis: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-neutral-300">Smart notifications</Label>
                  <p className="text-sm text-neutral-500">AI-powered timing suggestions for breaks and sessions</p>
                </div>
                <Switch
                  checked={settings.smartNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smartNotifications: checked }))}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Privacy */}
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy & Data</span>
            </h4>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Local Processing</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    All your data is processed locally. Only anonymized patterns are used for AI insights.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">Secure Storage</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    API keys are stored securely in your browser's local storage and never transmitted to our servers.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400 font-medium">No Data Sharing</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    We never share your personal productivity data with third parties or external services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Button onClick={handleSaveSettings} className="w-full bg-[#7F5AF0] hover:bg-[#7F5AF0]/80 text-white">
        <Settings className="w-4 h-4 mr-2" />
        Save AI Settings
      </Button>
    </Card>
  )
}
