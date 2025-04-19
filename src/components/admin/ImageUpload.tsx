
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ImageCropper } from './ImageCropper';
import { X } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [cropImage, setCropImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    onChange([...images, croppedImage]);
    setCropImage(null);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt="" className="w-full h-32 object-cover rounded-lg" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
        Add Image
      </Button>
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {cropImage && (
        <ImageCropper
          imageUrl={cropImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropImage(null)}
        />
      )}
    </div>
  );
}
