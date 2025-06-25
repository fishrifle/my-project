'use client'
import { Suspense } from "react";
import CardClient from "./CardClient";

export default function CardPage() {
  return (
    <Suspense
      fallback={<div className="p-6 text-center">Loading card page…</div>}
    >
      <CardClient />
    </Suspense>
  );
}
