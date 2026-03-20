"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CellValue = "X" | "O" | null;
type WinnerResult = {
  winner: "X" | "O" | null;
  line: number[];
};

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board: CellValue[]): WinnerResult {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        line: [a, b, c],
      };
    }
  }

  return {
    winner: null,
    line: [],
  };
}

export default function TiktakPage() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const { winner, line } = useMemo(() => calculateWinner(board), [board]);
  const isDraw = board.every(Boolean) && !winner;

  const status = winner
    ? `Player ${winner} wins!`
    : isDraw
      ? "It is a draw."
      : `Player ${isXTurn ? "X" : "O"}, your move.`;

  function handleClick(index: number) {
    if (board[index] || winner) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = isXTurn ? "X" : "O";

    const result = calculateWinner(nextBoard);
    const nextDraw = nextBoard.every(Boolean) && !result.winner;

    setBoard(nextBoard);

    if (result.winner) {
      const winningPlayer = result.winner;
      setScore((current) => ({
        ...current,
        [winningPlayer]: current[winningPlayer] + 1,
      }));
      return;
    }

    if (nextDraw) {
      setScore((current) => ({
        ...current,
        draws: current.draws + 1,
      }));
      return;
    }

    setIsXTurn((current) => !current);
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  function resetAll() {
    resetBoard();
    setScore({ X: 0, O: 0, draws: 0 });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.3),_transparent_30%),linear-gradient(180deg,_#eff6ff_0%,_#dbeafe_45%,_#bfdbfe_100%)] px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
            >
              Back to Home
            </Link>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
                Tiktak Game Room
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Tic Tac Toe
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                Two players, one board, quick rematches. First to complete a line
                takes the round.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[1.75rem] border border-white/60 bg-white/70 p-2.5 shadow-lg shadow-blue-200/60 backdrop-blur sm:w-fit">
            {[
              ["Player X", score.X],
              ["Player O", score.O],
              ["Draws", score.draws],
            ].map(([label, value]) => (
              <div key={label} className="min-w-20 rounded-2xl bg-slate-950 px-3 py-2.5 text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {label}
                </p>
                <p className="mt-1.5 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <section className="rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-2xl shadow-blue-200/60 backdrop-blur sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                  Match Status
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">{status}</h2>
              </div>
              <button
                type="button"
                onClick={resetBoard}
                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                New Game
              </button>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-[22rem] grid-cols-3 gap-3 sm:max-w-[25rem] sm:gap-4">
              {board.map((cell, index) => {
                const isWinningCell = line.includes(index);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleClick(index)}
                    className={`aspect-square rounded-[1.4rem] border text-6xl font-black leading-none transition sm:text-7xl ${
                      isWinningCell
                        ? "border-emerald-400 bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-200"
                        : "border-slate-500 bg-slate-200 text-slate-900 hover:border-blue-400 hover:bg-blue-50"
                    } ${cell ? "cursor-default" : "cursor-pointer"}`}
                    aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ""}`}
                  >
                    {cell}
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/60 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/70">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              How It Works
            </p>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-300">
              <p>Player X always opens the round.</p>
              <p>Tap any empty square to place your mark.</p>
              <p>Make three in a row across, down, or diagonally to win.</p>
              <p>The scoreboard stays until you hit a full reset.</p>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition hover:border-cyan-300 hover:bg-cyan-400/20"
            >
              Reset Scoreboard
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
