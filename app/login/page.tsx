"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    phone: "",
    bloodGroup: "",
    genotype: "",
    fitnessGoal: "",
    allergies: "",
    healthConditions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save profile data locally or send to your API
    localStorage.setItem("algoNutrientUser", JSON.stringify(formData));

    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to your dashboard once created
      router.push("/dashboard");
    }, 600);
  };

  const inputStyles =
    "mt-1.5 w-full rounded-xl border border-[#A8B99A]/60 bg-[#F3EEDF]/40 px-4 py-2.5 text-sm text-[#244B38] placeholder-[#52765A]/60 outline-none transition-all focus:border-[#244B38] focus:bg-white focus:ring-2 focus:ring-[#244B38]/15";

  const labelStyles = "block text-xs font-semibold uppercase tracking-wider text-[#244B38]";

  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#244B38] font-sans selection:bg-[#C69A55] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#A8B99A]/30 bg-[#F3EEDF]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#244B38] font-bold tracking-tight text-[#F3EEDF]">
              aN
            </div>
            <span className="text-xl font-bold tracking-tight text-[#244B38]">
              algo<span className="text-[#52765A]">Nutrient</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-[#52765A] transition-colors hover:text-[#244B38]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="rounded-3xl border border-[#A8B99A]/40 bg-white p-7 shadow-xl shadow-[#244B38]/5 sm:p-10">
          {/* Form Header */}
          <div className="border-b border-[#F3EEDF] pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C69A55]/40 bg-[#F3EEDF]/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#244B38]">
              <span className="h-2 w-2 rounded-full bg-[#C69A55]" />
              Biological Profile Calibration
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#244B38] sm:text-3xl">
              Access Your Nutrient Engine
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[#52765A]">
              Enter your physiological metrics and health baseline to log in and
              generate your personalized nutrition protocol.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Personal Details */}
            <div>
              <h2 className="mb-4 text-sm font-bold text-[#52765A]">
                1. Personal Identification
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelStyles}>
                    First Name <span className="text-[#C69A55]">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="e.g. Amara"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelStyles}>
                    Last Name <span className="text-[#C69A55]">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="e.g. Okafor"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className={labelStyles}>
                    Phone Number <span className="text-[#C69A55]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. +234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
              </div>
            </div>

            {/* Biometrics & Genetics */}
            <div className="border-t border-[#F3EEDF] pt-6">
              <h2 className="mb-4 text-sm font-bold text-[#52765A]">
                2. Biometrics &amp; Genetic Markers
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <label htmlFor="age" className={labelStyles}>
                    Age (Years) <span className="text-[#C69A55]">*</span>
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min={1}
                    max={120}
                    required
                    placeholder="28"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="weight" className={labelStyles}>
                    Weight (kg) <span className="text-[#C69A55]">*</span>
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    min={20}
                    max={400}
                    required
                    placeholder="72.5"
                    value={formData.weight}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="bloodGroup" className={labelStyles}>
                    Blood Group <span className="text-[#C69A55]">*</span>
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="genotype" className={labelStyles}>
                    Genotype <span className="text-[#C69A55]">*</span>
                  </label>
                  <select
                    id="genotype"
                    name="genotype"
                    required
                    value={formData.genotype}
                    onChange={handleChange}
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="AA">AA</option>
                    <option value="AS">AS</option>
                    <option value="AC">AC</option>
                    <option value="SS">SS</option>
                    <option value="SC">SC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fitness & Health Profile */}
            <div className="border-t border-[#F3EEDF] pt-6">
              <h2 className="mb-4 text-sm font-bold text-[#52765A]">
                3. Objectives &amp; Clinical Notes
              </h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="fitnessGoal" className={labelStyles}>
                    Primary Fitness Goal <span className="text-[#C69A55]">*</span>
                  </label>
                  <select
                    id="fitnessGoal"
                    name="fitnessGoal"
                    required
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Choose your primary target
                    </option>
                    <option value="fat-loss">Sustainable Fat Loss &amp; Body Recomposition</option>
                    <option value="muscle-gain">Lean Muscle Hypertrophy</option>
                    <option value="endurance">Athletic Performance &amp; Endurance</option>
                    <option value="maintenance">Metabolic Health &amp; Weight Maintenance</option>
                    <option value="clinical-management">Condition-Specific Nutritional Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="allergies" className={labelStyles}>
                    Food Allergies &amp; Intolerances
                  </label>
                  <input
                    id="allergies"
                    name="allergies"
                    type="text"
                    placeholder="e.g. Peanuts, Shellfish, Lactose, Gluten (or 'None')"
                    value={formData.allergies}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label htmlFor="healthConditions" className={labelStyles}>
                    Other Health Conditions
                  </label>
                  <textarea
                    id="healthConditions"
                    name="healthConditions"
                    rows={3}
                    placeholder="List any conditions such as hypertension, diabetes, PCOS, ulcer, or sickle cell management..."
                    value={formData.healthConditions}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#244B38] px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-[#52765A] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? "Calibrating Profile..." : "Login & Generate Protocol"}
              </button>
              <p className="mt-3 text-center text-xs text-[#52765A]">
                Your biological data is encrypted and used strictly to compute
                personalized macronutrient and micronutrient targets.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}