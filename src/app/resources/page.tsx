export default function ResourcesDirectoryPage() {
  return (
    <div className="space-y-6 text-zinc-100">
      <h1 className="text-2xl font-semibold text-white">Resources Directory</h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400">
        This directory is informational only. Inclusion does not constitute endorsement.
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-black text-zinc-400 text-left">
            <tr>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Focus</th>
              <th className="px-4 py-3">Website</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            <tr>
              <td className="px-4 py-3">United States</td>
              <td className="px-4 py-3">Example Equine Imports</td>
              <td className="px-4 py-3">Sport Horses</td>
              <td className="px-4 py-3">
                <a href="#" className="text-[#D4AF37] hover:underline">Website</a>
              </td>
              <td className="px-4 py-3">Commercial importer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
