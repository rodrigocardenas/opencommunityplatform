<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    protected $fillable = [
        'type',
        'severity',
        'title',
        'description',
        'prediction_date',
        'probability',
        'location'
    ];
}
