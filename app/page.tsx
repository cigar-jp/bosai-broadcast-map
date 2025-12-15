import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-center">
          須坂市 防災無線スピーカーマップ
        </h1>
        <p className="text-center text-lg">
          須坂市内の防災無線スピーカーの位置を地図上で確認できます
        </p>
        <Link
          href="/map"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          地図を表示
        </Link>
      </main>
    </div>
  );
}
