<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CommunityReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'community_id',
        'type',
        'data',
        'lat',
        'lng'
    ];

    protected $casts = [
        'data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
