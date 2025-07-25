"use client";

import {
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  Clock,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Dummy data berdasarkan types yang sudah didefinisikan
const dummyData = {
  stats: {
    totalSiswa: 150,
    totalDudi: 45,
    siswaMagang: 120,
    logbookHariIni: 85,
  },
  recentMagang: [
    {
      id: 1,
      user_id: 1,
      dudi_id: 1,
      guru_id: 1,
      status: "aktif",
      periode_mulai: "2024-01-15",
      periode_selesai: "2024-04-15",
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
      user: {
        id: 1,
        name: "Ahmad Rizki",
        email: "ahmad@student.smkn1sby.sch.id",
        email_verified_at: "2024-01-10",
        role: "siswa",
        created_at: "2024-01-10",
        updated_at: "2024-01-10",
      },
      dudi: {
        id: 1,
        nama_perusahaan: "PT. Teknologi Nusantara",
        alamat: "Jl. HR Muhammad No. 123, Surabaya",
        telepon: "031-5551234",
        email: "info@teknusa.co.id",
        penanggung_jawab: "Budi Santoso",
        created_at: "2024-01-05",
        updated_at: "2024-01-05",
      },
    },
    {
      id: 2,
      user_id: 2,
      dudi_id: 2,
      guru_id: 1,
      status: "aktif",
      periode_mulai: "2024-01-20",
      periode_selesai: "2024-04-20",
      created_at: "2024-01-15",
      updated_at: "2024-01-20",
      user: {
        id: 2,
        name: "Siti Nurhaliza",
        email: "siti@student.smkn1sby.sch.id",
        email_verified_at: "2024-01-15",
        role: "siswa",
        created_at: "2024-01-15",
        updated_at: "2024-01-15",
      },
      dudi: {
        id: 2,
        nama_perusahaan: "CV. Digital Kreativa",
        alamat: "Jl. Pemuda No. 45, Surabaya",
        telepon: "031-5557890",
        email: "contact@digitalkreativa.com",
        penanggung_jawab: "Maya Sari",
        created_at: "2024-01-08",
        updated_at: "2024-01-08",
      },
    },
  ],
  recentLogbooks: [
    {
      id: 1,
      magang_id: 1,
      tanggal: "2024-07-21",
      kegiatan: "Mempelajari sistem database dan melakukan backup data harian",
      kendala: "Tidak ada kendala berarti",
      foto: "/uploads/logbook_1.jpg",
      status_verifikasi: "disetujui",
      catatan_guru: "Pekerjaan bagus, lanjutkan!",
      catatan_dudi: "Siswa menunjukkan progress yang baik",
      created_at: "2024-07-21",
      updated_at: "2024-07-21",
    },
    {
      id: 2,
      magang_id: 2,
      tanggal: "2024-07-21",
      kegiatan: "Membuat design mockup untuk website perusahaan",
      kendala: "Software design masih belum familiar",
      foto: "/uploads/logbook_2.jpg",
      status_verifikasi: "menunggu",
      catatan_guru: "",
      catatan_dudi: "",
      created_at: "2024-07-21",
      updated_at: "2024-07-21",
    },
    {
      id: 3,
      magang_id: 1,
      tanggal: "2024-07-20",
      kegiatan: "Mengikuti training keamanan sistem informasi",
      kendala: "Materi cukup kompleks untuk dipahami",
      foto: "/uploads/logbook_3.jpg",
      status_verifikasi: "disetujui",
      catatan_guru: "Terus tingkatkan pemahaman",
      catatan_dudi: "Partisipasi aktif dalam training",
      created_at: "2024-07-20",
      updated_at: "2024-07-20",
    },
  ],
  dudiAktif: [
    {
      id: 1,
      nama_perusahaan: "PT. Teknologi Nusantara",
      alamat: "Jl. HR Muhammad No. 123, Surabaya",
      telepon: "031-5551234",
      email: "info@teknusa.co.id",
      penanggung_jawab: "Budi Santoso",
      created_at: "2024-01-05",
      updated_at: "2024-01-05",
      siswaMagang: 8,
    },
    {
      id: 2,
      nama_perusahaan: "CV. Digital Kreativa",
      alamat: "Jl. Pemuda No. 45, Surabaya",
      telepon: "031-5557890",
      email: "contact@digitalkreativa.com",
      penanggung_jawab: "Maya Sari",
      created_at: "2024-01-08",
      updated_at: "2024-01-08",
      siswaMagang: 5,
    },
    {
      id: 3,
      nama_perusahaan: "PT. Inovasi Mandiri",
      alamat: "Jl. Diponegoro No. 78, Surabaya",
      telepon: "031-5553456",
      email: "hr@inovasimandiri.co.id",
      penanggung_jawab: "Andi Wijaya",
      created_at: "2024-01-12",
      updated_at: "2024-01-12",
      siswaMagang: 12,
    },
  ],
};

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aktif":
        return (
          <Badge className="bg-lime-100 text-lime-700 hover:bg-lime-100">
            Aktif
          </Badge>
        );
      case "selesai":
        return (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
            Selesai
          </Badge>
        );
      case "ditunda":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Ditunda
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "disetujui":
        return (
          <Badge className="bg-lime-100 text-lime-700 hover:bg-lime-100">
            Disetujui
          </Badge>
        );
      case "ditolak":
        return (
          <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
            Ditolak
          </Badge>
        );
      case "menunggu":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Menunggu
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600">
          Selamat datang di sistem pelaporan magang siswa SMK Negeri 1 Surabaya
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Siswa
            </CardTitle>
            <Users className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dummyData.stats.totalSiswa}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Seluruh siswa terdaftar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              DUDI Partner
            </CardTitle>
            <Building2 className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dummyData.stats.totalDudi}
            </div>
            <p className="text-xs text-slate-500 mt-1">Perusahaan mitra</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Siswa Magang
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dummyData.stats.siswaMagang}
            </div>
            <p className="text-xs text-slate-500 mt-1">Sedang aktif magang</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Logbook Hari Ini
            </CardTitle>
            <BookOpen className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dummyData.stats.logbookHariIni}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Laporan masuk hari ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Magang - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <GraduationCap className="h-5 w-5 text-cyan-600" />
                Magang Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyData.recentMagang.map((magang) => (
                  <div
                    key={magang.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">
                          {magang.user?.name}
                        </h4>
                        {getStatusBadge(magang.status)}
                      </div>
                      <p className="text-sm text-slate-600">
                        {magang.dudi?.nama_perusahaan}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(magang.periode_mulai).toLocaleDateString(
                            "id-ID"
                          )}{" "}
                          -{" "}
                          {new Date(magang.periode_selesai).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Logbooks */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <BookOpen className="h-5 w-5 text-lime-600" />
                Logbook Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyData.recentLogbooks.map((logbook) => (
                  <div
                    key={logbook.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-lime-500 to-lime-600">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">
                          {logbook.kegiatan}
                        </p>
                        {getVerificationBadge(logbook.status_verifikasi)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(logbook.tanggal).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>
                      </div>
                      {logbook.kendala && (
                        <p className="text-xs text-amber-600 italic">
                          Kendala: {logbook.kendala}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Siswa Aktif Magang</span>
                  <span className="font-medium text-slate-900">
                    {Math.round(
                      (dummyData.stats.siswaMagang /
                        dummyData.stats.totalSiswa) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (dummyData.stats.siswaMagang / dummyData.stats.totalSiswa) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Logbook Hari Ini</span>
                  <span className="font-medium text-slate-900">
                    {Math.round(
                      (dummyData.stats.logbookHariIni /
                        dummyData.stats.siswaMagang) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (dummyData.stats.logbookHariIni /
                      dummyData.stats.siswaMagang) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Top DUDI */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Building2 className="h-5 w-5 text-orange-600" />
                DUDI Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyData.dudiAktif.map((dudi) => (
                  <div key={dudi.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 text-sm line-clamp-1">
                        {dudi.nama_perusahaan}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {dudi.siswaMagang} siswa
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{dudi.alamat}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Phone className="h-3 w-3" />
                      <span>{dudi.telepon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
