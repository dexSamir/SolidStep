import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BookCard } from "../../components/book-card";
import { StatsChart } from "../../components/stats-chart";
import { DailyLogModal } from "../../components/daily-log-modal";
import { AddBookModal } from "../../components/add-book-modal";
import { BookOpen, Target, Trophy, Flame, Plus } from "lucide-react";
import { toast } from "../../hooks/use-toast";

interface DashboardProps {
  user: any;
}

export function Dashboard({ user }: DashboardProps) {
  const [books, setBooks] = useState<any[]>([]);
  const [showDailyLog, setShowDailyLog] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    streak: 0,
    totalPages: 0,
    booksCompleted: 0,
    badges: [],
  });

  useEffect(() => {
    const savedBooks = localStorage.getItem("reading-tracker-books");
    const savedStats = localStorage.getItem("reading-tracker-stats");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const handleAddBook = (bookData: any) => {
    const newBook = {
      id: Date.now(),
      ...bookData,
      progress: 0,
      startDate: new Date().toISOString(),
      logs: [],
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem("reading-tracker-books", JSON.stringify(updatedBooks));

    toast({
      title: "Kitab əlavə edildi! 📚",
      description: `"${bookData.title}" oxuma siyahınıza əlavə edildi.`,
    });
  };

  const handleDailyLog = (logData: any) => {
    if (!selectedBook) return;

    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        const newProgress = Math.min(
          100,
          book.progress + (logData.pages / book.totalPages) * 100
        );
        const newLog = {
          id: Date.now(),
          date: new Date().toISOString(),
          pages: logData.pages,
          notes: logData.notes,
          mood: logData.mood,
        };

        return {
          ...book,
          progress: newProgress,
          logs: [...book.logs, newLog],
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    localStorage.setItem("reading-tracker-books", JSON.stringify(updatedBooks));

    const newStats = {
      ...userStats,
      totalPages: userStats.totalPages + logData.pages,
      xp: userStats.xp + logData.pages * 10,
      streak: userStats.streak + 1,
    };

    const newLevel = Math.floor(newStats.xp / 1000) + 1;
    if (newLevel > userStats.level) {
      newStats.level = newLevel;
      toast({
        title: "Səviyyə artdı! 🎉",
        description: `Təbriklər! ${newLevel}. səviyyəyə çatdınız!`,
      });
    }

    setUserStats(newStats);
    localStorage.setItem("reading-tracker-stats", JSON.stringify(newStats));

    toast({
      title: "Günlük qeyd əlavə edildi! ✨",
      description: `${logData.pages} səhifə oxudunuz. +${
        logData.pages * 10
      } XP!`,
    });
  };

  const currentBooks = books.filter((book) => book.progress < 100);
  const completedBooks = books.filter((book) => book.progress >= 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Salam, {user?.name || "Oxucu"}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Bugün oxuma macəranıza davam edək
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddBook(true)}
              className="animate-pulse-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Kitab Əlavə Et
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-bounce-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Səviyyə</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.level}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.xp % 1000}/1000 XP
              </p>
              <Progress value={(userStats.xp % 1000) / 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card
            className="animate-bounce-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ardıcıl Günlər
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500 animate-streak-fire" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.streak}</div>
              <p className="text-xs text-muted-foreground">
                Günlük oxuma seriyası
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-bounce-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Oxunan Səhifələr
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalPages}</div>
              <p className="text-xs text-muted-foreground">Ümumi səhifə sayı</p>
            </CardContent>
          </Card>

          <Card
            className="animate-bounce-in"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tamamlanan Kitablar
              </CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedBooks.length}</div>
              <p className="text-xs text-muted-foreground">
                Bitirdiyiniz kitablar
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Cari Kitablar</TabsTrigger>
            <TabsTrigger value="completed">Tamamlanan</TabsTrigger>
            <TabsTrigger value="stats">Statistika</TabsTrigger>
            <TabsTrigger value="inspiration">İlham</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {currentBooks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Hələ oxuduğunuz kitab yoxdur
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Oxuma macəranıza başlamaq üçün ilk kitabınızı əlavə edin
                  </p>
                  <Button onClick={() => setShowAddBook(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Kitabınızı Əlavə Edin
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onLogReading={() => {
                      setSelectedBook(book);
                      setShowDailyLog(true);
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedBooks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trophy className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Hələ tamamladığınız kitab yoxdur
                  </h3>
                  <p className="text-gray-600 text-center">
                    İlk kitabınızı bitirdikdə burada görünəcək
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedBooks.map((book) => (
                  <BookCard key={book.id} book={book} completed />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <StatsChart books={books} userStats={userStats} />
          </TabsContent>

          <TabsContent value="inspiration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Günün İlhamı ✨</CardTitle>
                <CardDescription>Oxuma motivasiyası üçün</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg italic text-center py-8">
                  "Kitab oxumaq ən böyük səyahətdir. Hər səhifə yeni bir dünya
                  açır."
                </blockquote>
                <p className="text-center text-sm text-gray-600">
                  - Oxuma Həvəskarı
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showDailyLog && selectedBook && (
          <DailyLogModal
            book={selectedBook}
            onSave={handleDailyLog}
            onClose={() => {
              setShowDailyLog(false);
              setSelectedBook(null);
            }}
          />
        )}

        {showAddBook && (
          <AddBookModal
            onSave={handleAddBook}
            onClose={() => setShowAddBook(false)}
          />
        )}
      </div>
    </div>
  );
}
