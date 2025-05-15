import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3">Kenyan Radio</h3>
            <p className="text-sm text-muted-foreground">
              Discover and listen to Kenyan radio stations organized by genre, region, or browse all available stations.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">Currently Playing</Link>
              </li>
              <li>
                <Link href="/genre" className="hover:underline">Browse by Genre</Link>
              </li>
              <li>
                <Link href="/region" className="hover:underline">Browse by Region</Link>
              </li>
              <li>
                <Link href="/stations" className="hover:underline">All Stations</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Popular Genres</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/genre/Gospel" className="hover:underline">Gospel</Link>
              </li>
              <li>
                <Link href="/genre/Urban" className="hover:underline">Urban</Link>
              </li>
              <li>
                <Link href="/genre/Pop" className="hover:underline">Pop</Link>
              </li>
              <li>
                <Link href="/genre/Reggae" className="hover:underline">Reggae</Link>
              </li>
              <li>
                <Link href="/genre/Christian" className="hover:underline">Christian</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Popular Regions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/region/Kikuyu" className="hover:underline">Kikuyu</Link>
              </li>
              <li>
                <Link href="/region/Luo" className="hover:underline">Luo</Link>
              </li>
              <li>
                <Link href="/region/Kalenjin" className="hover:underline">Kalenjin</Link>
              </li>
              <li>
                <Link href="/region/Coast" className="hover:underline">Coast</Link>
              </li>
              <li>
                <Link href="/region/christian" className="hover:underline">Christian</Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kenyan Radio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
