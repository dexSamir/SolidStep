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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { az } from "date-fns/locale";

interface AddBookModalProps {
  onSave: (bookData: any) => void;
  onClose: () => void;
}

export function AddBookModal({ onSave, onClose }: AddBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [genre, setGenre] = useState("");
  const [targetDate, setTargetDate] = useState<Date>();
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      title.trim() &&
      author.trim() &&
      totalPages &&
      Number.parseInt(totalPages) > 0
    ) {
      onSave({
        title: title.trim(),
        author: author.trim(),
        totalPages: Number.parseInt(totalPages),
        genre,
        targetDate: targetDate?.toISOString(),
        description: description.trim(),
      });
      onClose();
    }
  };

  const genres = [
    "Roman",
    "Elmi-fantastik",
    "Detektiv",
    "Tarix",
    "Bioqrafiya",
    "Fəlsəfə",
    "Psixologiya",
    "İş və karyera",
    "Sağlamlıq",
    "Digər",
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Yeni Kitab Əlavə Et
          </DialogTitle>
          <DialogDescription>
            Oxumaq istədiyiniz kitabın məlumatlarını daxil edin
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Kitabın adı *</Label>
            <Input
              id="title"
              placeholder="Məsələn: Cinayət və Cəza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Müəllif *</Label>
            <Input
              id="author"
              placeholder="Məsələn: Fyodor Dostoyevski"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pages">Səhifə sayı *</Label>
              <Input
                id="pages"
                type="number"
                min="1"
                placeholder="500"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Janr</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hədəf tarix (ixtiyari)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate
                    ? format(targetDate, "PPP", { locale: az })
                    : "Tarix seçin"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Qeydlər (ixtiyari)</Label>
            <Textarea
              id="description"
              placeholder="Bu kitab haqqında qeydləriniz..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Kitab Əlavə Et
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
