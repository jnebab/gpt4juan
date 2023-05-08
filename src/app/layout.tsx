import classNames from "classnames";
import "./globals.css";
import { Inter } from "next/font/google";

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
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "bg-slate-100 h-screen w-screen max-w-full"
        )}
      >
        <main className="w-full h-full min-h-screen overflow-auto">
          <header className="z-20 shadow-xs flex h-16 items-center justify-between bg-white text-dark w-screen max-w-full sticky top-0">
            <div className="px-5">
              <h3 className="font-bold text-xl text-neutral-800">TotalGPT4</h3>
              <p className="text-xs text-neutral-800">
                Your all-around AI assistant
              </p>
            </div>
          </header>
          <div className="flex flex-col max-w-[1100px] min-w-content mx-auto bg-soft pb-16 min-h-fit overflow-auto">
            <div className="h-5" />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
