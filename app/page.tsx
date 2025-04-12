import { Editor } from "./Editor";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-zinc-100 dark:bg-zinc-950">
      <main className="min-h-screen flex items-center justify-center flex-col">
        <header className="sm:fixed top-0 left-0 w-full text-center space-y-2 py-12">
          <h1 className="text-lg font-semibold -tracking-wide">
            Cubic Bezier Input
          </h1>
          <p className="text-xs underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-700">
            View{" "}
            <a href="https://github.com/501A-gh/cubic-bezier-input">
              Documentation
            </a>
          </p>
        </header>
        <Editor />
      </main>
    </div>
  );
}
