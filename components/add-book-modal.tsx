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
              <CardTitle>Yeni Kitab Elave Et</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Oxuma siyahisina elave et</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Kitab adi</Label>
              <Input
                id="title"
                placeholder="Mes: Cinayet ve Ceza"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Yazici</Label>
              <Input
                id="author"
                placeholder="Mes: Fyodor Dostoyevski"
                value={formData.author}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, author: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages">Toplam Sehife Sayi</Label>
              <Input
                id="pages"
                type="number"
                min="1"
                placeholder="Mes: 671"
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
              <Label htmlFor="deadline">Hedef Bitis Tarixi</Label>
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
                Legv et
              </Button>
              <Button type="submit" className="flex-1">
                Elave et
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
