import type { SpeakerFeature } from "../types/speaker";

interface SpeakerListProps {
  speakers: SpeakerFeature[];
  onSpeakerClick: (speaker: SpeakerFeature) => void;
}

export function SpeakerList({ speakers, onSpeakerClick }: SpeakerListProps) {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900">
          スピーカー一覧
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({speakers.length}件)
          </span>
        </h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {speakers.map((speaker) => (
          <li key={speaker.properties.id}>
            <button
              type="button"
              onClick={() => onSpeakerClick(speaker)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">
                {speaker.properties.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {speaker.properties.address}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
