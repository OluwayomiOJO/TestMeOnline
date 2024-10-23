<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['quiz', 'options', 'answer', 'user_id'];
    // protected $casts = [
    //     'options' => 'array',  // Automatically cast 'options' as an array
    // ];
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
