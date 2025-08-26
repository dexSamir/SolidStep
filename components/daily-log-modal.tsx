import type React from "react";

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
import { Textarea } from "./ui/textarea";
import { BookOpen, X } from "lucide-react";

interface DailyLogModalProps {
  onSubmit: (pages: number) => void;
  onClose: () => void;
}

export function DailyLogModal({ onSubmit, onClose }: DailyLogModalProps) {
  const [pages, setPages] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageCount = Number.parseInt(pages) || 0;
    if (pageCount > 0) {
      onSubmit(pageCount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>Günlük Okuma Kaydet</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Bugün kaç sayfa okudun?</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pages">Okunan sayfa sayısı</Label>
              <Input
                id="pages"
                type="number"
                min="1"
                max="500"
                placeholder="Örn: 25"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notlar (isteğe bağlı)</Label>
              <Textarea
                id="notes"
                placeholder="Bugünkü okuma deneyimin hakkında notlar..."
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
                İptal
              </Button>
              <Button type="submit" className="flex-1">
                Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
