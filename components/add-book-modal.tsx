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
import { Plus, X } from "lucide-react";

interface AddBookModalProps {
  onAdd: (book: any) => void;
  onClose: () => void;
}

export function AddBookModal({ onAdd, onClose }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    totalPages: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const book = {
      title: formData.title,
      author: formData.author,
      totalPages: Number.parseInt(formData.totalPages) || 0,
      currentPage: 0,
      deadline: formData.deadline,
      status: "reading" as const,
    };

    onAdd(book);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              <CardTitle>Yeni Kitap Ekle</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Okuma listene yeni bir kitap ekle</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Kitap Adı</Label>
              <Input
                id="title"
                placeholder="Örn: Cinayet ve Ceza"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Yazar</Label>
              <Input
                id="author"
                placeholder="Örn: Fyodor Dostoyevski"
                value={formData.author}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, author: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages">Toplam Sayfa Sayısı</Label>
              <Input
                id="pages"
                type="number"
                min="1"
                placeholder="Örn: 671"
                value={formData.totalPages}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    totalPages: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Hedef Bitiş Tarihi</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                }
                required
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
                Kitap Ekle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
