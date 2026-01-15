import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 py-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-red-500" />
        <h1 className="text-lg font-semibold text-gray-900">防災無線マップ</h1>
        <span className="text-sm text-gray-500">須坂市</span>
      </div>
    </header>
  );
}
