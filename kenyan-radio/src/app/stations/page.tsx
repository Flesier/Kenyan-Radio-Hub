import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { stations } from "@/data/segments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioPlayer } from "@/components/radio-player";
import Link from "next/link";

export default function StationsPage() {
  // Organize stations alphabetically
  const sortedStations = [...stations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Kenyan Radio Stations</h1>
            <p className="text-muted-foreground">
              Browse and listen to all available radio stations from across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStations.map((station) => (
              <Card key={station.name} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle>{station.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <RadioPlayer
                    stationName={station.name}
                    frequency={station.frequency}
                    streamUrl={station.link}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
      <SiteFooter />
    </div>
  );
}
