import { MapPin, Volume2 } from "lucide-react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackSpeakerClick, trackSpeakerListView } from "@/lib/analytics";
import type { SpeakerFeature } from "@/types/speaker";

interface SpeakerListProps {
  speakers: SpeakerFeature[];
  onSpeakerClick: (speaker: SpeakerFeature) => void;
}

export function SpeakerList({ speakers, onSpeakerClick }: SpeakerListProps) {
  useEffect(() => {
    trackSpeakerListView();
  }, []);

  const handleSpeakerClick = (speaker: SpeakerFeature) => {
    trackSpeakerClick(speaker.properties.name);
    onSpeakerClick(speaker);
  };
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-gray-600" />
          <h2 className="font-semibold text-gray-900">スピーカー一覧</h2>
          <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {speakers.length}件
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {speakers.map((speaker) => (
          <Card
            key={speaker.properties.id}
            className="cursor-pointer hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            role="button"
            tabIndex={0}
            onClick={() => handleSpeakerClick(speaker)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSpeakerClick(speaker);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-red-50 rounded-full">
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {speaker.properties.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {speaker.properties.address}
                  </p>
                  <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {speaker.properties.type}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
