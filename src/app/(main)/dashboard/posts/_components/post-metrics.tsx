import { Eye, Heart, MessageCircle, Share2, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PostMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Eye className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total de Visualizações</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">125.4K</div>
            <Badge>
              <TrendingUp className="size-3" />
              +18.2%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Últimos 30 dias</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Heart className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total de Curtidas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">8.2K</div>
            <Badge variant="destructive">
              <TrendingDown className="size-3" />
              -5.4%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Engajamento em queda</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <MessageCircle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Comentários</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">2.1K</div>
            <Badge>
              <TrendingUp className="size-3" />
              +32.1%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Interações crescendo</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Share2 className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Compartilhamentos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">945</div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.8%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Alcance expandindo</p>
        </CardContent>
      </Card>
    </div>
  );
}
