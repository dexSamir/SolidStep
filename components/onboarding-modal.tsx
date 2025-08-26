import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Target, BookOpen, Calendar } from "lucide-react";

interface OnboardingModalProps {
  onComplete: (goals: any) => void;
  onClose: () => void;
}

export function OnboardingModal({ onComplete, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState({
    yearlyBookGoal: 12,
    dailyPageGoal: 20,
    preferredGenres: [] as string[],
    readingTime: "evening",
  });

  const handleComplete = () => {
    onComplete(goals);
  };

  const genres = [
    "Roman",
    "Bilim Kurgu",
    "Fantastik",
    "Tarih",
    "Biyografi",
    "Felsefe",
    "Psikoloji",
    "İş & Kariyer",
    "Kişisel Gelişim",
    "Şiir",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Okuma Hedeflerini Belirle</CardTitle>
          <CardDescription>
            Kişiselleştirilmiş deneyim için hedeflerini ayarla
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="yearly-goal"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Yıllık kitap hedefin kaç?
                </Label>
                <Input
                  id="yearly-goal"
                  type="number"
                  min="1"
                  max="365"
                  value={goals.yearlyBookGoal}
                  onChange={(e) =>
                    setGoals((prev) => ({
                      ...prev,
                      yearlyBookGoal: Number.parseInt(e.target.value) || 12,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Ortalama: Yılda 12-24 kitap
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-goal" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Günlük sayfa hedefin kaç?
                </Label>
                <Input
                  id="daily-goal"
                  type="number"
                  min="1"
                  max="200"
                  value={goals.dailyPageGoal}
                  onChange={(e) =>
                    setGoals((prev) => ({
                      ...prev,
                      dailyPageGoal: Number.parseInt(e.target.value) || 20,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Ortalama: Günde 15-30 sayfa
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tercih ettiğin türler (en fazla 3)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      variant={
                        goals.preferredGenres.includes(genre)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        setGoals((prev) => ({
                          ...prev,
                          preferredGenres: prev.preferredGenres.includes(genre)
                            ? prev.preferredGenres.filter((g) => g !== genre)
                            : prev.preferredGenres.length < 3
                            ? [...prev.preferredGenres, genre]
                            : prev.preferredGenres,
                        }));
                      }}
                      className="justify-start"
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Genellikle ne zaman okursun?</Label>
                <Select
                  value={goals.readingTime}
                  onValueChange={(value) =>
                    setGoals((prev) => ({ ...prev, readingTime: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Sabah</SelectItem>
                    <SelectItem value="afternoon">Öğleden sonra</SelectItem>
                    <SelectItem value="evening">Akşam</SelectItem>
                    <SelectItem value="night">Gece</SelectItem>
                    <SelectItem value="anytime">Her zaman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Geri
              </Button>
            )}

            <div className="ml-auto">
              {step < 2 ? (
                <Button onClick={() => setStep(step + 1)}>İleri</Button>
              ) : (
                <Button onClick={handleComplete}>Başla!</Button>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
