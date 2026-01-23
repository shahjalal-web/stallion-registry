export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Leading Sires Registry — Reference use
          only
        </p>
        <p className="text-xs text-zinc-500">
          Phase-1 frontend UI (mock data)
        </p>
      </div>
    </footer>
  );
}
