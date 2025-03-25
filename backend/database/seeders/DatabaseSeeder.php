<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Employees;
use App\Models\TaskDetails;
use App\Models\Tasks;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $employeeA = Employees::create(['name' => 'Pegawai A']);
        $employeeB = Employees::create(['name' => 'Pegawai B']);
    
        $tasksX = Tasks::create(['description' => 'Tasks X']);
    
        TaskDetails::create([
            'task_id' => $tasksX->id,
            'employee_id' => $employeeA->id,
            'date' => '2025-03-25',
            'hours_spent' => 5,
            'hourly_rate' => 50,
            'additional_charges' => 100
        ]);
    
        TaskDetails::create([
            'task_id' => $tasksX->id,
            'employee_id' => $employeeB->id,
            'date' => '2025-03-25',
            'hours_spent' => 3,
            'hourly_rate' => 60,
            'additional_charges' => 100
        ]);
    }
}
