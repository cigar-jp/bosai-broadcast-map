"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import speakersData from "@/data/speakers.json";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

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
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: [138.3073, 36.6507], // 須坂市役所を中心に
      zoom: 13,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // GeoJSONソースを追加
      map.current.addSource("speakers", {
        type: "geojson",
        data: speakersData as GeoJSON.FeatureCollection,
      });

      // スピーカーのマーカーを追加
      map.current.addLayer({
        id: "speakers-layer",
        type: "circle",
        source: "speakers",
        paint: {
          "circle-radius": 8,
          "circle-color": "#ef4444",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      // ラベルを追加
      map.current.addLayer({
        id: "speakers-label",
        type: "symbol",
        source: "speakers",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-offset": [0, 1.5],
          "text-anchor": "top",
          "text-size": 12,
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
      });

      // ポップアップの設定
      map.current.on("click", "speakers-layer", (e) => {
        if (!map.current || !e.features || e.features.length === 0) return;

        const feature = e.features[0];
        const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
        const { name, address, type } = feature.properties as {
          name: string;
          address: string;
          type: string;
        };

        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${name}</h3>
              <p style="font-size: 0.875rem; color: #666;">${type}</p>
              <p style="font-size: 0.875rem; margin-top: 4px;">${address}</p>
            </div>`
          )
          .addTo(map.current);
      });

      // マウスカーソルの変更
      map.current.on("mouseenter", "speakers-layer", () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = "pointer";
        }
      });

      map.current.on("mouseleave", "speakers-layer", () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = "";
        }
      });
    });

    // ナビゲーションコントロールを追加
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}
