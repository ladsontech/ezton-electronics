
import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crop as CropIcon, Check, X } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageUrl: string;
  aspect?: number;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export function ImageCropper({ imageUrl, aspect = 1, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const getCroppedImg = () => {
    if (!imageRef) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(
      imageRef,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    onCropComplete(croppedImageUrl);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CropIcon className="mr-2 h-5 w-5" /> Crop Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={aspect}
            className="max-h-[60vh] object-contain rounded-md overflow-hidden border"
          >
            <img
              src={imageUrl}
              onLoad={(e) => setImageRef(e.currentTarget)}
              alt="Crop preview"
              className="max-h-[60vh] mx-auto"
            />
          </ReactCrop>
        </div>
        
        <div className="flex justify-between w-full pt-4 mt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="flex items-center"
          >
            <X className="mr-1 h-4 w-4" /> Cancel
          </Button>
          
          <Button 
            onClick={getCroppedImg} 
            className="bg-green-600 hover:bg-green-700 text-white flex items-center"
          >
            <Check className="mr-1 h-4 w-4" /> Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
