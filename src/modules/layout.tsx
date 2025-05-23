import { useAuth } from "@/modules/auth/context";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUsage } = useAuth();

  useEffect(() => {
    fetchUsage();
  }, []);

  return <div>{children}</div>;
}
