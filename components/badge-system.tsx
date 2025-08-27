import type React from "react";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";
import {
  Trophy,
  Star,
  Moon,
  BookOpen,
  Flame,
  Target,
  Clock,
  Award,
} from "lucide-react";

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: any) => boolean;
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: Date;
  xpAwarded: number;
}

const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "first_book",
    name: "İlk Kitap",
    description: "İlk kitabını bitir",
    icon: <BookOpen className="h-4 w-4" />,
    condition: (stats) => stats.booksRead >= 1,
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "streak_10",
    name: "10 Günlük Seri",
    description: "10 gün üst üste oku",
    icon: <Flame className="h-4 w-4" />,
    condition: (stats) => stats.streak >= 10,
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "night_reader",
    name: "Gece Okuyucusu",
    description: "Saat 22:00'dan sonra okuma kaydet",
    icon: <Moon className="h-4 w-4" />,
    condition: (stats) => stats.nightReadingSessions >= 1,
    xpReward: 150,
    rarity: "rare",
  },
  {
    id: "pages_1000",
    name: "1000 Sayfa",
    description: "Toplam 1000 sayfa oku",
    icon: <Target className="h-4 w-4" />,
    condition: (stats) => stats.pagesRead >= 1000,
    xpReward: 300,
    rarity: "epic",
  },
  {
    id: "speed_reader",
    name: "Hızlı Okuyucu",
    description: "Bir günde 100+ sayfa oku",
    icon: <Clock className="h-4 w-4" />,
    condition: (stats) => stats.maxDailyPages >= 100,
    xpReward: 250,
    rarity: "epic",
  },
  {
    id: "consistent_reader",
    name: "Düzenli Okuyucu",
    description: "30 gün üst üste oku",
    icon: <Star className="h-4 w-4" />,
    condition: (stats) => stats.streak >= 30,
    xpReward: 500,
    rarity: "legendary",
  },
];

const RARITY_COLORS = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

interface BadgeSystemProps {
  userStats: any;
  earnedBadges: EarnedBadge[];
  onBadgeEarned: (badge: BadgeDefinition) => void;
}

export function BadgeSystem({
  userStats,
  earnedBadges,
  onBadgeEarned,
}: BadgeSystemProps) {
  const { toast } = useToast();

  useEffect(() => {
    BADGE_DEFINITIONS.forEach((badge) => {
      const alreadyEarned = earnedBadges.some(
        (earned) => earned.badgeId === badge.id
      );
      if (!alreadyEarned && badge.condition(userStats)) {
        onBadgeEarned(badge);
        toast({
          title: "🏆 Yeni Rozet Kazandın!",
          description: `${badge.name} - ${badge.description}`,
        });
      }
    });
  }, [userStats, earnedBadges, onBadgeEarned, toast]);

  return null;
}

export function BadgeGallery({
  earnedBadges,
}: {
  earnedBadges: EarnedBadge[];
}) {
  const earnedBadgeIds = earnedBadges.map((b) => b.badgeId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-accent" />
          Rozet Galerisi
        </h2>
        <Badge variant="secondary">
          {earnedBadges.length}/{BADGE_DEFINITIONS.length} Kazanıldı
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGE_DEFINITIONS.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          const earnedBadge = earnedBadges.find((b) => b.badgeId === badge.id);

          return (
            <Card
              key={badge.id}
              className={`transition-all duration-300 ${
                isEarned
                  ? "border-accent/50 shadow-lg hover:shadow-xl"
                  : "opacity-60 grayscale hover:grayscale-0"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isEarned
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{badge.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs ${RARITY_COLORS[badge.rarity]}`}
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {badge.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-primary font-medium">
                    +{badge.xpReward} XP
                  </span>
                  {isEarned && earnedBadge && (
                    <span className="text-muted-foreground">
                      {earnedBadge.earnedAt.toLocaleDateString("tr-TR")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function RecentAwards({
  earnedBadges,
}: {
  earnedBadges: EarnedBadge[];
}) {
  const recentBadges = earnedBadges
    .sort((a, b) => b.earnedAt.getTime() - a.earnedAt.getTime())
    .slice(0, 3);

  if (recentBadges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            Son Kazanılan Rozetler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Henüz rozet kazanmadın. Okumaya devam et!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          Son Kazanılan Rozetler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentBadges.map((earnedBadge) => {
          const badge = BADGE_DEFINITIONS.find(
            (b) => b.id === earnedBadge.badgeId
          );
          if (!badge) return null;

          return (
            <div
              key={`${earnedBadge.badgeId}-${earnedBadge.earnedAt.getTime()}`}
              className="flex items-center gap-3 p-2 rounded-lg bg-accent/5"
            >
              <div className="p-1.5 bg-accent/10 rounded-md text-accent">
                {badge.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">
                  {earnedBadge.earnedAt.toLocaleDateString("tr-TR")}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                +{badge.xpReward} XP
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export { BADGE_DEFINITIONS };
