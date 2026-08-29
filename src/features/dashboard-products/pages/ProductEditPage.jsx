import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productsAdminApi } from "../api/productsAdminApi.js";
import ProductForm from "../components/ProductForm.jsx";
import ImageUploader from "../components/ImageUploader.jsx";

const ProductEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => productsAdminApi.getById(id),
  });

  const product = data?.data?.product;

  const updateMutation = useMutation({
    mutationFn: (values) => productsAdminApi.update(id, values),
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries({ queryKey: ["admin-product", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading) return <p className="text-muted-foreground">{t("common.loading")}</p>;
  if (isError || !product) return <p className="text-clay">{t("common.noResults")}</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-olive mb-6">
        {t("common.edit")} — {product.name_en}
      </h1>

      <ProductForm
        initialValues={{ ...product, category: product.category?._id || product.category }}
        onSubmit={updateMutation.mutate}
        isSubmitting={updateMutation.isPending}
      />

      <div className="max-w-3xl mt-8 pt-8 border-t border-line">
        <h2 className="text-sm font-semibold text-ink mb-3">Product images</h2>
        <ImageUploader productId={id} existingImages={product.images || []} />
      </div>
    </div>
  );
};

export default ProductEditPage;
