import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Smart LIMS",
  description: "Your Smart Laboratory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-auth flex items-center justify-center min-h-screen">
      <div className="relative p-2 bg-white/20 rounded-lg backdrop-blur-lg">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </main>
  );
}
