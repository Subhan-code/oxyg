import React from "react";
import { VideoAmbient } from "../oxygen-ui/video-ambient";

export default function VideoAmbientDemo() {
  return (
    <div className="flex flex-col items-center p-4 w-full h-full min-h-[600px] bg-background text-foreground">
      <div className="w-full max-w-4xl space-y-4">
        <VideoAmbient 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          autoPlay 
          muted 
          className="rounded-2xl"
        />
        
        <div className="space-y-4 pt-2">
          <h1 className="text-xl font-bold">Big Buck Bunny 60fps 4K — Official Blender Foundation Short Film</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface shrink-0 flex items-center justify-center font-bold">BF</div>
              <div>
                <p className="font-semibold text-sm">The Official Blender Foundations</p>
                <p className="text-xs text-muted-foreground">1.22M subscribers</p>
              </div>
              <button className="ml-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-surface overflow-hidden rounded-full">
                <button className="px-4 py-2 text-sm font-medium hover:bg-accent transition-colors border-r border-border">Like 107k</button>
                <button className="px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">Dislike</button>
              </div>
              <button className="px-4 py-2 bg-surface rounded-full text-sm font-medium hover:bg-accent transition-colors">
                Share
              </button>
              <button className="px-4 py-2 bg-surface rounded-full text-sm font-medium hover:bg-accent transition-colors hidden sm:block">
                Save
              </button>
              <button className="px-4 py-2 bg-surface rounded-full text-sm font-medium hover:bg-accent transition-colors hidden sm:block">
                Clip
              </button>
            </div>
          </div>
          
          <div className="bg-surface rounded-2xl p-4 text-sm">
            <p className="font-medium mb-1">23M views  •  11 years ago</p>
            <p className="text-foreground/80">
              UHD High Frame rate version of the iconic short film by Blender, Big Buck Bunny. More info: https://studio.blender.org/projects/b… Learn more about this UHD high frame-rate version at: http://bbb3d.renderfarming.net …
            </p>
            <button className="font-bold mt-2 hover:underline">Show more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
