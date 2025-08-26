import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Medal, Award, Flame, BookOpen, Target } from "lucide-react";
import { UserAvatar } from "./avatar-system";

interface LeaderboardUser {
  id: number;
  name: string;
  avatar?: string;
  streak: number;
  booksRead: number;
  pagesRead: number;
  level: number;
}

const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    avatar: "/wise-librarian-avatar.png",
    streak: 45,
    booksRead: 23,
    pagesRead: 8450,
    level: 12,
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "/modern-student-avatar.png",
    streak: 38,
    booksRead: 19,
    pagesRead: 7230,
    level: 10,
  },
  {
    id: 3,
    name: "Fatma Demir",
    avatar: "/bookworm-character-avatar.png",
    streak: 32,
    booksRead: 21,
    pagesRead: 6890,
    level: 11,
  },
  {
    id: 4,
    name: "Ali Özkan",
    avatar: "/literary-enthusiast-avatar.png",
    streak: 28,
    booksRead: 15,
    pagesRead: 5670,
    level: 8,
  },
  {
    id: 5,
    name: "Zeynep Şahin",
    avatar: "/reading-club-member-avatar.png",
    streak: 25,
    booksRead: 18,
    pagesRead: 5340,
    level: 9,
  },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <span className="text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            Ən Uzun Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboardData
              .sort((a, b) => b.streak - a.streak)
              .slice(0, 5)
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>
                  <UserAvatar
                    src={user.avatar}
                    name={user.name}
                    size="md"
                    level={user.level}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Seviye {user.level}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent"
                  >
                    {user.streak} gün
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-chart-3" />
            Ən Çox Kitab Oxuyan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboardData
              .sort((a, b) => b.booksRead - a.booksRead)
              .slice(0, 5)
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>
                  <UserAvatar
                    src={user.avatar}
                    name={user.name}
                    size="md"
                    level={user.level}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Seviye {user.level}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-chart-3/10 text-chart-3"
                  >
                    {user.booksRead} kitab
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-chart-1" />
            Ən Çox Səhifə Oxuyan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboardData
              .sort((a, b) => b.pagesRead - a.pagesRead)
              .slice(0, 5)
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>
                  <UserAvatar
                    src={user.avatar}
                    name={user.name}
                    size="md"
                    level={user.level}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Seviye {user.level}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-chart-1/10 text-chart-1"
                  >
                    {user.pagesRead.toLocaleString()} səhifə
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
