import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  imageUrl: string;
  onChange: (url: string) => void;
  errorMessage?: string;
}

const ImageUploader: React.FC<Props> = ({
  imageUrl,
  onChange,
  errorMessage,
}) => {
  const [loading, setLoading] = useState(false);

  function handleUploadComplete(url: string) {
    setLoading(false);
    onChange(url);
  }

  return (
    <>
      {imageUrl === "" ? (
        <div>
          {loading ? (
            <div className="w-full h-[18rem] flex flex-col items-center justify-center border-2 border-dashed rounded-lg">
              <Loader2 className="animate-spin duration-500 w-7 stroke-[2.5] h-7 text-mainColor" />
              <p className="text-gray-500">Uploading...</p>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) =>
                handleUploadComplete(res[0].ufsUrl)
              }
              onUploadBegin={() => setLoading(true)}
              config={{ mode: "auto" }}
              onUploadError={(error: Error) => {
                setLoading(false);
                console.error(`ERROR! ${error.message}`);
              }}
            />
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      ) : (
        <div className="relative">
          <img
            src={imageUrl}
            alt="icon"
            className="w-full h-[18rem] rounded-lg object-fill border-2 border-dashed"
          />
          <div className="absolute bottom-4 right-4">
            <Button
              size="sm"
              className="!h-8 !p-3 bg-red-500/20 text-red-500 hover:bg-red-500/30"
              onClick={() => onChange("")}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
