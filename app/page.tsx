import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_35%),linear-gradient(160deg,_#0f172a_0%,_#111827_45%,_#1d4ed8_100%)] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-20 lg:px-16">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Tiktak Arena
          </p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Play a clean, fast round of Tic Tac Toe.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
            Jump straight into a head-to-head match, take turns on the same device,
            and start a fresh board any time.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/tiktak"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Start New Game
            </Link>
            <a
              href="#how-to-play"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-8 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Learn the Rules
            </a>
          </div>
        </div>

        <div className="grid w-full max-w-md grid-cols-3 gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
          {[
            "X",
            "O",
            "X",
            "",
            "O",
            "",
            "",
            "X",
            "O",
          ].map((cell, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-4xl font-black text-cyan-200 shadow-inner shadow-black/20 sm:text-5xl"
            >
              {cell}
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-to-play"
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 sm:px-10 lg:px-16"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Open the board", "Tap the start button to move into the game screen."],
            ["2", "Take turns", "Player X goes first, then Player O follows on the same board."],
            ["3", "Reset anytime", "Use the new game button to clear the board and play again."],
          ].map(([step, title, text]) => (
            <article
              key={step}
              className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur"
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">
                Step {step}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">{title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-200">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
