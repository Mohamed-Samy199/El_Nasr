import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { productsAdminApi } from "../api/productsAdminApi.js";
import ProductsTable from "../components/ProductsTable.jsx";
import { TableSkeleton } from "../../../components/ui/Skeleton.jsx";

const ProductsListPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productsAdminApi.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: productsAdminApi.remove,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const products = data?.data?.result || [];

  const handleDelete = (id) => {
    if (confirm(t("common.confirm") + "?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl font-semibold text-olive">
          {t("dashboard.products")}
        </h1>
        <NavLink
          to="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-olive text-paper text-sm font-medium px-4 py-2 hover:bg-[#0f2a20] transition-colors"
        >
          <Plus size={16} />
          {t("dashboard.addProduct")}
        </NavLink>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : (
        <ProductsTable products={products} onDelete={handleDelete} isDeleting={deleteMutation.isPending} />
      )}
    </div>
  );
};

export default ProductsListPage;
