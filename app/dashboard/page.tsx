"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NutrientChatbot from "@/components/NutrientChatbot";
import GoAltProSection from "@/components/GoAltProSection";
import NutritionCalculator from "@/components/nutrition/NutritionCalculator";

interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  weight: string;
  phone: number;
  bloodGroup: string;
  genotype: string;
  fitnessGoal: string;
  allergies: string;
  healthConditions: string;
}

type TabOption = "profile" | "diet-plan" | "health-tips" | "go-altpro" | "nutrition";

const GOAL_LABELS: Record<string, string> = {
  "fat-loss": "Sustainable Fat Loss & Body Recomposition",
  "muscle-gain": "Lean Muscle Hypertrophy",
  endurance: "Athletic Performance & Endurance",
  maintenance: "Metabolic Health & Weight Maintenance",
  "clinical-management": "Condition-Specific Nutritional Support",
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabOption>("profile");
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("algoNutrientUser");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      router.push("/login");
    }

    // Check if redirected from another page (like Tutorials) requesting a specific tab
    const preferredTab = localStorage.getItem("preferredDashboardTab") as TabOption | null;
    if (preferredTab) {
      setActiveTab(preferredTab);
      localStorage.removeItem("preferredDashboardTab");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("algoNutrientUser");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3EEDF] text-[#244B38]">
        <p className="text-sm font-semibold tracking-wide">
          Loading your biological profile...
        </p>
      </div>
    );
  }

  // Dynamic macronutrient calculations based on user weight & goal
  const weightNum = parseFloat(user.weight) || 70;
  const proteinTarget =
    user.fitnessGoal === "muscle-gain"
      ? Math.round(weightNum * 2.1)
      : Math.round(weightNum * 1.6);
  const calorieTarget =
    user.fitnessGoal === "fat-loss"
      ? Math.round(weightNum * 26)
      : user.fitnessGoal === "muscle-gain"
      ? Math.round(weightNum * 34)
      : Math.round(weightNum * 30);
  const carbsTarget = Math.round((calorieTarget * 0.45) / 4);
  const fatsTarget = Math.round((calorieTarget * 0.28) / 9);

  const isSickleTraitOrCondition = ["AS", "AC", "SS", "SC"].includes(
    user.genotype
  );

  // Check if user has lactose or dairy allergies
  const isLactoseIntolerant =
    user.allergies?.toLowerCase().includes("lactose") ||
    user.allergies?.toLowerCase().includes("dairy") ||
    user.allergies?.toLowerCase().includes("milk");

  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#244B38] font-sans selection:bg-[#C69A55] selection:text-white">
      {/* Updated Dashboard Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-[#A8B99A]/30 bg-[#F3EEDF]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#244B38] font-bold tracking-tight text-[#F3EEDF]">
              aN
            </div>
            <span className="text-xl font-bold tracking-tight text-[#244B38]">
              algo<span className="text-[#52765A]">Nutrient</span>
            </span>
          </Link>

          {/* Navigation Tabs: Profile, Diet Plan, Fitness & Health Tips, Go AltPro, AI Calculator */}
          <nav className="flex items-center gap-1 rounded-full border border-[#A8B99A]/40 bg-white/80 p-1 shadow-xs">
            <button
              onClick={() => setActiveTab("profile")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#244B38] text-white shadow-xs"
                  : "text-[#52765A] hover:text-[#244B38]"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("diet-plan")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "diet-plan"
                  ? "bg-[#244B38] text-white shadow-xs"
                  : "text-[#52765A] hover:text-[#244B38]"
              }`}
            >
              Diet Plan
            </button>
            <button
              onClick={() => setActiveTab("health-tips")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "health-tips"
                  ? "bg-[#244B38] text-white shadow-xs"
                  : "text-[#52765A] hover:text-[#244B38]"
              }`}
            >
              Fitness &amp; Health Tips
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "nutrition"
                  ? "bg-[#244B38] text-white shadow-xs"
                  : "text-[#52765A] hover:text-[#244B38]"
              }`}
            >
              AI Calculator
            </button>
            <button
              onClick={() => setActiveTab("go-altpro")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === "go-altpro"
                  ? "bg-[#C69A55] text-[#244B38] font-semibold shadow-xs"
                  : "text-[#52765A] hover:text-[#244B38]"
              }`}
            >
              Go AltPro
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-full border border-[#52765A]/40 bg-white px-4 py-2 text-xs font-semibold text-[#244B38] transition-colors hover:bg-[#244B38] hover:text-white cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Welcome Banner */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-[#244B38] p-7 text-white sm:flex-row sm:items-center sm:px-9">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C69A55]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C69A55]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C69A55]" />
              Active Protocol
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#F3EEDF] sm:text-3xl">
              Welcome back, {user.firstName} {user.lastName}
            </h1>
            <p className="mt-1 text-sm text-[#A8B99A]">
              Target Focus:{" "}
              <span className="font-medium text-white">
                {GOAL_LABELS[user.fitnessGoal] || user.fitnessGoal}
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-center backdrop-blur-xs">
              <p className="text-[11px] uppercase tracking-wider text-[#A8B99A]">
                Daily Target
              </p>
              <p className="mt-0.5 text-xl font-bold text-[#C69A55]">
                {calorieTarget} kcal
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-center backdrop-blur-xs">
              <p className="text-[11px] uppercase tracking-wider text-[#A8B99A]">
                Genotype / Blood
              </p>
              <p className="mt-0.5 text-xl font-bold text-white">
                {user.genotype} • {user.bloodGroup}
              </p>
            </div>
          </div>
        </div>

        {/* TAB 1: PROFILE VIEW */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#244B38]">
                Individual Biological &amp; Health Details
              </h2>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#52765A] underline-offset-4 hover:text-[#244B38] hover:underline"
              >
                Edit Profile Details
              </Link>
            </div>

            {/* Key Biometric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Full Name", value: `${user.firstName} ${user.lastName}` },
                { label: "Phone Number", value: user.phone },
                { label: "Age", value: `${user.age} Years` },
                { label: "Current Weight", value: `${user.weight} kg` },
                { label: "Blood Group", value: user.bloodGroup, highlight: true },
                { label: "Genotype", value: user.genotype, highlight: true },
                {
                  label: "Fitness Goal",
                  value: GOAL_LABELS[user.fitnessGoal] || user.fitnessGoal,
                },
                {
                  label: "Daily Protein Baseline",
                  value: `${proteinTarget}g / day`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#A8B99A]/35 bg-white p-5 shadow-xs"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">
                    {item.label}
                  </p>
                  <p
                    className={`mt-2 text-lg font-bold ${
                      item.highlight ? "text-[#C69A55]" : "text-[#244B38]"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Added: Tutorials Quick-Access Navigation Card */}
            <div className="rounded-3xl border border-[#C69A55]/40 bg-gradient-to-br from-white via-[#F3EEDF]/40 to-[#C69A55]/10 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="inline-block rounded-full bg-[#C69A55]/20 px-3 py-1 text-xs font-semibold text-[#C69A55] uppercase tracking-wider">
                  Learning Resource
                </span>
                <h3 className="text-xl font-bold text-[#244B38]">
                  Alternative Protein Tutorials Hub
                </h3>
                <p className="text-sm text-[#52765A] max-w-xl">
                  Explore practical video guides, preparation tutorials, storage best practices, and cooking tips for local alternative protein crops.
                </p>
              </div>
              <Link
                href="/tutorials"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#244B38] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1b382a] shadow-md shrink-0 cursor-pointer"
              >
                <span>Browse Tutorials</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Allergies & Health Conditions Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C69A55]" />
                  <h3 className="text-base font-bold text-[#244B38]">
                    Allergies &amp; Food Intolerances
                  </h3>
                </div>
                <p className="mt-3 rounded-xl bg-[#F3EEDF]/70 p-4 text-sm leading-relaxed text-[#244B38]">
                  {user.allergies?.trim()
                    ? user.allergies
                    : "No food allergies or intolerances recorded."}
                </p>
              </div>

              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#52765A]" />
                  <h3 className="text-base font-bold text-[#244B38]">
                    Other Health Conditions
                  </h3>
                </div>
                <p className="mt-3 rounded-xl bg-[#F3EEDF]/70 p-4 text-sm leading-relaxed text-[#244B38]">
                  {user.healthConditions?.trim()
                    ? user.healthConditions
                    : "No pre-existing health conditions reported."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIET PLAN VIEW */}
        {activeTab === "diet-plan" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#244B38]">
                Calibrated African Nutrition &amp; Plant Protein Blueprint
              </h2>
              <p className="mt-1 text-sm text-[#52765A]">
                Tailored to your {user.weight}kg body weight, {user.genotype}{" "}
                genotype, and{" "}
                {user.allergies?.trim()
                  ? `excluding ${user.allergies}`
                  : "whole-food nutrient density"}
                . Featuring high-value African plant proteins.
              </p>
            </div>

            {/* Macro Breakdown */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">
                  Protein Target
                </p>
                <p className="mt-1 text-3xl font-bold text-[#244B38]">
                  {proteinTarget}g
                </p>
                <p className="mt-1 text-xs text-[#52765A]">
                  Powered by legumes, seeds, fish &amp; lean poultry
                </p>
              </div>
              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">
                  Complex Carbohydrates
                </p>
                <p className="mt-1 text-3xl font-bold text-[#52765A]">
                  {carbsTarget}g
                </p>
                <p className="mt-1 text-xs text-[#52765A]">
                  Unripe plantain, yam, brown/ofada rice, sweet potato
                </p>
              </div>
              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">
                  Healthy Fats
                </p>
                <p className="mt-1 text-3xl font-bold text-[#C69A55]">
                  {fatsTarget}g
                </p>
                <p className="mt-1 text-xs text-[#52765A]">
                  Cold-pressed palm oil, melon seeds, avocado &amp; tiger nuts
                </p>
              </div>
            </div>

            {/* African Meal Schedule with Plant-Protein Alternates & Allergy Safety */}
            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  meal: "Breakfast • 07:30 AM",
                  title: "High-Protein Moi-Moi or Akara Bowl",
                  items:
                    "Steamed or baked bean pudding (Moi-Moi made from peeled cowpeas/brown beans enriched with fluted pumpkin leaves) served with boiled eggs or sliced ripe pawpaw.",
                  note: isSickleTraitOrCondition
                    ? "Rich in plant folate, iron, and slow-release legume amino acids."
                    : "Packed with clean plant protein and stable morning energy.",
                },
                {
                  meal: "Lunch • 01:00 PM",
                  title: "Ofada Rice & African Yam Bean (Fio-Fio) Stew",
                  items:
                    "Local Ofada rice paired with a nutrient-dense African Yam Bean stew or mackerel fish stew heavily loaded with steamed ugwu (pumpkin leaves) and spinach.",
                  note: "African yam beans provide exceptionally high plant protein and dense minerals.",
                },
                {
                  meal: "Afternoon Snack • 04:30 PM",
                  title: "Tiger Nut (Ofio) & Bambara Groundnut Boost",
                  items: isLactoseIntolerant
                    ? "Freshly blended tiger nut milk (100% dairy-free) served alongside roasted Bambara groundnuts (Okpa seeds) or tiger nut chunks."
                    : "Tiger nut milk or plant-based coconut milk served with roasted Bambara groundnuts and tiger nut chunks.",
                  note: "Bambara nuts are a complete-profile African legume packed with magnesium and zinc.",
                },
                {
                  meal: "Dinner • 07:30 PM",
                  title: "Catfish Pepper Soup & Plantain Mash",
                  items:
                    "Fresh catfish pepper soup spiced with local herbs (Ehuru, Uda) served with boiled unripe plantain or mashed yam.",
                  note: "Light, highly digestible evening meal rich in omega-3 fatty acids and low glycemic carbs.",
                },
              ].map((slot) => (
                <div
                  key={slot.meal}
                  className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs"
                >
                  <span className="inline-block rounded-full bg-[#F3EEDF] px-3 py-1 text-xs font-semibold text-[#C69A55]">
                    {slot.meal}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#244B38]">
                    {slot.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#244B38]/90">
                    {slot.items}
                  </p>
                  <p className="mt-3 border-t border-[#F3EEDF] pt-3 text-xs text-[#52765A]">
                    {slot.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FITNESS & HEALTH TIPS VIEW */}
        {activeTab === "health-tips" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#244B38]">
                Fitness &amp; Health Recommendations
              </h2>
              <p className="mt-1 text-sm text-[#52765A]">
                Personalized guidance factoring in your genotype ({user.genotype}),
                age ({user.age}), and goal.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <span className="inline-block rounded-lg bg-[#244B38] px-3 py-1 text-xs font-semibold text-white">
                  Training Protocol
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#244B38]">
                  Structured Weekly Movement
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-[#52765A]">
                  <li>
                    <strong className="text-[#244B38]">• Resistance Training:</strong>{" "}
                    3x/week compound movements (squats, presses, rows) with 90s rest
                    intervals.
                  </li>
                  <li>
                    <strong className="text-[#244B38]">• Zone 2 Cardio:</strong>{" "}
                    120 minutes/week brisk walking, cycling, or swimming at a
                    conversational pace.
                  </li>
                  <li>
                    <strong className="text-[#244B38]">• Mobility &amp; Core:</strong>{" "}
                    15 minutes daily post-workout stretching to reduce joint stress.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs">
                <span className="inline-block rounded-lg bg-[#C69A55] px-3 py-1 text-xs font-semibold text-white">
                  Genotype &amp; Hydration Advisory
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#244B38]">
                  Cellular Hydration &amp; Recovery ({user.genotype})
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52765A]">
                  {isSickleTraitOrCondition
                    ? `With genotype ${user.genotype}, maintaining consistent hydration (at least ${Math.round(
                        weightNum * 0.04
                      )}L daily) before, during, and after exercise is critical. Avoid sudden extreme exertion without gradual warm-ups and prioritize folate-rich leafy greens.`
                    : `Aim for ${(weightNum * 0.035).toFixed(
                        1
                      )}L of water daily alongside electrolyte replenishment during workouts to optimize nutrient transport and cognitive clarity.`}
                </p>
              </div>

              <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 shadow-xs md:col-span-2">
                <span className="inline-block rounded-lg bg-[#52765A] px-3 py-1 text-xs font-semibold text-white">
                  Clinical &amp; Lifestyle Habits
                </span>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-[#F3EEDF]/60 p-4">
                    <h4 className="text-sm font-bold text-[#244B38]">
                      Circadian Sleep Window
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52765A]">
                      Target 7.5–8.5 hours of sleep. Stop caffeine intake 8 hours
                      before bedtime to protect deep sleep recovery.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F3EEDF]/60 p-4">
                    <h4 className="text-sm font-bold text-[#244B38]">
                      Allergy &amp; Condition Check
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52765A]">
                      {user.healthConditions?.trim()
                        ? `Monitor symptoms around: ${user.healthConditions}. Consult your physician before starting high-intensity blocks.`
                        : "Schedule bi-annual blood panels to track vitamin D, ferritin, and lipid profiles."}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F3EEDF]/60 p-4">
                    <h4 className="text-sm font-bold text-[#244B38]">
                      Post-Meal Glucose Control
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#52765A]">
                      Take a 10-minute walk after your largest meal to improve
                      insulin sensitivity and digestion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI NUTRITION CALCULATOR VIEW */}
        {activeTab === "nutrition" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#244B38]">
                Personalized AI Protein &amp; Nutrition System
              </h2>
              <p className="mt-1 text-sm text-[#52765A]">
                Estimate your daily protein requirements and explore calibrated African plant-protein recommendations.
              </p>
            </div>
            <NutritionCalculator />
          </div>
        )}

        {/* TAB 5: GO ALTPRO MAP VIEW */}
        {activeTab === "go-altpro" && <GoAltProSection />}
      </main>

      {/* Integrated Floating AI Chatbot */}
      <NutrientChatbot />
    </div>
  );
}