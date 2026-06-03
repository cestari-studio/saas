"use client";

import * as React from "react";

import {
  Calendar,
  Clock,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  dueDate: string;
  members: { name: string; avatar?: string }[];
  tasks: { total: number; completed: number };
  starred: boolean;
  category: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Campanha de Verão 2024",
    description: "Campanha de marketing para a temporada de verão",
    status: "active",
    progress: 65,
    dueDate: "2024-02-28",
    members: [
      { name: "Maria Silva", avatar: "/avatars/01.png" },
      { name: "João Santos", avatar: "/avatars/02.png" },
      { name: "Ana Costa", avatar: "/avatars/03.png" },
    ],
    tasks: { total: 24, completed: 16 },
    starred: true,
    category: "Marketing",
  },
  {
    id: "2",
    name: "Redesign do Website",
    description: "Atualização completa do site institucional",
    status: "active",
    progress: 40,
    dueDate: "2024-03-15",
    members: [
      { name: "Pedro Lima", avatar: "/avatars/04.png" },
      { name: "Carla Mendes", avatar: "/avatars/05.png" },
    ],
    tasks: { total: 18, completed: 7 },
    starred: true,
    category: "Design",
  },
  {
    id: "3",
    name: "App Mobile",
    description: "Desenvolvimento do aplicativo para iOS e Android",
    status: "planning",
    progress: 15,
    dueDate: "2024-06-30",
    members: [
      { name: "João Santos", avatar: "/avatars/02.png" },
      { name: "Maria Silva", avatar: "/avatars/01.png" },
    ],
    tasks: { total: 45, completed: 7 },
    starred: false,
    category: "Desenvolvimento",
  },
  {
    id: "4",
    name: "Conteúdo Q1",
    description: "Planejamento de conteúdo para o primeiro trimestre",
    status: "completed",
    progress: 100,
    dueDate: "2024-01-31",
    members: [
      { name: "Ana Costa", avatar: "/avatars/03.png" },
      { name: "Carla Mendes", avatar: "/avatars/05.png" },
      { name: "Pedro Lima", avatar: "/avatars/04.png" },
      { name: "Maria Silva", avatar: "/avatars/01.png" },
    ],
    tasks: { total: 32, completed: 32 },
    starred: false,
    category: "Conteúdo",
  },
  {
    id: "5",
    name: "Integração CRM",
    description: "Integrar sistema com novo CRM",
    status: "on-hold",
    progress: 30,
    dueDate: "2024-04-15",
    members: [{ name: "João Santos", avatar: "/avatars/02.png" }],
    tasks: { total: 12, completed: 4 },
    starred: false,
    category: "Desenvolvimento",
  },
  {
    id: "6",
    name: "Treinamento de Equipe",
    description: "Capacitação em novas ferramentas",
    status: "active",
    progress: 80,
    dueDate: "2024-02-10",
    members: [
      { name: "Maria Silva", avatar: "/avatars/01.png" },
      { name: "Ana Costa", avatar: "/avatars/03.png" },
    ],
    tasks: { total: 8, completed: 6 },
    starred: true,
    category: "RH",
  },
];

const statusConfig = {
  active: { label: "Ativo", color: "bg-green-500" },
  completed: { label: "Concluído", color: "bg-blue-500" },
  "on-hold": { label: "Pausado", color: "bg-amber-500" },
  planning: { label: "Planejamento", color: "bg-purple-500" },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Folder className="size-5" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                {project.name}
                {project.starred && <Star className="size-4 fill-amber-400 text-amber-400" />}
              </CardTitle>
              <Badge variant="outline" className="mt-1">
                {project.category}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="size-4" />
                  {project.starred ? "Remover Favorito" : "Adicionar Favorito"}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="line-clamp-2 text-muted-foreground text-sm">{project.description}</p>

        <div className="flex items-center gap-2">
          <div className={cn("size-2 rounded-full", statusConfig[project.status].color)} />
          <span className="text-sm">{statusConfig[project.status].label}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{new Date(project.dueDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              {project.tasks.completed}/{project.tasks.total} tarefas
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="size-8 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 4 && (
              <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +{project.members.length - 4}
              </div>
            )}
          </div>
          <Button variant="outline" size="sm">
            Ver Projeto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesTab = activeTab === "all" || (activeTab === "starred" && project.starred);
      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [search, statusFilter, activeTab]);

  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.total, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.tasks.completed, 0);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Projetos</h1>
          <p className="text-muted-foreground text-sm">Gerencie todos os seus projetos em um só lugar</p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-2xl">{projects.length}</div>
              <Badge>
                <TrendingUp className="size-3" />
                +2
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Projetos Ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl text-green-600">{activeProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Concluídos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl text-blue-600">{completedProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tarefas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-semibold text-2xl">
              {completedTasks}/{totalTasks}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="starred">
              <Star className="size-4" />
              Favoritos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <InputGroup className="h-9 w-full max-w-[250px]">
            <InputGroupAddon align="inline-start">
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar projetos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="on-hold">Pausado</SelectItem>
                <SelectItem value="planning">Planejamento</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <Folder className="mb-4 size-12 text-muted-foreground/50" />
            <p className="font-medium">Nenhum projeto encontrado</p>
            <p className="text-muted-foreground text-sm">Tente ajustar os filtros ou criar um novo projeto</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
