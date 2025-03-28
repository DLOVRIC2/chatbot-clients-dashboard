"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageSquare, Zap } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

// Analytics categories with their colors
const CATEGORIES = [
  { name: "Total Runs", amount: 15097, color: "#FF6B00", icon: Activity },
  {
    name: "Total Tokens",
    amount: 3337258,
    color: "#8B54FF",
    icon: MessageSquare,
  },
  { name: "Success Rate", amount: 99.4, color: "#4CB6FF", icon: Zap },
];

export const AnalyticsWidget = () => {
  return (
    <Card className="relative w-[325px] h-[325px] bg-gray-100 dark:bg-black/25 backdrop-blur-xl border-0 rounded-[28px] overflow-hidden shadow-sm dark:shadow-md gap-1 px-6">
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[28px]" />

      <CardHeader className="relative p-0 pb-0 pt-3 space-y-0">
        <CardTitle className="text-[13px] text-gray-600 dark:text-gray-400 tracking-[0.2em] font-medium">
          ANALYTICS OVERVIEW
        </CardTitle>
      </CardHeader>

      <CardContent className="relative p-0 pb-3 space-y-5">
        <div className="flex justify-between items-center">
          <div className="text-[42px] font-normal text-gray-900 dark:text-white">
            {CATEGORIES[0].amount.toLocaleString()}
          </div>
          <div className="text-[24px] font-light text-gray-700 dark:text-white/90">
            {CATEGORIES[2].amount}%
          </div>
        </div>

        <div className="flex gap-[2px]">
          {[...Array(27)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-full ${
                i < 15
                  ? "bg-[#FF6B00]"
                  : i < 21
                  ? "bg-[#8B54FF]"
                  : i < 25
                  ? "bg-[#4CB6FF]"
                  : "bg-gray-300 dark:bg-white/10"
              } rounded-sm`}
            />
          ))}
        </div>

        <div className="space-y-4 mt-2">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <category.icon
                  className="w-4 h-4"
                  style={{ color: category.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">
                {category.name === "Success Rate"
                  ? `${category.amount}%`
                  : category.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const analyticsData = [
  { name: "Runs", value: 15097, amount: "15.1k", fill: "#FF6B00" },
  { name: "Tokens", value: 33, amount: "3.3M", fill: "#8B54FF" },
  { name: "Success", value: 99, amount: "99.4%", fill: "#4CB6FF" },
];

const chartConfig = {
  Runs: { color: "#FF6B00" },
  Tokens: { color: "#8B54FF" },
  Success: { color: "#4CB6FF" },
} satisfies ChartConfig;

export const BarChartAnalyticsWidget = () => {
  return (
    <Card className="relative w-[325px] h-[325px] bg-gray-100 dark:bg-black/90 backdrop-blur-lg border-0 rounded-[28px] overflow-hidden shadow-sm dark:shadow-md gap-1 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[28px]" />
      <CardHeader className="relative p-0 pb-0 pt-3 space-y-0">
        <CardTitle className="text-[13px] text-gray-600 dark:text-gray-400 tracking-[0.2em] font-medium">
          ANALYTICS OVERVIEW
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-0 pb-3 space-y-5">
        <div className="flex justify-between items-center">
          <div className="text-[42px] font-normal text-gray-900 dark:text-white">
            15.1k<span className="text-[30px]"> runs</span>
          </div>
          <div className="text-[24px] font-light text-gray-700 dark:text-white/90">
            99.4%
          </div>
        </div>

        <div className="-mx-6">
          <ChartContainer config={chartConfig} className="w-full h-[100px]">
            <BarChart
              data={analyticsData}
              margin={{ top: 0, right: 25, left: 25, bottom: 25 }}
              barGap={12}
            >
              <Bar
                dataKey="value"
                radius={[6, 6, 6, 6]}
                barSize={32}
                fill="var(--color-name)"
              />
            </BarChart>
          </ChartContainer>

          <div className="flex justify-between px-[25px] -mt-5">
            {analyticsData.map((item) => (
              <div
                key={item.name}
                className="text-xs font-medium text-gray-500 dark:text-gray-400"
                style={{ width: "32px", textAlign: "center" }}
              >
                {item.amount}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
          <Activity className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">
            TOTAL COST: ${(0.27808435).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricCard = ({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: "runs" | "tokens" | "success";
}) => (
  <div className="flex flex-col items-center justify-center w-[325px] h-[325px] bg-gray-100 dark:bg-black/15">
    {type === "runs" && <Activity className="w-12 h-12 mb-4" />}
    {type === "tokens" && <MessageSquare className="w-12 h-12 mb-4" />}
    {type === "success" && <Zap className="w-12 h-12 mb-4" />}
    <h2 className="text-[64px]  ">{value}</h2>
    <p className="text-[13px]  uppercase tracking-[0.2em]">{title}</p>
  </div>
);
