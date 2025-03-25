<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = ['description'];

    public function taskDetails()
    {
        return $this->hasMany(TaskDetails::class, 'task_id');
    }
}