<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Siswa;

class SiswaController extends Controller
{

    public function index()
    {
        $siswa = Siswa::with('user')->get();

        if ($siswa->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Data kosong',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Daftar siswa',
            'data' => $siswa
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|string|max:255|unique:siswa',
            'kelas' => 'required|string|max:255',
            'jurusan' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:255',
        ]);

        $siswa = Siswa::create([
            'nama' => $request->nama,
            'nis' => $request->nis,
            'kelas' => $request->kelas,
            'jurusan' => $request->jurusan,
            'alamat' => $request->alamat,
            'telepon' => $request->telepon,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Berhasil menambahkan siswa',
            'data' => $siswa
        ], 201);
    }

    public function show($id)
    {
        $siswa = Siswa::with('user')->find($id);

        if (!$siswa) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Detail siswa',
            'data' => $siswa
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nis' => 'required|string|max:255|unique:siswa,nis,' . $id,
            'kelas' => 'required|string|max:255',
            'jurusan' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'telepon' => 'required|string|max:255',
        ]);

        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        $siswa->update([
            'nama' => $request->nama,
            'nis' => $request->nis,
            'kelas' => $request->kelas,
            'jurusan' => $request->jurusan,
            'alamat' => $request->alamat,
            'telepon' => $request->telepon,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengubah data siswa',
            'data' => $siswa
        ], 200);
    }

    public function destroy($id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        $siswa->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus data siswa',
        ], 200);
    }
}



