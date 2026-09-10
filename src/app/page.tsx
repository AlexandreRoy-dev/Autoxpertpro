"use client";

import { withBase } from "@/lib/paths";
import { useEffect } from "react";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(withBase("/fr/"));
  }, []);

  return (
    <p style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      AutoXpert — redirection vers /fr/
    </p>
  );
}
