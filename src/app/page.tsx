"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/de/");
  }, []);

  return (
    <main className="p-6 text-center">
      <Link href="/de/" className="text-blue-700 underline">
        Weiter zur Startseite
      </Link>
    </main>
  );
}
