"use client";
import { useEffect } from "react";

export default function ScrollUpOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
