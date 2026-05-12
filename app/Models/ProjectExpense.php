<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectExpense extends Model
{
    protected $fillable = [
        'challenge_id',
        'description',
        'amount',
        'date'
    ];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
