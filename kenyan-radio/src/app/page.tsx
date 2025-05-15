import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RadioPlayer } from "@/components/radio-player";
import { getCurrentlyPlayingSegments } from "@/data/segments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  // This is for server-side rendering
  const nowPlaying = getCurrentlyPlayingSegments();

  // Group by station for a better display
  const stationGroups = nowPlaying.reduce((groups: Record<string, any[]>, segment) => {
    if (!groups[segment.station]) {
      groups[segment.station] = [];
    }
    groups[segment.station].push(segment);
    return groups;
  }, {});

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <h1 className="text-3xl font-bold">Currently Playing on Kenyan Radio</h1>

          {Object.entries(stationGroups).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(stationGroups).map(([stationName, segments]) => (
                <Card key={stationName} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>{stationName} - {segments[0].frequency}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-6">
                      {segments.map((segment, i) => (
                        <div key={i}>
                          <RadioPlayer
                            stationName={stationName}
                            frequency={segment.frequency}
                            streamUrl={segment.link}
                            currentShow={segment.show}
                          />
                          <div className="mt-2">
                            <p className="text-sm font-medium">{segment.show}</p>
                            <p className="text-xs text-muted-foreground">{segment.genre} • {segment.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No segments currently on air</h3>
              <p className="text-muted-foreground">Check back later or browse all stations</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
