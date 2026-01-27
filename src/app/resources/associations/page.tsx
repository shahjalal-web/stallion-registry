export default function AssociationsPage() {
  return (
    <div className="space-y-6 text-zinc-100">
      <h1 className="text-2xl font-semibold text-white">Associations & Registries</h1>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-black text-zinc-400 text-left">
            <tr>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Association Name</th>
              <th className="px-4 py-3">Breed / Focus</th>
              <th className="px-4 py-3">Website</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            <tr>
              <td className="px-4 py-3">USA</td>
              <td className="px-4 py-3">AQHA</td>
              <td className="px-4 py-3">Quarter Horse</td>
              <td className="px-4 py-3">
                <a href="#" className="text-[#D4AF37] hover:underline">Website</a>
              </td>
              <td className="px-4 py-3">Primary registry</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
