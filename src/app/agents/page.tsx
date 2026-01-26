import { agents } from "@/data/agents";

export default function AgentsDirectoryPage() {
  return (
    <div className="space-y-6 text-zinc-100">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-white">
          Agents & Importers / Exporters Directory
        </h1>
        <p className="text-sm text-zinc-400">
          Reference listing of breeding agents, logistics providers, and
          import/export services.
        </p>
      </header>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-700/40 bg-black p-4 text-xs text-zinc-400">
        Listings are provided for reference only. Inclusion does not constitute
        endorsement, verification, or recommendation by the Registry.
      </div>

      {/* Directory Table */}
      <div className="overflow-hidden rounded-lg border border-amber-700/40">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="bg-black">
              <tr className="border-b border-amber-700/40 text-left text-xs font-medium text-amber-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service Type</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Specialisation</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-black">
              {agents.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-amber-700/20 text-sm text-zinc-200"
                >
                  <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3">{a.serviceType}</td>
                  <td className="px-4 py-3">{a.region}</td>
                  <td className="px-4 py-3">{a.specialisation}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1 text-xs">
                      {a.website && (
                        <a
                          href={a.website}
                          target="_blank"
                          className="text-amber-400 hover:underline"
                        >
                          Website
                        </a>
                      )}
                      {a.email && <div>{a.email}</div>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    {a.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
