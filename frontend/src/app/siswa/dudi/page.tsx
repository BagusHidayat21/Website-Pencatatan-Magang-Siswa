'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { 
  Search, Building, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Building2,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Clock, Send, Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Dudi {
  id: number
  nama_perusahaan: string
  alamat: string
  telepon: string
  email: string
  penanggung_jawab: string
  created_at: string
  updated_at: string
  siswaMagang?: number
  deskripsi?: string
  bidang_usaha?: string
  kuota_magang?: number
}

interface PendaftaranMagang {
  id: number
  dudi_id: number
  siswa_id: number
  status: 'pending' | 'diterima' | 'ditolak'
  tanggal_daftar: string
  alasan_penolakan?: string
}

export default function SiswaDudiPage() {
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
      siswaMagang: 8,
      bidang_usaha: "Teknologi Informasi",
      kuota_magang: 12,
      deskripsi: "Perusahaan teknologi yang bergerak dalam pengembangan aplikasi web dan mobile. Memberikan kesempatan magang terbaik untuk siswa SMK jurusan IT."
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
      siswaMagang: 5,
      bidang_usaha: "Digital Marketing",
      kuota_magang: 8,
      deskripsi: "Konsultan digital marketing yang membantu UMKM berkembang di era digital. Menyediakan program magang untuk jurusan multimedia dan pemasaran."
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
      siswaMagang: 12,
      bidang_usaha: "Software Development",
      kuota_magang: 15,
      deskripsi: "Perusahaan software house yang mengembangkan sistem informasi untuk berbagai industri. Menawarkan pengalaman magang yang komprehensif."
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
      siswaMagang: 6,
      bidang_usaha: "Hardware & Networking",
      kuota_magang: 10,
      deskripsi: "Spesialis dalam instalasi dan maintenance hardware komputer serta jaringan. Cocok untuk siswa jurusan TKJ dan multimedia."
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
      siswaMagang: 9,
      bidang_usaha: "E-commerce",
      kuota_magang: 12,
      deskripsi: "Platform e-commerce yang melayani berbagai produk lokal. Memberikan pengalaman magang dalam bidang IT dan digital marketing."
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
      siswaMagang: 15,
      bidang_usaha: "Konsultan IT",
      kuota_magang: 20,
      deskripsi: "Konsultan IT yang memberikan solusi teknologi untuk berbagai perusahaan. Program magang dengan mentoring intensif tersedia."
    }
  ])
  
  const [pendaftaranList, setPendaftaranList] = useState<PendaftaranMagang[]>([
    // Contoh data pendaftaran (siswa sudah pernah mendaftar ke DUDI id 1)
    {
      id: 1,
      dudi_id: 1,
      siswa_id: 1, // Anggap siswa yang login memiliki ID 1
      status: 'pending',
      tanggal_daftar: '2024-01-15'
    }
  ])
  
  const [search, setSearch] = useState('')
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [selectedDudi, setSelectedDudi] = useState<Dudi | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  // Assume current user ID (in real app, get from auth context)
  const currentSiswaId = 1

  const filtered = dudiList.filter(d =>
    d.nama_perusahaan.toLowerCase().includes(search.toLowerCase()) ||
    d.alamat.toLowerCase().includes(search.toLowerCase()) ||
    d.penanggung_jawab.toLowerCase().includes(search.toLowerCase()) ||
    d.bidang_usaha?.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const openDetailModal = (dudi: Dudi) => {
    setSelectedDudi(dudi)
    setModalDetailOpen(true)
  }

  const handleDaftarMagang = (dudiId: number) => {
    // Check if already applied
    const existingApplication = pendaftaranList.find(p => 
      p.dudi_id === dudiId && p.siswa_id === currentSiswaId
    )

    if (existingApplication) {
      showNotification('Anda sudah mendaftar magang di perusahaan ini', 'error')
      return
    }

    // Add new application
    const newApplication: PendaftaranMagang = {
      id: Date.now(),
      dudi_id: dudiId,
      siswa_id: currentSiswaId,
      status: 'pending',
      tanggal_daftar: new Date().toISOString().split('T')[0]
    }

    setPendaftaranList(prev => [...prev, newApplication])
    showNotification('Pendaftaran magang berhasil dikirim! Menunggu verifikasi dari perusahaan.', 'success')
    setModalDetailOpen(false)
  }

  const getApplicationStatus = (dudiId: number): PendaftaranMagang | null => {
    return pendaftaranList.find(p => 
      p.dudi_id === dudiId && p.siswa_id === currentSiswaId
    ) || null
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="space-y-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all duration-300 max-w-md ${
          notification.type === 'success' 
            ? 'bg-lime-500/90 text-white border border-lime-400/20' 
            : 'bg-pink-500/90 text-white border border-pink-400/20'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Cari Tempat Magang
        </h1>
        <p className="text-slate-600">
          Jelajahi perusahaan mitra dan daftarkan diri Anda untuk program magang
        </p>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardContent className="">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Cari perusahaan, bidang usaha, lokasi..."
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
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
              </select>
              <span className="text-sm text-slate-600">per halaman</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DUDI Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map((dudi) => {
          const application = getApplicationStatus(dudi.id)
          const sisaKuota = (dudi.kuota_magang || 0) - (dudi.siswaMagang || 0)
          
          return (
            <Card key={dudi.id} className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 size={16} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm leading-tight truncate">
                          {dudi.nama_perusahaan}
                        </h3>
                        <p className="text-xs text-cyan-600 font-medium">
                          {dudi.bidang_usaha}
                        </p>
                        {application && (
                          <Badge
                            variant={
                              application.status === 'pending' ? 'secondary' :
                              application.status === 'diterima' ? 'default' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {application.status === 'pending' && 'Menunggu'}
                            {application.status === 'diterima' && 'Diterima'}
                            {application.status === 'ditolak' && 'Ditolak'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                    <span className="line-clamp-1">{dudi.alamat}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <User size={12} className="text-slate-400 flex-shrink-0" />
                    <span>PIC: {dudi.penanggung_jawab}</span>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Kuota Magang</span>
                    <span className="text-xs font-semibold text-slate-900">
                      {dudi.siswaMagang}/{dudi.kuota_magang}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(((dudi.siswaMagang || 0) / (dudi.kuota_magang || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {sisaKuota > 0 ? `${sisaKuota} slot tersisa` : 'Kuota penuh'}
                  </div>
                </div>

                {dudi.deskripsi && (
                  <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50/50 p-2 rounded-lg">
                    {dudi.deskripsi}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => openDetailModal(dudi)}
                    className="flex-1 px-3 py-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <Eye size={14} />
                    Detail
                  </button>
                  
                  {!application && sisaKuota > 0 && (
                    <button 
                      onClick={() => handleDaftarMagang(dudi.id)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg transition-colors text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Send size={14} />
                      Daftar
                    </button>
                  )}
                  
                  {application && (
                    <button 
                      disabled
                      className="flex-1 px-3 py-2 bg-slate-300 text-slate-500 rounded-lg text-xs font-medium cursor-not-allowed"
                    >
                      Sudah Mendaftar
                    </button>
                  )}
                  
                  {sisaKuota === 0 && !application && (
                    <button 
                      disabled
                      className="flex-1 px-3 py-2 bg-slate-300 text-slate-500 rounded-lg text-xs font-medium cursor-not-allowed"
                    >
                      Kuota Penuh
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-500 mb-1">Perusahaan tidak ditemukan</p>
          <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian Anda</p>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
          <CardContent className="">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-slate-600">
                Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} perusahaan
                {search && ` (difilter dari ${dudiList.length} total perusahaan)`}
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
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      {modalDetailOpen && selectedDudi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalDetailOpen(false)}></div>
          <Card className="relative w-full max-w-2xl bg-white/95 backdrop-blur shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4 sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200/60">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">{selectedDudi.nama_perusahaan}</CardTitle>
                    <p className="text-sm text-cyan-600 font-medium mt-1">{selectedDudi.bidang_usaha}</p>
                  </div>
                </div>
                {(() => {
                  const application = getApplicationStatus(selectedDudi.id)
                  return application ? (
                    <Badge 
                      variant={
                        application.status === 'pending' ? 'secondary' : 
                        application.status === 'diterima' ? 'default' : 'destructive'
                      }
                    >
                      {application.status === 'pending' && 'Menunggu Verifikasi'}
                      {application.status === 'diterima' && 'Diterima'}
                      {application.status === 'ditolak' && 'Ditolak'}
                    </Badge>
                  ) : null
                })()}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Company Description */}
              {selectedDudi.deskripsi && (
                <div className="bg-slate-50/80 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Tentang Perusahaan</h3>
                  <p className="text-sm text-slate-700">{selectedDudi.deskripsi}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Informasi Kontak</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <MapPin size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Alamat</p>
                      <p className="text-sm text-slate-700">{selectedDudi.alamat}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <Phone size={16} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Telepon</p>
                        <p className="text-sm text-slate-700">{selectedDudi.telepon}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <Mail size={16} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="text-sm text-slate-700">{selectedDudi.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <User size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Penanggung Jawab</p>
                      <p className="text-sm text-slate-700">{selectedDudi.penanggung_jawab}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internship Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Informasi Magang</h3>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Bidang Usaha</span>
                    <span className="text-sm font-medium text-slate-900">{selectedDudi.bidang_usaha}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Kuota Magang</span>
                    <span className="text-sm font-medium text-slate-900">{selectedDudi.siswaMagang}/{selectedDudi.kuota_magang}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Slot Tersisa</span>
                    <span className="text-sm font-medium text-slate-900">
                      {(selectedDudi.kuota_magang || 0) - (selectedDudi.siswaMagang || 0)} slot
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setModalDetailOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg transition-colors"
                >
                  Tutup
                </button>

                {/* Show daftar button only if belum mendaftar & kuota ada */}
                {!getApplicationStatus(selectedDudi.id) && ((selectedDudi.kuota_magang || 0) - (selectedDudi.siswaMagang || 0) > 0) && (
                  <button
                    onClick={() => handleDaftarMagang(selectedDudi.id)}
                    className="px-4 py-2 text-sm text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-lg transition-colors"
                  >
                    <Send size={14} className="inline-block mr-1" />
                    Daftar Magang
                  </button>
                )}

                {/* If sudah mendaftar */}
                {getApplicationStatus(selectedDudi.id) && (
                  <button
                    disabled
                    className="px-4 py-2 text-sm text-slate-500 bg-slate-200 rounded-lg cursor-not-allowed"
                  >
                    Sudah Mendaftar
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}