import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getStationsByRegion, regions } from "@/data/regions";
import { segments } from "@/data/segments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";

interface RegionPageProps {
  params: {
    region: string;
  };
}

export default function RegionPage({ params }: RegionPageProps) {
  const decodedRegion = decodeURIComponent(params.region);

  // Get stations for this region
  const regionStations = getStationsByRegion(decodedRegion);

  // If no stations found, return 404
  if (regionStations.length === 0) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">{decodedRegion} Region Radio Stations</h1>
            <p className="text-muted-foreground">
              Listen to radio stations broadcasting in the {decodedRegion} region of Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionStations.map((station) => {
              // Find any segments for this station (to get the stream URL)
              const stationSegments = segments.filter(seg =>
                seg.station.toLowerCase() === station.station.toLowerCase()
              );

              const streamUrl = station.link || stationSegments[0]?.link || "";

              return (
                <Card key={station.station} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>{station.station}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Frequency: {station.frequency}</p>
                      {streamUrl ? (
                        <audio
                          controls
                          className="w-full mt-2"
                          src={streamUrl}
                          preload="none"
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground">Stream not available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
      <SiteFooter />
    </div>
  );
}

// Generate static params for all regions
export function generateStaticParams() {
  return regions.map((region) => ({
    region: encodeURIComponent(region),
  }));
}
