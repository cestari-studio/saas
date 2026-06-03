"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", curtidas: 1200, comentarios: 320, compartilhamentos: 180 },
  { month: "Fev", curtidas: 1450, comentarios: 410, compartilhamentos: 220 },
  { month: "Mar", curtidas: 1680, comentarios: 380, compartilhamentos: 195 },
  { month: "Abr", curtidas: 1890, comentarios: 520, compartilhamentos: 280 },
  { month: "Mai", curtidas: 2100, comentarios: 610, compartilhamentos: 340 },
  { month: "Jun", curtidas: 2450, comentarios: 720, compartilhamentos: 420 },
];

const chartConfig = {
  curtidas: {
    label: "Curtidas",
    color: "var(--chart-1)",
  },
  comentarios: {
    label: "Comentários",
    color: "var(--chart-2)",
  },
  compartilhamentos: {
    label: "Compartilhamentos",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engajamento ao Longo do Tempo</CardTitle>
        <CardDescription>Evolução das interações nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillCurtidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillComentarios" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCompartilhamentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="compartilhamentos"
              type="natural"
              fill="url(#fillCompartilhamentos)"
              stroke="var(--chart-3)"
              stackId="a"
            />
            <Area
              dataKey="comentarios"
              type="natural"
              fill="url(#fillComentarios)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area dataKey="curtidas" type="natural" fill="url(#fillCurtidas)" stroke="var(--chart-1)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
