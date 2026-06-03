"use client";

import * as React from "react";

import { Bell, Camera, Globe, Key, Lock, Mail, Moon, Save, Shield, Smartphone, Sun, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [theme, setTheme] = React.useState("system");

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Configurações</h1>
          <p className="text-muted-foreground text-sm">Gerencie suas preferências e configurações de conta</p>
        </div>
        <Button>
          <Save data-icon="inline-start" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile">
            <User className="size-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="account">
            <Key className="size-4" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="size-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="size-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="firstName">Nome</FieldLabel>
                      <Input id="firstName" defaultValue="João" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
                      <Input id="lastName" defaultValue="Silva" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
                    <Input id="username" defaultValue="@joaosilva" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="bio">Bio</FieldLabel>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      defaultValue="Especialista em marketing digital e criação de conteúdo para redes sociais."
                    />
                    <FieldDescription>Máximo de 200 caracteres</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="website">Website</FieldLabel>
                    <Input id="website" type="url" placeholder="https://seusite.com" />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Foto do Perfil</CardTitle>
                <CardDescription>Sua foto será exibida em todo o sistema</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <Avatar className="size-32">
                  <AvatarImage src="/avatars/01.png" alt="Profile" />
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Camera data-icon="inline-start" />
                    Alterar
                  </Button>
                  <Button variant="outline" size="sm">
                    Remover
                  </Button>
                </div>
                <p className="text-center text-muted-foreground text-xs">
                  JPG, GIF ou PNG. Máximo 2MB.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>Atualize sua senha regularmente para manter a conta segura</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="currentPassword">Senha Atual</FieldLabel>
                    <Input id="currentPassword" type="password" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="newPassword">Nova Senha</FieldLabel>
                    <Input id="newPassword" type="password" />
                    <FieldDescription>Mínimo de 8 caracteres</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirmar Nova Senha</FieldLabel>
                    <Input id="confirmPassword" type="password" />
                  </Field>
                </FieldGroup>
                <Button className="mt-4">Atualizar Senha</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Idioma e Região</CardTitle>
                <CardDescription>Configure suas preferências regionais</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>Idioma</FieldLabel>
                      <Select defaultValue="pt-BR">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Fuso Horário</FieldLabel>
                      <Select defaultValue="America/Sao_Paulo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                            <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                            <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                <CardDescription>Ações irreversíveis para sua conta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Desativar Conta</p>
                    <p className="text-muted-foreground text-sm">Sua conta será temporariamente desativada</p>
                  </div>
                  <Button variant="outline">Desativar</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Excluir Conta</p>
                    <p className="text-muted-foreground text-sm">Isso excluirá permanentemente todos os seus dados</p>
                  </div>
                  <Button variant="destructive">Excluir</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Escolha como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="font-medium text-sm">Email</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Resumo semanal</p>
                    <p className="text-muted-foreground text-xs">Receba um resumo semanal de atividades</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Novos comentários</p>
                    <p className="text-muted-foreground text-xs">Quando alguém comentar em seus posts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Menções</p>
                    <p className="text-muted-foreground text-xs">Quando você for mencionado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Atualizações de produto</p>
                    <p className="text-muted-foreground text-xs">Novidades e atualizações do sistema</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-4">
                <h4 className="font-medium text-sm">Push (Navegador)</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Notificações em tempo real</p>
                    <p className="text-muted-foreground text-xs">Receba alertas instantâneos no navegador</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Sons de notificação</p>
                    <p className="text-muted-foreground text-xs">Reproduzir som ao receber notificações</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Field>
                <FieldLabel>Tema</FieldLabel>
                <FieldDescription>Selecione o tema de sua preferência</FieldDescription>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted ${
                      theme === "light" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <Sun className="size-6" />
                    <span className="text-sm">Claro</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted ${
                      theme === "dark" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <Moon className="size-6" />
                    <span className="text-sm">Escuro</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted ${
                      theme === "system" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <Smartphone className="size-6" />
                    <span className="text-sm">Sistema</span>
                  </button>
                </div>
              </Field>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Animações reduzidas</p>
                  <p className="text-muted-foreground text-sm">Reduzir animações e transições</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Modo compacto</p>
                  <p className="text-muted-foreground text-sm">Reduzir espaçamentos para mais densidade</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Autenticação de Dois Fatores</CardTitle>
                <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                    <Lock className="size-6" />
                  </div>
                  <div>
                    <p className="font-medium">2FA não configurado</p>
                    <p className="text-muted-foreground text-sm">
                      Proteja sua conta com autenticação de dois fatores
                    </p>
                  </div>
                </div>
                <Button>Configurar</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessões Ativas</CardTitle>
                <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Globe className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Chrome em Windows</p>
                      <p className="text-muted-foreground text-xs">São Paulo, Brasil • Ativo agora</p>
                    </div>
                  </div>
                  <Badge>Atual</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Smartphone className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Safari em iPhone</p>
                      <p className="text-muted-foreground text-xs">São Paulo, Brasil • Há 2 dias</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Encerrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
