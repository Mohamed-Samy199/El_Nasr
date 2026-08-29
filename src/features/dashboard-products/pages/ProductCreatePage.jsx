import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { productsAdminApi } from "../api/productsAdminApi.js";
import ProductForm from "../components/ProductForm.jsx";

const ProductCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productsAdminApi.create,
    onSuccess: (response) => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      // بنحول مباشرة لصفحة التعديل عشان يقدر يرفع صور —
      // الرفع محتاج productId موجود بالفعل زي ما اتفقنا في تصميم الـ upload flow
      navigate(`/dashboard/products/${response.data.product._id}/edit`);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-olive mb-6">
        {t("dashboard.addProduct")}
      </h1>
      <ProductForm onSubmit={createMutation.mutate} isSubmitting={createMutation.isPending} />
    </div>
  );
};

export default ProductCreatePage;
