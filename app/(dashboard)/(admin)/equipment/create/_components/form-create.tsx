"use client";

import { Form } from "@/components/ui/form";
import { UploadDropzone } from "@/utils/uploadthing";

const FormCreate = () => {
  return (
    <Form>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res[0].ufsUrl);
        }}
        config={{
          mode: "auto",
        }}
        className="w-full"
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </Form>
  );
};

export default FormCreate;
