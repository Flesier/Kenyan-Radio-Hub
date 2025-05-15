import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RadioPlayer } from "@/components/radio-player";
import { segments } from "@/data/segments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface GenrePageProps {
  params: {
    genre: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  const decodedGenre = decodeURIComponent(params.genre);

  // Filter segments by the specified genre
  const genreSegments = segments.filter(segment =>
    segment.genre.toLowerCase() === decodedGenre.toLowerCase()
  );

  // If no segments found, return 404
  if (genreSegments.length === 0) {
    notFound();
  }

  // Group by station for a better display
  const stationGroups = genreSegments.reduce((groups: Record<string, any[]>, segment) => {
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
          <div>
            <h1 className="text-3xl font-bold mb-2">{decodedGenre} Radio</h1>
            <p className="text-muted-foreground">
              Listen to the best {decodedGenre} radio stations in Kenya.
            </p>
          </div>

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
                          <p className="text-xs text-muted-foreground">{segment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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

// Generate static pages for all genres
export function generateStaticParams() {
  const uniqueGenres = Array.from(new Set(segments.map(segment => segment.genre)));

  return uniqueGenres.map(genre => ({
    genre: encodeURIComponent(genre),
  }));
}
