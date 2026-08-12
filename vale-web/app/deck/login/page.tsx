import { Lock } from "lucide-react";
import { authenticateDeck } from "../actions";

const DM = "var(--font-dm-sans), -apple-system, sans-serif";
const SERIF = "var(--font-cormorant), Georgia, serif";
const GOLD = "#F5C541";

export default async function DeckLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div
      className="h-dvh w-full flex items-center justify-center px-6"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(79,52,196,0.35), transparent), #100B20",
      }}
    >
      <div className="w-full max-w-sm text-center">
        <h1 style={{ fontFamily: SERIF, fontWeight: 600, color: "#FFFFFF" }} className="text-[40px] leading-none mb-2">
          Vale<span style={{ color: GOLD }}>.</span>
        </h1>
        <p className="text-[13px] mb-8" style={{ fontFamily: DM, color: "rgba(255,255,255,0.55)" }}>
          This deck is private. Enter the password to continue.
        </p>

        <form action={authenticateDeck} className="space-y-3">
          <input type="hidden" name="next" value={next || "/deck"} />
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
            <input
              type="password"
              name="password"
              autoFocus
              required
              placeholder="Password"
              className="w-full rounded-xl pl-11 pr-4 py-3 text-[15px] outline-none focus:ring-2"
              style={{
                fontFamily: DM,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
              }}
            />
          </div>

          {error && (
            <p className="text-[13px] font-medium" style={{ fontFamily: DM, color: "#F97066" }}>
              Incorrect password — try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: DM, background: GOLD, color: "#100B20" }}
          >
            View the deck
          </button>
        </form>
      </div>
    </div>
  );
}
