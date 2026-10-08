type LegalPageProps = {
  title: string;
  children: React.ReactNode;
  notice?: React.ReactNode;
};

export default function LegalPage({ title, children, notice }: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#C70C18] bg-[radial-gradient(ellipse_60%_90%_at_80%_40%,#E3151F_0%,rgba(199,12,24,0)_70%)] text-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-14">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/45 px-4 py-2 font-heading text-[0.7rem] uppercase tracking-[3px] md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD27A]" aria-hidden="true" />
            Información legal
          </span>
          <h1 className="mt-5 font-heading text-[2.6rem] font-bold uppercase leading-[0.92] md:text-6xl">{title}</h1>
        </div>
      </section>
      <section className="bg-[#FBF5EC] pb-20">
        <div className="mx-auto -mt-8 max-w-3xl px-5 sm:px-8">
          <div className="rounded-[26px] border border-line bg-white p-6 shadow-card md:p-10">
            {notice && (
              <div className="mb-8 rounded-2xl border border-dashed border-gold bg-cream px-5 py-4 text-sm text-gold-deep">
                {notice}
              </div>
            )}
            <div className="prose prose-sm max-w-none text-ink-soft">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
