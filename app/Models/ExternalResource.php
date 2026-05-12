<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalResource extends Model
{
    protected $fillable = [
        'provider',
        'program',
        'category',
        'target_population',
        'budget_available',
        'status'
    ];
}
