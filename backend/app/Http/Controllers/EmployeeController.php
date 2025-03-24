<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    // Get all employees
    public function index()
    {
        //return response()->json(Employee::all());
        return response()->json(Employee::orderBy('id', 'asc')->get());
    }

    // Create a new employee
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $employee = Employee::create($request->all());
        return response()->json($employee, 201);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
