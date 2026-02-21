import { useMutation } from "@tanstack/react-query";
import { UploadService } from "@/core/api/upload.api";

export const useUploadQuery = {
  useUploadSingle: () => {
    return useMutation({
      mutationFn: (file: File) => UploadService.uploadSingle(file),
    });
  },
};
