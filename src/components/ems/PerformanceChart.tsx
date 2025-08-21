import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface PerformanceData {
  month: string;
  performance: number;
  target: number;
}

export const PerformanceChart = () => {
  const [data] = useState<PerformanceData[]>([
    { month: 'Jan', performance: 85, target: 80 },
    { month: 'Feb', performance: 78, target: 80 },
    { month: 'Mar', performance: 92, target: 85 },
    { month: 'Apr', performance: 88, target: 85 },
    { month: 'May', performance: 95, target: 85 },
    { month: 'Jun', performance: 91, target: 90 },
  ]);

  const [animatedData, setAnimatedData] = useState<PerformanceData[]>(
    data.map(d => ({ ...d, performance: 0, target: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map(d => Math.max(d.performance, d.target))) + 10;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {animatedData.map((item, index) => (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.month}</span>
                <span className="text-muted-foreground">
                  {item.performance}% / {item.target}%
                </span>
              </div>
              <div className="relative">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-info to-success rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${(item.performance / maxValue) * 100}%`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
                <div
                  className="absolute top-0 h-3 w-1 bg-warning rounded-full transition-all duration-1000 ease-out"
                  style={{
                    left: `${(item.target / maxValue) * 100}%`,
                    transitionDelay: `${index * 200}ms`
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-info to-success rounded-full" />
              <span>Actual Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-warning rounded-full" />
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};