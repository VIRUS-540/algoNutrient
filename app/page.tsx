import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#244B38] font-sans selection:bg-[#C69A55] selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#A8B99A]/30 bg-[#F3EEDF]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#244B38] text-[#F3EEDF] font-bold tracking-tight">
              aN
            </div>
            <span className="text-xl font-bold tracking-tight text-[#244B38]">
              algo<span className="text-[#52765A]">Nutrient</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#52765A] md:flex">
            <Link href="/login" className="transition-colors hover:text-[#244B38]">
              How It Works
            </Link>
            <Link href="/login" className="transition-colors hover:text-[#244B38]">
              Precision Engine
            </Link>
            <Link href="/login" className="transition-colors hover:text-[#244B38]">
              Results
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-[#244B38] hover:text-[#52765A] sm:inline-block px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-[#244B38] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#52765A]"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C69A55]/40 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#244B38] shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#C69A55]" />
                Data-Driven Biological Nutrition
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#244B38] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
                Precision nutrition engineered for your{" "}
                <span className="text-[#52765A]">unique biology.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-[#52765A]">
                Stop guessing with generic meal plans. algoNutrient synthesizes your
                biomarkers, metabolic rate, and daily routines to calculate exact
                macro and micronutrient protocols.
              </p>

              <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#244B38] px-7 text-base font-medium text-white shadow-sm transition-all hover:bg-[#52765A]"
                >
                  Build Your Protocol
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#52765A]/40 bg-white/60 px-7 text-base font-medium text-[#244B38] transition-colors hover:bg-white"
                >
                  Explore the Algorithm
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-[#52765A]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#244B38]">40+</span> Biomarkers Tracked
                </div>
                <span className="text-[#A8B99A]">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#244B38]">100%</span> Whole-Food First
                </div>
              </div>
            </div>

            {/* Hero UI Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#A8B99A]/40 bg-white p-6 shadow-xl shadow-[#244B38]/5 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#F3EEDF] pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">
                      Daily Calibration
                    </p>
                    <h2 className="text-lg font-bold text-[#244B38]">
                      Metabolic Target #042
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#C69A55]/15 px-3 py-1 text-xs font-semibold text-[#C69A55]">
                    Optimal Sync
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  <div>
                    <div className="mb-1.5 flex justify-between text-sm font-medium">
                      <span className="text-[#244B38]">Bioavailable Protein</span>
                      <span className="text-[#52765A]">148g / 150g</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F3EEDF]">
                      <div className="h-full w-[96%] rounded-full bg-[#244B38]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex justify-between text-sm font-medium">
                      <span className="text-[#244B38]">Complex Glycogen</span>
                      <span className="text-[#52765A]">210g / 230g</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F3EEDF]">
                      <div className="h-full w-[88%] rounded-full bg-[#52765A]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex justify-between text-sm font-medium">
                      <span className="text-[#244B38]">Essential Lipids &amp; Omega-3</span>
                      <span className="text-[#52765A]">68g / 70g</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F3EEDF]">
                      <div className="h-full w-[94%] rounded-full bg-[#C69A55]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F3EEDF] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C69A55] text-xs font-bold text-white">
                      !
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#244B38]">
                        Micronutrient Adjustment
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#52765A]">
                        Magnesium glycinate &amp; potassium intake increased by 12% based
                        on today&apos;s high-output training load.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C69A55]">
              Core Capabilities
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#244B38]">
              Nutrition designed with algorithmic clarity.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Biomarker Synthesis",
                description:
                  "Input lab panels, wearable recovery metrics, and dietary preferences to establish your baseline metabolic profile.",
              },
              {
                step: "02",
                title: "Dynamic Meal Architecture",
                description:
                  "Receive whole-food recipes and portion calculations that adapt automatically to rest days, training blocks, and travel.",
              },
              {
                step: "03",
                title: "Micronutrient Density",
                description:
                  "Go beyond simple calorie counting with automated tracking for 28 essential vitamins, minerals, and phytonutrients.",
              },
            ].map((item) => (
              <Link
                href="/login"
                key={item.step}
                className="flex flex-col justify-between rounded-2xl border border-[#A8B99A]/35 bg-white p-7 shadow-xs transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <span className="inline-block rounded-lg bg-[#F3EEDF] px-3 py-1 text-xs font-bold text-[#C69A55]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#244B38]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52765A]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 h-1 w-12 rounded-full bg-[#A8B99A]/60" />
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-3xl bg-[#244B38] px-8 py-14 text-center text-white sm:px-16">
            <span className="inline-block rounded-full bg-[#C69A55]/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#C69A55]">
              Start Today
            </span>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#F3EEDF] sm:text-4xl">
              Ready to calibrate your daily nutrition?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-[#A8B99A]">
              Complete our 3-minute physiological assessment and generate your initial
              nutrient blueprint immediately.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/login"
                className="rounded-full bg-[#C69A55] px-8 py-3.5 text-base font-semibold text-[#244B38] shadow-md transition-opacity hover:opacity-95"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#A8B99A]/30 bg-[#F3EEDF] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[#52765A] sm:flex-row">
          <Link href="/login" className="font-semibold text-[#244B38]">
            algoNutrient
          </Link>
          <p>© {new Date().getFullYear()} algoNutrient Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-[#244B38]">
              Privacy
            </Link>
            <Link href="/login" className="hover:text-[#244B38]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}