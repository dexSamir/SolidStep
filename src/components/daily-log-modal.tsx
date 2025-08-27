import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BookOpen, Smile, Meh, Frown } from "lucide-react";

interface DailyLogModalProps {
  book: any;
  onSave: (logData: any) => void;
  onClose: () => void;
}

export function DailyLogModal({ book, onSave, onClose }: DailyLogModalProps) {
  const [pages, setPages] = useState("");
  const [notes, setNotes] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pages && Number.parseInt(pages) > 0) {
      onSave({
        pages: Number.parseInt(pages),
        notes: notes.trim(),
        mood,
      });
      onClose();
    }
  };

  const moodOptions = [
    { value: "great", label: "Əla", icon: Smile, color: "text-green-500" },
    { value: "good", label: "Yaxşı", icon: Smile, color: "text-blue-500" },
    { value: "okay", label: "Normal", icon: Meh, color: "text-yellow-500" },
    { value: "bad", label: "Pis", icon: Frown, color: "text-red-500" },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Günlük Oxuma Qeydi
          </DialogTitle>
          <DialogDescription>
            "{book.title}" üçün bugünkü oxuma fəaliyyətinizi qeyd edin
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pages">Oxuduğunuz səhifə sayı</Label>
            <Input
              id="pages"
              type="number"
              min="1"
              placeholder="Məsələn: 25"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood">Oxuma əhvalınız</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger>
                <SelectValue placeholder="Əhvalınızı seçin" />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Qeydlər (ixtiyari)</Label>
            <Textarea
              id="notes"
              placeholder="Bugünkü oxuma təcrübəniz haqqında qeydlər..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Ləğv Et
            </Button>
            <Button type="submit" className="flex-1">
              Qeyd Et
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
