import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 text-sm border-t border-[#6b5736]">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">

        <div>
          <p className="text-white font-semibold">Leading Sires Registry</p>
          <p>Performance stallion reference platform</p>
          <p className="mt-3 text-zinc-500">
            Quarter Horses | Paints | Appaloosas <br />
            Australia | New Zealand | Europe | Canada | North & South America
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-white font-medium">Navigation</p>

          <Link href="/stallions" className="block hover:text-[#b08d57]">Stallion Directory</Link>

          <Link href="/" className="block hover:text-[#b08d57]">Owners</Link>

          <Link href="/resources" className="block hover:text-[#b08d57]">Breeding Service Providers</Link>

          <Link href="/pricing" className="block hover:text-[#b08d57]">Pricing</Link>

          <Link href="/submit-stallion" className="block hover:text-[#b08d57]">Submit a Listing</Link>

          <Link href="/about" className="block hover:text-[#b08d57]">About</Link>

          <Link href="/" className="block hover:text-[#b08d57]">Contact</Link>
        </div>

        <div>
          <p className="text-white font-medium">Contact</p>
          <a
            href="mailto:info@leadingsiresregistry.com"
            className="hover:text-[#b08d57]"
          >
            info@leadingsiresregistry.com
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-800 text-center text-xs py-4 text-zinc-500">
        © {new Date().getFullYear()} Leading Sires Registry | All rights reserved | Terms of Use | Privacy Policy | Records may include active, historical, or deceased stallions for pedigree and reference purposes.
      </div>
    </footer>
  );
}
