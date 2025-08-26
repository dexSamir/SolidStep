import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
                      "bg-yellow-400",
                      "bg-blue-400",
                      "bg-green-400",
                      "bg-red-400",
                      "bg-purple-400",
                    ][Math.floor(Math.random() * 5)]
                  } rotate-45`}
                />
              </div>
            ))}
          </div>
        )}

        <Card className="w-full max-w-md animate-level-up-bounce border-accent/50 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center animate-level-up-glow">
                <Star className="h-10 w-10 text-white animate-spin-slow" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-accent animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-accent animate-level-up-text">
                SEVİYE ATLADIN!
              </h2>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Seviye {newLevel}
                </Badge>
              </div>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">+{xpGained} XP Kazandın!</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              Harika! Okuma yolculuğunda bir adım daha ileri gittin. Devam et!
            </p>

            <Button onClick={onClose} className="w-full">
              Devam Et
            </Button>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes level-up-bounce {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes level-up-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(var(--accent), 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(var(--accent), 0.8);
          }
        }
        @keyframes level-up-text {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
        .animate-level-up-bounce {
          animation: level-up-bounce 0.6s ease-out;
        }
        .animate-level-up-glow {
          animation: level-up-glow 2s ease-in-out infinite;
        }
        .animate-level-up-text {
          animation: level-up-text 0.8s ease-out 0.3s both;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
}
