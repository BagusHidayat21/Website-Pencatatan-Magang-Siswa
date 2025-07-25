<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    /** @use HasFactory<\Database\Factories\SiswaFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'nis',
        'kelas',
        'jurusan',
        'alamat',
        'telepon',
    ];

    public function user()
    {
        return $this->hasMany(User::class);
    }
}
