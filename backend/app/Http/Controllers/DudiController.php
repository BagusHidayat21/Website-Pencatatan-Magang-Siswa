<?php

namespace App\Http\Controllers;

use App\Models\Dudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DudiController extends Controller
{
    public function index() {
        $dudis = Dudi::with('user')->get();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Dudi",
            "count" => $dudis->count(),
            "data" => $dudis
        ], 200);
    }

    public function show($id) {
        $dudi = Dudi::with('user')->find($id);

        if (!$dudi) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengambil Data Dudi",
            "data" => $dudi
        ], 200);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            "nama_perusahaan" => "required",
            "alamat" => "required",
            "telepon" => "required",
            "email" => "required",
            "penanggung_jawab" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $dudi = Dudi::create($request->all());

        return response()->json([
            "status" => true,
            "message" => "Berhasil Menambahkan Data Dudi",
            "data" => $dudi
        ], 200);
    }

    public function update(Request $request, $id) {
        $dudi = Dudi::find($id);

        if (!$dudi) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "nama_perusahaan" => "required",
            "alamat" => "required",
            "telepon" => "required",
            "email" => "required",
            "penanggung_jawab" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $dudi->update($request->all());
        return response()->json([
            "status" => true,
            "message" => "Berhasil Mengupdate Data Dudi",
            "data" => $dudi
        ], 200);
    }

    public function destroy($id) {
        $dudi = Dudi::find($id);

        if (!$dudi) {
            return response()->json([
                "status" => false,
                "message" => "Data tidak ditemukan"
            ], 404);
        }

        $dudi->delete();
        return response()->json([
            "status" => true,
            "message" => "Berhasil Menghapus Data Dudi",
            "data" => $dudi
        ], 200);
    }
}

