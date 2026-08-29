import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { categoriesAdminApi } from "../api/categoriesAdminApi.js";
import CategoryForm from "../components/CategoryForm.jsx";
import CategoriesTable from "../components/CategoriesTable.jsx";
import { TableSkeleton } from "../../../components/ui/Skeleton.jsx";

const CategoriesPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState(null); // null = مفيش فورم ظاهر
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: categoriesAdminApi.getAll,
  });

  const categories = data?.data?.categories || [];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-categories"] });

  const createMutation = useMutation({
    mutationFn: categoriesAdminApi.create,
    onSuccess: () => {
      toast.success("Category created");
      invalidate();
      setShowForm(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => categoriesAdminApi.update(id, data),
    onSuccess: () => {
      toast.success("Category updated");
      invalidate();
      setEditingCategory(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: categoriesAdminApi.remove,
    onSuccess: () => {
      toast.success("Category deleted");
      invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, data: values });
    } else {
      createMutation.mutate(values, { onSuccess: () => resetForm() });
    }
  };

  const handleDelete = (id) => {
    if (confirm(t("common.confirm") + "?")) deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-2xl font-semibold text-olive">{t("dashboard.categories")}</h1>
        {!showForm && !editingCategory && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-olive text-paper text-sm font-medium px-4 py-2 hover:bg-[#0f2a20] transition-colors"
          >
            <Plus size={16} />
            {t("dashboard.addCategory")}
          </button>
        )}
      </div>

      {(showForm || editingCategory) && (
        <div className="mb-6">
          <CategoryForm
            initialValues={editingCategory}
            onSubmit={handleSubmit}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onCancel={() => {
              setShowForm(false);
              setEditingCategory(null);
            }}
          />
        </div>
      )}

      {isLoading ? (
        <TableSkeleton rows={4} columns={3} />
      ) : (
        <CategoriesTable
          categories={categories}
          onEdit={(cat) => {
            setEditingCategory(cat);
            setShowForm(false);
          }}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
