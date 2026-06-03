"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight, Facebook, Instagram, Linkedin, Plus, Twitter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScheduledPost {
  id: number;
  title: string;
  platform: "instagram" | "twitter" | "facebook" | "linkedin";
  time: string;
  status: "scheduled" | "draft" | "published";
}

interface DayPosts {
  [key: number]: ScheduledPost[];
}

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
};

const platformColors = {
  instagram: "bg-pink-500",
  twitter: "bg-sky-500",
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
};

const scheduledPosts: DayPosts = {
  3: [
    { id: 1, title: "Dicas de produtividade", platform: "instagram", time: "09:00", status: "scheduled" },
  ],
  5: [
    { id: 2, title: "Novo produto", platform: "facebook", time: "14:00", status: "scheduled" },
    { id: 3, title: "Thread de dicas", platform: "twitter", time: "16:00", status: "draft" },
  ],
  8: [
    { id: 4, title: "Case de sucesso", platform: "linkedin", time: "10:00", status: "scheduled" },
  ],
  12: [
    { id: 5, title: "Bastidores", platform: "instagram", time: "18:00", status: "scheduled" },
    { id: 6, title: "Promoção", platform: "facebook", time: "20:00", status: "scheduled" },
  ],
  15: [
    { id: 7, title: "Webinar anúncio", platform: "linkedin", time: "09:00", status: "draft" },
  ],
  18: [
    { id: 8, title: "Carrossel educativo", platform: "instagram", time: "12:00", status: "scheduled" },
  ],
  22: [
    { id: 9, title: "Enquete", platform: "twitter", time: "15:00", status: "scheduled" },
  ],
  25: [
    { id: 10, title: "Depoimento cliente", platform: "instagram", time: "11:00", status: "scheduled" },
    { id: 11, title: "Artigo blog", platform: "linkedin", time: "14:00", status: "draft" },
    { id: 12, title: "Live anúncio", platform: "facebook", time: "19:00", status: "scheduled" },
  ],
  28: [
    { id: 13, title: "Retrospectiva mensal", platform: "instagram", time: "17:00", status: "scheduled" },
  ],
};

const upcomingPosts = [
  { id: 1, title: "Dicas de produtividade", platform: "instagram" as const, date: "3 Jan", time: "09:00" },
  { id: 2, title: "Novo produto", platform: "facebook" as const, date: "5 Jan", time: "14:00" },
  { id: 3, title: "Thread de dicas", platform: "twitter" as const, date: "5 Jan", time: "16:00" },
  { id: 4, title: "Case de sucesso", platform: "linkedin" as const, date: "8 Jan", time: "10:00" },
  { id: 5, title: "Bastidores", platform: "instagram" as const, date: "12 Jan", time: "18:00" },
];

export default function Page() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 0, 1)); // January 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Calendário de Posts</h1>
          <p className="text-muted-foreground text-sm">Planeje e agende suas publicações</p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          Novo Post
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft />
              </Button>
              <CardTitle className="min-w-[180px] text-center text-lg">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight />
              </Button>
            </div>
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
              Hoje
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center font-medium text-muted-foreground text-sm"
                >
                  {day}
                </div>
              ))}
              {days.map((day, index) => {
                const posts = day ? scheduledPosts[day] || [] : [];
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[100px] rounded-lg border p-2",
                      day ? "bg-card hover:bg-muted/50 cursor-pointer" : "bg-muted/30",
                      isToday && "border-primary"
                    )}
                  >
                    {day && (
                      <>
                        <span
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-full text-sm",
                            isToday && "bg-primary text-primary-foreground"
                          )}
                        >
                          {day}
                        </span>
                        <div className="mt-1 flex flex-col gap-1">
                          {posts.slice(0, 2).map((post) => {
                            const Icon = platformIcons[post.platform];
                            return (
                              <div
                                key={post.id}
                                className={cn(
                                  "flex items-center gap-1 rounded px-1.5 py-0.5 text-white text-xs",
                                  platformColors[post.platform]
                                )}
                              >
                                <Icon className="size-3" />
                                <span className="truncate">{post.time}</span>
                              </div>
                            );
                          })}
                          {posts.length > 2 && (
                            <span className="text-muted-foreground text-xs">+{posts.length - 2} mais</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Posts</CardTitle>
              <CardDescription>Agendados para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {upcomingPosts.map((post) => {
                const Icon = platformIcons[post.platform];
                return (
                  <div key={post.id} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded text-white",
                        platformColors[post.platform]
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium text-sm">{post.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {post.date} às {post.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo do Mês</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="size-4 text-pink-500" />
                  <span className="text-sm">Instagram</span>
                </div>
                <Badge variant="secondary">6 posts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="size-4 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </div>
                <Badge variant="secondary">3 posts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Twitter className="size-4 text-sky-500" />
                  <span className="text-sm">Twitter/X</span>
                </div>
                <Badge variant="secondary">2 posts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Linkedin className="size-4 text-blue-700" />
                  <span className="text-sm">LinkedIn</span>
                </div>
                <Badge variant="secondary">3 posts</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
