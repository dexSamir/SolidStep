import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface StatsChartProps {
  books: any[];
  userStats: any;
}

export function StatsChart({ books, userStats }: StatsChartProps) {
  // Generate mock data for charts
  const weeklyData = [
    { day: "B.e", pages: 15 },
    { day: "Ç.a", pages: 23 },
    { day: "Ç", pages: 18 },
    { day: "C.a", pages: 32 },
    { day: "C", pages: 28 },
    { day: "Ş", pages: 25 },
    { day: "B", pages: 20 },
  ];

  const monthlyData = [
    { month: "Yan", books: 2 },
    { month: "Fev", books: 1 },
    { month: "Mar", books: 3 },
    { month: "Apr", books: 2 },
    { month: "May", books: 4 },
    { month: "İyn", books: 2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Həftəlik Oxuma Statistikası</CardTitle>
          <CardDescription>Son 7 gündə oxuduğunuz səhifələr</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              pages: {
                label: "Səhifələr",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="pages"
                  stroke="var(--color-pages)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-pages)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Books Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Aylıq Kitab Statistikası</CardTitle>
          <CardDescription>Hər ay tamamladığınız kitablar</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              books: {
                label: "Kitablar",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="books"
                  fill="var(--color-books)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Oxuma Hədəfləri</CardTitle>
          <CardDescription>Bu ilin hədəfləriniz və tərəqqi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {userStats.totalPages}
              </div>
              <div className="text-sm text-gray-600">Oxunan Səhifələr</div>
              <div className="text-xs text-gray-500">Hədəf: 10,000</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {books.filter((b) => b.progress >= 100).length}
              </div>
              <div className="text-sm text-gray-600">Tamamlanan Kitablar</div>
              <div className="text-xs text-gray-500">Hədəf: 24</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {userStats.streak}
              </div>
              <div className="text-sm text-gray-600">Ardıcıl Günlər</div>
              <div className="text-xs text-gray-500">
                Ən yüksək: {userStats.streak}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
