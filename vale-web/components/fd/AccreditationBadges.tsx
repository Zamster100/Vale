import { Award, UserCheck, BookOpen, Building2 } from "lucide-react";
import type { FuneralDirector } from "@/lib/data";

const BODIES = [
  {
    key: "nafdVerified" as const,
    abbr: "NAFD",
    name: "National Association of Funeral Directors",
    Icon: Award,
  },
  {
    key: "saifVerified" as const,
    abbr: "SAIF",
    name: "Society of Allied & Independent Funeral Directors",
    Icon: UserCheck,
  },
  {
    key: "bifdVerified" as const,
    abbr: "BIFD",
    name: "British Institute of Funeral Directors",
    Icon: BookOpen,
  },
  {
    key: "iccmVerified" as const,
    abbr: "ICCM",
    name: "Institute of Cemetery & Crematorium Management",
    Icon: Building2,
  },
] as const;

type Props = {
  fd: Pick<FuneralDirector, "nafdVerified" | "saifVerified" | "bifdVerified" | "iccmVerified">;
};

export default function AccreditationBadges({ fd }: Props) {
  const visible = BODIES.filter((b) => fd[b.key]);
  if (!visible.length) return null;

  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "#5A4E44" }}
      >
        Professional memberships
      </p>
      <div className="flex flex-wrap gap-4" role="list" aria-label="Professional accreditations">
        {visible.map(({ abbr, name, Icon }) => (
          <div
            key={abbr}
            className="flex flex-col items-center gap-1.5"
            role="listitem"
            title={name}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(212,165,116,0.1)",
                border: "1.5px solid rgba(212,165,116,0.45)",
              }}
              aria-hidden="true"
            >
              <Icon className="w-5 h-5" style={{ color: "#C4975A" }} />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-wide text-center leading-tight"
              style={{ color: "#1C1F2A" }}
              aria-label={name}
            >
              {abbr}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
