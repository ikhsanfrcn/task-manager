"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editTask, fetchTasks } from "../redux/slices/taskSlice";
import { AppDispatch } from "@/redux/store";
import { Employee, Task } from "@/type";
import { Button } from "./atoms/button";

interface TaskEditFormProps {
    isOpen: boolean;
    closeModal: () => void;
    task: Task | null;
    employees: Employee[];
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ isOpen, closeModal, task, employees }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<{
        description: string;
        employee_id: string;
        hours_spent: string;
        hourly_rate: string;
        additional_charges: string;
    }>({
        description: "",
        employee_id: "",
        hours_spent: "",
        hourly_rate: "",
        additional_charges: "",
    });

    useEffect(() => {
        if (task) {
            setFormData({
                description: task.description || "",
                employee_id: task.employee_id.toString() || "",
                hours_spent: task.hours_spent.toString() || "",
                hourly_rate: task.hourly_rate.toString() || "",
                additional_charges: task.additional_charges?.toString() || "",
            });
        }
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (loading) return;

        setLoading(true);
        
        if (!formData.description || !formData.employee_id || !formData.hours_spent || !formData.hourly_rate) {
            console.error("Form is incomplete");
            setLoading(false);
            return;
        }
    
        try {
            if (task) {
                const response = await dispatch(
                    editTask({
                        id: task.id, 
                        taskData: { 
                            description: formData.description,
                            employee_id: Number(formData.employee_id), 
                            hours_spent: Number(formData.hours_spent),
                            hourly_rate: Number(formData.hourly_rate),
                            additional_charges: formData.additional_charges ? Number(formData.additional_charges) : 0, 
                        }
                    })
                ).unwrap();
                console.log(response);
                dispatch(fetchTasks()); 
                closeModal();
            }
        } catch (error) {
            console.error("Failed to edit task:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Employee</label>
                            <select
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Hours Spent</label>
                            <input
                                type="number"
                                name="hours_spent"
                                value={formData.hours_spent}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                                min="0"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Hourly Rate</label>
                            <input
                                type="number"
                                name="hourly_rate"
                                value={formData.hourly_rate}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                                min="0"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Additional Charges</label>
                            <input
                                type="number"
                                name="additional_charges"
                                value={formData.additional_charges}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default TaskEditForm;
