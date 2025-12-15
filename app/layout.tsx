import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "須坂市 防災無線スピーカーマップ",
  description: "須坂市の防災無線スピーカーの位置を地図上に表示するアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
