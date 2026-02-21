import { http } from "@/core/interceptors/http";

export interface UploadResponse {
  status: string;
  message: string;
  data: {
    url: string;
    publicId: string;
  };
}

export class UploadService {
  static uploadSingle(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return http.post<UploadResponse>("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
