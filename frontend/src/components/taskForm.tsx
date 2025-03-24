"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasks } from "../redux/slices/taskSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Employee } from "@/type";
import { Button } from "./atoms/button";

interface TaskFormProps {
    isOpen: boolean;
    closeModal: () => void;
    employees: Employee[];
}


const TaskForm: React.FC<TaskFormProps> = ({ isOpen, closeModal }) => {

    const dispatch = useDispatch<AppDispatch>();
    const employees = useSelector((state: RootState) => state.employees.employees);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        employee_id: "",
        hours_spent: "",
        hourly_rate: "",
        additional_charges: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "hours_spent" || name === "hourly_rate" || name === "additional_charges" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);
        try {
            const response = await dispatch(
                addTask({
                    employee_id: Number(formData.employee_id),
                    description: formData.description,
                    hours_spent: Number(formData.hours_spent),
                    hourly_rate: Number(formData.hourly_rate),
                    additional_charges: formData.additional_charges ? Number(formData.additional_charges) : 0
                })
            ).unwrap();
            console.log(response);
            dispatch(fetchTasks());
            closeModal();
        } catch (error) {
            console.error("Failed to add task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Add Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Employee</label>
                            <select name="employee_id" value={formData.employee_id} onChange={handleChange} className="w-full border p-2 rounded" required>
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Hours Spent</label>
                            <input type="number" name="hours_spent" value={formData.hours_spent} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Hourly Rate</label>
                            <input type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange} className="w-full border p-2 rounded" required />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Additional Charges</label>
                            <input type="number" name="additional_charges" value={formData.additional_charges} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</Button>
                            <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>{loading ? "Loading..." : "Add"}</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default TaskForm;