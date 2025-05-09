"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosClient } from "@/components";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await AxiosClient.get("/auth/check");
        const data = res.data;
        if (!data.authenticated) {
          router.replace("/signin");
        } else {
          setLoading(false);
        }
      } catch {
        router.replace("/signin");
      }
    };

    check();
  }, [router]);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <ArrowPathIcon className="h-5 w-5 animate-spin" />
      </div>
    );

  return <>{children}</>;
}
