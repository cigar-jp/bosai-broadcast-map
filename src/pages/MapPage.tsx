import { Header } from "../components/Header";
import { MapView } from "../components/Map";

export function MapPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <MapView />
      </main>
    </div>
  );
}
