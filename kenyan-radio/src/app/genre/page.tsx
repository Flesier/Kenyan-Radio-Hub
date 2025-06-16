import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { genres } from "@/data/segments";
import { Card, CardContent } from "@/components/ui/card";

export default function GenresPage() {
  // Group genres by first letter using reduce for better performance
  const genresByLetter = [...genres].sort().reduce<Record<string, string[]>>((acc, genre) => {
    const firstLetter = genre.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(genre);
    return acc;
  }, {});

  const letters = Object.keys(genresByLetter).sort();

  return (
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

          <nav className="flex flex-wrap gap-2" aria-label="genre letters">
            {letters.map(letter => (
              <Link href={`#${letter}`} key={letter}>
                <Button variant="outline" size="sm">{letter}</Button>
              </Link>
            ))}
          </nav>

          <section className="space-y-8">
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
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
