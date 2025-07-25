<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogbookController extends Controller
{
    public function index()
    {
        $logbooks = Logbook::with('magang')->get();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Logbook",
            "data" => $logbooks
        ], 200);
    }

    public function show($id)
    {
        $logbook = Logbook::with('magang')->find($id);

        if (!$logbook) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Logbook",
            "data" => $logbook
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "magang_id" => "required|exists:magangs,id",
            "tanggal" => "required",
            "kegiatan" => "required",
            "kendala" => "required",
            "file" => "required",
            "status_verifikasi" => "required|in:pending,disetujui,ditolak",
            "catatan_guru" => "nullable",
            "catatan_dudi" => "nullable"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $logbook = Logbook::create($request->all());

        return response()->json([
            "status" => true,
            "message" => "Berhasil Menambahkan Data Logbook",
            "data" => $logbook
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $logbook = Logbook::find($id);

        if (!$logbook) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "magang_id" => "required|exists:magangs,id",
            "tanggal" => "required",
            "kegiatan" => "required",
            "kendala" => "required",
            "file" => "required",
            "status_verifikasi" => "required|in:pending,disetujui,ditolak",
            "catatan_guru" => "nullable",
            "catatan_dudi" => "nullable"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $logbook->update($request->all());
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengupdate Data Logbook",
            "data" => $logbook
        ], 200);
    }

    public function destroy($id)
    {
        $logbook = Logbook::find($id);

        if (!$logbook) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $logbook->delete();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Menghapus Data Logbook",
            "data" => $logbook
        ], 200);
    }
}

