import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Target } from "lucide-react";

interface BookCardProps {
  book: any;
  completed?: boolean;
  onLogReading?: () => void;
}

export function BookCard({
  book,
  completed = false,
  onLogReading,
}: BookCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("az-AZ");
  };

  const getDaysReading = () => {
    const startDate = new Date(book.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
            <CardDescription className="mt-1">{book.author}</CardDescription>
          </div>
          {completed && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✅ Tamamlandı
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tərəqqi</span>
            <span>{Math.round(book.progress)}%</span>
          </div>
          <Progress value={book.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>{book.totalPages} səhifə</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span>{getDaysReading()} gün</span>
          </div>
        </div>

        {book.targetDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>Hədəf: {formatDate(book.targetDate)}</span>
          </div>
        )}

        {!completed && onLogReading && (
          <Button onClick={onLogReading} className="w-full">
            Oxuma Qeyd Et
          </Button>
        )}

        {book.logs && book.logs.length > 0 && (
          <div className="text-xs text-gray-500">
            Son oxuma: {formatDate(book.logs[book.logs.length - 1].date)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
