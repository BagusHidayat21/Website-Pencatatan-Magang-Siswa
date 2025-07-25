<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dudi extends Model
{
    /** @use HasFactory<\Database\Factories\DudiFactory> */
    use HasFactory;

    protected $fillable = [
        'nama_perusahaan',
        'alamat',
        'telepon',
        'email',
        'penanggung_jawab',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
