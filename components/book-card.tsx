import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, Calendar, CheckCircle } from "lucide-react";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    totalPages: number;
    currentPage: number;
    deadline: string;
    status: "reading" | "completed" | "paused";
  };
}

export function BookCard({ book }: BookCardProps) {
  const progress = (book.currentPage / book.totalPages) * 100;
  const daysLeft = Math.ceil(
    (new Date(book.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-3 text-white";
      case "reading":
        return "bg-primary text-primary-foreground";
      case "paused":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı";
      case "reading":
        return "Okunuyor";
      case "paused":
        return "Duraklatıldı";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base line-clamp-2">
              {book.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
          </div>
          <Badge className={getStatusColor(book.status)}>
            {book.status === "completed" && (
              <CheckCircle className="h-3 w-3 mr-1" />
            )}
            {getStatusText(book.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              İlerleme
            </span>
            <span className="font-medium">
              {book.currentPage}/{book.totalPages} sayfa
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            %{Math.round(progress)} tamamlandı
          </p>
        </div>

        {book.status !== "completed" && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Hedef tarih
            </span>
            <span
              className={`font-medium ${
                daysLeft < 7 ? "text-destructive" : "text-foreground"
              }`}
            >
              {daysLeft > 0 ? `${daysLeft} gün kaldı` : "Süre doldu"}
            </span>
          </div>
        )}

        {book.status === "reading" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent"
            >
              İlerleme Kaydet
            </Button>
            <Button size="sm" variant="outline">
              Düzenle
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
