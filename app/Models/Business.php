<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'category',
        'contact_phone',
        'contact_whatsapp',
        'image_url',
        'status',
        'is_featured'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
