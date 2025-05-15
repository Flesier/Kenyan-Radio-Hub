import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { regions } from "@/data/regions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegionsPage() {
  // Organize the regions alphabetically
  const sortedRegions = [...regions].sort();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kenyan Radio by Region</h1>
            <p className="text-muted-foreground">
              Discover radio stations from various regions across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedRegions.map(region => (
              <Link href={`/region/${encodeURIComponent(region)}`} key={region}>
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="capitalize">{region}</CardTitle>
                    <CardDescription>Regional Radio Stations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Listen to radio stations broadcasting in the {region} region of Kenya.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
      <SiteFooter />
    </div>
  );
}
