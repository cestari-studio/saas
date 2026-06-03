"use client";

import * as React from "react";

import { Check, Edit, MoreHorizontal, Plus, Search, Shield, Trash2, Users, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  usersCount: number;
  permissions: string[];
  users: { name: string; avatar?: string }[];
}

const permissions: Permission[] = [
  { id: "users.view", name: "Visualizar Usuários", description: "Ver lista de usuários", category: "Usuários" },
  { id: "users.create", name: "Criar Usuários", description: "Adicionar novos usuários", category: "Usuários" },
  { id: "users.edit", name: "Editar Usuários", description: "Modificar dados de usuários", category: "Usuários" },
  { id: "users.delete", name: "Excluir Usuários", description: "Remover usuários", category: "Usuários" },
  { id: "posts.view", name: "Visualizar Posts", description: "Ver todos os posts", category: "Posts" },
  { id: "posts.create", name: "Criar Posts", description: "Publicar novos posts", category: "Posts" },
  { id: "posts.edit", name: "Editar Posts", description: "Modificar posts existentes", category: "Posts" },
  { id: "posts.delete", name: "Excluir Posts", description: "Remover posts", category: "Posts" },
  { id: "analytics.view", name: "Ver Analytics", description: "Acessar métricas e relatórios", category: "Analytics" },
  { id: "settings.view", name: "Ver Configurações", description: "Visualizar configurações", category: "Configurações" },
  { id: "settings.edit", name: "Editar Configurações", description: "Modificar configurações", category: "Configurações" },
  { id: "billing.view", name: "Ver Faturamento", description: "Acessar informações de pagamento", category: "Faturamento" },
  { id: "billing.manage", name: "Gerenciar Faturamento", description: "Modificar planos e pagamentos", category: "Faturamento" },
];

const roles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acesso total ao sistema",
    color: "bg-red-500",
    usersCount: 2,
    permissions: permissions.map((p) => p.id),
    users: [
      { name: "Admin User", avatar: "/avatars/01.png" },
      { name: "Super Admin", avatar: "/avatars/02.png" },
    ],
  },
  {
    id: "2",
    name: "Editor",
    description: "Pode criar e editar conteúdo",
    color: "bg-blue-500",
    usersCount: 5,
    permissions: ["users.view", "posts.view", "posts.create", "posts.edit", "analytics.view"],
    users: [
      { name: "Maria Silva", avatar: "/avatars/03.png" },
      { name: "João Santos", avatar: "/avatars/04.png" },
      { name: "Ana Costa" },
    ],
  },
  {
    id: "3",
    name: "Autor",
    description: "Pode criar conteúdo próprio",
    color: "bg-green-500",
    usersCount: 8,
    permissions: ["posts.view", "posts.create", "analytics.view"],
    users: [
      { name: "Pedro Lima", avatar: "/avatars/05.png" },
      { name: "Carla Mendes" },
    ],
  },
  {
    id: "4",
    name: "Visualizador",
    description: "Apenas visualização",
    color: "bg-gray-500",
    usersCount: 15,
    permissions: ["users.view", "posts.view", "analytics.view"],
    users: [{ name: "Usuário Teste" }],
  },
  {
    id: "5",
    name: "Financeiro",
    description: "Acesso a faturamento e relatórios",
    color: "bg-amber-500",
    usersCount: 3,
    permissions: ["analytics.view", "billing.view", "billing.manage"],
    users: [{ name: "Finance Team", avatar: "/avatars/01.png" }],
  },
];

const permissionCategories = Array.from(new Set(permissions.map((p) => p.category)));

function RoleCard({ role }: { role: Role }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-lg ${role.color} text-white`}>
              <Shield className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base">{role.name}</CardTitle>
              <CardDescription className="text-xs">{role.description}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Edit className="size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="size-4" />
                  Ver Usuários
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="size-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Usuários</span>
          <Badge variant="secondary">{role.usersCount}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Permissões</span>
          <Badge variant="secondary">{role.permissions.length}</Badge>
        </div>
        <div className="flex -space-x-2">
          {role.users.slice(0, 4).map((user, index) => (
            <Avatar key={index} className="size-8 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {role.usersCount > 4 && (
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
              +{role.usersCount - 4}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [search, setSearch] = React.useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Papéis e Permissões</h1>
          <p className="text-muted-foreground text-sm">Gerencie os papéis e permissões dos usuários</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus data-icon="inline-start" />
              Novo Papel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Papel</DialogTitle>
              <DialogDescription>Defina um nome, descrição e permissões para o novo papel.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="role-name">Nome do Papel</FieldLabel>
                  <Input id="role-name" placeholder="Ex: Moderador" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="role-desc">Descrição</FieldLabel>
                  <Textarea id="role-desc" placeholder="Descreva as responsabilidades deste papel" />
                </Field>
              </FieldGroup>

              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-sm">Permissões</h4>
                {permissionCategories.map((category) => (
                  <div key={category} className="rounded-lg border p-3">
                    <h5 className="mb-2 font-medium text-sm">{category}</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions
                        .filter((p) => p.category === category)
                        .map((permission) => (
                          <label
                            key={permission.id}
                            className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-muted"
                          >
                            <Checkbox id={permission.id} />
                            <span className="text-sm">{permission.name}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Criar Papel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <InputGroup className="h-9 w-full max-w-sm">
          <InputGroupAddon align="inline-start">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar papéis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permissões</CardTitle>
          <CardDescription>Visão geral das permissões por papel</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Permissão</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id} className="text-center">
                    {role.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{permission.name}</p>
                      <p className="text-muted-foreground text-xs">{permission.description}</p>
                    </div>
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={role.id} className="text-center">
                      {role.permissions.includes(permission.id) ? (
                        <Check className="mx-auto size-4 text-green-500" />
                      ) : (
                        <X className="mx-auto size-4 text-muted-foreground/30" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
