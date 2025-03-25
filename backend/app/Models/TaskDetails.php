<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskDetails extends Model
{
    protected $fillable = [
        'task_id',
        'employee_id',
        'date',
        'hours_spent',
        'hourly_rate',
        'additional_charges',
        'total_remuneration'
    ];

    public function employees()
    {
        return $this->belongsTo(Employees::class, 'id');
    }
}