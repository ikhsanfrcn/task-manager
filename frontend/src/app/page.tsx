"use client";

import { Button } from "@/components/atoms/button";
import DeleteConfirmation from "@/components/molecules/deleteConfimation";
import EmployeeForm from "@/components/employeeForm";
import TaskEditForm from "@/components/taskEditForm";
import TaskForm from "@/components/taskForm";
import { deleteEmployee } from "@/redux/slices/employeeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTasks, deleteTask } from "@/redux/slices/taskSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iTaskDetails } from "@/type";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const employees = useSelector((state: RootState) => state.employees.employees);
    const { tasks } = useSelector((state: RootState) => state.tasks);
    const [isEmployeeFormOpen, setEmployeeFormOpen] = useState(false);
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);
    const [isTaskEditFormOpen, setTaskEditFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<iTaskDetails | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);


    useEffect(() => {
        //dispatch(fetchEmployees())
        dispatch(fetchTasks());
    }, [dispatch]);

    const openEditTaskModal = (task: iTaskDetails) => {
        setTaskToEdit(task);
        setTaskEditFormOpen(true);
    };

    const closeEditTaskModal = () => {
        setTaskEditFormOpen(false);
        setTaskToEdit(null);
    };

    const openDeleteModalTask = (id: number) => {
        setTaskToDelete(id);
        setDeleteModalOpen(true);
    };

    const openDeleteModalEmployee = (employee_id: number) => {
        setEmployeeToDelete(employee_id);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (taskToDelete !== null) {
            dispatch(deleteTask(taskToDelete));
            setDeleteModalOpen(false);
            setTaskToDelete(null);
        }

        if (employeeToDelete !== null) {
            dispatch(deleteEmployee(employeeToDelete));
            setDeleteModalOpen(false);
            setEmployeeToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setTaskToDelete(null);
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="flex gap-4 mb-4">
                <Button
                    onClick={() => setEmployeeFormOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Employee
                </Button>
                <Button
                    onClick={() => setTaskFormOpen(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Task
                </Button>
            </div>

            {/* Employee Form Modal */}
            {isEmployeeFormOpen && (
                <EmployeeForm isOpen={isEmployeeFormOpen} closeModal={() => setEmployeeFormOpen(false)} />
            )}

            {/* Task Form Modal */}
            {isTaskFormOpen && (
                <TaskForm
                    isOpen={isTaskFormOpen}
                    closeModal={() => setTaskFormOpen(false)}
                    employees={employees}
                />
            )}

            {/* Task Edit Modal */}
            {isTaskEditFormOpen && taskToEdit && (
                <TaskEditForm
                    task={taskToEdit}
                    isOpen={isTaskEditFormOpen}
                    closeModal={closeEditTaskModal}
                    employees={employees}
                />
            )}

            {/* Employee Table */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Employee List</h2>
            <table className="border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Button
                                    onClick={() => openDeleteModalEmployee(employee.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Task Table */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Tasks List</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Employee</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Hours Spent</th>
                        <th className="border border-gray-300 px-4 py-2">Hourly Rate</th>
                        <th className="border border-gray-300 px-4 py-2">Additional Charges</th>
                        <th className="border border-gray-300 px-4 py-2">Total Remuneration</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        const taskKey = `${task.id}-${task.employee_id}-${index}`;
                        console.log(tasks);

                        return (
                            <tr key={taskKey} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{task.employee_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.task_description}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.hours_spent}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.hourly_rate}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.additional_charges}</td>
                                <td className="border border-gray-300 px-4 py-2">{task.total_remuneration}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Button
                                        onClick={() => openEditTaskModal(task)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => openDeleteModalTask(task.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                closeModal={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default Page;
