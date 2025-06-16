"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// Declare a global variable to keep track of the currently playing audio instance
let currentlyPlayingAudio: HTMLAudioElement | null = null;

interface RadioPlayerProps {
  stationName: string;
  frequency: string;
  streamUrl: string;
  currentShow?: string;
}

export function RadioPlayer({ stationName, frequency, streamUrl, currentShow }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [streamUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        // If this was the currently playing audio, clear the global reference
        if (currentlyPlayingAudio === audioRef.current) {
          currentlyPlayingAudio = null;
        }
      } else {
        // If another audio is currently playing, pause it
        if (currentlyPlayingAudio && currentlyPlayingAudio !== audioRef.current) {
          currentlyPlayingAudio.pause();
        }

        // Set the stream URL (in case it changed)
        audioRef.current.src = streamUrl;

        // Play this stream
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e);
        });

        // Set this audio as the currently playing audio globally
        currentlyPlayingAudio = audioRef.current;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{stationName}</h3>
              <p className="text-sm text-muted-foreground">{frequency}</p>
            </div>
            {currentShow && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                Now Playing: {currentShow}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </CardFooter>
    </Card>
  );
}