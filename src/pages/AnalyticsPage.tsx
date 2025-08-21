import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3 } from "lucide-react";

const data = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 170 },
  { month: "May", users: 220 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Gain insights with real-time data visualization</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-info" />
            User Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="w-full" config={{ users: { color: "hsl(var(--primary))" } }}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
