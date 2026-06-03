"use client";

import { Calendar, Eye, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const posts = [
  {
    id: 1,
    title: "Lançamento do novo produto",
    platform: "Instagram",
    status: "Publicado",
    date: "2024-01-15",
    views: 12500,
    likes: 890,
    comments: 124,
    shares: 67,
    author: {
      name: "Maria Silva",
      avatar: "/avatars/01.png",
    },
  },
  {
    id: 2,
    title: "Dicas de produtividade para 2024",
    platform: "LinkedIn",
    status: "Publicado",
    date: "2024-01-14",
    views: 8900,
    likes: 456,
    comments: 89,
    shares: 123,
    author: {
      name: "João Santos",
      avatar: "/avatars/02.png",
    },
  },
  {
    id: 3,
    title: "Promoção de fim de semana",
    platform: "Facebook",
    status: "Agendado",
    date: "2024-01-20",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    author: {
      name: "Ana Costa",
      avatar: "/avatars/03.png",
    },
  },
  {
    id: 4,
    title: "Thread sobre tendências de mercado",
    platform: "Twitter/X",
    status: "Rascunho",
    date: "2024-01-18",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    author: {
      name: "Pedro Lima",
      avatar: "/avatars/04.png",
    },
  },
  {
    id: 5,
    title: "Bastidores da empresa",
    platform: "Instagram",
    status: "Publicado",
    date: "2024-01-12",
    views: 15600,
    likes: 1230,
    comments: 234,
    shares: 89,
    author: {
      name: "Carla Mendes",
      avatar: "/avatars/05.png",
    },
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "Publicado":
      return "default";
    case "Agendado":
      return "secondary";
    case "Rascunho":
      return "outline";
    default:
      return "secondary";
  }
}

export function RecentPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Recentes</CardTitle>
        <CardDescription>Gerencie e acompanhe seus posts nas redes sociais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm leading-none">{post.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                    <span>{post.platform}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <Badge variant={getStatusVariant(post.status)} className="mt-1 w-fit">
                    {post.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1" title="Visualizações">
                    <Eye className="size-4" />
                    {post.views.toLocaleString("pt-BR")}
                  </span>
                  <span className="flex items-center gap-1" title="Curtidas">
                    <Heart className="size-4" />
                    {post.likes.toLocaleString("pt-BR")}
                  </span>
                  <span className="flex items-center gap-1" title="Comentários">
                    <MessageCircle className="size-4" />
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1" title="Compartilhamentos">
                    <Share2 className="size-4" />
                    {post.shares}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Estatísticas</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
