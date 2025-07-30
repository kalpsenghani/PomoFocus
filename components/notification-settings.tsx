"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Volume2, Smartphone } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    browserNotifications: false,
    soundNotifications: true,
    soundVolume: "medium",
    vibration: false,
    sessionEndNotifications: true,
    breakReminders: true,
    dailyGoalReminders: true,
  })

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === "granted") {
        setSettings((prev) => ({ ...prev, browserNotifications: true }))
        toast({
          title: "Notifications enabled",
          description: "You'll now receive browser notifications for your sessions.",
        })
      }
    }
  }

  const testNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("PomoFocus Test", {
        body: "This is how your notifications will look!",
        icon: "/icon-192x192.png",
      })
    }
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-[#7F5AF0]/10">
          <Bell className="w-5 h-5 text-[#7F5AF0]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Notification Settings</h3>
          <p className="text-sm text-neutral-400">Manage how you receive alerts and reminders</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Browser Notifications */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Browser Notifications</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-neutral-300">Enable browser notifications</Label>
              <p className="text-sm text-neutral-500">Get notified when sessions start and end</p>
            </div>
            <div className="flex items-center space-x-2">
              {notificationPermission !== "granted" && (
                <Button
                  onClick={requestNotificationPermission}
                  size="sm"
                  variant="outline"
                  className="border-neutral-700/40 text-neutral-300 hover:bg-white/5 bg-transparent"
                >
                  Enable
                </Button>
              )}
              <Switch
                checked={settings.browserNotifications && notificationPermission === "granted"}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, browserNotifications: checked }))}
                disabled={notificationPermission !== "granted"}
              />
            </div>
          </div>

          {notificationPermission === "granted" && (
            <Button
              onClick={testNotification}
              size="sm"
              variant="ghost"
              className="text-[#00FFFF] hover:bg-[#00FFFF]/10"
            >
              Test Notification
            </Button>
          )}
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Sound Settings */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Sound Settings</span>
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Sound notifications</Label>
                <p className="text-sm text-neutral-500">Play sounds for session transitions</p>
              </div>
              <Switch
                checked={settings.soundNotifications}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, soundNotifications: checked }))}
              />
            </div>

            {settings.soundNotifications && (
              <div className="space-y-2">
                <Label className="text-neutral-300">Sound volume</Label>
                <Select
                  value={settings.soundVolume}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, soundVolume: value }))}
                >
                  <SelectTrigger className="w-32 bg-white/5 border-neutral-700/40 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Specific Notifications */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Notification Types</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Session end notifications</Label>
                <p className="text-sm text-neutral-500">Get notified when work sessions and breaks end</p>
              </div>
              <Switch
                checked={settings.sessionEndNotifications}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, sessionEndNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Break reminders</Label>
                <p className="text-sm text-neutral-500">Remind you to take breaks during long work sessions</p>
              </div>
              <Switch
                checked={settings.breakReminders}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, breakReminders: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-neutral-300">Daily goal reminders</Label>
                <p className="text-sm text-neutral-500">Get reminded about your daily productivity goals</p>
              </div>
              <Switch
                checked={settings.dailyGoalReminders}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, dailyGoalReminders: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Mobile Settings */}
        {"vibrate" in navigator && (
          <>
            <Separator className="bg-neutral-700/40" />
            <div className="space-y-4">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Settings</span>
              </h4>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-neutral-300">Vibration</Label>
                  <p className="text-sm text-neutral-500">Vibrate device for notifications (mobile only)</p>
                </div>
                <Switch
                  checked={settings.vibration}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, vibration: checked }))}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
