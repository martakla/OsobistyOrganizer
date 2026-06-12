type CategoryBadgeProps = {
    category: string;
};

const badgeStyles: Record<string, string> = {
    dom: "bg-blue-100 text-blue-800",
    szkoła: "bg-purple-100 text-purple-800",
    hobby: "bg-pink-100 text-pink-800",
    zdrowie: "bg-emerald-100 text-emerald-800",
    praca: "bg-amber-100 text-amber-800",
    inne: "bg-slate-100 text-slate-700",
};

const categoryLabels: Record<string, string> = {
    dom: "Dom",
    szkoła: "Szkoła",
    hobby: "Hobby",
    zdrowie: "Zdrowie",
    praca: "Praca",
    inne: "Inne",
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    return (
        <span
            className={`rounded-md px-2.5 py-1 text-xs font-medium shadow-sm ${
                badgeStyles[category] || "bg-slate-100 text-slate-700"
            }`}
        >
      {categoryLabels[category] || category}
    </span>
    );
}