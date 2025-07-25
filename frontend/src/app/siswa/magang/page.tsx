'use client'

import React, { useState } from 'react'
import { Users, Calendar, Building2, GraduationCap, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Dudi {
  id: number;
  nama_perusahaan: string;
  alamat: string;
}

interface Magang {
  id: number;
  nama_siswa: string;
  nis: string;
  kelas: string;
  jurusan: string;
  dudi: Dudi;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: 'aktif' | 'selesai' | 'pending';
  nilai_akhir?: number;
}

const statusColors = {
  aktif: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  selesai: 'bg-blue-100 text-blue-800 border-blue-200',
  pending: 'bg-amber-100 text-amber-800 border-amber-200'
}

const statusLabels = {
  aktif: 'Aktif',
  selesai: 'Selesai',
  pending: 'Pending'
}

export default function SiswaMagangPage() {
  // Data dummy, nanti ganti fetch dari backend sesuai user login
  const [magang] = useState<Magang>({
    id: 1,
    nama_siswa: "Ahmad Rizki",
    nis: "2024001",
    kelas: "XII RPL 1",
    jurusan: "Rekayasa Perangkat Lunak",
    dudi: { id: 1, nama_perusahaan: "PT Kreatif Teknologi", alamat: "Jakarta" },
    tanggal_mulai: "2024-02-01",
    tanggal_selesai: "2024-05-01",
    status: "aktif",
    nilai_akhir: 88
  })

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Status Magang Saya
        </h1>
        <p className="text-slate-600">
          Lihat informasi detail tempat dan status magang Anda
        </p>
      </div>

      {/* Card Info */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Users className="h-5 w-5 text-cyan-600" />
            Data Magang
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-slate-500">Nama Siswa</div>
              <div className="font-medium text-slate-800">{magang.nama_siswa}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-500">NIS</div>
              <div className="font-medium text-slate-800">{magang.nis}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-500">Kelas</div>
              <div className="font-medium text-slate-800">{magang.kelas}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-500">Jurusan</div>
              <div className="font-medium text-slate-800">{magang.jurusan}</div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 pt-4 grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <Building2 size={12} /> Nama Perusahaan
              </div>
              <div className="font-medium text-slate-800">{magang.dudi.nama_perusahaan}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-500">Alamat Perusahaan</div>
              <div className="font-medium text-slate-800">{magang.dudi.alamat}</div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 pt-4 grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar size={12} /> Periode Magang
              </div>
              <div className="font-medium text-slate-800">
                {formatDate(magang.tanggal_mulai)} s.d {formatDate(magang.tanggal_selesai)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-500">Status</div>
              <Badge className={`border text-xs ${statusColors[magang.status]}`}>
                {statusLabels[magang.status]}
              </Badge>
            </div>
          </div>

          {magang.nilai_akhir !== undefined && (
            <div className="border-t border-slate-200/60 pt-4">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <CheckCircle size={12} /> Nilai Akhir
              </div>
              <div className="font-medium text-slate-800">{magang.nilai_akhir}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
