import { Editor } from "./editor";
import { version } from "cubic-bezier-input/package.json";

function App() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-between">
      <header className="mx-auto max-w-96 py-12 grid gap-6 text-center">
        <h1 className="text-lg font-semibold -tracking-wide">
          Cubic Bezier Input
        </h1>
        <p className="text-sm underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-700 transition-transform active:scale-95">
          View{" "}
          <a href="https://github.com/501A-gh/cubic-bezier-input">
            Documentation
          </a>
        </p>
      </header>
      <Editor />
      <footer className="mx-auto max-w-96 py-12 text-center grid gap-6">
        <p>Version {version}</p>
        <p>
          Designed by{" "}
          <a
            href="https://501A.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            501A
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
