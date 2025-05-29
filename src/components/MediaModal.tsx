"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search, X } from "lucide-react";

export interface ImageData {
  id: number;
  imageUrl: string;
  tags: string[];
}

interface MediaModalProps {
  images: ImageData[];
  trigger?: React.ReactNode;
  onImageSelect?: (image: ImageData) => void;
}

export default function MediaModal({ images, trigger, onImageSelect }: MediaModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(9);
  const [open, setOpen] = useState(false);

  // Filter images based on search query
  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) return images;
    
    return images.filter(image =>
      image.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [images, searchQuery]);

  // Get images to display based on pagination
  const displayedImages = filteredImages.slice(0, displayCount);
  const hasMore = displayCount < filteredImages.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 9, filteredImages.length));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setDisplayCount(9); // Reset pagination when searching
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDisplayCount(9);
  };

  const handleImageClick = (image: ImageData) => {
    if (onImageSelect) {
      onImageSelect(image);
      setOpen(false); // Close the modal
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open Modal</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Media Gallery</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by tags..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>
                Found {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </>
            ) : (
              `Showing ${displayedImages.length} of ${images.length} images`
            )}
          </div>

          <div className="overflow-y-auto max-h-[50vh]">
            {displayedImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5 pb-4">
                {displayedImages.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-sm border hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`Image ${image.id}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No images found matching your search.</p>
              </div>
            )}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2 border-t">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="w-full max-w-xs"
              >
                Load More ({filteredImages.length - displayCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}