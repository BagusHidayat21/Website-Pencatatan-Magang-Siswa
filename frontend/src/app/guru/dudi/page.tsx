'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { 
  Plus, Search, Edit, Trash2, Building, User, Mail, Phone, MapPin, X, CheckCircle, AlertCircle, Building2,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Dudi } from '@/types'

export default function AdminDudiPage() {
  const [dudiList, setDudiList] = useState<Dudi[]>([
    {
      id: 1,
      nama_perusahaan: "PT Kreatif Teknologi",
      alamat: "Jl. Merdeka No. 123, Jakarta",
      telepon: "021-12345678",
      email: "info@kreatiftek.com",
      penanggung_jawab: "Andi Wijaya",
      created_at: "",
      updated_at: "",
      siswaMagang: 8
    },
    {
      id: 2,
      nama_perusahaan: "CV Digital Solusi",
      alamat: "Jl. Sudirman No. 45, Surabaya",
      telepon: "031-87654321",
      email: "contact@digitalsolusi.com",
      penanggung_jawab: "Sari Dewi",
      created_at: "",
      updated_at: "",
      siswaMagang: 5
    },
    {
      id: 3,
      nama_perusahaan: "PT Inovasi Mandiri",
      alamat: "Jl. Diponegoro No. 78, Surabaya",
      telepon: "031-5553456",
      email: "hr@inovasimandiri.co.id",
      penanggung_jawab: "Budi Santoso",
      created_at: "",
      updated_at: "",
      siswaMagang: 12
    },
    {
      id: 4,
      nama_perusahaan: "PT Teknologi Maju",
      alamat: "Jl. HR Rasuna Said No. 12, Jakarta",
      telepon: "021-33445566",
      email: "info@tekmaju.com",
      penanggung_jawab: "Lisa Permata",
      created_at: "",
      updated_at: "",
      siswaMagang: 6
    },
    {
      id: 5,
      nama_perusahaan: "CV Solusi Digital Prima",
      alamat: "Jl. Gatot Subroto No. 88, Bandung",
      telepon: "022-7788990",
      email: "contact@sdprima.com",
      penanggung_jawab: "Rahmat Hidayat",
      created_at: "",
      updated_at: "",
      siswaMagang: 9
    },
    {
      id: 6,
      nama_perusahaan: "PT Inovasi Global",
      alamat: "Jl. Pemuda No. 156, Semarang",
      telepon: "024-6677889",
      email: "hr@inovasiglobal.id",
      penanggung_jawab: "Maya Sari",
      created_at: "",
      updated_at: "",
      siswaMagang: 15
    }
  ])
  
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Dudi | null>(null)
  const [formData, setFormData] = useState<Omit<Dudi, 'id' | 'created_at' | 'updated_at'>>({
    nama_perusahaan: '',
    alamat: '',
    telepon: '',
    email: '',
    penanggung_jawab: '',
    user: null
  })
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const filtered = dudiList.filter(d =>
    d.nama_perusahaan.toLowerCase().includes(search.toLowerCase()) ||
    d.alamat.toLowerCase().includes(search.toLowerCase()) ||
    d.penanggung_jawab.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const openAddModal = () => {
    setEditing(null)
    setFormData({ nama_perusahaan: '', alamat: '', telepon: '', email: '', penanggung_jawab: '', user: null })
    setModalOpen(true)
  }

  const openEditModal = (item: Dudi) => {
    setEditing(item)
    setFormData({ 
      nama_perusahaan: item.nama_perusahaan,
      alamat: item.alamat,
      telepon: item.telepon,
      email: item.email,
      penanggung_jawab: item.penanggung_jawab,
      user: item.user ?? null
    })
    setModalOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      setDudiList(prev => prev.map(d => d.id === editing.id ? { ...d, ...formData } : d))
      showNotification('Data DUDI berhasil diperbarui', 'success')
    } else {
      const newItem: Dudi = {
        ...formData,
        id: Date.now(),
        created_at: '',
        updated_at: '',
        siswaMagang: 0
      }
      setDudiList(prev => [...prev, newItem])
      showNotification('Data DUDI berhasil ditambahkan', 'success')
    }
    setModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data DUDI ini?')) {
      setDudiList(prev => prev.filter(d => d.id !== id))
      showNotification('Data DUDI berhasil dihapus', 'success')
      
      // Adjust current page if necessary after deletion
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const totalSiswa = dudiList.reduce((sum, dudi) => sum + (dudi.siswaMagang || 0), 0)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

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
          Manajemen DUDI
        </h1>
        <p className="text-slate-600">
          Kelola data industri dan perusahaan mitra magang siswa
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total DUDI
            </CardTitle>
            <Building2 className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dudiList.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Perusahaan mitra aktif
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Siswa Magang
            </CardTitle>
            <User className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalSiswa}
            </div>
            <p className="text-xs text-slate-500 mt-1">Siswa magang aktif</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 border border-slate-200/60 shadow-sm backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Rata-rata Siswa
            </CardTitle>
            <Building className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {dudiList.length > 0 ? Math.round(totalSiswa / dudiList.length) : 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">Per perusahaan</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Building2 className="h-5 w-5 text-cyan-600" />
              Daftar DUDI
            </CardTitle>
            <button 
              onClick={openAddModal}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Tambah DUDI
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Items Per Page */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari perusahaan, alamat, penanggung jawab..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50 backdrop-blur"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Tampilkan:</label>
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
              <span className="text-sm text-slate-600">entri</span>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/60">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Perusahaan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Kontak
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Penanggung Jawab
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Siswa Magang
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 size={16} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm mb-1">
                            {item.nama_perusahaan}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-2">
                            <MapPin size={12} className="inline mr-1" />
                            {item.alamat}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={12} className="text-slate-400" />
                          <span className="truncate max-w-[180px]">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone size={12} className="text-slate-400" />
                          <span>{item.telepon}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={12} className="text-slate-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {item.penanggung_jawab}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="secondary" className="text-xs">
                        {item.siswaMagang || 0}
                      </Badge>
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
                <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-500 mb-1">Data tidak ditemukan</p>
                <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau tambah DUDI baru</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-slate-200/60">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} entri
                {search && ` (difilter dari ${dudiList.length} total entri)`}
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
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-cyan-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
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
                  title="Halaman Selanjutnya"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <Card className="relative w-full max-w-md bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900">
                {editing ? 'Edit DUDI' : 'Tambah DUDI Baru'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Perusahaan</label>
                <input
                  name="nama_perusahaan"
                  value={formData.nama_perusahaan}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50"
                  placeholder="Masukkan nama perusahaan"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alamat</label>
                <input
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telepon</label>
                <input
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50"
                  placeholder="Contoh: 021-12345678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50"
                  placeholder="Contoh: info@perusahaan.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Penanggung Jawab</label>
                <input
                  name="penanggung_jawab"
                  value={formData.penanggung_jawab}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors text-sm bg-white/50"
                  placeholder="Nama penanggung jawab"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  {editing ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}