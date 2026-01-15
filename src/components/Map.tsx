import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import speakersData from "../data/speakers.json";
import type { SpeakerFeature, SpeakersGeoJSON } from "../types/speaker";

// 須坂市役所の座標
const SUZAKA_CENTER: [number, number] = [138.3073, 36.6507];
const DEFAULT_ZOOM = 13;

const speakers = speakersData as SpeakersGeoJSON;

interface MapViewProps {
  selectedSpeaker?: SpeakerFeature | null;
}

export function MapView({ selectedSpeaker }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

  const showPopup = useCallback(
    (
      mapInstance: maplibregl.Map,
      coordinates: [number, number],
      properties: { name?: string; address?: string; type?: string } | null,
    ) => {
      // 既存のポップアップを閉じる
      if (popup.current) {
        popup.current.remove();
      }

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-base mb-1">${properties?.name || "不明"}</h3>
          <p class="text-sm text-gray-600 mb-1">${properties?.address || ""}</p>
          <p class="text-xs text-gray-500">${properties?.type || ""}</p>
        </div>
      `;

      popup.current = new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(mapInstance);
    },
    [],
  );

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: SUZAKA_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    const mapInstance = map.current;

    mapInstance.on("load", () => {
      // スピーカーデータをソースとして追加
      mapInstance.addSource("speakers", {
        type: "geojson",
        data: speakers,
      });

      // マーカー（円）レイヤーを追加
      mapInstance.addLayer({
        id: "speakers-circle",
        type: "circle",
        source: "speakers",
        paint: {
          "circle-radius": 10,
          "circle-color": "#e53e3e",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      // ラベルレイヤーを追加
      mapInstance.addLayer({
        id: "speakers-label",
        type: "symbol",
        source: "speakers",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#1a202c",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
      });

      // クリックでポップアップを表示
      mapInstance.on("click", "speakers-circle", (e) => {
        if (!e.features || e.features.length === 0) return;

        const feature = e.features[0];
        const coordinates = (
          feature.geometry as GeoJSON.Point
        ).coordinates.slice() as [number, number];
        const properties = feature.properties as {
          name?: string;
          address?: string;
          type?: string;
        } | null;

        showPopup(mapInstance, coordinates, properties);
      });

      // マーカーにホバーした時にカーソルを変更
      mapInstance.on("mouseenter", "speakers-circle", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });

      mapInstance.on("mouseleave", "speakers-circle", () => {
        mapInstance.getCanvas().style.cursor = "";
      });
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [showPopup]);

  // 選択されたスピーカーにフォーカス
  useEffect(() => {
    if (!selectedSpeaker || !map.current) return;

    const coordinates = selectedSpeaker.geometry.coordinates as [
      number,
      number,
    ];

    map.current.flyTo({
      center: coordinates,
      zoom: 16,
      duration: 1000,
    });

    // ポップアップを表示
    if (map.current.isStyleLoaded()) {
      showPopup(map.current, coordinates, selectedSpeaker.properties);
    }
  }, [selectedSpeaker, showPopup]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}
