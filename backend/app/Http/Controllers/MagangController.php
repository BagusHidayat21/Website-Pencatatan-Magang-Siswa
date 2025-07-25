<?php

namespace App\Http\Controllers;

use App\Models\Magang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MagangController extends Controller
{
    public function index()
    {
        $magangs = Magang::with('user', 'dudi')->get();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Magang",
            "data" => $magangs
        ], 200);
    }

    public function show($id)
    {
        $magang = Magang::with('user', 'dudi')->find($id);
        if (!$magang) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Magang",
            "data" => $magang
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'dudi_id' => 'required|exists:dudis,id',
            'guru_id' => 'required|exists:users,id',    
            'periode_mulai' => 'required|date',
            'periode_selesai' => 'required|date|after:periode_mulai'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $magang = Magang::create($request->all());
        return response()->json([
            "status" => true,
            "message" => "Berhasil Menambahkan Data Magang",
            "data" => $magang
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $magang = Magang::find($id);
        if (!$magang) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'dudi_id' => 'required|exists:dudis,id',
            'guru_id' => 'required|exists:users,id',
            'periode_mulai' => 'required|date',
            'periode_selesai' => 'required|date|after:periode_mulai'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $magang->update($request->all());
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengupdate Data Magang",
            "data" => $magang
        ], 200);
    }

    public function destroy($id)
    {
        $magang = Magang::find($id);
        if (!$magang) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $magang->delete();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Menghapus Data Magang",
            "data" => $magang
        ], 200);
    }
}

