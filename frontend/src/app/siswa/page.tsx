'use client'

export default function DashboardPage() {
  const username = "Ahmad Rizki" // Contoh static, nanti bisa diganti dengan session/user context

  return (
    <main>
          <h1 className="text-xl font-semibold">Selamat datang, {username}!</h1>
    </main>
  )
}
