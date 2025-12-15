import Link from "next/link";
import Map from "@/components/Map";

export default function MapPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">須坂市 防災無線スピーカーマップ</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
          >
            ホームへ戻る
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Map />
      </main>
    </div>
  );
}
