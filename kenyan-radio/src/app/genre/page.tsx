import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { genres } from "@/data/segments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenresPage() {
  // Organize the genres alphabetically
  const sortedGenres = [...genres].sort();

  // Group genres by first letter for A-Z listing like the reference site
  const genresByLetter: Record<string, string[]> = {};

  sortedGenres.forEach(genre => {
    const firstLetter = genre.charAt(0).toUpperCase();
    if (!genresByLetter[firstLetter]) {
      genresByLetter[firstLetter] = [];
    }
    genresByLetter[firstLetter].push(genre);
  });

  // Get all unique first letters
  const letters = Object.keys(genresByLetter).sort();

  return (
      <>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 container py-8">
            <div className="flex flex-col space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Genres from A-Z</h1>
                <p className="text-muted-foreground">
                  Kenyan radio stations by music genre: browse through the music genres and find the perfect soundtrack.
                </p>
              </div>
  
              <div className="flex flex-wrap gap-2">
                {letters.map(letter => (
                  <Link href={`#${letter}`} key={letter}>
                    <Button variant="outline" size="sm">{letter}</Button>
                  </Link>
                ))}
              </div>
  
              <div className="space-y-8">
                {letters.map(letter => (
                  <div key={letter} id={letter} className="scroll-mt-20">
                    <h2 className="text-2xl font-bold mb-4">{letter}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {genresByLetter[letter].map(genre => (
                        <Link href={`/genre/${encodeURIComponent(genre)}`} key={genre}>
                          <Card className="hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4">
                              <p className="font-medium">{genre}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        <SiteFooter />
      </>
    );
}
