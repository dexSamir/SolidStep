import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";
import { UserPlus, Users, Search, BookOpen, Flame } from "lucide-react";
import { UserAvatar } from "./avatar-system";

interface Friend {
  id: number;
  name: string;
  avatar?: string;
  streak: number;
  booksRead: number;
  currentBook?: string;
  level: number;
  isOnline: boolean;
}

const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    avatar: "/friendly-book-reader-avatar-1.png",
    streak: 15,
    booksRead: 8,
    currentBook: "1984",
    level: 6,
    isOnline: true,
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    avatar: "/studious-person-with-glasses-avatar.png",
    streak: 22,
    booksRead: 12,
    currentBook: "Suç ve Ceza",
    level: 8,
    isOnline: false,
  },
  {
    id: 3,
    name: "Fatma Demir",
    avatar: "/young-reader-with-book-avatar.png",
    streak: 8,
    booksRead: 5,
    currentBook: "Savaş ve Barış",
    level: 4,
    isOnline: true,
  },
];

export function Friends() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddFriend = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Dost sorğusu göndərildi! 👥",
        description: `${searchQuery} istifadəçisinə dost sorğusu göndərildi.`,
      });
      setSearchQuery("");
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Dost Əlavə Et
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="İstifadəçi adı və ya email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAddFriend} disabled={!searchQuery.trim()}>
              <UserPlus className="h-4 w-4 mr-2" />
              Əlavə Et
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-chart-2" />
            Dostlarım ({friends.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <UserAvatar
                    src={friend.avatar}
                    name={friend.name}
                    size="lg"
                    level={friend.level}
                    showOnlineStatus={friend.isOnline}
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {friend.isOnline ? "Aktiv" : "Offline"}
                        </p>
                      </div>
                      <Badge variant="outline">Seviye {friend.level}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-accent" />
                        <span>{friend.streak} gün streak</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-chart-3" />
                        <span>{friend.booksRead} kitab</span>
                      </div>
                    </div>

                    {friend.currentBook && (
                      <div className="p-2 bg-muted/50 rounded text-sm">
                        <p className="text-muted-foreground">Hazırda oxuyur:</p>
                        <p className="font-medium">{friend.currentBook}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredFriends.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Hələ dostunuz yoxdur</p>
                <p className="text-sm">
                  Yuxarıdakı axtarış sahəsindən dost əlavə edin
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
