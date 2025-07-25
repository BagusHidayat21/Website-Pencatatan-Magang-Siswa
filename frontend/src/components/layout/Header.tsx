"use client"

import { Menu, User, LogOut, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
  role: "guru" | "siswa"
}

export default function Header({ onMenuClick, role }: HeaderProps) {
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked")
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-slate-100 rounded-xl"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
          
          {/* School Title */}
          <div className="hidden sm:block">
            <h1 className="text-l font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              SMK Negeri 1 Surabaya
            </h1>
            <p className="text-sm text-slate-500 -mt-1">
              Sistem Pelaporan Magang Siswa
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold text-slate-900">
              SMKN 1 Surabaya
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-slate-100 rounded-xl"
          >
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost" 
                size="sm"
                className="relative hover:bg-slate-100 rounded-xl p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-900">Guru Pembimbing</p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-slate-200/60">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-slate-900">Guru Pembimbing</p>
                <p className="text-xs text-slate-500">guru@smkn1sby.sch.id</p>
              </div>
              <DropdownMenuSeparator className="bg-slate-200/60" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-pink-600 focus:text-pink-700 focus:bg-pink-50 cursor-pointer"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}