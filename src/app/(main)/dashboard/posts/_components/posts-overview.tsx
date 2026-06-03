"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    posts: 45,
    engagement: 78,
    color: "bg-pink-500",
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    posts: 120,
    engagement: 65,
    color: "bg-sky-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    posts: 32,
    engagement: 52,
    color: "bg-blue-600",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    posts: 18,
    engagement: 89,
    color: "bg-blue-700",
  },
];

export function PostsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão por Plataforma</CardTitle>
        <CardDescription>Performance de posts por rede social</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex size-8 items-center justify-center rounded-lg ${platform.color} text-white`}>
                  <platform.icon className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{platform.name}</p>
                  <p className="text-muted-foreground text-xs">{platform.posts} posts</p>
                </div>
              </div>
              <span className="font-medium text-sm">{platform.engagement}%</span>
            </div>
            <Progress value={platform.engagement} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
