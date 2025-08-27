import type React from "react";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "../hooks/use-toast";
import { Upload, Camera, Check } from "lucide-react";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnlineStatus?: boolean;
  level?: number;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export function UserAvatar({
  src,
  name,
  size = "md",
  className = "",
  showOnlineStatus = false,
  level,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative ${className}`}>
      <Avatar
        className={`${sizeClasses[size]} border-2 border-background shadow-sm`}
      >
        <AvatarImage src={src || "/placeholder.svg"} alt={name} />
        <AvatarFallback
          className={`bg-primary/10 text-primary font-semibold ${textSizeClasses[size]}`}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      {showOnlineStatus && (
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
      )}

      {level && size !== "sm" && (
        <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-background">
          {level}
        </div>
      )}
    </div>
  );
}

const PRESET_AVATARS = [
  "/friendly-book-reader-avatar-1.png",
  "/studious-person-with-glasses-avatar.png",
  "/young-reader-with-book-avatar.png",
  "/wise-librarian-avatar.png",
  "/modern-student-avatar.png",
  "/bookworm-character-avatar.png",
  "/literary-enthusiast-avatar.png",
  "/reading-club-member-avatar.png",
];

interface AvatarUploadProps {
  currentAvatar?: string;
  userName: string;
  onAvatarChange: (avatarUrl: string) => void;
  onClose: () => void;
}

export function AvatarUpload({
  currentAvatar,
  userName,
  onAvatarChange,
  onClose,
}: AvatarUploadProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || "");
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "UnSupported file type",
        description: "Xahis olunur sekil tipinde fayl secin.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Fayl olcusu maksimum 5MB ola biler.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedAvatar(result);
      setSelectedAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onAvatarChange(selectedAvatar);
    toast({
      title: "Avatar yenilendi 🎉",
      description: "Profil resminiz ugurla yenilendi.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Avatar Sec
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg">
            <UserAvatar src={selectedAvatar} name={userName} size="xl" />
            <div>
              <p className="font-medium">Secili Avatar</p>
              <p className="text-sm text-muted-foreground">
                {selectedAvatar ? "Avatar seçildi" : "Avatar seçilmedi"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Oz Resminizi Yukleyin</h3>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-3">
                Sekil yuklemek ucun klikleyin ve ya surusdurun.
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Resim Sec
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                PNG ve ya JPG • Maksimum 5MB
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Hazır Avatarlar</h3>
            <div className="grid grid-cols-4 gap-3">
              {PRESET_AVATARS.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative p-2 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedAvatar === avatar
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <UserAvatar src={avatar} name={userName} size="lg" />
                  {selectedAvatar === avatar && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Yadda Saxla
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Legv Et
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AvatarManager({
  currentAvatar,
  userName,
  onAvatarChange,
}: {
  currentAvatar?: string;
  userName: string;
  onAvatarChange: (avatarUrl: string) => void;
}) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profil Resmi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <UserAvatar src={currentAvatar} name={userName} size="xl" />
            <div className="flex-1">
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">
                {currentAvatar ? "Özel avatar" : "Varsayılan avatar"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowUpload(true)}
            variant="outline"
            className="w-full gap-2"
          >
            <Camera className="h-4 w-4" />
            Avatar Deyisdir
          </Button>
        </CardContent>
      </Card>

      {showUpload && (
        <AvatarUpload
          currentAvatar={currentAvatar}
          userName={userName}
          onAvatarChange={onAvatarChange}
          onClose={() => setShowUpload(false)}
        />
      )}
    </>
  );
}
