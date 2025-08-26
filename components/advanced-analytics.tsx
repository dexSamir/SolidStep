import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  BookOpen,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Target,
  Clock,
} from "lucide-react";

const genreData = [
  { name: "Klassik", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Detektiv", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Bilim Kurgu", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Tarih", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Biyografi", value: 8, color: "hsl(var(--chart-5))" },
];

const weekdayMissedData = [
  { day: "Pazartesi", missed: 8, total: 20, percentage: 40 },
  { day: "Salı", missed: 5, total: 20, percentage: 25 },
  { day: "Çarşamba", missed: 6, total: 20, percentage: 30 },
  { day: "Perşembe", missed: 4, total: 20, percentage: 20 },
  { day: "Cuma", missed: 7, total: 20, percentage: 35 },
  { day: "Cumartesi", missed: 3, total: 20, percentage: 15 },
  { day: "Pazar", missed: 2, total: 20, percentage: 10 },
];

const readingPaceData = [
  { day: "7 gün önce", pages: 25 },
  { day: "6 gün önce", pages: 32 },
  { day: "5 gün önce", pages: 18 },
  { day: "4 gün önce", pages: 28 },
  { day: "3 gün önce", pages: 35 },
  { day: "2 gün önce", pages: 22 },
  { day: "Dün", pages: 30 },
];

interface ReadingPacePredictionProps {
  currentBook: {
    title: string;
    currentPage: number;
    totalPages: number;
  };
}

export function ReadingPacePrediction({
  currentBook,
}: ReadingPacePredictionProps) {
  // Calculate average pages per day from last 7 days
  const avgPagesPerDay =
    readingPaceData.reduce((sum, day) => sum + day.pages, 0) /
    readingPaceData.length;
  const remainingPages = currentBook.totalPages - currentBook.currentPage;
  const estimatedDays = Math.ceil(remainingPages / avgPagesPerDay);
  const estimatedFinishDate = new Date();
  estimatedFinishDate.setDate(estimatedFinishDate.getDate() + estimatedDays);

  const progressPercentage =
    (currentBook.currentPage / currentBook.totalPages) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-chart-2" />
          Okuma Hızı Tahmini
        </CardTitle>
        <CardDescription>Son 7 günlük veriye dayalı tahmin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{currentBook.title}</span>
            <span>
              {currentBook.currentPage}/{currentBook.totalPages}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Günlük Ortalama</p>
            <p className="text-2xl font-bold text-chart-2">
              {Math.round(avgPagesPerDay)}
            </p>
            <p className="text-xs text-muted-foreground">sayfa/gün</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tahmini Bitiş</p>
            <p className="text-2xl font-bold text-chart-3">{estimatedDays}</p>
            <p className="text-xs text-muted-foreground">gün kaldı</p>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Tahmin</span>
          </div>
          <p className="text-sm">
            Bu hızla devam edersen,{" "}
            <span className="font-semibold">{currentBook.title}</span> kitabını{" "}
            <span className="font-semibold text-accent">
              {estimatedFinishDate.toLocaleDateString("tr-TR")}
            </span>{" "}
            tarihinde bitireceksin.
          </p>
        </div>

        {/* Last 7 days trend */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Son 7 Günlük Trend</h4>
          <ChartContainer
            config={{
              pages: {
                label: "Sayfa",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[100px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readingPaceData}>
                <Line
                  type="monotone"
                  dataKey="pages"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 3 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function GenreBreakdown() {
  const totalBooks = genreData.reduce((sum, genre) => sum + genre.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-chart-1" />
          Janr Dağılımı
        </CardTitle>
        <CardDescription>Okuduğun kitapların janr analizi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="flex justify-center">
            <ChartContainer
              config={{
                value: {
                  label: "Kitap Sayısı",
                },
              }}
              className="h-[200px] w-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {genreData.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: genre.color }}
                  />
                  <span className="text-sm font-medium">{genre.name}</span>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    {genre.value} kitap
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    %{Math.round((genre.value / totalBooks) * 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/5 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">En çok okuduğun janr:</span>{" "}
            <span className="text-primary">{genreData[0].name}</span> (%
            {Math.round((genreData[0].value / totalBooks) * 100)})
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function MissedDaysAnalysis() {
  const mostMissedDay = weekdayMissedData.reduce((prev, current) =>
    prev.percentage > current.percentage ? prev : current
  );
  const leastMissedDay = weekdayMissedData.reduce((prev, current) =>
    prev.percentage < current.percentage ? prev : current
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-chart-4" />
          Kaçırılan Günler Analizi
        </CardTitle>
        <CardDescription>
          Hangi günlerde okuma alışkanlığın zayıflıyor?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bar Chart */}
        <ChartContainer
          config={{
            percentage: {
              label: "Kaçırma Oranı (%)",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdayMissedData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 50]} />
              <YAxis dataKey="day" type="category" width={80} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="percentage"
                fill="var(--color-chart-4)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800 dark:text-red-200">
                En Zor Gün
              </span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              <span className="font-semibold">{mostMissedDay.day}</span> günleri
              %{mostMissedDay.percentage} oranında kaçırıyorsun.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                En İyi Gün
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              <span className="font-semibold">{leastMissedDay.day}</span>{" "}
              günleri sadece %{leastMissedDay.percentage} kaçırıyorsun.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-accent/10 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Öneriler</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {mostMissedDay.day} günleri için hatırlatıcı kur</li>
            <li>• Hafta sonu okuma hedeflerini artır</li>
            <li>
              • {leastMissedDay.day} günlerindeki başarını diğer günlere taşı
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function InsightsDashboard() {
  const currentBook = {
    title: "Cinayet ve Ceza",
    currentPage: 245,
    totalPages: 671,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Okuma İçgörüleri</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReadingPacePrediction currentBook={currentBook} />
        <GenreBreakdown />
      </div>

      <MissedDaysAnalysis />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favori Janr</p>
                <p className="font-semibold">{genreData[0].name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Günlük Ortalama</p>
                <p className="font-semibold">
                  {Math.round(
                    readingPaceData.reduce((sum, day) => sum + day.pages, 0) /
                      readingPaceData.length
                  )}{" "}
                  sayfa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Calendar className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En İyi Gün</p>
                <p className="font-semibold">
                  {
                    weekdayMissedData.reduce((prev, current) =>
                      prev.percentage < current.percentage ? prev : current
                    ).day
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
