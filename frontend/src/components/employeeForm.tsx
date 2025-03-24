"use client";

import { addEmployee } from "@/redux/slices/employeeSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./atoms/button";

interface EmployeeFormProps {
    isOpen: boolean;
    closeModal: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        if (!name.trim()) {
            console.log("The employee's name cannot be empty");
            return;
        }
        setLoading(true);
        try {
            await dispatch(addEmployee({ name })).unwrap();
            console.log("Employee successfully added");
            setName("");
            closeModal();
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "An unexpected error occurred";
            console.log(errMsg);

        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-4"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-md"
                            onClick={closeModal}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
