"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialFullName?: string
  initialAvatarUrl?: string
  title?: string
  description?: string
  onSave: (values: { fullName: string; avatarUrl: string }) => Promise<void> | void
}

export function ProfileSetupDialog({
  open,
  onOpenChange,
  initialFullName = "",
  initialAvatarUrl = "",
  title = "Set up your profile",
  description = "Add your name and avatar so your teammates recognize you.",
  onSave,
}: ProfileSetupDialogProps) {
  const [fullName, setFullName] = useState(initialFullName)
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Keep fields in sync if initial props change
    setFullName(initialFullName)
    setAvatarUrl(initialAvatarUrl)
  }, [initialFullName, initialAvatarUrl])

  const handleSave = async () => {
    try {
      setSaving(true)
      await onSave({ fullName, avatarUrl })
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/40 backdrop-blur-md border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-neutral-400">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-neutral-300">Full name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl" className="text-neutral-300">Avatar URL (optional)</Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-neutral-300">Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black">
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
