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
        'community_id',
        'is_project',
        'funding_goal',
        'funding_raised',
        'volunteers_needed',
        'volunteers_count'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function expenses()
    {
        return $this->hasMany(ProjectExpense::class);
    }

    public function steps()
    {
        return $this->hasMany(ProjectStep::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
