"use client";

import { useState } from "react";
import { addTask } from "@/lib/task";
import { getCurrentUser } from "@/lib/user";
import Button from "@/components/ui/button";
import PageCard from "@/components/layout/PageCard";

export default function AddTask() {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("dom");
    const [deadline, setDeadline] = useState("");
    const [message, setMessage] = useState("");

    const handleAddTask = () => {
        if (!task.trim()) {
            setMessage("Wpisz treść zadania.");
            return;
        }

        const user = getCurrentUser();

        if (!user) {
            alert("Musisz być zalogowana");
            return;
        }

        addTask(user, {
            id: Date.now(),
            text: task,
            category,
            done: false,
            deadline,
        });

        setTask("");
        setCategory("dom");
        setDeadline("");
        setMessage("Zadanie zostało dodane.");
    };

    return (
        <PageCard>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-blue-900">Dodaj zadanie</h2>

                <input
                    type="text"
                    placeholder="Wpisz zadanie..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border border-blue-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-blue-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    <option value="dom">Dom</option>
                    <option value="szkoła">Szkoła</option>
                    <option value="hobby">Hobby</option>
                    <option value="zdrowie">Zdrowie</option>
                    <option value="praca">Praca</option>
                    <option value="inne">Inne</option>
                </select>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-blue-900">
                        Termin wykonania
                    </label>

                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border border-blue-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <Button onClick={handleAddTask}>Dodaj</Button>

                {message && (
                    <p className="text-sm text-blue-700 text-center">{message}</p>
                )}
            </div>
        </PageCard>
    );
}