import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";

interface AuthModalProps {
  onLogin: (userData: any) => void;
}

export function AuthModal({ onLogin }: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onLogin({
        name: name.trim(),
        email: email.trim(),
        hasCompletedOnboarding: false,
        joinDate: new Date().toISOString(),
      });
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">
            Oxuma Macəranıza Başlayın
          </DialogTitle>
          <DialogDescription>
            Gamification ilə oxuma vərdişlərinizi inkişaf etdirin
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Adınız</Label>
            <Input
              id="name"
              placeholder="Adınızı daxil edin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail ünvanınızı daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Başlayaq! 🚀
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
