"use client";

import * as React from "react";

import { Calendar, GripVertical, MoreHorizontal, Plus, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  tags?: string[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "bg-muted",
    tasks: [
      {
        id: "1",
        title: "Pesquisar tendências de mercado",
        description: "Analisar tendências para Q2 2024",
        priority: "low",
        tags: ["Pesquisa"],
      },
      {
        id: "2",
        title: "Criar template de email",
        priority: "medium",
        assignee: { name: "Maria Silva", avatar: "/avatars/01.png" },
        dueDate: "2024-02-15",
        tags: ["Email", "Marketing"],
      },
    ],
  },
  {
    id: "todo",
    title: "A Fazer",
    color: "bg-blue-500",
    tasks: [
      {
        id: "3",
        title: "Campanha de lançamento",
        description: "Planejar campanha para novo produto",
        priority: "high",
        assignee: { name: "João Santos", avatar: "/avatars/02.png" },
        dueDate: "2024-01-20",
        tags: ["Campanha", "Produto"],
      },
      {
        id: "4",
        title: "Revisar copy do site",
        priority: "medium",
        assignee: { name: "Ana Costa", avatar: "/avatars/03.png" },
        tags: ["Copy", "Website"],
      },
      {
        id: "5",
        title: "Criar posts para Instagram",
        priority: "high",
        dueDate: "2024-01-18",
        tags: ["Social Media"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "Em Progresso",
    color: "bg-amber-500",
    tasks: [
      {
        id: "6",
        title: "Design de landing page",
        description: "Nova landing para promoção de verão",
        priority: "high",
        assignee: { name: "Pedro Lima", avatar: "/avatars/04.png" },
        dueDate: "2024-01-22",
        tags: ["Design", "Landing"],
      },
      {
        id: "7",
        title: "Análise de métricas mensais",
        priority: "medium",
        assignee: { name: "Carla Mendes", avatar: "/avatars/05.png" },
        tags: ["Analytics"],
      },
    ],
  },
  {
    id: "review",
    title: "Em Revisão",
    color: "bg-purple-500",
    tasks: [
      {
        id: "8",
        title: "Vídeo institucional",
        description: "Edição final do vídeo",
        priority: "medium",
        assignee: { name: "Maria Silva", avatar: "/avatars/01.png" },
        dueDate: "2024-01-19",
        tags: ["Vídeo"],
      },
    ],
  },
  {
    id: "done",
    title: "Concluído",
    color: "bg-green-500",
    tasks: [
      {
        id: "9",
        title: "Configurar Google Analytics",
        priority: "high",
        assignee: { name: "João Santos", avatar: "/avatars/02.png" },
        tags: ["Analytics", "Setup"],
      },
      {
        id: "10",
        title: "Atualizar perfis sociais",
        priority: "low",
        assignee: { name: "Ana Costa", avatar: "/avatars/03.png" },
        tags: ["Social Media"],
      },
    ],
  },
];

const priorityColors = {
  low: "bg-slate-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="cursor-grab active:cursor-grabbing">
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <GripVertical className="size-4 text-muted-foreground" />
            <div
              className={cn("size-2 rounded-full", priorityColors[task.priority])}
              title={`Prioridade ${priorityLabels[task.priority]}`}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="size-6">
                <MoreHorizontal className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>Mover</DropdownMenuItem>
                <DropdownMenuItem>Duplicar</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-2">
          <p className="font-medium text-sm">{task.title}</p>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">{task.description}</p>
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {task.assignee ? (
            <Avatar className="size-6">
              <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
              <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex size-6 items-center justify-center rounded-full border border-dashed">
              <User className="size-3 text-muted-foreground" />
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Calendar className="size-3" />
              {new Date(task.dueDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({ column }: { column: Column }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("size-3 rounded", column.color)} />
          <h3 className="font-medium text-sm">{column.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {column.tasks.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon-sm">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <Button variant="ghost" className="justify-start border border-dashed text-muted-foreground">
        <Plus data-icon="inline-start" />
        Adicionar tarefa
      </Button>
    </div>
  );
}

export default function Page() {
  const [columns] = React.useState<Column[]>(initialColumns);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Kanban</h1>
          <p className="text-muted-foreground text-sm">Gerencie suas tarefas de forma visual</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtrar</Button>
          <Button>
            <Plus data-icon="inline-start" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="text-base">Quadro de Tarefas</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {columns.map((column) => (
                <KanbanColumn key={column.id} column={column} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
