import { useState } from "react";
import { Header } from "../components/Header";
import { MapView } from "../components/Map";
import { SpeakerList } from "../components/SpeakerList";
import speakersData from "../data/speakers.json";
import type { SpeakerFeature, SpeakersGeoJSON } from "../types/speaker";

const speakers = speakersData as SpeakersGeoJSON;

export function MapPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerFeature | null>(
    null,
  );
  const [isListOpen, setIsListOpen] = useState(false);

  const handleSpeakerClick = (speaker: SpeakerFeature) => {
    setSelectedSpeaker(speaker);
    // モバイルではリストを閉じる
    if (window.innerWidth < 768) {
      setIsListOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex relative">
        {/* モバイル用トグルボタン */}
        <button
          type="button"
          onClick={() => setIsListOpen(!isListOpen)}
          className="md:hidden absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium"
        >
          {isListOpen ? "地図を表示" : "一覧を表示"}
        </button>

        {/* サイドパネル（スピーカー一覧） */}
        <aside
          className={`
            ${isListOpen ? "block" : "hidden"}
            md:block
            w-full md:w-80
            absolute md:relative
            inset-0 md:inset-auto
            z-10 md:z-auto
            border-r border-gray-200
          `}
        >
          <SpeakerList
            speakers={speakers.features}
            onSpeakerClick={handleSpeakerClick}
          />
        </aside>

        {/* 地図 */}
        <main className="flex-1">
          <MapView selectedSpeaker={selectedSpeaker} />
        </main>
      </div>
    </div>
  );
}
