import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { StatsChart } from "./stats-chart";
import { BookCard } from "./book-card";
import { DailyLogModal } from "./daily-log-modal";
import { AddBookModal } from "./add-book-modal";
import { Leaderboard } from "./leaderboard";
import { Friends } from "./friends";
import { Challenges } from "./challenges";
import { Quests } from "./quests";
import { ThemeToggle } from "./theme-toggle";
import {
  BadgeSystem,
  BadgeGallery,
  RecentAwards,
  type EarnedBadge,
} from "./badge-system";
import { LevelUpAnimation } from "./level-up-animation";
import { AnimatedProgress, CircularProgress } from "./animated-progress";
import { useToast } from "../hooks/use-toast";
import {
  BookOpen,
  Target,
  Trophy,
  Flame,
  CalendarIcon,
  Plus,
  Award,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { UserAvatar, AvatarManager } from "./avatar-system";

interface DashboardProps {
  user: any;
}

export function Dashboard({ user }: DashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [showDailyLog, setShowDailyLog] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ newLevel: 1, xpGained: 0 });

  const [userStats, setUserStats] = useState({
    level: 5,
    xp: 2450,
    xpToNext: 3000,
    streak: 12,
    booksRead: 8,
    pagesRead: 2340,
    readingGoal: 20,
    badges: ["First Book", "Week Warrior", "Page Turner", "Consistent Reader"],
    nightReadingSessions: 3,
    maxDailyPages: 85,
  });

  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([
    {
      badgeId: "first_book",
      earnedAt: new Date("2024-01-15"),
      xpAwarded: 100,
    },
    {
      badgeId: "streak_10",
      earnedAt: new Date("2024-01-25"),
      xpAwarded: 200,
    },
  ]);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Cinayet ve Ceza",
      author: "Fyodor Dostoyevski",
      totalPages: 671,
      currentPage: 245,
      deadline: "2024-02-15",
      status: "reading",
    },
    {
      id: 2,
      title: "Muharibe ve Sulh",
      author: "Lev Tolstoy",
      totalPages: 1225,
      currentPage: 1225,
      deadline: "2024-01-30",
      status: "completed",
    },
  ]);

  const { toast } = useToast();

  const dailyInspiration = [
    "Bugun oxudung her sehife, sabahin daha bilgili seni ucun bir addimdir!",
    "Kitaplar, ruhun için en iyi besin kaynağıdır.",
    "Her okuma seansı, zihnini genişletir ve hayal gücünü besler.",
    "Okumak, zamanla yarışmak değil, kendini geliştirmektir.",
    "Bugün de okuma hedefine bir adım daha yaklaştın!",
  ];

  const [todayInspiration] = useState(
    dailyInspiration[Math.floor(Math.random() * dailyInspiration.length)]
  );

  const [userAvatar, setUserAvatar] = useState<string>(
    "/friendly-book-reader-avatar.png"
  );

  const calculateLevel = (xp: number) => Math.floor(xp / 500) + 1;
  const getXPForNextLevel = (level: number) => level * 500;
  const getCurrentLevelXP = (xp: number, level: number) =>
    xp - (level - 1) * 500;

  const currentLevel = calculateLevel(userStats.xp);
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const currentLevelXP = getCurrentLevelXP(userStats.xp, currentLevel);
  const progressPercentage = (currentLevelXP / 500) * 100;

  const handleBadgeEarned = (badge: any) => {
    const newEarnedBadge: EarnedBadge = {
      badgeId: badge.id,
      earnedAt: new Date(),
      xpAwarded: badge.xpReward,
    };

    setEarnedBadges((prev) => [...prev, newEarnedBadge]);
    setUserStats((prev) => {
      const newXP = prev.xp + badge.xpReward;
      const newLevel = calculateLevel(newXP);

      if (newLevel > prev.level) {
        setLevelUpData({ newLevel, xpGained: badge.xpReward });
        setShowLevelUp(true);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const handleDailyLogSubmit = (pages: number) => {
    const currentHour = new Date().getHours();
    const isNightReading = currentHour >= 22 || currentHour <= 5;

    setUserStats((prev) => {
      const newXP = prev.xp + pages * 10;
      const newLevel = calculateLevel(newXP);
      const newStats = {
        ...prev,
        pagesRead: prev.pagesRead + pages,
        xp: newXP,
        level: newLevel,
        streak: prev.streak + 1,
        maxDailyPages: Math.max(prev.maxDailyPages, pages),
        nightReadingSessions: isNightReading
          ? prev.nightReadingSessions + 1
          : prev.nightReadingSessions,
      };

      if (newLevel > prev.level) {
        setLevelUpData({ newLevel, xpGained: pages * 10 });
        setShowLevelUp(true);
      }

      return newStats;
    });

    toast({
      title: "Mukemmel! 🎉",
      description: `${pages} sehife oxudun ve ${pages * 10} XP qazandin!`,
    });

    setShowDailyLog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <BadgeSystem
        userStats={userStats}
        earnedBadges={earnedBadges}
        onBadgeEarned={handleBadgeEarned}
      />

      <LevelUpAnimation
        isVisible={showLevelUp}
        newLevel={levelUpData.newLevel}
        xpGained={levelUpData.xpGained}
        onClose={() => setShowLevelUp(false)}
      />

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar
                src={userAvatar}
                name={user?.name || "Oxucu"}
                size="lg"
                level={currentLevel}
                showOnlineStatus={true}
              />
              <div>
                <h1 className="text-xl font-bold helloworld">
                  Oxuma Izleyicisi
                </h1>
                <p className="text-sm text-muted-foreground">
                  Xos geldin, {user?.name || "Oxucu"}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-lg">
                <Flame className="h-4 w-4 text-accent animate-streak-fire" />
                <span className="font-semibold">{userStats.streak} gun</span>
              </div>

              <div className="flex items-center gap-3">
                <CircularProgress
                  value={currentLevelXP}
                  max={500}
                  size={40}
                  strokeWidth={4}
                  className="text-primary"
                >
                  <span className="text-xs font-bold">{currentLevel}</span>
                </CircularProgress>
                <div className="text-sm">
                  <div className="font-semibold">Seviye {currentLevel}</div>
                  <div className="text-xs text-muted-foreground">
                    {currentLevelXP}/500 XP
                  </div>
                </div>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium italic">{todayInspiration}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-chart-1" />
                Seviye Irelilemesi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Seviye {currentLevel}</span>
                  <span>{currentLevelXP}/500 XP</span>
                </div>
                <AnimatedProgress
                  value={currentLevelXP}
                  max={500}
                  className="h-2"
                  animated={true}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-accent" />
                Oxuma Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {userStats.streak}
              </div>
              <p className="text-xs text-muted-foreground">Ardicil gun</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-chart-3" />
                Oxunan Kitablar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">
                {userStats.booksRead}
              </div>
              <p className="text-xs text-muted-foreground">Bu Il</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-chart-2" />
                Illik Hedef
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-chart-2">
                  {userStats.booksRead}/{userStats.readingGoal}
                </div>
                <Progress
                  value={(userStats.booksRead / userStats.readingGoal) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="books">Kitablarim</TabsTrigger>
            <TabsTrigger value="challenges">Cagirislar</TabsTrigger>
            <TabsTrigger value="social">Sosial</TabsTrigger>
            <TabsTrigger value="badges">Medallar</TabsTrigger>
            <TabsTrigger value="stats">Statistikalar</TabsTrigger>
            <TabsTrigger value="calendar">Teqvim</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Hal-hazirda Oxuduglarim
                  </h2>
                  <Button onClick={() => setShowAddBook(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Kitab Elave Et
                  </Button>
                </div>

                <div className="space-y-3">
                  {books
                    .filter((book) => book.status === "reading")
                    .map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-chart-2" />
                    Gunluk Tapsiriglar
                  </h2>
                  <Quests />
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Suretli Emeliyyatlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      onClick={() => setShowDailyLog(true)}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Gunluk Oxuma Qeyd Et
                    </Button>
                    <Button
                      onClick={() => setShowAddBook(true)}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Kitab Elave Et
                    </Button>
                  </CardContent>
                </Card>

                <RecentAwards earnedBadges={earnedBadges} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Butun Kitablarim</h2>
              <Button onClick={() => setShowAddBook(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Kitab Elave Et
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Cagirislar
                </h2>
                <Challenges />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-chart-2" />
                  Tapsiriglar
                </h2>
                <Quests />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-chart-2" />
                  Dostlar
                </h2>
                <Friends />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Liderlik Tablosu
                </h2>
                <Leaderboard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-4">
            <BadgeGallery earnedBadges={earnedBadges} />
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <StatsChart />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Oxuma Teqvimi
                </CardTitle>
                <CardDescription>Oxuma alisqanliginizi izleyin</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <AvatarManager
                  currentAvatar={userAvatar}
                  userName={user?.name || "Oxucu"}
                  onAvatarChange={setUserAvatar}
                />
              </div>

              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Melumatlari</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">İsim</p>
                        <p className="font-medium">{user?.name || "Oxucu"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Seviye</p>
                        <p className="font-medium">Seviye {currentLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Umumi XP
                        </p>
                        <p className="font-medium">{userStats.xp} XP</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Oxuma Seriyasi
                        </p>
                        <p className="font-medium">{userStats.streak} gun</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Oxunan Kitablar
                        </p>
                        <p className="font-medium">
                          {userStats.booksRead} kitab
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Umumi Sehife
                        </p>
                        <p className="font-medium">
                          {userStats.pagesRead} sehife
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Qazanilan Medallar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {earnedBadges.slice(0, 6).map((earnedBadge, index) => (
                        <div
                          key={index}
                          className="bg-secondary/10 p-2 rounded-lg flex items-center gap-2"
                        >
                          <Trophy className="h-3 w-3 text-accent" />
                          {earnedBadge.badgeId.replace("_", " ")}
                        </div>
                      ))}
                      {earnedBadges.length > 6 && (
                        <div className="bg-outline/10 p-2 rounded-lg flex items-center gap-2">
                          +{earnedBadges.length - 6} daha
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {showDailyLog && (
        <DailyLogModal
          onSubmit={handleDailyLogSubmit}
          onClose={() => setShowDailyLog(false)}
        />
      )}

      {showAddBook && (
        <AddBookModal
          onAdd={(book) => {
            setBooks((prev) => [...prev, { ...book, id: Date.now() }]);
            setShowAddBook(false);
            toast({
              title: "Kitab elave olundu! 📚",
              description: `${book.title} kitabın siyanina elave edildi.`,
            });
          }}
          onClose={() => setShowAddBook(false)}
        />
      )}
    </div>
  );
}
