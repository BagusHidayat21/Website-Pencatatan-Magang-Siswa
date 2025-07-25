'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Search, Edit, Trash2, Plus, FileText, AlertCircle, CheckCircle, X,
  ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Calendar, User, Camera,
  Clock, Eye, ThumbsUp, ThumbsDown, BookOpen, Upload
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Logbook {
  id: number
  magang_id: number
  nama_siswa: string
  tanggal: string
  kegiatan: string
  kendala: string
  foto: string
  status_verifikasi: 'pending' | 'disetujui' | 'ditolak'
  catatan_guru: string
  catatan_dudi: string
  created_at: string
  updated_at: string
}

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

export default function StudentLogbookPage() {
  // Data sample untuk siswa yang login (Ahmad Rizki)
  const currentStudent = "Ahmad Rizki"
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
      magang_id: 1,
      nama_siswa: 'Ahmad Rizki',
      tanggal: '2024-03-03',
      kegiatan: 'Implementasi autentikasi dan authorization menggunakan JWT. Setup middleware untuk proteksi route API.',
      kendala: 'Token JWT expire terlalu cepat, perlu penyesuaian konfigurasi',
      foto: '/foto3.jpg',
      status_verifikasi: 'ditolak',
      catatan_guru: 'Perbaiki deskripsi kegiatan, terlalu singkat',
      catatan_dudi: 'Kurang detail dalam menjelaskan langkah-langkah implementasi',
      created_at: '',
      updated_at: ''
    },
    {
      id: 4,
      magang_id: 1,
      nama_siswa: 'Ahmad Rizki',
      tanggal: '2024-03-04',
      kegiatan: 'Melakukan testing unit pada endpoint API yang telah dibuat. Menggunakan PHPUnit untuk automated testing.',
      kendala: 'Beberapa test case gagal karena setup database testing yang kurang tepat',
      foto: '/foto4.jpg',
      status_verifikasi: 'disetujui',
      catatan_guru: 'Sudah bagus, dokumentasikan hasil testingnya',
      catatan_dudi: 'Testing sudah comprehensive, lanjutkan ke integrasi frontend',
      created_at: '',
      updated_at: ''
    },
    {
      id: 5,
      magang_id: 1,
      nama_siswa: 'Ahmad Rizki',
      tanggal: '2024-03-05',
      kegiatan: 'Membuat dokumentasi API menggunakan Postman dan testing endpoint dengan berbagai skenario.',
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
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editing, setEditing] = useState<Logbook | null>(null)
  const [viewing, setViewing] = useState<Logbook | null>(null)
  const [formData, setFormData] = useState<Omit<Logbook, 'id' | 'created_at' | 'updated_at' | 'nama_siswa' | 'magang_id' | 'status_verifikasi' | 'catatan_guru' | 'catatan_dudi'>>({
    tanggal: '',
    kegiatan: '',
    kendala: '',
    foto: ''
  })
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Filter hanya logbook milik siswa yang login
  const studentLogbooks = logbooks.filter(l => l.nama_siswa === currentStudent)
  
  const filtered = studentLogbooks.filter(l => {
    const matchSearch = l.kegiatan.toLowerCase().includes(search.toLowerCase()) ||
                        l.kendala.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || l.status_verifikasi === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => setCurrentPage(1), [search, statusFilter])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const openAddModal = () => {
    setEditing(null)
    setFormData({
      tanggal: new Date().toISOString().split('T')[0], // Default hari ini
      kegiatan: '',
      kendala: '',
      foto: ''
    })
    setModalOpen(true)
  }

  const openEditModal = (item: Logbook) => {
    // Siswa hanya bisa edit jika statusnya pending atau ditolak
    if (item.status_verifikasi === 'disetujui') {
      showNotification('Logbook yang sudah disetujui tidak dapat diedit', 'error')
      return
    }
    
    setEditing(item)
    setFormData({
      tanggal: item.tanggal,
      kegiatan: item.kegiatan,
      kendala: item.kendala,
      foto: item.foto
    })
    setModalOpen(true)
  }

  const openViewModal = (item: Logbook) => {
    setViewing(item)
    setViewModalOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      setLogbooks(prev => prev.map(l => 
        l.id === editing.id 
          ? { 
              ...l, 
              ...formData, 
              status_verifikasi: 'pending' as const, // Reset status ke pending saat diedit
              catatan_guru: '', // Reset catatan
              catatan_dudi: ''
            } 
          : l
      ))
      showNotification('Logbook berhasil diperbarui dan akan diverifikasi ulang', 'success')
    } else {
      const newItem: Logbook = {
        id: Date.now(),
        magang_id: 1, // ID magang siswa
        nama_siswa: currentStudent,
        ...formData,
        status_verifikasi: 'pending',
        catatan_guru: '',
        catatan_dudi: '',
        created_at: '',
        updated_at: ''
      }
      setLogbooks(prev => [...prev, newItem])
      showNotification('Logbook berhasil ditambahkan', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    const item = logbooks.find(l => l.id === id)
    if (item?.status_verifikasi === 'disetujui') {
      showNotification('Logbook yang sudah disetujui tidak dapat dihapus', 'error')
      return
    }

    if (confirm('Yakin ingin menghapus logbook ini?')) {
      setLogbooks(prev => prev.filter(l => l.id !== id))
      showNotification('Logbook berhasil dihapus', 'success')
      
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  // Calculate stats untuk siswa
  const totalLogbooks = studentLogbooks.length
  const logbooksBelum = studentLogbooks.filter(l => l.status_verifikasi === 'pending').length
  const logbooksDisetujui = studentLogbooks.filter(l => l.status_verifikasi === 'disetujui').length
  const logbooksDitolak = studentLogbooks.filter(l => l.status_verifikasi === 'ditolak').length

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
          Logbook Magang Saya
        </h1>
        <p className="text-slate-600">
          Catat kegiatan harian dan kendala yang Anda hadapi selama magang
        </p>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <FileText className="h-5 w-5 text-cyan-600" />
              Daftar Logbook Harian
            </CardTitle>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 py-2.5 rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 shadow-md text-sm font-medium"
            >
              <Plus size={16} />
              Tambah Logbook
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari kegiatan atau kendala..."
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
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="disetujui">Disetujui</option>
                  <option value="ditolak">Perlu Perbaikan</option>
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
                </select>
              </div>
            </div>
          </div>

          {/* Data Cards for Mobile, Table for Desktop */}
          <div className="block md:hidden space-y-4">
            {paginatedData.map(item => (
              <Card key={item.id} className="bg-white/50 border border-slate-200/40">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {formatDate(item.tanggal)}
                      </span>
                    </div>
                    <Badge className={`text-xs border ${statusColors[item.status_verifikasi]}`}>
                      {statusLabels[item.status_verifikasi]}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
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
                    
                    {item.foto && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Camera size={12} />
                        <span>Foto tersedia</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openViewModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors text-sm"
                    >
                      <Eye size={14} />
                      Lihat
                    </button>
                    {item.status_verifikasi !== 'disetujui' && (
                      <>
                        <button
                          onClick={() => openEditModal(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-sm"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors text-sm"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/60">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Tanggal & Foto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Kegiatan & Kendala
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Catatan Verifikasi
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
                          <Calendar size={16} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm mb-1">
                            {formatDate(item.tanggal)}
                          </div>
                          {item.foto && (
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <Camera size={10} />
                              Foto tersedia
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2 max-w-[300px]">
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
                        <button
                          onClick={() => openViewModal(item)}
                          className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={14} />
                        </button>
                        {item.status_verifikasi !== 'disetujui' && (
                          <>
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
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
                          </>
                        )}
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
                <p className="text-sm font-medium text-slate-500 mb-1">Belum ada logbook</p>
                <p className="text-xs text-slate-400">Mulai catat kegiatan harian Anda dengan klik tombol "Tambah Logbook"</p>
              </div>
            )}
          </div>

          {/* Empty State for Mobile */}
          {filtered.length === 0 && (
            <div className="block md:hidden text-center py-12">
              <FileText size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-500 mb-1">Belum ada logbook</p>
              <p className="text-xs text-slate-400">Mulai catat kegiatan harian Anda</p>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-slate-200/60">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} entri
                {(search || statusFilter !== 'all') && ` (difilter dari ${studentLogbooks.length} total entri)`}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate -300/50 rounded transition-colors disabled:cursor-not-allowed">
                  <ChevronsLeft size={14} />
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300/50 rounded transition-colors disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="text-sm text-slate-600">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300/50 rounded transition-colors disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-500 hover:text-slate-700 disabled:text-slate-300/50 rounded transition-colors disabled:cursor-not-allowed"
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals (Add/Edit & View) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">
              {editing ? 'Edit Logbook' : 'Tambah Logbook'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kegiatan</label>
                <textarea
                  name="kegiatan"
                  value={formData.kegiatan}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Kendala</label>
                <textarea
                  name="kendala"
                  value={formData.kendala}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">URL Foto</label>
                <input
                  type="text"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                >
                  {editing ? 'Perbarui' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewModalOpen && viewing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 space-y-4 relative">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Detail Logbook</h2>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">Tanggal</div>
                <div className="text-sm text-slate-700">{formatDate(viewing.tanggal)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Kegiatan</div>
                <div className="text-sm text-slate-700">{viewing.kegiatan}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Kendala</div>
                <div className="text-sm text-slate-700">{viewing.kendala}</div>
              </div>
              {viewing.foto && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Foto</div>
                  <img src={viewing.foto} alt="Foto kegiatan" className="rounded-lg border border-slate-200 max-h-64 object-contain" />
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <Badge className={`text-xs border ${statusColors[viewing.status_verifikasi]}`}>
                  {statusLabels[viewing.status_verifikasi]}
                </Badge>
                {viewing.catatan_guru && (
                  <span className="text-xs bg-slate-50 border rounded px-2 py-1 text-slate-600">Guru: {viewing.catatan_guru}</span>
                )}
                {viewing.catatan_dudi && (
                  <span className="text-xs bg-slate-50 border rounded px-2 py-1 text-slate-600">DUDI: {viewing.catatan_dudi}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
