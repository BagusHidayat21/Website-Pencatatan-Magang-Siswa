"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [role, setRole] = useState<"guru" | "siswa">("siswa")

  // Baca role dari localStorage saat mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role")
    if (storedRole === "guru" || storedRole === "siswa") {
      setRole(storedRole)
    }
  }, [])

  // Ubah role dan simpan ke localStorage
  const handleChangeRole = (newRole: "guru" | "siswa") => {
    setRole(newRole)
    localStorage.setItem("role", newRole)
  }

  const handleMenuClick = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} role={role} />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header onMenuClick={handleMenuClick} role={role} />

        {/* Manual role switcher (sementara, untuk testing) */}
        <div className="flex gap-2 p-4">
          <button
            onClick={() => handleChangeRole("siswa")}
            className={role === "siswa"
              ? "bg-cyan-500 text-white px-3 py-1 rounded"
              : "px-3 py-1 border rounded"}
          >
            Siswa
          </button>
          <button
            onClick={() => handleChangeRole("guru")}
            className={role === "guru"
              ? "bg-cyan-500 text-white px-3 py-1 rounded"
              : "px-3 py-1 border rounded"}
          >
            Guru
          </button>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
