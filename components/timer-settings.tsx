"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Clock, Save } from "lucide-react"
import { useTimerStore } from "@/store/timer-store"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function TimerSettings() {
  const { settings, updateSettings } = useTimerStore()
  const { toast } = useToast()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(localSettings)
    toast({
      title: "Settings saved",
      description: "Your timer settings have been updated successfully.",
    })
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-[#00FFFF]/10">
          <Clock className="w-5 h-5 text-[#00FFFF]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Timer Settings</h3>
          <p className="text-sm text-neutral-400">Customize your Pomodoro sessions</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Session Durations */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Session Durations</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-duration" className="text-neutral-300">
                Work Session (minutes)
              </Label>
              <Input
                id="work-duration"
                type="number"
                min="1"
                max="60"
                value={localSettings.workDuration}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    workDuration: Number.parseInt(e.target.value) || 25,
                  }))
                }
                className="bg-white/5 border-neutral-700/40 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-break" className="text-neutral-300">
                Short Break (minutes)
              </Label>
              <Input
                id="short-break"
                type="number"
                min="1"
                max="30"
                value={localSettings.shortBreakDuration}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    shortBreakDuration: Number.parseInt(e.target.value) || 5,
                  }))
                }
                className="bg-white/5 border-neutral-700/40 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long-break" className="text-neutral-300">
                Long Break (minutes)
              </Label>
              <Input
                id="long-break"
                type="number"
                min="1"
                max="60"
                value={localSettings.longBreakDuration}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    longBreakDuration: Number.parseInt(e.target.value) || 15,
                  }))
                }
                className="bg-white/5 border-neutral-700/40 text-white"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Auto-start Options */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Auto-start Options</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Auto-start breaks</Label>
                <p className="text-sm text-neutral-500">Automatically start break sessions</p>
              </div>
              <Switch
                checked={localSettings.autoStartBreaks}
                onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, autoStartBreaks: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Auto-start work sessions</Label>
                <p className="text-sm text-neutral-500">Automatically start work sessions after breaks</p>
              </div>
              <Switch
                checked={localSettings.autoStartWork}
                onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, autoStartWork: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Long Break Interval */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Long Break Interval</h4>
          <div className="space-y-2">
            <Label htmlFor="long-break-interval" className="text-neutral-300">
              Long break after (work sessions)
            </Label>
            <Input
              id="long-break-interval"
              type="number"
              min="2"
              max="10"
              value={localSettings.longBreakInterval}
              onChange={(e) =>
                setLocalSettings((prev) => ({
                  ...prev,
                  longBreakInterval: Number.parseInt(e.target.value) || 4,
                }))
              }
              className="bg-white/5 border-neutral-700/40 text-white w-32"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </Card>
  )
}
