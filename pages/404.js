// pages/404.js
export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl">Halaman tidak ditemukan</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  )
}
