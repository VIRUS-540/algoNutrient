"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NutrientChatbot from "@/components/NutrientChatbot";

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

type TabOption = "profile" | "diet-plan" | "health-tips";

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

          {/* Navigation Tabs: Profile, Diet Plan, Fitness & Health Tips */}
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
                Calibrated Daily Nutrition Blueprint
              </h2>
              <p className="mt-1 text-sm text-[#52765A]">
                Tailored to your {user.weight}kg body weight, {user.bloodGroup}{" "}
                blood group, and{" "}
                {user.allergies?.trim()
                  ? `excluding ${user.allergies}`
                  : "whole-food nutrient density"}
                .
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
                  Supports tissue repair &amp; metabolic rate
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
                  Sustained glycogen &amp; cellular energy
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
                  Hormonal balance &amp; fat-soluble vitamins
                </p>
              </div>
            </div>

            {/* Meal Schedule */}
            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  meal: "Breakfast • 07:30 AM",
                  title: "Folate & Iron-Rich Morning Bowl",
                  items:
                    "Oatmeal cooked with chia seeds, boiled eggs, sautéed spinach, and sliced papaya.",
                  note: isSickleTraitOrCondition
                    ? "High folate & hydration focus tailored for your genotype."
                    : "Slow-release energy for steady morning focus.",
                },
                {
                  meal: "Lunch • 01:00 PM",
                  title: "Lean Protein & Complex Fiber Plate",
                  items:
                    "Grilled chicken breast or mackerel, brown rice or unripe plantain, steamed okra, and mixed greens.",
                  note: "Balanced glycemic load to prevent afternoon fatigue.",
                },
                {
                  meal: "Afternoon Snack • 04:30 PM",
                  title: "Micronutrient Recovery Boost",
                  items:
                    "Greek yogurt or tiger nut milk with roasted pumpkin seeds and cucumber slices.",
                  note: "Replenishes magnesium, zinc, and electrolytes.",
                },
                {
                  meal: "Dinner • 07:30 PM",
                  title: "Light Anti-Inflammatory Evening Meal",
                  items:
                    "Baked tilapia with ginger-garlic herbs, roasted sweet potatoes, and steamed broccoli.",
                  note: "Easy digestion to support overnight recovery.",
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
      </main>

      {/* Integrated Floating AI Chatbot */}
      <NutrientChatbot />
    </div>
  );
}