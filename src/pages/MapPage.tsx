import { List, Map as MapIcon } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { MapView } from "@/components/Map";
import { SpeakerList } from "@/components/SpeakerList";
import { Button } from "@/components/ui/button";
import speakersData from "@/data/speakers.json";
import type { SpeakerFeature, SpeakersGeoJSON } from "@/types/speaker";

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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsListOpen(!isListOpen)}
          className="md:hidden absolute top-4 left-4 z-20 shadow-md"
        >
          {isListOpen ? (
            <>
              <MapIcon className="h-4 w-4 mr-2" />
              地図を表示
            </>
          ) : (
            <>
              <List className="h-4 w-4 mr-2" />
              一覧を表示
            </>
          )}
        </Button>

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
