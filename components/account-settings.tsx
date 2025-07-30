"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Calendar, Download, Trash2, Shield } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AccountSettings() {
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    avatar: "",
  })

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export will be ready for download shortly.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive",
    })
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-[#10B981]/10">
          <User className="w-5 h-5 text-[#10B981]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Account Settings</h3>
          <p className="text-sm text-neutral-400">Manage your account and profile information</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Profile Information</h4>

          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-[#00FFFF]/10 text-[#00FFFF] text-lg">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button variant="ghost" className="text-[#00FFFF] hover:bg-[#00FFFF]/10">
                Change Avatar
              </Button>
              <p className="text-xs text-neutral-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300">
                Full Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-white/5 border-neutral-700/40 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-white/5 border-neutral-700/40 text-white"
              />
            </div>
          </div>

          <Button onClick={handleSaveProfile} className="bg-[#10B981] hover:bg-[#10B981]/80 text-white">
            Save Profile
          </Button>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Account Information */}
        <div className="space-y-4">
          <h4 className="text-white font-medium">Account Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="w-4 h-4 text-[#00FFFF]" />
                <span className="text-sm text-neutral-300">Email Status</span>
              </div>
              <p className="text-white font-medium">Verified</p>
              <p className="text-xs text-neutral-500">Email verified on Jan 15, 2024</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-[#7F5AF0]" />
                <span className="text-sm text-neutral-300">Member Since</span>
              </div>
              <p className="text-white font-medium">{profile.joinDate}</p>
              <p className="text-xs text-neutral-500">Premium subscriber</p>
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Data & Privacy */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Data & Privacy</span>
          </h4>

          <div className="space-y-3">
            <Button
              onClick={handleExportData}
              variant="ghost"
              className="w-full justify-start text-neutral-300 hover:bg-white/5"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>

            <div className="p-4 bg-white/5 rounded-lg border border-neutral-700/40">
              <p className="text-sm text-neutral-300 mb-2">Data Usage</p>
              <p className="text-xs text-neutral-500">
                Your productivity data is stored locally and used only to provide personalized insights. We never share
                your personal information with third parties.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-700/40" />

        {/* Danger Zone */}
        <div className="space-y-4">
          <h4 className="text-red-400 font-medium">Danger Zone</h4>

          <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-sm text-neutral-400">Permanently delete your account and all associated data</p>
              </div>
              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
