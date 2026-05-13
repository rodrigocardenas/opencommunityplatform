<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TerritorialIndicator extends Model
{
    protected $fillable = [
        'community_id',
        'name',
        'value',
        'unit',
        'measured_at'
    ];

    protected $casts = [
        'measured_at' => 'date'
    ];

    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
