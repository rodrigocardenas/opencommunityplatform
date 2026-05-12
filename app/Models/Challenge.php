<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    /** @use HasFactory<\Database\Factories\ChallengeFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'status',
        'address',
        'lat',
        'lng',
        'votes_count',
        'user_id',
        'community_id'
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
