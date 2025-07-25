<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guru;
use Illuminate\Support\Facades\Validator;

class GuruController extends Controller
{

    public function index()
    {
        $gurus = Guru::with('user')->get();

        if ($gurus->isEmpty()) {
            return response()->json([
                "status" => false,
                "message" => "Data Guru Kosong"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Guru",
            "data" => $gurus
        ], 200);
    }

    public function show($id)
    {
        $guru = Guru::with('user')->find($id);

        if (!$guru) {
            return response()->json([
                "status" => false,
                "message" => "Data Guru Tidak Ditemukan"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Guru",
            "data" => $guru
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nip' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:15'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validasi Gagal",
                "errors" => $validator->errors()
            ], 422);
        }

        $guru = Guru::create($request->all());

        return response()->json([
            "status" => true,
            "message" => "Berhasil Menambahkan Data Guru",
            "data" => $guru
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $guru = Guru::find($id);

        if (!$guru) {
            return response()->json([
                "status" => false,
                "message" => "Data Guru Tidak Ditemukan"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nip' => 'required|string|max:20',
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:15'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validasi Gagal",
                "errors" => $validator->errors()
            ], 422);
        }

        $guru->update($request->all());

        return response()->json([
            "status" => true,
            "message" => "Berhasil Memperbarui Data Guru",
            "data" => $guru
        ], 200);
    }

    public function destroy($id)
    {
        $guru = Guru::find($id);

        if (!$guru) {
            return response()->json([
                "status" => false,
                "message" => "Data Guru Tidak Ditemukan"
            ], 404);
        }

        $guru->delete();

        return response()->json([
            "status" => true,
            "message" => "Berhasil Menghapus Data Guru"
        ], 200);
    }
}

