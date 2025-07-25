'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Search, Edit, Trash2, MoreHorizontal, FileText, AlertCircle, CheckCircle, X,
  ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Calendar, User, Camera,
  Clock, Eye, ThumbsUp, ThumbsDown, BookOpen
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Logbook } from '@/types'

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  disetujui: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  ditolak: 'bg-pink-100 text-pink-800 border-pink-200'
}

const statusLabels = {
  pending: 'Belum Diverifikasi',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak'
}

export default function AdminLogbookPage() {
  const [logbooks, setLogbooks] = useState<Logbook[]>([
    {
      id: 1,
      magang_id: 1,
      nama_siswa: 'Ahmad Rizki',
      tanggal: '2024-03-01',
      kegiatan: 'Membuat desain UI aplikasi kasir menggunakan Figma. Melakukan analisis user experience dan wireframing untuk interface yang user-friendly.',
      kendala: 'Kesulitan menentukan skema warna yang tepat dan konsisten untuk seluruh aplikasi',
      foto: '/foto1.jpg',
      status_verifikasi: 'disetujui',
      catatan_guru: 'Bagus, lanjutkan dengan implementasi',
      catatan_dudi: 'Desain sudah sesuai dengan brief yang diberikan',
      created_at: '',
      updated_at: ''
    },
    {
      id: 2,
      magang_id: 1,
      nama_siswa: 'Ahmad Rizki',
      tanggal: '2024-03-02',
      kegiatan: 'Belajar backend Laravel untuk membangun REST API sistem kasir. Mempelajari konsep MVC dan routing.',
      kendala: 'Error saat menjalankan migration database dan kesulitan memahami relationship antar tabel',
      foto: '/foto2.jpg',
      status_verifikasi: 'pending',
      catatan_guru: '',
      catatan_dudi: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 3,
      magang_id: 2,
      nama_siswa: 'Siti Nurhaliza',
      tanggal: '2024-03-01',
      kegiatan: 'Setup server Linux Ubuntu untuk deployment aplikasi web. Konfigurasi Apache dan MySQL.',
      kendala: 'Belum familiar dengan command line interface dan permission system di Linux',
      foto: '/foto3.jpg',
      status_verifikasi: 'ditolak',
      catatan_guru: 'Perbaiki deskripsi kegiatan, terlalu singkat',
      catatan_dudi: 'Kurang detail dalam menjelaskan langkah-langkah konfigurasi',
      created_at: '',
      updated_at: ''
    },
    {
      id: 4,
      magang_id: 3,
      nama_siswa: 'Budi Santoso',
      tanggal: '2024-03-03',
      kegiatan: 'Melakukan troubleshooting jaringan komputer kantor dan mengkonfigurasi switch managed.',
      kendala: 'Beberapa port switch tidak berfungsi dengan baik',
      foto: '/foto4.jpg',
      status_verifikasi: 'disetujui',
      catatan_guru: 'Sudah bagus, dokumentasikan solusinya',
      catatan_dudi: 'Penanganan masalah cukup baik',
      created_at: '',
      updated_at: ''
    },
    {
      id: 5,
      magang_id: 4,
      nama_siswa: 'Dewi Lestari',
      tanggal: '2024-03-04',
      kegiatan: 'Membuat dokumentasi API dan testing menggunakan Postman untuk endpoint yang sudah dibuat.',
      kendala: 'Kesulitan dalam membuat dokumentasi yang comprehensive dan mudah dipahami',
      foto: '/foto5.jpg',
      status_verifikasi: 'pending',
      catatan_guru: '',
      catatan_dudi: '',
      created_at: '',
      updated_at: ''
    }
  ])

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Logbook | null>(null)
  const [formData, setFormData] = useState<Omit<Logbook, 'id' | 'created_at' | 'updated_at'>>({
    magang_id: 0,
    nama_siswa: '',
    tanggal: '',
    kegiatan: '',
    kendala: '',
    foto: '',
    status_verifikasi: 'pending',
    catatan_guru: '',
    catatan_dudi: ''
  })
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const filtered = logbooks.filter(l => {
    const matchSearch = l.nama_siswa.toLowerCase().includes(search.toLowerCase()) ||
                        l.kegiatan.toLowerCase().includes(search.toLowerCase()) ||
                        l.kendala.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || l.status_verifikasi === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => setCurrentPage(1), [search, statusFilter])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const openAddModal = () => {
    setEditing(null)
    setFormData({
      magang_id: 0,
      nama_siswa: '',
      tanggal: '',
      kegiatan: '',
      kendala: '',
      foto: '',
      status_verifikasi: 'pending',
      catatan_guru: '',
      catatan_dudi: ''
    })
    setModalOpen(true)
  }

  const openEditModal = (item: Logbook) => {
    setEditing(item)
    setFormData({ ...item })
    setModalOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      setLogbooks(prev => prev.map(l => l.id === editing.id ? { ...l, ...formData } : l))
      showNotification('Logbook berhasil diperbarui', 'success')
    } else {
      const newItem: Logbook = {
        ...formData,
        id: Date.now(),
        created_at: '',
        updated_at: ''
      }
      setLogbooks(prev => [...prev, newItem])
      showNotification('Logbook berhasil ditambahkan', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus logbook ini?')) {
      setLogbooks(prev => prev.filter(l => l.id !== id))
      showNotification('Logbook berhasil dihapus', 'success')
      
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const openViewModal = (item: Logbook) => {
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

  // Calculate stats
  const totalLogbooks = logbooks.length
  const logbooksBelum = logbooks.filter(l => l.status_verifikasi === 'pending').length
  const logbooksDisetujui = logbooks.filter(l => l.status_verifikasi === 'disetujui').length
  const logbooksDitolak = logbooks.filter(l => l.status_verifikasi === 'ditolak').length

  return (
    <div className="space-y-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-lime-500/90 text-white border border-lime-400/20' 
            : 'bg-pink-500/90 text-white border border-pink-400/20'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
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
          Manajemen Logbook Magang
        </h1>
        <p className="text-slate-600">
          Kelola dan verifikasi laporan harian kegiatan siswa magang
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Logbook
            </CardTitle>
            <BookOpen className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalLogbooks}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Laporan harian terdaftar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Belum Diverifikasi
            </CardTitle>
            <Clock className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {logbooksBelum}
            </div>
            <p className="text-xs text-slate-500 mt-1">Menunggu verifikasi</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Disetujui
            </CardTitle>
            <ThumbsUp className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {logbooksDisetujui}
            </div>
            <p className="text-xs text-slate-500 mt-1">Sudah diverifikasi</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Ditolak
            </CardTitle>
            <ThumbsDown className="h-5 w-5 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">
              {logbooksDitolak}
            </div>
            <p className="text-xs text-slate-500 mt-1">Perlu perbaikan</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <FileText className="h-5 w-5 text-cyan-600" />
              Daftar Logbook Siswa
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari siswa, kegiatan, atau kendala..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50 backdrop-blur"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Status:</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200/60 rounded-lg text-sm bg-white/50 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="all">Semua</option>
                  <option value="pending">Belum Diverifikasi</option>
                  <option value="disetujui">Disetujui</option>
                  <option value="ditolak">Ditolak</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Per halaman:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
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
                    Siswa & Tanggal
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Kegiatan & Kendala
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Catatan
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(item => (
                  <tr key={item.id} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm mb-1">
                            {item.nama_siswa}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                            <Calendar size={10} />
                            {formatDate(item.tanggal)}
                          </div>
                          {item.foto && (
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <Camera size={10} />
                              Ada foto
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Kegiatan:</div>
                          <div className="text-sm text-slate-700 line-clamp-2">
                            {item.kegiatan}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Kendala:</div>
                          <div className="text-sm text-slate-600 line-clamp-2">
                            {item.kendala}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={`text-xs border ${statusColors[item.status_verifikasi]}`}>
                        {statusLabels[item.status_verifikasi]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2 max-w-[200px]">
                        {item.catatan_guru && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Guru:</div>
                            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border">
                              {item.catatan_guru}
                            </div>
                          </div>
                        )}
                        {item.catatan_dudi && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">DUDI:</div>
                            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border">
                              {item.catatan_dudi}
                            </div>
                          </div>
                        )}
                        {!item.catatan_guru && !item.catatan_dudi && (
                          <span className="text-xs text-slate-400">Belum ada catatan</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1 justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                              title="Aksi"
                            >
                              <MoreHorizontal size={14} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => openEditModal(item)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                              <Trash2 size={14} className="mr-2" />
                              Hapus
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openViewModal(item)}>
                              <Eye size={14} className="mr-2" />
                              Lihat
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-500 mb-1">Data logbook tidak ditemukan</p>
                <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter status</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-slate-200/60">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} entri
                {(search || statusFilter !== 'all') && ` (difilter dari ${logbooks.length} total entri)`}
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
                            ? 'bg-cyan-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        } transition-colors`}
                        disabled={pageNum < 1 || pageNum > totalPages}
                      >
                        {pageNum}
                      </button>
                    )
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">
              {editing ? 'Edit Logbook' : 'Tambah Logbook'}
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
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>
              
              <textarea
                name="kegiatan"
                placeholder="Deskripsi kegiatan yang dilakukan..."
                value={formData.kegiatan}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
              
              <textarea
                name="kendala"
                placeholder="Kendala atau masalah yang dihadapi..."
                value={formData.kendala}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
              
              <input
                type="text"
                name="foto"
                placeholder="URL Foto kegiatan (opsional)"
                value={formData.foto}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
              
              <select
                name="status_verifikasi"
                value={formData.status_verifikasi}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              >
                                <option value="pending">Belum Diverifikasi</option>
                <option value="disetujui">Disetujui</option>
                <option value="ditolak">Ditolak</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="catatan_guru"
                  placeholder="Catatan dari guru (opsional)"
                  value={formData.catatan_guru}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
                <textarea
                  name="catatan_dudi"
                  placeholder="Catatan dari DUDI (opsional)"
                  value={formData.catatan_dudi}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                >
                  {editing ? 'Perbarui' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}