"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MediaModal, { ImageData } from "@/components/MediaModal";
import Image from "next/image";

const imageData: ImageData[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["child", "hands", "help"]
  },
  {
    id: 2,
    imageUrl: "https://plus.unsplash.com/premium_photo-1683134055585-3d84cb07b60e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["volunteer", "aid", "community"]
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1620608929452-ccc05381b0f7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["child", "education", "hope"]
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["elderly", "support", "care"]
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1601839777132-b3f4e455c369?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["medical", "relief", "teamwork"]
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1635510952461-1fc1b7c96314?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["disaster", "response", "rescue"]
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1652858672796-960164bd632b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["smile", "children", "charity"]
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["donation", "food", "relief"]
  },
  {
    id: 9,
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140595667-f90d3ee9898e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["education", "learning", "youth"]
  },
  {
    id: 10,
    imageUrl: "https://images.unsplash.com/photo-1727549305105-24eeaa202f3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["support", "shelter", "refugee"]
  },
   {
    id: 11,
    imageUrl: "https://images.unsplash.com/photo-1727627441635-f3c2c3f9090d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["water", "children", "access"]
  },
  {
    id: 12,
    imageUrl: "https://images.unsplash.com/photo-1623990815896-99b0d5fb3f41?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["healthcare", "nurse", "assistance"]
  },
  {
    id: 13,
    imageUrl: "https://images.unsplash.com/photo-1629273229664-11fabc0becc0?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["education", "children"]
  },
  {
    id: 14,
    imageUrl: "https://images.unsplash.com/photo-1727552889524-e1159fc95498?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["humanitarian", "crisis", "relief"]
  },
  {
    id: 15,
    imageUrl: "https://images.unsplash.com/photo-1710092784814-4a6f158913b8?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["food", "volunteer", "distribution"]
  },
  {
    id: 16,
    imageUrl: "https://images.unsplash.com/photo-1643321611132-15f7b8a63347?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["teamwork", "unity", "community"]
  },
  {
    id: 17,
    imageUrl: "https://images.unsplash.com/photo-1643321614612-45037d065d22?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["child", "hope", "school"]
  }
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const handleImageSelect = (image: ImageData) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8">
      <MediaModal 
        images={imageData} 
        trigger={<Button variant="outline">Open Media Gallery</Button>}
        onImageSelect={handleImageSelect}
      />
      
      {selectedImage && (
        <Card className="mt-8 max-w-md w-full">
          <CardContent className="space-y-4">
            <div>
              <span className="font-medium">ID:</span> {selectedImage.id}
            </div>
            <div>
              <span className="font-medium">Image:</span>
              <div className="mt-2 relative aspect-video w-full overflow-hidden rounded border">
                <Image
                  src={selectedImage.imageUrl}
                  alt={`Selected image ${selectedImage.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
            <div>
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedImage.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}