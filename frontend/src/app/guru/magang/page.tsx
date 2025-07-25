"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  Building2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  alamat: string;
  telepon: string;
  email: string;
  dudi_id: number;
  dudi?: Dudi;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: "aktif" | "selesai" | "pending";
  nilai_akhir?: number;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  aktif: "bg-emerald-100 text-emerald-800 border-emerald-200",
  selesai: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
};

const statusLabels = {
  aktif: "Aktif",
  selesai: "Selesai",
  pending: "Pending",
};

export default function AdminMagangPage() {
  const [magangList, setMagangList] = useState<Magang[]>([
    {
      id: 1,
      nama_siswa: "Ahmad Rizki",
      nis: "2024001",
      kelas: "XII RPL 1",
      jurusan: "Rekayasa Perangkat Lunak",
      alamat: "Jl. Mawar No. 15, Surabaya",
      telepon: "081234567890",
      email: "ahmad.rizki@email.com",
      dudi_id: 1,
      dudi: {
        id: 1,
        nama_perusahaan: "PT Kreatif Teknologi",
        alamat: "Jakarta",
      },
      tanggal_mulai: "2024-02-01",
      tanggal_selesai: "2024-05-01",
      status: "aktif",
      created_at: "",
      updated_at: "",
    },
    {
      id: 2,
      nama_siswa: "Siti Nurhaliza",
      nis: "2024002",
      kelas: "XII RPL 2",
      jurusan: "Rekayasa Perangkat Lunak",
      alamat: "Jl. Melati No. 22, Surabaya",
      telepon: "081987654321",
      email: "siti.nur@email.com",
      dudi_id: 2,
      dudi: { id: 2, nama_perusahaan: "CV Digital Solusi", alamat: "Surabaya" },
      tanggal_mulai: "2024-01-15",
      tanggal_selesai: "2024-04-15",
      status: "selesai",
      nilai_akhir: 87,
      created_at: "",
      updated_at: "",
    },
    {
      id: 3,
      nama_siswa: "Budi Santoso",
      nis: "2024003",
      kelas: "XII TKJ 1",
      jurusan: "Teknik Komputer Jaringan",
      alamat: "Jl. Anggrek No. 8, Surabaya",
      telepon: "082345678901",
      email: "budi.santoso@email.com",
      dudi_id: 3,
      dudi: {
        id: 3,
        nama_perusahaan: "PT Inovasi Mandiri",
        alamat: "Surabaya",
      },
      tanggal_mulai: "2024-03-01",
      tanggal_selesai: "2024-06-01",
      status: "pending",
      created_at: "",
      updated_at: "",
    },
    {
      id: 4,
      nama_siswa: "Dewi Lestari",
      nis: "2024004",
      kelas: "XII RPL 1",
      jurusan: "Rekayasa Perangkat Lunak",
      alamat: "Jl. Kenanga No. 12, Surabaya",
      telepon: "083456789012",
      email: "dewi.lestari@email.com",
      dudi_id: 1,
      dudi: {
        id: 1,
        nama_perusahaan: "PT Kreatif Teknologi",
        alamat: "Jakarta",
      },
      tanggal_mulai: "2024-02-15",
      tanggal_selesai: "2024-05-15",
      status: "aktif",
      created_at: "",
      updated_at: "",
    },
    {
      id: 5,
      nama_siswa: "Randi Pratama",
      nis: "2024005",
      kelas: "XII TKJ 2",
      jurusan: "Teknik Komputer Jaringan",
      alamat: "Jl. Dahlia No. 25, Surabaya",
      telepon: "084567890123",
      email: "randi.pratama@email.com",
      dudi_id: 4,
      dudi: { id: 4, nama_perusahaan: "PT Teknologi Maju", alamat: "Jakarta" },
      tanggal_mulai: "2024-01-01",
      tanggal_selesai: "2024-04-01",
      status: "selesai",
      nilai_akhir: 92,
      created_at: "",
      updated_at: "",
    },
    {
      id: 6,
      nama_siswa: "Maya Indira",
      nis: "2024006",
      kelas: "XII MM 1",
      jurusan: "Multimedia",
      alamat: "Jl. Tulip No. 18, Surabaya",
      telepon: "085678901234",
      email: "maya.indira@email.com",
      dudi_id: 5,
      dudi: {
        id: 5,
        nama_perusahaan: "CV Solusi Digital Prima",
        alamat: "Bandung",
      },
      tanggal_mulai: "2024-03-15",
      tanggal_selesai: "2024-06-15",
      status: "aktif",
      created_at: "",
      updated_at: "",
    },
  ]);

  const [dudiOptions] = useState<Dudi[]>([
    { id: 1, nama_perusahaan: "PT Kreatif Teknologi", alamat: "Jakarta" },
    { id: 2, nama_perusahaan: "CV Digital Solusi", alamat: "Surabaya" },
    { id: 3, nama_perusahaan: "PT Inovasi Mandiri", alamat: "Surabaya" },
    { id: 4, nama_perusahaan: "PT Teknologi Maju", alamat: "Jakarta" },
    { id: 5, nama_perusahaan: "CV Solusi Digital Prima", alamat: "Bandung" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Magang | null>(null);
  const [formData, setFormData] = useState<
    Omit<Magang, "id" | "created_at" | "updated_at" | "dudi">
  >({
    nama_siswa: "",
    nis: "",
    kelas: "",
    jurusan: "",
    alamat: "",
    telepon: "",
    email: "",
    dudi_id: 0,
    tanggal_mulai: "",
    tanggal_selesai: "",
    status: "pending",
    nilai_akhir: undefined,
  });
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filtered = magangList.filter((m) => {
    const matchSearch =
      m.nama_siswa.toLowerCase().includes(search.toLowerCase()) ||
      m.nis.toLowerCase().includes(search.toLowerCase()) ||
      m.kelas.toLowerCase().includes(search.toLowerCase()) ||
      m.jurusan.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.dudi?.nama_perusahaan || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || m.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "number"
        ? e.target.value
          ? Number(e.target.value)
          : undefined
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      nama_siswa: "",
      nis: "",
      kelas: "",
      jurusan: "",
      alamat: "",
      telepon: "",
      email: "",
      dudi_id: 0,
      tanggal_mulai: "",
      tanggal_selesai: "",
      status: "pending",
      nilai_akhir: undefined,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: Magang) => {
    setEditing(item);
    setFormData({
      nama_siswa: item.nama_siswa,
      nis: item.nis,
      kelas: item.kelas,
      jurusan: item.jurusan,
      alamat: item.alamat,
      telepon: item.telepon,
      email: item.email,
      dudi_id: item.dudi_id,
      tanggal_mulai: item.tanggal_mulai,
      tanggal_selesai: item.tanggal_selesai,
      status: item.status,
      nilai_akhir: item.nilai_akhir,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedDudi = dudiOptions.find((d) => d.id === formData.dudi_id);

    if (editing) {
      setMagangList((prev) =>
        prev.map((m) =>
          m.id === editing.id
            ? {
                ...m,
                ...formData,
                dudi: selectedDudi,
              }
            : m
        )
      );
      showNotification("Data siswa magang berhasil diperbarui", "success");
    } else {
      const newItem: Magang = {
        ...formData,
        id: Date.now(),
        dudi: selectedDudi,
        created_at: "",
        updated_at: "",
      };
      setMagangList((prev) => [...prev, newItem]);
      showNotification("Data siswa magang berhasil ditambahkan", "success");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa magang ini?")) {
      setMagangList((prev) => prev.filter((m) => m.id !== id));
      showNotification("Data siswa magang berhasil dihapus", "success");

      // Adjust current page if necessary after deletion
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleDownloadPDF = () => {
    console.log('Download PDF clicked')
    // Nanti isi logika generate PDF di sini
  }  

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Calculate stats
  const totalSiswa = magangList.length;
  const siswaAktif = magangList.filter((m) => m.status === "aktif").length;
  const siswaSelesai = magangList.filter((m) => m.status === "selesai").length;
  const siswaPending = magangList.filter((m) => m.status === "pending").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all duration-300 ${
            notification.type === "success"
              ? "bg-lime-500/90 text-white border border-lime-400/20"
              : "bg-pink-500/90 text-white border border-pink-400/20"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Manajemen Siswa Magang
        </h1>
        <p className="text-slate-600">
          Kelola data siswa yang sedang melaksanakan magang di industri
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Siswa
            </CardTitle>
            <Users className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalSiswa}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Siswa magang terdaftar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Aktif
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {siswaAktif}
            </div>
            <p className="text-xs text-slate-500 mt-1">Sedang magang</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Selesai
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {siswaSelesai}
            </div>
            <p className="text-xs text-slate-500 mt-1">Magang selesai</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Pending
            </CardTitle>
            <Calendar className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {siswaPending}
            </div>
            <p className="text-xs text-slate-500 mt-1">Menunggu penempatan</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="h-5 w-5 text-cyan-600" />
              Daftar Siswa Magang
            </CardTitle>
            <div className="flex gap-2">
              <button
                onClick={openAddModal}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus size={18} />
                Tambah Siswa
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FileText size={18} />
                Download PDF
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari siswa, NIS, kelas, jurusan, DUDI..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50 backdrop-blur"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200/60 rounded-lg text-sm bg-white/50 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="all">Semua</option>
                  <option value="aktif">Aktif</option>
                  <option value="selesai">Selesai</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Per halaman:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-slate-200/60 rounded-lg text-sm bg-white/50 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/60">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Siswa
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Kelas & Jurusan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    DUDI
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Periode
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Nilai
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm mb-1">
                            {item.nama_siswa}
                          </div>
                          <div className="text-xs text-slate-500 mb-1">
                            NIS: {item.nis}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={10} />
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-slate-700">
                          {item.kelas}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.jurusan}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Phone size={10} />
                          {item.telepon}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 size={12} className="text-slate-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-slate-700 truncate max-w-[150px]">
                            {item.dudi?.nama_perusahaan}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.dudi?.alamat}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600">
                          <Calendar size={10} className="inline mr-1" />
                          {formatDate(item.tanggal_mulai)}
                        </div>
                        <div className="text-xs text-slate-500">
                          s.d {formatDate(item.tanggal_selesai)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge
                        className={`text-xs border ${
                          statusColors[item.status]
                        }`}
                      >
                        {statusLabels[item.status]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.nilai_akhir ? (
                        <Badge variant="secondary" className="text-xs">
                          {item.nilai_akhir}
                        </Badge>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Users size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Data tidak ditemukan
                </p>
                <p className="text-xs text-slate-400">
                  Coba ubah kata kunci pencarian atau filter status
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-slate-200/60">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} sampai{" "}
                {Math.min(startIndex + itemsPerPage, filtered.length)} dari{" "}
                {filtered.length} entri
                {(search || statusFilter !== "all") &&
                  ` (difilter dari ${magangList.length} total entri)`}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  title="Halaman Pertama"
                >
                  <ChevronsLeft size={16} />
                </button>

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  title="Halaman Sebelumnya"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          pageNum === currentPage
                            ? "bg-cyan-500 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        } transition-colors`}
                        disabled={pageNum < 1 || pageNum > totalPages}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  title="Halaman Berikutnya"
                >
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  title="Halaman Terakhir"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Form: tambahkan modal component sendiri atau gunakan library sesuai kebutuhan */}
      {/* Placeholder: Modal form untuk tambah/edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">
              {editing ? "Edit Data Siswa Magang" : "Tambah Data Siswa Magang"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nama_siswa"
                  placeholder="Nama Siswa"
                  value={formData.nama_siswa}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="nis"
                  placeholder="NIS"
                  value={formData.nis}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="kelas"
                  placeholder="Kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="jurusan"
                  placeholder="Jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="telepon"
                  placeholder="Telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <textarea
                name="alamat"
                placeholder="Alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="dudi_id"
                  value={formData.dudi_id}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value={0} disabled>
                    Pilih DUDI
                  </option>
                  {dudiOptions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nama_perusahaan}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="tanggal_mulai"
                  value={formData.tanggal_mulai}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <input
                  type="date"
                  name="tanggal_selesai"
                  value={formData.tanggal_selesai}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="aktif">Aktif</option>
                  <option value="selesai">Selesai</option>
                  <option value="pending">Pending</option>
                </select>
                <input
                  type="number"
                  name="nilai_akhir"
                  placeholder="Nilai Akhir"
                  value={formData.nilai_akhir || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  {editing ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
