import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Kenyan Radio</span>
        </Link>
        <div className="ml-auto hidden sm:flex mr-4">
          <Search />
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Button variant="ghost">Now Playing</Button>
          </Link>
          <Link href="/genre" passHref>
            <Button variant="ghost">By Genre</Button>
          </Link>
          <Link href="/region" passHref>
            <Button variant="ghost">By Region</Button>
          </Link>
          <Link href="/stations" passHref>
            <Button variant="ghost">All Stations</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
