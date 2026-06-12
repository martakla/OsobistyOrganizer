"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask, toggleTask, Task } from "@/lib/task";
import { getCurrentUser } from "@/lib/user";
import PageCard from "@/components/layout/PageCard";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskCard from "@/components/tasks/TaskCard";

export default function SeeTask() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const user = getCurrentUser();

        if (!user) return;

        setTasks(getTasks(user));
    }, []);

    const handleDelete = (id: number) => {
        const user = getCurrentUser();

        if (!user) return;

        setTasks(deleteTask(user, id));
    };

    const handleToggle = (id: number) => {
        const user = getCurrentUser();

        if (!user) return;

        setTasks(toggleTask(user, id));
    };

    const filteredTasks = tasks
        .filter((task) => (filter === "all" ? true : task.category === filter))
        .sort((a, b) => {
            if (!a.deadline && !b.deadline) return b.id - a.id;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;

            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });

    return (
        <PageCard wide>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
                Twoje zadania
            </h2>

            <p className="text-sm text-blue-500 mb-4">
                Tutaj możesz przeglądać swoje zadania, filtrować je według kategorii,
                oznaczać jako wykonane albo usuwać za pomocą przycisków.
            </p>

            <TaskFilters filter={filter} setFilter={setFilter} />

            {filteredTasks.length === 0 ? (
                <div className="bg-blue-50 rounded-xl p-4 text-center mt-4">
                    <p className="text-blue-900 font-medium">
                        Brak zadań w tej kategorii
                    </p>

                    <p className="text-sm text-blue-700 mt-1">
                        Dodaj nowe zadanie w zakładce „Dodaj zadanie”.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3 mt-4">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))}
                </ul>
            )}
        </PageCard>
    );
}