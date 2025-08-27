import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useToast } from "../hooks/use-toast";
import { CheckCircle, Circle, Star, Zap, Calendar, Clock } from "lucide-react";

interface Quest {
  id: number;
  title: string;
  description: string;
  type: "daily" | "weekly";
  target: number;
  current: number;
  unit: string;
  xpReward: number;
  isCompleted: boolean;
  expiresAt: string;
}

const mockQuests: Quest[] = [
  {
    id: 1,
    title: "Gunluk Oxuma",
    description: "Bu gun 30 sehife oxuyun",
    type: "daily",
    target: 30,
    current: 18,
    unit: "sehife",
    xpReward: 50,
    isCompleted: false,
    expiresAt: "2024-03-08T23:59:59",
  },
  {
    id: 2,
    title: "Yeni Janr Kesfi",
    description: "Bu gun yeni bir janrdan kitab oxumağa baslayin",
    type: "daily",
    target: 1,
    current: 0,
    unit: "yeni janr",
    xpReward: 75,
    isCompleted: false,
    expiresAt: "2024-03-08T23:59:59",
  },
  {
    id: 3,
    title: "Heftelik Meqsed",
    description: "Bu hefte 2 kitab bitirin",
    type: "weekly",
    target: 2,
    current: 1,
    unit: "kitab",
    xpReward: 200,
    isCompleted: false,
    expiresAt: "2024-03-10T23:59:59",
  },
  {
    id: 4,
    title: "Oxuma Oxuma",
    description: "Səhər saatlarinda oxuma seansi keçirin",
    type: "daily",
    target: 1,
    current: 1,
    unit: "seher seansi",
    xpReward: 40,
    isCompleted: true,
    expiresAt: "2024-03-08T23:59:59",
  },
];

export function Quests() {
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const { toast } = useToast();

  const handleCompleteQuest = (questId: number) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, current: quest.target, isCompleted: true }
          : quest
      )
    );

    const quest = quests.find((q) => q.id === questId);
    if (quest) {
      toast({
        title: "Tapsiriq tamamlandi! 🎉",
        description: `${quest.xpReward} XP qazandiniz!`,
      });
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Vaxt bitdi";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} gun qalib`;
    } else if (hours > 0) {
      return `${hours}s ${minutes}d qalib`;
    } else {
      return `${minutes}d qalib`;
    }
  };

  const dailyQuests = quests.filter((q) => q.type === "daily");
  const weeklyQuests = quests.filter((q) => q.type === "weekly");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-chart-2" />
          Gunluk Tapsiriqlar
        </h3>
        <div className="space-y-3">
          {dailyQuests.map((quest) => (
            <Card
              key={quest.id}
              className={`transition-all ${
                quest.isCompleted
                  ? "border-chart-3/20 bg-chart-3/5"
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {quest.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-chart-3" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={`font-medium ${
                            quest.isCompleted
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {quest.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {quest.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {getTimeRemaining(quest.expiresAt)}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-accent" />
                          <span>{quest.xpReward}</span>
                        </div>
                      </div>
                    </div>

                    {!quest.isCompleted && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proqres</span>
                          <span>
                            {quest.current}/{quest.target} {quest.unit}
                          </span>
                        </div>
                        <Progress
                          value={getProgressPercentage(
                            quest.current,
                            quest.target
                          )}
                          className="h-2"
                        />
                        {quest.current >= quest.target && (
                          <Button
                            size="sm"
                            onClick={() => handleCompleteQuest(quest.id)}
                            className="h-8"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Tamamla
                          </Button>
                        )}
                      </div>
                    )}

                    {quest.isCompleted && (
                      <div className="flex items-center gap-2 text-sm text-chart-3">
                        <CheckCircle className="h-4 w-4" />
                        <span>Tamamlandi! +{quest.xpReward} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-chart-1" />
          Heftelik Tapsiriqlar
        </h3>
        <div className="space-y-3">
          {weeklyQuests.map((quest) => (
            <Card
              key={quest.id}
              className={`transition-all ${
                quest.isCompleted
                  ? "border-chart-3/20 bg-chart-3/5"
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {quest.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-chart-3" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={`font-medium ${
                            quest.isCompleted
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {quest.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {quest.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {getTimeRemaining(quest.expiresAt)}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-accent" />
                          <span>{quest.xpReward}</span>
                        </div>
                      </div>
                    </div>

                    {!quest.isCompleted && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proqres</span>
                          <span>
                            {quest.current}/{quest.target} {quest.unit}
                          </span>
                        </div>
                        <Progress
                          value={getProgressPercentage(
                            quest.current,
                            quest.target
                          )}
                          className="h-2"
                        />
                        {quest.current >= quest.target && (
                          <Button
                            size="sm"
                            onClick={() => handleCompleteQuest(quest.id)}
                            className="h-8"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Tamamla
                          </Button>
                        )}
                      </div>
                    )}

                    {quest.isCompleted && (
                      <div className="flex items-center gap-2 text-sm text-chart-3">
                        <CheckCircle className="h-4 w-4" />
                        <span>Tamamlandı! +{quest.xpReward} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
