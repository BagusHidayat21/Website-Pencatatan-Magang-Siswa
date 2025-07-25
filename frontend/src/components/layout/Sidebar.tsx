"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Building2, 
  GraduationCap, 
  BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  role: "guru" | "siswa"
}

// Sidebar items untuk guru/admin
const guruSidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Ringkasan aktivitas"
  },
  {
    title: "DUDI",
    href: "/guru/dudi",
    icon: Building2,
    description: "Dunia Usaha & Industri"
  },
  {
    title: "Magang",
    href: "/guru/magang",
    icon: GraduationCap,
    description: "Data siswa magang"
  },
  {
    title: "Logbook",
    href: "/guru/logbook",
    icon: BookOpen,
    description: "Catatan harian"
  },
]

// Sidebar items untuk siswa
const siswaSidebarItems = [
  {
    title: "Dashboard",
    href: "/siswa",
    icon: LayoutDashboard,
    description: "Ringkasan aktivitas"
  },
  {
    title: "DUDI",
    href: "/siswa/dudi",
    icon: Building2,
    description: "Dunia Usaha & Industri"
  },
  {
    title: "Magang",
    href: "/siswa/magang",
    icon: GraduationCap,
    description: "Data magang saya"
  },
  {
    title: "Logbook",
    href: "/siswa/logbook",
    icon: BookOpen,
    description: "Catatan harian"
  },
]

export default function Sidebar({ isOpen, onClose, role }: SidebarProps) {
  const pathname = usePathname()
  
  // Pilih sidebar items berdasarkan role
  const sidebarItems = role === "guru" ? siswaSidebarItems : guruSidebarItems

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-72 transform bg-white/95 backdrop-blur-xl border-r border-slate-200/60 transition-all duration-300 ease-out lg:translate-x-0 shadow-xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="px-6 py-4 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 leading-tight">
                  Magang
                </h2>
                <p className="text-sm text-slate-500 -mt-0.5">
                  {role === "siswa" ? "Portal Siswa" : "Management"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                        isActive 
                          ? "bg-white/20" 
                          : "bg-slate-100 group-hover:bg-slate-200"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          isActive ? "text-white" : "text-slate-600"
                        )} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {item.title}
                        </div>
                        <div className={cn(
                          "text-xs mt-0.5",
                          isActive ? "text-white/80" : "text-slate-400"
                        )}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200/60">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100">
                <div className="h-2 w-2 rounded-full bg-lime-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900">
                  SMK Negeri 1 Surabaya
                </p>
                <p className="text-xs text-slate-500">
                  Sistem Pelaporan v1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}