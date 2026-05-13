import type { TeamMember } from "@/lib/data";

const card = {
  background: "white",
  border: "1px solid #E8E2D8",
  borderRadius: "12px",
};

export default function TeamGrid({ team }: { team: TeamMember[] }) {
  if (!team.length) return null;

  const sorted = [...team].sort((a, b) => a.order - b.order);

  return (
    <section style={card} className="p-6" aria-label="Meet the team">
      <h2 className="text-lg font-semibold mb-1" style={{ color: "#1C1F2A" }}>
        Meet the team
      </h2>
      <p className="text-sm mb-6" style={{ color: "#5F7080" }}>
        The people who will care for your family
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((member) => (
          <div
            key={member.id}
            className="group flex flex-col items-center text-center p-5 rounded-xl transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-[#5E8B73]/40"
            style={{
              border: "1px solid #E8E2D8",
              background: "#FAFAFA",
            }}
          >
            {/* Circular photo */}
            <div className="relative mb-4 shrink-0">
              <div
                className="w-[120px] h-[120px] rounded-full overflow-hidden transition-all duration-200 group-hover:ring-2 group-hover:ring-[#5E8B73]/50"
                style={{ border: "3px solid rgba(94,139,115,0.2)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {member.yearsExp !== undefined && (
                <div
                  className="absolute -bottom-1 -right-1 rounded-full font-semibold"
                  style={{
                    background: "#1C1F2A",
                    color: "white",
                    fontSize: "11px",
                    lineHeight: 1,
                    padding: "4px 7px",
                  }}
                  aria-label={`${member.yearsExp} years experience`}
                >
                  {member.yearsExp}y
                </div>
              )}
            </div>

            {/* Name & title */}
            <h3 className="font-semibold text-sm mb-0.5" style={{ color: "#5A4E44" }}>
              {member.name}
            </h3>
            <p
              className="text-sm mb-3 font-medium uppercase tracking-wide"
              style={{ color: "#5E8B73" }}
            >
              {member.title}
            </p>

            {/* Bio */}
            <p className="text-sm leading-relaxed" style={{ color: "#5F7080" }}>
              {member.bio}
            </p>

            {/* Experience footer */}
            {member.yearsExp !== undefined && (
              <div
                className="mt-4 pt-3 w-full text-sm"
                style={{
                  borderTop: "1px solid #E8E2D8",
                  color: "#5F7080",
                }}
              >
                <span style={{ color: "#1C1F2A", fontWeight: 600 }}>{member.yearsExp}</span> years in funeral care
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
