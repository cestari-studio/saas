"use client";

import * as React from "react";

import { Bot, Paperclip, Send, Sparkles, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Olá! Sou seu assistente de IA. Como posso ajudá-lo hoje? Posso auxiliar com criação de conteúdo, análise de dados, responder perguntas ou ajudar com tarefas do dia a dia.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 2,
    role: "user",
    content: "Preciso de ajuda para criar um post para o Instagram sobre lançamento de produto.",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Claro! Vou ajudá-lo a criar um post envolvente para o lançamento do seu produto. Para começar, preciso de algumas informações:\n\n1. Qual é o produto que será lançado?\n2. Quais são os principais benefícios ou diferenciais?\n3. Qual é o tom que você deseja (formal, descontraído, luxuoso)?\n4. Há alguma promoção ou call-to-action específico?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: 4,
    role: "user",
    content:
      "É um novo software de gestão para pequenas empresas. Os diferenciais são: fácil de usar, preço acessível e suporte 24h. Tom descontraído, queremos oferecer 30 dias grátis.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 5,
    role: "assistant",
    content:
      "Excelente! Aqui está uma sugestão de post para o Instagram:\n\n---\n\n🚀 **Chegou o que sua empresa precisava!**\n\nApresentamos o [Nome do Software] - a solução completa para gestão da sua pequena empresa!\n\n✨ **Por que você vai amar:**\n• Interface super intuitiva - sem complicação!\n• Cabe no seu bolso 💰\n• Suporte 24h - sempre que precisar\n\n🎁 **OFERTA ESPECIAL DE LANÇAMENTO:**\nExperimente GRÁTIS por 30 dias!\n\nClique no link da bio e transforme a gestão do seu negócio! 👆\n\n#GestãoEmpresarial #PequenosNegócios #Software #Empreendedorismo #Lançamento\n\n---\n\nQuer que eu faça alguma modificação?",
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
  },
];

const suggestions = [
  "Crie um calendário de posts para a semana",
  "Analise o engajamento dos meus posts",
  "Sugira hashtags para meu nicho",
  "Escreva uma bio criativa para Instagram",
];

export default function Page() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "Entendi sua solicitação! Estou processando as informações e em breve trarei uma resposta completa para você.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="@container/main flex h-[calc(100vh-8rem)] flex-col gap-4 md:gap-6">
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-4 md:gap-6">
        {/* Chat Area */}
        <Card className="flex flex-col lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </div>
              <div>
                <CardTitle>Assistente IA</CardTitle>
                <CardDescription>Seu assistente para criação de conteúdo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
                  >
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback
                        className={cn(
                          message.role === "assistant" && "bg-primary text-primary-foreground"
                        )}
                      >
                        {message.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.role === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip />
                </Button>
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[44px] resize-none"
                  rows={1}
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sugestões Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-start whitespace-normal py-2 text-left text-sm"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Capacidades</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-muted-foreground text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Criação de conteúdo para redes sociais</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Análise de métricas e engajamento</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Sugestões de hashtags e horários</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Planejamento de campanhas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
