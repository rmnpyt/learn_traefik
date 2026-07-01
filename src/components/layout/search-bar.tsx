"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search guide..."
          value={query}
          onChange={(e) => {
            handleSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full h-9 pl-9 pr-8 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {open && query.length >= 2 && (
        <div className="absolute top-full mt-1 w-full rounded-lg border border-border bg-card shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading && (
            <div className="p-3 text-sm text-muted text-center">Searching...</div>
          )}
          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-muted text-center">No results found</div>
          )}
          {results.map((r: any) => (
            <button
              key={r.id}
              className="w-full text-left px-4 py-3 hover:bg-surface border-b border-border last:border-0 cursor-pointer"
              onClick={() => {
                router.push(r.path);
                setOpen(false);
                setQuery("");
              }}
            >
              <div className="text-sm font-medium">{r.title}</div>
              <div className="text-xs text-muted mt-0.5 truncate">{r.section}</div>
            </button>
          ))}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
