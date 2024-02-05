import { useState } from "react";
import { GalleryTabs } from "./GalleryTabs";
import { WordHunt } from "./wordhunt/WordHunt";

export interface IGalleryMenuProps {}

export function GalleryMenu(props: IGalleryMenuProps) {
  const [activeGallery, setActiveGallery] = useState("cryptogram");

  return (
    <div>
      <GalleryTabs
        setActiveGallery={setActiveGallery}
        activeGallery={activeGallery}
      >
        {activeGallery === "wordHunt" && <WordHunt />}
      </GalleryTabs>
    </div>
  );
}
