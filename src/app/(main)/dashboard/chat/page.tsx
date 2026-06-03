"use client";

import { useCallback, useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import {
  Suggestion,
  SuggestionButton,
} from "@/components/ai-elements/suggestion";
import type { UIMessage } from "ai";

const initialMessages: UIMessage[] = [
  {
    id: "1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Olá! Sou seu assistente de IA. Como posso ajudá-lo hoje? Posso auxiliar com criação de conteúdo, análise de dados, responder perguntas ou ajudar com tarefas do dia a dia.",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Preciso de ajuda para criar um post para o Instagram sobre lançamento de produto.",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Claro! Vou ajudá-lo a criar um post envolvente para o lançamento do seu produto. Para começar, preciso de algumas informações:\n\n1. Qual é o produto que será lançado?\n2. Quais são os principais benefícios ou diferenciais?\n3. Qual é o tom que você deseja (formal, descontraído, luxuoso)?\n4. Há alguma promoção ou call-to-action específico?",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "4",
    role: "user",
    parts: [
      {
        type: "text",
        text: "É um novo software de gestão para pequenas empresas. Os diferenciais são: fácil de usar, preço acessível e suporte 24h. Tom descontraído, queremos oferecer 30 dias grátis.",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: "5",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Excelente! Aqui está uma sugestão de post para o Instagram:\n\n---\n\n🚀 **Chegou o que sua empresa precisava!**\n\nApresentamos o [Nome do Software] - a solução completa para gestão da sua pequena empresa!\n\n✨ **Por que você vai amar:**\n• Interface super intuitiva - sem complicação!\n• Cabe no seu bolso 💰\n• Suporte 24h - sempre que precisar\n\n🎁 **OFERTA ESPECIAL DE LANÇAMENTO:**\nExperimente GRÁTIS por 30 dias!\n\nClique no link da bio e transforme a gestão do seu negócio! 👆\n\n#GestãoEmpresarial #PequenosNegócios #Software #Empreendedorismo #Lançamento\n\n---\n\nQuer que eu faça alguma modificação?",
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 1),
  },
];

const suggestions = [
  "Crie um calendário de posts para a semana",
  "Analise o engajamento dos meus posts",
  "Sugira hashtags para meu nicho",
  "Escreva uma bio criativa para Instagram",
];

export default function Page() {
  const [messages, setMessages] = useState<UIMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(
    async (message: PromptInputMessage) => {
      if (!message.text.trim()) return;

      const newMessage: UIMessage = {
        id: String(Date.now()),
        role: "user",
        parts: [{ type: "text", text: message.text }],
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: UIMessage = {
          id: String(Date.now() + 1),
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Entendi sua solicitação! Estou processando as informações e em breve trarei uma resposta completa para você.",
            },
          ],
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    },
    []
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
  }, []);

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
          <CardContent className="flex flex-1 flex-col p-0">
            <Conversation className="flex-1">
              <ConversationContent className="gap-4 p-4">
                {messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <MessageResponse key={`${message.id}-${i}`}>
                              {part.text}
                            </MessageResponse>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                ))}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t p-4">
              <PromptInput onSubmit={handleSubmit}>
                <PromptInputTextarea
                  placeholder="Digite sua mensagem..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <PromptInputActions>
                  <PromptInputAction type="submit" tooltip="Enviar mensagem" />
                </PromptInputActions>
              </PromptInput>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sugestões Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <Suggestion className="flex flex-col gap-2">
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    className="h-auto justify-start whitespace-normal py-2 text-left text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionButton>
                ))}
              </Suggestion>
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
