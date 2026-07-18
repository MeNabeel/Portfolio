import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthButton } from "@/components/layout/AuthButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nabeel Ijaz | Software Engineer | MERN Stack Developer",
  description: "Final Year Software Engineering student specializing in MERN Stack Development, AI integrations, modern web applications, and cloud technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <header className="fixed top-0 w-full z-50 glass-panel">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Nabeel<span className="text-accent">Ijaz</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <Link href="/about" className="hover:text-accent transition-colors">About</Link>
              <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
              <AuthButton />
              <div className="md:hidden text-white">
                {/* Mobile Menu Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </div>
          </div>
        </header>
        <main className="pt-24 pb-16 min-h-screen container mx-auto px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
