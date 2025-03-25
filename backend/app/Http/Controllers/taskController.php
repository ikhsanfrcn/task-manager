<?php

namespace App\Http\Controllers;

use App\Models\TaskDetails;
use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = DB::table('task_details as A')
            ->leftJoin('employees as B', 'A.employee_id', '=', 'B.id')
            ->leftJoin('tasks as C', 'A.task_id', '=', 'C.id')
            ->select('C.id', 'C.description as task_description', 'A.id as task_detail_id', 'B.id as employee_id', 'B.name as employee_name', 'A.hourly_rate', 'A.date', 'A.hours_spent', 'A.additional_charges', 'A.total_remuneration')
            ->get();
        return response()->json($result);
    }

    public function show($id)
    {
        $tasks = Tasks::with(['taskDetails.employees'])->findOrFail($id);
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string',
            'detail' => 'required|array',
            'detail.*.employee_id' => 'required|exists:employees,id',
            'detail.*.hours_spent' => 'required|numeric|min:0',
            'detail.*.hourly_rate' => 'required|numeric|min:0',
            'detail.*.additional_charges' => 'nullable|numeric|min:0',
        ]);

        return DB::transaction(function () use ($request) {
            $tasks = Tasks::create(['description' => $request->description]);

            $additionalChargesTotal = collect($request->detail)->sum('additional_charges');
            $totalEmployees = count($request->detail);
            $employeeAditionalCharges = $totalEmployees > 0 ? $additionalChargesTotal / $totalEmployees : 0;

            foreach ($request->detail as $d) {
                $baseSalary = $d['hours_spent'] * $d['hourly_rate'];
                $remunerationTotal = $baseSalary + $employeeAditionalCharges;

                TaskDetails::create([
                    'task_id' => $tasks->id,
                    'employee_id' => $d['employee_id'],
                    'date' => now(),
                    'hours_spent' => $d['hours_spent'],
                    'hourly_rate' => $d['hourly_rate'],
                    'additional_charges' => $d['additional_charges'] ?? 0,
                    'total_remuneration' => $remunerationTotal,
                ]);
            }

            return response()->json($tasks->load('taskDetails.employees'), 201);
        });
    }

    public function remunerationCount($id)
    {
        $tasks = Tasks::with('taskDetails')->findOrFail($id);
        $additionalChargesTotal = $tasks->taskDetails->sum('additional_charges');
        $totalEmployees = $tasks->taskDetails->count();
        $employeeAditionalCharges = $totalEmployees > 0 ? $additionalChargesTotal / $totalEmployees : 0;

        $remuneration = $tasks->taskDetails->map(function ($detail) use ($employeeAditionalCharges) {
            return [
                'employee_id' => $detail->employee_id,
                'total_remuneration' => ($detail->hours_spent * $detail->hourly_rate) + $employeeAditionalCharges
            ];
        });

        return response()->json($remuneration);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string',
            'details' => 'required|array',
            'details.*.id' => 'nullable|exists:task_details,id',
            'details.*.employee_id' => 'required|exists:employees,id',
            'details.*.hours_spent' => 'required|numeric|min:0',
            'details.*.hourly_rate' => 'required|numeric|min:0',
            'details.*.additional_charges' => 'nullable|numeric|min:0',
        ]);
    
        return DB::transaction(function () use ($request, $id) {
            $task = Tasks::findOrFail($id);
            $task->update(['description' => $request->description]);
    
            $totalAdditionalCharges = collect($request->details)->sum(fn($d) => $d['additional_charges'] ?? 0);
            $totalEmployees = count($request->details);
            $additionalChargePerEmployee = $totalEmployees > 0 ? $totalAdditionalCharges / $totalEmployees : 0;
    
            $existingDetailIds = collect($request->details)->pluck('id')->filter();
            TaskDetails::where('task_id', $id)->whereNotIn('id', $existingDetailIds)->delete();
    
            foreach ($request->details as $d) {
                $baseSalary = $d['hours_spent'] * $d['hourly_rate'];
                $totalRemuneration = $baseSalary + $additionalChargePerEmployee;
    
                if (isset($d['id'])) {
                    TaskDetails::where('id', $d['id'])->update([
                        'employee_id' => $d['employee_id'],
                        'hours_spent' => $d['hours_spent'],
                        'hourly_rate' => $d['hourly_rate'],
                        'additional_charges' => $d['additional_charges'] ?? 0,
                        'total_remuneration' => $totalRemuneration,
                        'updated_at' => now(),
                    ]);
                } else {
                    TaskDetails::create([
                        'task_id' => $task->id,
                        'employee_id' => $d['employee_id'],
                        'date' => now(),
                        'hours_spent' => $d['hours_spent'],
                        'hourly_rate' => $d['hourly_rate'],
                        'additional_charges' => $d['additional_charges'] ?? 0,
                        'total_remuneration' => $totalRemuneration,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
    
            return response()->json($task->load('taskDetails.employees'), 200);
        });
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Tasks::findOrFail($id);

        TaskDetails::where('task_id', $task->id)->delete();

        $task->delete();

        return response()->json(['message' => 'Task and its details deleted successfully'], 200);
    }
}
