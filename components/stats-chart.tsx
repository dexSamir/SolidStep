import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { InsightsDashboard } from "./advanced-analytics";
import { TrendingUp, BarChart3 } from "lucide-react";

const weeklyData = [
  { day: "Mon", pages: 45, time: 60 },
  { day: "Tue", pages: 32, time: 45 },
  { day: "Wed", pages: 28, time: 40 },
  { day: "Thu", pages: 52, time: 70 },
  { day: "Fri", pages: 38, time: 50 },
  { day: "Sat", pages: 65, time: 85 },
  { day: "Sun", pages: 42, time: 55 },
];

const monthlyData = [
  { month: "yan", books: 2, pages: 580 },
  { month: "Fev", books: 1, pages: 420 },
  { month: "Mar", books: 3, pages: 750 },
  { month: "Apr", books: 2, pages: 640 },
  { month: "May", books: 4, pages: 920 },
  { month: "Iyun", books: 2, pages: 580 },
];

export function StatsChart() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Umumi Baxis
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analizler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heftelik Oxu Analizi</CardTitle>
                <CardDescription>
                  Son 7 gunde oxudugun sehife sayi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    pages: {
                      label: "Sehife",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="pages"
                        fill="var(--color-chart-1)"
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ayliq Irelileme</CardTitle>
                <CardDescription>
                  Ayliq kitab ve sehife statistikleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    books: {
                      label: "Kitab",
                      color: "hsl(var(--chart-2))",
                    },
                    pages: {
                      label: "Sehife",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="books"
                        stroke="var(--color-chart-2)"
                        strokeWidth={3}
                        dot={{
                          fill: "var(--color-chart-2)",
                          strokeWidth: 2,
                          r: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Oxuma Seriyasi Teqvimi</CardTitle>
              <CardDescription>Gunluk oxu vərdişin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const hasRead = Math.random() > 0.3;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm border-2 ${
                        hasRead ? "bg-chart-3 border-chart-3" : "bg-muted "
                      }`}
                      title={hasRead ? "Oxundu" : "Oxunmadi"}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Az</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted border"></div>
                  <div className="w-3 h-3 rounded-sm bg-chart-3/30 border"></div>
                  <div className="w-3 h-3 rounded-sm bg-chart-3/60 border"></div>
                  <div className="w-3 h-3 rounded-sm bg-chart-3 border"></div>
                </div>
                <span>Cox</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <InsightsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
