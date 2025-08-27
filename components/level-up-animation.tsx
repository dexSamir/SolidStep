import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Star, Sparkles, Trophy } from "lucide-react";

interface LevelUpAnimationProps {
  isVisible: boolean;
  newLevel: number;
  xpGained: number;
  onClose: () => void;
}

export function LevelUpAnimation({
  isVisible,
  newLevel,
  xpGained,
  onClose,
}: LevelUpAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4 animate-modal-appear">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <div
                  className={`w-2 h-2 ${
                    [
                      "bg-primary",
                      "bg-secondary",
                      "bg-accent",
                      "bg-chart-3",
                      "bg-chart-5",
                    ][Math.floor(Math.random() * 5)]
                  } rotate-45`}
                />
              </div>
            ))}
          </div>
        )}

        <Card className="w-full max-w-md animate-bounce-in border-primary/30 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow">
                <Star
                  className="h-10 w-10 text-white animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-primary">
                SEVİYE ATLADIN!
              </h2>
              <div className="flex items-center justify-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-lg px-4 py-2 bg-primary text-primary-foreground"
                >
                  Seviye {newLevel}
                </Badge>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">+{xpGained} XP Kazandın!</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              Harika! Okuma yolculuğunda bir adım daha ileri gittin. Devam et!
            </p>

            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Devam Et
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
