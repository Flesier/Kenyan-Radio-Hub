import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { genres } from "@/data/segments";

interface GenrePageProps {
  params: {
    genre: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  const decodedGenre = decodeURIComponent(params.genre);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{decodedGenre}</h1>
            <p className="text-muted-foreground">
              Radio stations playing {decodedGenre} music
            </p>
          </div>

          {/* Add your radio station list here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Radio station cards will go here */}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

// Generate static params for all genres
export function generateStaticParams() {
  return genres.map(genre => ({
    genre: encodeURIComponent(genre),
  }));
}
