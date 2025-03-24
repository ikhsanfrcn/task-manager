<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class task extends Model
{
    use HasFactory;
    protected $fillable = ['employee_id', 'description', 'hours_spent', 'hourly_rate', 'additional_charges', 'total_remuneration'];
    // public function employee() {
    //     return $this->belongsTo(Employee::class);
    // }
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

}
