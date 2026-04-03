"use client";

import { useTransition } from "react";

export function DisableDraftMode() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="fixed bottom-4 right-4 z-50 rounded bg-black px-4 py-2 text-sm text-white shadow-lg"
      onClick={() =>
        startTransition(async () => {
          await fetch("/api/draft-mode/disable");
          window.location.reload();
        })
      }
      disabled={isPending}
    >
      {isPending ? "Disabling…" : "Disable Draft Mode"}
    </button>
  );
}
