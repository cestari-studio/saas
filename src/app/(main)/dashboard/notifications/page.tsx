"use client";

import * as React from "react";

import {
  Bell,
  Calendar,
  Check,
  CheckCheck,
  MessageCircle,
  Settings,
  Trash2,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "mention" | "comment" | "like" | "follow" | "system" | "task";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  user?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "Maria Silva mencionou você",
    description: "em um comentário no post 'Lançamento do novo produto'",
    time: "5 min atrás",
    read: false,
    avatar: "/avatars/01.png",
    user: "Maria Silva",
  },
  {
    id: "2",
    type: "comment",
    title: "Novo comentário",
    description: "João Santos comentou no seu post 'Dicas de produtividade'",
    time: "15 min atrás",
    read: false,
    avatar: "/avatars/02.png",
    user: "João Santos",
  },
  {
    id: "3",
    type: "like",
    title: "Seu post foi curtido",
    description: "25 pessoas curtiram seu post 'Tendências de Marketing 2024'",
    time: "1 hora atrás",
    read: false,
  },
  {
    id: "4",
    type: "follow",
    title: "Novo seguidor",
    description: "Ana Costa começou a seguir você",
    time: "2 horas atrás",
    read: true,
    avatar: "/avatars/03.png",
    user: "Ana Costa",
  },
  {
    id: "5",
    type: "task",
    title: "Tarefa atribuída",
    description: "Pedro Lima atribuiu a tarefa 'Revisar copy do site' para você",
    time: "3 horas atrás",
    read: true,
    avatar: "/avatars/04.png",
    user: "Pedro Lima",
  },
  {
    id: "6",
    type: "system",
    title: "Atualização do sistema",
    description: "Novas funcionalidades foram adicionadas ao calendário de posts",
    time: "5 horas atrás",
    read: true,
  },
  {
    id: "7",
    type: "comment",
    title: "Resposta ao seu comentário",
    description: "Carla Mendes respondeu seu comentário",
    time: "1 dia atrás",
    read: true,
    avatar: "/avatars/05.png",
    user: "Carla Mendes",
  },
  {
    id: "8",
    type: "system",
    title: "Relatório semanal disponível",
    description: "O relatório de performance da semana está pronto para visualização",
    time: "2 dias atrás",
    read: true,
  },
];

const typeIcons = {
  mention: User,
  comment: MessageCircle,
  like: TrendingUp,
  follow: Users,
  system: Settings,
  task: Calendar,
};

const typeColors = {
  mention: "bg-blue-500",
  comment: "bg-green-500",
  like: "bg-pink-500",
  follow: "bg-purple-500",
  system: "bg-gray-500",
  task: "bg-amber-500",
};

function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = typeIcons[notification.type];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
        !notification.read && "bg-primary/5 border-primary/20"
      )}
    >
      {notification.avatar ? (
        <Avatar className="size-10">
          <AvatarImage src={notification.avatar} alt={notification.user} />
          <AvatarFallback>{notification.user?.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className={cn("flex size-10 items-center justify-center rounded-full text-white", typeColors[notification.type])}>
          <Icon className="size-5" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={cn("text-sm", !notification.read && "font-medium")}>{notification.title}</p>
            <p className="text-muted-foreground text-sm">{notification.description}</p>
          </div>
          {!notification.read && <div className="size-2 shrink-0 rounded-full bg-primary" />}
        </div>
        <p className="mt-1 text-muted-foreground text-xs">{notification.time}</p>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeTab);
  }, [activeTab]);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Notificações</h1>
          <p className="text-muted-foreground text-sm">Acompanhe todas as suas notificações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck data-icon="inline-start" />
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm">
            <Settings data-icon="inline-start" />
            Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Não Lidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-2xl">{unreadCount}</div>
              <Badge variant="secondary">notificações</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Menções</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">
              {notifications.filter((n) => n.type === "mention").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Comentários</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">
              {notifications.filter((n) => n.type === "comment").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">
              {notifications.filter((n) => n.type === "system").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Todas as Notificações</CardTitle>
          <CardDescription>Gerencie suas notificações recentes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-4">
              <TabsList className="h-12 w-full justify-start gap-4 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Todas
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Não Lidas
                  {unreadCount > 0 && (
                    <Badge className="ml-2" variant="secondary">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="mention"
                  className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Menções
                </TabsTrigger>
                <TabsTrigger
                  value="comment"
                  className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-0 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Comentários
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="m-0">
              <ScrollArea className="h-[500px]">
                <div className="flex flex-col gap-2 p-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="mb-4 size-12 text-muted-foreground/50" />
                      <p className="font-medium">Nenhuma notificação</p>
                      <p className="text-muted-foreground text-sm">Você está em dia!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
