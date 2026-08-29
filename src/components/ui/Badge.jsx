const STATUS_CLASSES = {
  draft: "badge-draft",
  in_review: "badge-in-review",
  published: "badge-published",
  new: "badge-attention",
  in_progress: "badge-in-review",
  closed: "badge-draft",
};

/**
 * Badge حالة — بيستخدم classes الجاهزة من globals.css (badge-draft/in-review/published)
 * عشان الألوان متتكررش كـ inline styles في كل مكان.
 */
const Badge = ({ status, children }) => {
  const className = STATUS_CLASSES[status] || "badge-draft";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
