"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrackSelector } from "@/components/layout/track-selector";
import { tracks } from "@/lib/config/nav";
import { ArrowRight, BookOpen, Play, Search, Server } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: BookOpen, title: "15 Chapters", description: "From basics to production deployments", href: "/learn/introduction" },
  { icon: Play, title: "Interactive Playground", description: "Live config editor & architecture viz", href: "/playground/config-editor" },
  { icon: Search, title: "Full-Text Search", description: "Find any topic instantly", href: "/learn/introduction" },
  { icon: Server, title: "Compose Generator", description: "Generate Docker Compose with one click", href: "/playground/compose-generator" },
];

export default function HomePage() {
  const [activeTrack, setActiveTrack] = useState<string>("beginner");

  return (
    <>
      <div className="space-y-12">
        <section className="text-center space-y-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Learn{" "}
            <span className="text-primary">Traefik</span>
            {" "}Interactively
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A comprehensive interactive guide covering everything from basic reverse proxy setup
            to advanced API gateway and enterprise patterns for Traefik v3.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Link href="/learn/introduction">
              <Button size="lg">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground/config-editor">
              <Button variant="outline" size="lg">
                Try Playground
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Choose Your Learning Track</h2>
          <TrackSelector active={activeTrack as any} onSelect={setActiveTrack as any} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.find((t) => t.id === activeTrack)?.chapters.slice(0, 6).map((ch) => (
              <Link key={ch} href={`/learn`}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-4">
                    <p className="text-sm font-medium">Chapter {ch}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <Link key={f.title} href={f.href}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{f.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        <section className="rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Ready for Production?</h2>
          <p className="text-muted mb-4 max-w-lg mx-auto">
            Learn how to deploy Traefik with high availability, monitoring, and security hardening.
          </p>
          <Link href="/learn/production">
            <Button variant="accent" size="lg">
              Production Guide <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
}
