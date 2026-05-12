<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectStep extends Model
{
    protected $fillable = [
        'challenge_id',
        'title',
        'description',
        'status',
        'phase',
        'responsible',
        'tasks'
    ];

    protected $casts = [
        'tasks' => 'array'
    ];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
