export default function Section(props: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="mb-4 space-y-1">
        <h2 className="text-sm font-semibold">{props.title}</h2>
        {props.subtitle ? (
          <p className="text-xs text-zinc-500">{props.subtitle}</p>
        ) : null}
      </div>
      {props.children}
    </section>
  );
}
