import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target } from "lucide-react";

interface OnboardingModalProps {
  onComplete: (goals: any) => void;
  onClose: () => void;
}

export function OnboardingModal({ onComplete, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState({
    booksPerMonth: "",
    pagesPerDay: "",
    readingTime: "",
    favoriteGenres: [],
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(goals);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Oxuma Hədəflərinizi Təyin Edin
          </DialogTitle>
          <DialogDescription>
            Addım {step}/3: Sizə uyğun hədəfləri müəyyən edək
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booksPerMonth">
                Ayda neçə kitab oxumaq istəyirsiniz?
              </Label>
              <Select
                value={goals.booksPerMonth}
                onValueChange={(value) =>
                  setGoals({ ...goals, booksPerMonth: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 kitab</SelectItem>
                  <SelectItem value="2">2 kitab</SelectItem>
                  <SelectItem value="3">3 kitab</SelectItem>
                  <SelectItem value="4">4+ kitab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pagesPerDay">
                Gündə neçə səhifə oxumaq istəyirsiniz?
              </Label>
              <Select
                value={goals.pagesPerDay}
                onValueChange={(value) =>
                  setGoals({ ...goals, pagesPerDay: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10-20 səhifə</SelectItem>
                  <SelectItem value="25">25-35 səhifə</SelectItem>
                  <SelectItem value="40">40-50 səhifə</SelectItem>
                  <SelectItem value="50">50+ səhifə</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="readingTime">
                Gündə nə qədər vaxt oxumaq istəyirsiniz?
              </Label>
              <Select
                value={goals.readingTime}
                onValueChange={(value) =>
                  setGoals({ ...goals, readingTime: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15-30 dəqiqə</SelectItem>
                  <SelectItem value="45">45-60 dəqiqə</SelectItem>
                  <SelectItem value="90">1.5-2 saat</SelectItem>
                  <SelectItem value="120">2+ saat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Geri
            </Button>
          )}
          <Button onClick={handleNext} className="ml-auto">
            {step === 3 ? "Tamamla" : "Növbəti"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
