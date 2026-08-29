/**
 * Skeletons — بديل نص "Loading..." بشكل بصري بيوحي بشكل المحتوى الجاي،
 * بيقلل الإحساس بالانتظار. كل واحد بيتكرر لعدد مرات (count) حسب المكان.
 */

const pulse = "animate-pulse bg-muted rounded-card";

export const ProductCardSkeleton = () => (
  <div className="bg-card border border-line rounded-card overflow-hidden">
    <div className={`aspect-[4/3] ${pulse} rounded-none`} />
    <div className="p-5 space-y-2">
      <div className={`h-3 w-20 ${pulse}`} />
      <div className={`h-5 w-3/4 ${pulse}`} />
      <div className={`h-3 w-1/2 ${pulse}`} />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="border-b border-line last:border-0">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className={`h-4 w-full ${pulse}`} />
      </td>
    ))}
  </tr>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="bg-card border border-line rounded-card shadow-card overflow-hidden">
    <table className="w-full text-sm">
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

export const StatsCardSkeleton = () => (
  <div className="bg-card border border-line rounded-card shadow-card p-5">
    <div className={`h-3 w-24 ${pulse} mb-4`} />
    <div className={`h-8 w-16 ${pulse}`} />
  </div>
);

export const StatsGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <StatsCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailsSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-12">
    <div className={`aspect-[4/3] ${pulse}`} />
    <div className="space-y-4">
      <div className={`h-3 w-24 ${pulse}`} />
      <div className={`h-9 w-3/4 ${pulse}`} />
      <div className={`h-4 w-full ${pulse}`} />
      <div className={`h-4 w-5/6 ${pulse}`} />
      <div className={`h-32 w-full ${pulse}`} />
    </div>
  </div>
);
