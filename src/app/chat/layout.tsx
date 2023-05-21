import { UserButton } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header className="z-20 px-5 shadow-xs flex h-16 items-center justify-between bg-white text-dark w-screen max-w-full sticky top-0">
        <div className="px-5">
          <h3 className="font-bold text-xl text-neutral-800">TotalGPT4</h3>
          <p className="text-xs text-neutral-800">
            Your all-around AI assistant
          </p>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <div className="flex flex-col max-w-[1100px] min-w-content mx-auto bg-soft pb-16 min-h-fit overflow-auto">
        <div className="h-5" />
        {children}
      </div>
    </main>
  );
}
