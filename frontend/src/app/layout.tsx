import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisionOS",
  description: "AI-powered business simulation platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 gap-4">
            <div className="text-2xl font-bold mb-8">VisionOS</div>
            <nav className="flex flex-col gap-2">
              <a href="/" className="hover:bg-gray-800 rounded px-3 py-2">Dashboard</a>
              <a href="/simulate" className="hover:bg-gray-800 rounded px-3 py-2">Simulate</a>
            </nav>
          </aside>
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Top nav */}
            <header className="h-16 border-b border-gray-200 flex items-center px-8 bg-white/80 backdrop-blur sticky top-0 z-10">
              <div className="text-lg font-semibold">AI Business Simulator</div>
            </header>
            <main className="flex-1 p-8 bg-gray-50">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
