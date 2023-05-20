import classNames from "classnames";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TotalGPT | Your all-around AI assistant",
  description:
    "A GPT-powered web app featuring pre-made assistant roles, providing tailored support for specific user needs in real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={classNames(
            inter.className,
            "bg-slate-100 h-screen w-screen max-w-full flex justify-center"
          )}
        >
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
