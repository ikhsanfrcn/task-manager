<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {
    // public function index() {
    //     return Task::with('employee')->get();
    // }
    public function index()
{
    $tasks = Task::with('employee')->orderBy('created_at', 'desc')->get();
    return response()->json($tasks);
}


    // public function store(Request $request) {
    //     $request->validate([
    //         'employee_id' => 'required|exists:employees,id',
    //         'description' => 'required|string',
    //         'hours_spent' => 'required|numeric',
    //         'hourly_rate' => 'required|numeric',
    //         'additional_charges' => 'nullable|numeric',
    //     ]);

    //     $total = ($request->hours_spent * $request->hourly_rate) + ($request->additional_charges ?? 0);

    //     return Task::create(array_merge($request->all(), ['total_remuneration' => $total]));
    // }
    public function store(Request $request)
{
    $validated = $request->validate([
        'description' => 'required|string',
        'employee_id' => 'required|exists:employees,id',
        'hours_spent' => 'required|numeric',
        'hourly_rate' => 'required|numeric',
        'additional_charges' => 'nullable|numeric',
    ]);

    $validated['total_remuneration'] = ($validated['hours_spent'] * $validated['hourly_rate']) + ($validated['additional_charges'] ?? 0);

    Task::create($validated);

    return response()->json(['message' => 'Task berhasil ditambahkan']);
}


    public function show(Task $task) {
        return $task->load('employee');
    }

    public function update(Request $request, Task $task) {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'description' => 'required|string',
            'hours_spent' => 'required|numeric',
            'hourly_rate' => 'required|numeric',
            'additional_charges' => 'nullable|numeric',
        ]);

        $total = ($request->hours_spent * $request->hourly_rate) + ($request->additional_charges ?? 0);

        $task->update(array_merge($request->all(), ['total_remuneration' => $total]));

        return $task;
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
