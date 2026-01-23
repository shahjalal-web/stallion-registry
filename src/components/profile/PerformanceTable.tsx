import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function PerformanceTable({ stallion }: { stallion: Stallion }) {
  const rows = stallion.performanceRecords || [];

  return (
    <Section
      title="Performance Record"
      subtitle="Where possible, records should be verified through official results."
    >
      {rows.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          No verified performance records.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          {/* ✅ responsive wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse">
              <thead className="bg-zinc-50">
                <tr className="text-left text-xs font-medium text-zinc-600">
                  <th className="whitespace-nowrap px-4 py-3">Year</th>
                  <th className="whitespace-nowrap px-4 py-3">
                    Association / Event
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">
                    Discipline / Class
                  </th>
                  <th className="whitespace-nowrap px-4 py-3">Result</th>

                  {/* ✅ hide reference on very small screens */}
                  <th className="hidden whitespace-nowrap px-4 py-3 sm:table-cell">
                    Reference
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-zinc-200 text-sm text-zinc-800"
                  >
                    <td className="whitespace-nowrap px-4 py-3 align-top">
                      {r.year}
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="min-w-[220px]">{r.event}</div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="min-w-[220px]">{r.discipline}</div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="min-w-[180px]">{r.result}</div>
                    </td>

                    {/* ✅ hide reference on very small screens */}
                    <td className="hidden px-4 py-3 align-top sm:table-cell">
                      {r.reference?.href ? (
                        <a
                          href={r.reference.href}
                          target="_blank"
                          className="whitespace-nowrap text-zinc-800 hover:underline"
                        >
                          {r.reference.label || "Link"}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ small helper text for mobile scroll */}
          <div className="border-t border-zinc-200 bg-white p-3 text-xs text-zinc-500 sm:hidden">
            Swipe horizontally to view full table.
          </div>
        </div>
      )}
    </Section>
  );
}
