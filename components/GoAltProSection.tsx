"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type { MarketLocation } from "./AltProMap";
import WeatherInsightPanel from "@/components/farmer/WeatherInsightPanel";
import SmartFarmerAssistant from "@/components/farmer/SmartFarmerAssistant";

// Dynamically import map with SSR disabled so Next.js doesn't crash on window
const AltProMap = dynamic(() => import("./AltProMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-3xl border border-[#A8B99A]/40 bg-white text-sm font-medium text-[#52765A]">
      Loading Interactive Abuja AltPro Market Map...
    </div>
  ),
});

// Restricted exclusively to Abuja, FCT markets & hubs
const ABUJA_MARKETS: MarketLocation[] = [
  {
    id: "wuse-market",
    name: "Wuse Zone 5 Agro & Grain Hub",
    area: "Wuse, Abuja FCT",
    lat: 9.0643,
    lng: 7.4851,
    products: [
      { name: "Peeled Brown Cowpeas", price: "₦2,100 / kg", freshness: "Fresh Today" },
      { name: "Bambara Groundnuts (Okpa)", price: "₦2,500 / kg", freshness: "Fresh Today" },
      { name: "Soybean Flour (Full-Fat)", price: "₦1,800 / kg", freshness: "1 Day Old" },
    ],
  },
  {
    id: "garki-market",
    name: "Garki Modern Whole-Food Market",
    area: "Garki Area 2, Abuja FCT",
    lat: 9.0192,
    lng: 7.4912,
    products: [
      { name: "African Yam Beans (Fio-Fio)", price: "₦3,000 / kg", freshness: "Fresh Today" },
      { name: "Fresh Tigernut Milk (Unsweetened)", price: "₦2,200 / L", freshness: "Fresh Today" },
      { name: "Egusi (Melon Seeds)", price: "₦3,400 / kg", freshness: "1 Day Old" },
    ],
  },
  {
    id: "utako-market",
    name: "Utako International Produce Exchange",
    area: "Utako District, Abuja FCT",
    lat: 9.0722,
    lng: 7.4358,
    products: [
      { name: "Soybean Curd (Awara Blocks)", price: "₦1,600 / pack", freshness: "Fresh Today" },
      { name: "Pigeon Peas (Otili)", price: "₦2,300 / kg", freshness: "2 Days Old" },
      { name: "Roasted Groundnut Cake (Kuli-Kuli)", price: "₦1,500 / pack", freshness: "1 Day Old" },
    ],
  },
  {
    id: "jabi-lake-market",
    name: "Jabi Green Grocers & Legume Stall",
    area: "Jabi, Abuja FCT",
    lat: 9.0765,
    lng: 7.4165,
    products: [
      { name: "Organic Tofu Blocks", price: "₦2,400 / pack", freshness: "Fresh Today" },
      { name: "Bambara Nut Flour", price: "₦2,800 / kg", freshness: "1 Day Old" },
      { name: "Cold-Pressed Tigernut Milk", price: "₦2,500 / L", freshness: "Fresh Today" },
    ],
  },
];

// Haversine formula to compute distance in km between two coordinates
function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function GoAltProSection() {
  const [activeSubTab, setActiveSubTab] = useState<"marketplace" | "agriculture">("marketplace");
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("Detecting location in Abuja...");
  const [searchQuery, setSearchQuery] = useState("");
  const [freshnessFilter, setFreshnessFilter] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState<string>(ABUJA_MARKETS[0].id);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords([pos.coords.latitude, pos.coords.longitude]);
          setLocationStatus("Live GPS active (Abuja)");
        },
        () => {
          // Fallback specifically to Abuja city center coordinates (9.0765, 7.3986)
          setUserCoords([9.0765, 7.3986]);
          setLocationStatus("Using Abuja FCT center");
        }
      );
    } else {
      setUserCoords([9.0765, 7.3986]);
      setLocationStatus("Using Abuja FCT center");
    }
  }, []);

  const enrichedMarkets = useMemo(() => {
    return ABUJA_MARKETS.map((market) => ({
      ...market,
      distanceKm: userCoords
        ? calculateDistanceKm(
            userCoords[0],
            userCoords[1],
            market.lat,
            market.lng
          )
        : undefined,
    }))
      .filter((market) => {
        const matchesQuery =
          market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          market.products.some((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesFreshness =
          freshnessFilter === "ALL" ||
          market.products.some((p) => p.freshness === freshnessFilter);

        return matchesQuery && matchesFreshness;
      })
      .sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
  }, [userCoords, searchQuery, freshnessFilter]);

  const selectedMarket =
    enrichedMarkets.find((m) => m.id === selectedId) ||
    enrichedMarkets[0] ||
    ABUJA_MARKETS[0];

  const getFreshnessBadge = (freshness: string) => {
    switch (freshness) {
      case "Fresh Today":
        return "bg-[#244B38] text-white";
      case "1 Day Old":
        return "bg-[#C69A55]/20 text-[#244B38] border border-[#C69A55]/50";
      default:
        return "bg-[#A8B99A]/30 text-[#52765A]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end bg-white p-6 sm:p-8 rounded-3xl border border-[#A8B99A]/35 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#C69A55]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#244B38]">
            <span className="h-2 w-2 rounded-full bg-[#C69A55]" />
            Go AltPro Abuja Radar
          </span>
          <h2 className="mt-2 text-2xl font-bold text-[#244B38]">
            Abuja Alternative Protein Markets &amp; Intelligence
          </h2>
          <p className="mt-1 text-sm text-[#52765A]">
            Compare live prices across Abuja FCT markets ({locationStatus}), distance from your location, and batch freshness.
          </p>
        </div>

        {/* Sub-navigation switcher */}
        <div className="flex gap-2 bg-[#F3EEDF] p-1.5 rounded-2xl border border-[#A8B99A]/40 shrink-0">
          <button
            onClick={() => setActiveSubTab("marketplace")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "marketplace"
                ? "bg-[#244B38] text-white shadow-xs"
                : "text-[#52765A] hover:text-[#244B38]"
            }`}
          >
            Abuja Market Directory
          </button>
          <button
            onClick={() => setActiveSubTab("agriculture")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "agriculture"
                ? "bg-[#244B38] text-white shadow-xs"
                : "text-[#52765A] hover:text-[#244B38]"
            }`}
          >
            Weather &amp; Farmer Assistant
          </button>
        </div>
      </div>

      {/* Conditional Sub-Tab Views */}
      {activeSubTab === "marketplace" ? (
        <div className="space-y-6">
          {/* Controls Bar for Marketplace */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#244B38]">Abuja FCT Verified Suppliers</h3>
              <p className="text-xs text-[#52765A]">Browse local Abuja grain hubs, legume exchanges, and organic markets.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bambara, Yam Bean, Tofu..."
                className="rounded-full border border-[#A8B99A]/60 bg-white px-4 py-2 text-sm text-[#244B38] placeholder-[#52765A]/70 outline-none focus:border-[#244B38]"
              />
              <select
                value={freshnessFilter}
                onChange={(e) => setFreshnessFilter(e.target.value)}
                className="rounded-full border border-[#A8B99A]/60 bg-white px-4 py-2 text-sm font-medium text-[#244B38] outline-none focus:border-[#244B38] cursor-pointer"
              >
                <option value="ALL">All Freshness Levels</option>
                <option value="Fresh Today">Fresh Today Only</option>
                <option value="1 Day Old">Up to 1 Day Old</option>
                <option value="2 Days Old">Up to 2 Days Old</option>
              </select>
            </div>
          </div>

          {/* Main Split Layout: Market Cards + Interactive Map */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Market List (Left 5 Columns) */}
            <div className="space-y-4 lg:col-span-5 max-h-[460px] overflow-y-auto pr-1">
              {enrichedMarkets.length === 0 ? (
                <div className="rounded-2xl border border-[#A8B99A]/35 bg-white p-6 text-center text-sm text-[#52765A]">
                  No Abuja markets match your current filter.
                </div>
              ) : (
                enrichedMarkets.map((market) => {
                  const isSelected = selectedMarket.id === market.id;
                  return (
                    <div
                      key={market.id}
                      onClick={() => setSelectedId(market.id)}
                      className={`rounded-2xl border p-5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#244B38] bg-white shadow-md ring-2 ring-[#244B38]/10"
                          : "border-[#A8B99A]/35 bg-white/90 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-[#244B38]">
                            {market.name}
                          </h3>
                          <p className="text-xs text-[#52765A]">{market.area}</p>
                        </div>
                        {market.distanceKm !== undefined && (
                          <span className="shrink-0 rounded-full bg-[#F3EEDF] px-3 py-1 text-xs font-bold text-[#244B38]">
                            {market.distanceKm.toFixed(1)} km
                          </span>
                        )}
                      </div>

                      {/* Inventory, Prices & Freshness */}
                      <div className="mt-4 space-y-2 border-t border-[#F3EEDF] pt-3">
                        {market.products.map((product) => (
                          <div
                            key={product.name}
                            className="flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="font-medium text-[#244B38]">
                              {product.name}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-bold text-[#52765A]">
                                {product.price}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getFreshnessBadge(
                                  product.freshness
                                )}`}
                              >
                                {product.freshness}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Directions Link */}
                      <div className="mt-4 flex justify-end">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold text-[#C69A55] hover:underline"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Interactive Map (Right 7 Columns) */}
            <div className="lg:col-span-7">
              <AltProMap
                markets={enrichedMarkets}
                selectedMarket={selectedMarket}
                userCoords={userCoords}
                onSelectMarket={(m) => setSelectedId(m.id)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Weather Intelligence Panel */}
          <WeatherInsightPanel />

          {/* Smart Farmer Production Assistant */}
          <SmartFarmerAssistant />
        </div>
      )}
    </div>
  );
}