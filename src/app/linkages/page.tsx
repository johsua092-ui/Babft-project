"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";
import { LINKAGE_TYPES } from "@/data/linkages";

export default function LinkagesPage() {
  const [search, setSearch] = useState("");

  const filtered = LINKAGE_TYPES.filter(
    (l) => (l.name + " " + l.desc).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/menu"
            className="back-btn inline-flex shrink-0 items-center gap-2"
            onClick={() => setSearch("")}
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#8b949e" }}
            />
            <input
              type="text"
              placeholder="Cari mekanisme..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input w-full pl-9 pr-9"
              style={{ borderColor: search ? "#818cf8" : undefined }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#8b949e" }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold animate-fade-in" style={{ color: "#e6edf3" }}>
          Linkages Mechanic
        </h1>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 animate-fade-in">
            <Search size={40} style={{ color: "#2d3f55" }} />
            <p style={{ color: "#8b949e" }}>Tidak ada mekanisme yang cocok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((linkage, i) => (
              <button
                key={linkage.id}
                type="button"
                onClick={() => alert("Coming Soon!")}
                className={`gate-card flex items-start gap-3 p-4 text-left animate-fade-in-d${(i % 8) + 1}`}
              >
                <span
                  className="mt-1 size-3 shrink-0 rounded-full"
                  style={{ background: linkage.color, boxShadow: `0 0 10px ${linkage.color}66` }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#e6edf3" }}>
                    {linkage.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: "#8b949e" }}>
                    {linkage.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
