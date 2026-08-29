import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import { productsAdminApi } from "../api/productsAdminApi.js";

/**
 * رفع الصور بخطوتين زي ما هو في الباك اند:
 * 1) uploadImages → بترفع لـ Cloudinary وترجّع { url, public_id }
 * 2) attachImages → بتربط الصور المرفوعة بالمنتج
 * الاتنين متجمعين هنا في mutation واحدة عشان الفرونت مايعرفش تفاصيل الخطوتين.
 *
 * الحذف بينده DELETE /api/products/:id/images/:public_id — بيمسح الصورة من
 * Cloudinary ومن مصفوفة المنتج مع بعض في نفس الوقت (شغال في الباك اند).
 *
 * ملاحظة: الرفع محتاج productId موجود بالفعل (المنتج لازم يتحفظ الأول كـ draft
 * قبل ما تقدر ترفعله صور — عشان كده الـ uploader ده بيظهر بس في صفحة التعديل).
 */
const ImageUploader = ({ productId, existingImages = [] }) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-product", productId] });
  };

  const uploadMutation = useMutation({
    mutationFn: async (files) => {
      const { data } = await productsAdminApi.uploadImages(files);
      return productsAdminApi.attachImages(productId, data.images);
    },
    onSuccess: () => {
      toast.success("Images uploaded");
      invalidate();
    },
    onError: (error) => toast.error(error.message || "Upload failed"),
  });

  const removeMutation = useMutation({
    mutationFn: (publicId) => productsAdminApi.removeImage(productId, publicId),
    onSuccess: () => {
      toast.success("Image removed");
      invalidate();
    },
    onError: (error) => toast.error(error.message || "Failed to remove image"),
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      uploadMutation.mutate(acceptedFiles);
    },
    [uploadMutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-card p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-mint bg-mint-pale/40" : "border-line hover:border-mint"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud size={28} className="mx-auto mb-2 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">
          {uploadMutation.isPending
            ? "Uploading..."
            : "Drag & drop images here, or click to select (max 5, 5MB each)"}
        </p>
      </div>

      {existingImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {existingImages.map((img) => (
            <div
              key={img.public_id}
              className="group relative aspect-square rounded-card overflow-hidden border border-line"
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeMutation.mutate(img.public_id)}
                disabled={removeMutation.isPending}
                className="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-ink/70 text-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
