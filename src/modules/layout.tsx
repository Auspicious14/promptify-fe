import { useAuth } from "@/modules/auth/context";
import { useEffect } from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUsage } = useAuth();

  useEffect(() => {
    fetchUsage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      <header className="bg-white shadow-md sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Promptify
          </Link>
          <nav className="space-x-6">
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Pricing
            </Link>
            <Link
              href="/prompt"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Refiner
            </Link>
            <Link
              href="/signin"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-8 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Promptify. All rights reserved.
      </footer>
    </div>
  );
}
