"use client";

import { useEffect } from "react";
import { useAuth } from "@/modules/auth/context";

export const UsageInitializer = () => {
  const { fetchUsage } = useAuth();

  useEffect(() => {
    fetchUsage();
  }, []);

  return null;
};
