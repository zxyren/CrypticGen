import { Generator } from "@/components/pages/generator";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-10 lg:px-10">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
            CryptGen
          </span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:block">
            Privacy first
          </span>
        </header>

        {/* Hero */}
        <section className="mt-16 sm:mt-24 lg:mt-32">
          <h1 className="text-[clamp(2.75rem,12vw,9rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
            Create
            <br />
            Strong
            <br />
            Passwords
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl">
            Generated locally.
            <br className="sm:hidden" />{" "}
            <span className="text-foreground">Never stored.</span>{" "}
            <span className="text-foreground">Never sent.</span>
          </p>
        </section>

        {/* Generator */}
        <main className="mt-16 sm:mt-24 lg:mt-28">
          <Generator />
        </main>

        {/* Footer */}
        <footer className="mt-20 flex flex-col gap-2 border-t border-border pt-8 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Generated locally. Privacy first.
          </p>
          <p className="text-sm text-muted-foreground">
            Secured by{" "}
            <span className="font-mono text-foreground">
              crypto.getRandomValues()
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
