"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ClientToastBridge() {
  useEffect(() => {
    console.log("document.cookie:", document.cookie);

    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith("flash="));

    console.log("raw flash cookie:", raw);

    if (!raw) return;

    try {
      const value = decodeURIComponent(raw.split("=")[1]);
      const data = JSON.parse(value);

      console.log("flash data:", data);

      if (data.message) {
        if (data.type === "success") {
          toast.success(data.message);
        } else if (data.type === "error") {
          toast.error(data.message);
        } else {
          toast(data.message);
        }
      }

      document.cookie = "flash=; Max-Age=0; path=/";
    } catch {
      console.error("Invalid flash cookie");
    }
  }, []);

  return null;
}
