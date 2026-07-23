type LegalPageProps = {
  title: string;
  children: React.ReactNode;
  notice?: React.ReactNode;
};

export default function LegalPage({ title, children, notice }: LegalPageProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-heading font-bold uppercase text-3xl text-ink mb-6">{title}</h1>
        {notice && (
          <div className="mb-8 rounded-xl2 border border-dashed border-gold bg-cream px-5 py-4 text-sm text-gold-deep">
            {notice}
          </div>
        )}
        <div className="prose prose-sm text-ink-soft">{children}</div>
      </div>
    </section>
  );
}
