import type { Task } from "@/lib/task";
import Button from "@/components/ui/button";
import CategoryBadge from "@/components/tasks/CategoryBadge";

type TaskCardProps = {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
};

const taskCardStyles: Record<string, string> = {
    dom: "bg-blue-50 border-blue-100",
    szkoła: "bg-blue-50 border-blue-100",
    hobby: "bg-blue-50 border-blue-100",
    zdrowie: "bg-blue-50 border-blue-100",
    praca: "bg-blue-50 border-blue-100",
    inne: "bg-blue-50 border-blue-100",
};

function formatDate(date: string | number) {
    return new Date(date).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function getDaysLeft(deadline?: string) {
    if (!deadline) return null;

    const today = new Date();
    const endDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const difference = endDate.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getDeadlineMessage(daysLeft: number | null) {
    if (daysLeft === null) return null;

    if (daysLeft < 0) {
        const daysAfter = Math.abs(daysLeft);

        if (daysAfter === 1) {
            return "Po terminie: 1 dzień";
        }

        return `Po terminie: ${daysAfter} dni`;
    }

    if (daysLeft === 0) {
        return "Termin dzisiaj";
    }

    if (daysLeft === 1) {
        return "Pozostał 1 dzień";
    }

    return `Pozostało ${daysLeft} dni`;
}

function getDeadlineStyle(daysLeft: number | null) {
    if (daysLeft === null) return "text-blue-400";

    if (daysLeft < 0) return "text-rose-400";
    if (daysLeft === 0) return "text-orange-400";
    if (daysLeft <= 3) return "text-amber-400";

    return "text-blue-400";
}

export default function TaskCard({
                                     task,
                                     onDelete,
                                     onToggle,
                                 }: TaskCardProps) {
    const addedDate = formatDate(task.id);
    const deadlineDate = task.deadline ? formatDate(task.deadline) : null;
    const daysLeft = getDaysLeft(task.deadline);
    const deadlineMessage = getDeadlineMessage(daysLeft);
    const deadlineStyle = getDeadlineStyle(daysLeft);

    return (
        <li
            className={`rounded-2xl border px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                taskCardStyles[task.category] || "bg-blue-50 border-blue-100"
            }`}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <div className="mb-3 flex items-center">
                        <CategoryBadge category={task.category} />
                    </div>

                    <p
                        className={`text-base font-semibold transition ${
                            task.done ? "text-slate-400 line-through" : "text-slate-800"
                        }`}
                    >
                        {task.text}
                    </p>

                    <div className="mt-3 flex flex-col gap-1 text-xs font-medium">
                        <p className="text-blue-400">Dodano: {addedDate}</p>

                        {deadlineDate && (
                            <>
                                <p className="text-blue-400">Termin: {deadlineDate}</p>
                                <p className={deadlineStyle}>{deadlineMessage}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-white/70 pt-3">
                    <Button
                        variant={task.done ? "light" : "ghost"}
                        onClick={() => onToggle(task.id)}
                        className="text-xs"
                    >
                        {task.done ? "Cofnij wykonanie" : "Oznacz jako wykonane"}
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => onDelete(task.id)}
                        className="text-xs"
                    >
                        Usuń
                    </Button>
                </div>
            </div>
        </li>
    );
}