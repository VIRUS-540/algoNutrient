"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

export interface AltProProduct {
  name: string;
  price: string;
  freshness: "Fresh Today" | "1 Day Old" | "2 Days Old";
}

export interface MarketLocation {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  products: AltProProduct[];
}

// Custom Forest Green & Harvest Gold SVG Pin
const createCustomIcon = (isSelected: boolean) =>
  L.divIcon({
    className: "custom-altpro-pin",
    html: `<div style="
      background-color: ${isSelected ? "#C69A55" : "#244B38"};
      width: 28px;
      height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid #FFFFFF;
      box-shadow: 0 4px 10px rgba(36, 75, 56, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: #F3EEDF;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

const userIcon = L.divIcon({
  className: "user-location-pin",
  html: `<div style="
    background-color: #52765A;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid #FFFFFF;
    box-shadow: 0 0 0 4px rgba(82, 118, 90, 0.3);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.2 });
  }, [center, map]);
  return null;
}

interface AltProMapProps {
  markets: MarketLocation[];
  selectedMarket: MarketLocation;
  userCoords: [number, number] | null;
  onSelectMarket: (market: MarketLocation) => void;
}

export default function AltProMap({
  markets,
  selectedMarket,
  userCoords,
  onSelectMarket,
}: AltProMapProps) {
  return (
    <div className="h-[460px] w-full overflow-hidden rounded-3xl border border-[#A8B99A]/40 shadow-sm">
      <MapContainer
        center={[selectedMarket.lat, selectedMarket.lng]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={[selectedMarket.lat, selectedMarket.lng]} />

        {/* User Home / Current Location Pin */}
        {userCoords && (
          <Marker position={userCoords} icon={userIcon}>
            <Popup>
              <div className="font-sans text-xs font-semibold text-[#244B38]">
                Your Location
              </div>
            </Popup>
          </Marker>
        )}

        {/* Alternative Protein Market Pins */}
        {markets.map((market) => (
          <Marker
            key={market.id}
            position={[market.lat, market.lng]}
            icon={createCustomIcon(selectedMarket.id === market.id)}
            eventHandlers={{
              click: () => onSelectMarket(market),
            }}
          >
            <Popup>
              <div className="min-w-[180px] font-sans text-[#244B38]">
                <p className="text-sm font-bold">{market.name}</p>
                <p className="text-xs text-[#52765A]">{market.area}</p>
                {market.distanceKm !== undefined && (
                  <p className="mt-1 text-xs font-semibold text-[#C69A55]">
                    {market.distanceKm.toFixed(1)} km away
                  </p>
                )}
                <div className="mt-2 space-y-1 border-t border-zinc-200 pt-1.5">
                  {market.products.map((p) => (
                    <div key={p.name} className="flex justify-between text-[11px]">
                      <span>{p.name}</span>
                      <span className="font-semibold">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}