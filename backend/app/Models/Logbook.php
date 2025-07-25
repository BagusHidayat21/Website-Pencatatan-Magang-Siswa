<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Logbook extends Model
{
    /** @use HasFactory<\Database\Factories\LogbookFactory> */
    use HasFactory;

    protected $fillable = [
        'magang_id',
        'tanggal',
        'kegiatan',
        'kendala',
        'file',
        'status_verifikasi',
        'catatan_guru',
        'catatan_dudi',
    ];

    public function magang() {
        return $this->belongsTo(Magang::class);
    }
}
