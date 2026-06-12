import Button from "@/components/ui/button";

const CATEGORIES = [
    { label: "Wszystkie", value: "all" },
    { label: "Dom", value: "dom" },
    { label: "Szkoła", value: "szkoła" },
    { label: "Hobby", value: "hobby" },
    { label: "Zdrowie", value: "zdrowie" },
    { label: "Praca", value: "praca" },
    { label: "Inne", value: "inne" },
];

type TaskFiltersProps = {
    filter: string;
    setFilter: (value: string) => void;
};

export default function TaskFilters({ filter, setFilter }: TaskFiltersProps) {
    return (
        <nav className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((category) => (
                <Button
                    key={category.value}
                    onClick={() => setFilter(category.value)}
                    variant={filter === category.value ? "primary" : "light"}
                    className="text-sm"
                >
                    {category.label}
                </Button>
            ))}
        </nav>
    );
}