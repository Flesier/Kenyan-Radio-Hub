"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { stations } from "@/data/segments";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const filteredStations = stations.filter((station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredStations.slice(0, 5)); // Limit to top 5 results
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 1) {
      // You can implement a proper search results page, but for now
      // just link to stations page
      router.push("/stations");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search for stations..."
          className="w-full sm:w-64 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            // Delay hiding the results so we can click on them
            setTimeout(() => setIsSearchFocused(false), 200);
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          type="submit"
          className="absolute right-0 top-0 h-full aspect-square"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>

      {isSearchFocused && results.length > 0 && (
        <Card className="absolute top-full mt-1 w-full z-50">
          <CardContent className="p-2">
            <ul className="space-y-1">
              {results.map((station) => (
                <li key={station.name} className="text-sm">
                  <Link
                    href={`/stations`}
                    className="block p-2 hover:bg-muted rounded-md"
                  >
                    {station.name} - {station.frequency}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
