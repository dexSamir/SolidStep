import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useToast } from "../hooks/use-toast";
import {
  Target,
  Trophy,
  Calendar,
  Users,
  Clock,
  Star,
  Zap,
} from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: "monthly" | "weekly" | "special";
  target: number;
  current: number;
  unit: string;
  reward: string;
  xpReward: number;
  deadline: string;
  participants: number;
  isActive: boolean;
  isCompleted: boolean;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "Mart Ayi Sehife Cagirisi",
    description: "Bu ay 300 sehife oxuyun və mukafatinizi qazanin!",
    type: "monthly",
    target: 300,
    current: 145,
    unit: "sehife",
    reward: "Ayliq Oxucu medali",
    xpReward: 500,
    deadline: "2024-03-31",
    participants: 1247,
    isActive: true,
    isCompleted: false,
  },
  {
    id: 2,
    title: "7 Gunluk Kitab Cagirisi",
    description: "Bir kitabi 7 gune bitirin və suretli oxucu olun!",
    type: "weekly",
    target: 1,
    current: 0,
    unit: "kitab",
    reward: "Suretli Oxucu medali",
    xpReward: 300,
    deadline: "2024-03-15",
    participants: 523,
    isActive: true,
    isCompleted: false,
  },
  {
    id: 3,
    title: "Klassik Edebiyyat Heftesi",
    description:
      "Bu hefte klassik bir eser oxuyun ve dunyagorusunuzu zenginlesdirin!",
    type: "special",
    target: 1,
    current: 1,
    unit: "klassik kitab",
    reward: "Klassik Heveskari medali",
    xpReward: 400,
    deadline: "2024-03-10",
    participants: 892,
    isActive: false,
    isCompleted: true,
  },
];

export function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const { toast } = useToast();

  const handleJoinChallenge = (challengeId: number) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              participants: challenge.participants + 1,
              isActive: true,
            }
          : challenge
      )
    );

    toast({
      title: "Cagirisa qatildiniz! 🎯",
      description: "Ugurlar! İndi proqresinizi izleye bilersiniz.",
    });
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case "monthly":
        return <Calendar className="h-5 w-5 text-chart-1" />;
      case "weekly":
        return <Clock className="h-5 w-5 text-chart-2" />;
      case "special":
        return <Star className="h-5 w-5 text-accent" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "monthly":
        return "Ayliq";
      case "weekly":
        return "Heftelik";
      case "special":
        return "Xususi";
      default:
        return "Cagiris";
    }
  };

  const activechallenges = challenges.filter(
    (c) => c.isActive && !c.isCompleted
  );
  const completedChallenges = challenges.filter((c) => c.isCompleted);
  const availableChallenges = challenges.filter(
    (c) => !c.isActive && !c.isCompleted
  );

  return (
    <div className="space-y-6">
      {activechallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Aktiv Cagirislar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activechallenges.map((challenge) => (
              <Card key={challenge.id} className="border-accent/20 bg-accent/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getChallengeIcon(challenge.type)}
                      <Badge variant="secondary">
                        {getTypeLabel(challenge.type)}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.participants} istirakci
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proqres</span>
                      <span>
                        {challenge.current}/{challenge.target} {challenge.unit}
                      </span>
                    </div>
                    <Progress
                      value={getProgressPercentage(
                        challenge.current,
                        challenge.target
                      )}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-chart-2" />
                      <span>{challenge.reward}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{challenge.xpReward} XP</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Son tarix:{" "}
                    {new Date(challenge.deadline).toLocaleDateString("az-AZ")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {availableChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Movcud Cagirislar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getChallengeIcon(challenge.type)}
                      <Badge variant="secondary">
                        {getTypeLabel(challenge.type)}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.participants} istirakci
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-chart-2" />
                      <span>{challenge.reward}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{challenge.xpReward} XP</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Son tarix:{" "}
                      {new Date(challenge.deadline).toLocaleDateString("az-AZ")}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="h-8"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Qatil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {completedChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-chart-3" />
            Tamamlanmamis Cagirislar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="border-chart-3/20 bg-chart-3/5"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getChallengeIcon(challenge.type)}
                      <Badge
                        variant="secondary"
                        className="bg-chart-3/20 text-chart-3"
                      >
                        Tamamlandi
                      </Badge>
                    </div>
                    <Trophy className="h-5 w-5 text-chart-3" />
                  </div>
                  <CardTitle className="text-base">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>

                  <div className="space-y-2">
                    <Progress value={100} className="h-2" />
                    <div className="text-sm text-chart-3 font-medium">
                      ✓ {challenge.target} {challenge.unit} tamamlandi
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-chart-2" />
                      <span>{challenge.reward}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      <span>+{challenge.xpReward} XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
