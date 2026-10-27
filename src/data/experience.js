// Sumber: profil LinkedIn (dibaca 25 Okt 2026) dan repositori Lentera (D:\lentera app).
// Poin frontend diambil dari struktur kode dan riwayat commit atas nama adann77. Tulisan "ikut" dipakai
// karena repositori dikerjakan bersama rekan. Judul "Full Stack Developer Intern" sesuai permintaan pemilik.
export const experiences = [
  {
    company: "PT Royal General Indonesia",
    position: "Full Stack Developer Intern",
    period: "7 Sep 2026 – 7 Jan 2027 · Pekanbaru, Riau",
    description: "Mengembangkan Lentera (lenteracpns.id), aplikasi belajar SKD CPNS, bersama tim: Flutter untuk aplikasi, Next.js untuk landing page, Node.js dan PostgreSQL untuk backend.",
    highlights: [
      "Ikut membangun antarmuka aplikasi dengan Flutter, Riverpod, dan go_router: login dan registrasi, beranda, alur belajar (materi, latihan per tema, tryout), halaman progres, profil, dan peringkat.",
      "Membangun layar panel admin untuk mengelola materi, bank soal, pengguna, dan impor soal.",
      "Menghubungkan layar dengan REST API lewat service layer dan state Riverpod untuk autentikasi, konten, sesi latihan, dan progres belajar.",
      "Ikut menyusun landing page lenteracpns.id dengan Next.js, React, Tailwind, serta animasi GSAP dan Lenis.",
      "Merancang skema database PostgreSQL dan migrasi dengan Knex.js untuk data pengguna, materi, bank soal, sesi latihan, progres belajar, dan pembayaran.",
      "Membangun REST API dengan Express.js untuk autentikasi, materi, latihan/kuis, progres belajar, dan panel admin.",
      "Mengimplementasikan keamanan akun: JWT, hashing password bcrypt, verifikasi email kode 6 digit via Nodemailer, serta alur ganti dan lupa password.",
      "Membuat middleware hak akses (admin dan pengguna premium) untuk mengatur tingkat akses konten.",
      "Mengembangkan fitur impor soal dari dokumen Word (.docx) agar admin mengisi bank soal dengan cepat.",
      "Membangun logika check-in harian (streak), statistik soal yang dikerjakan, dan peringkat hasil tryout.",
    ],
    // shown as tabs on the site: first 4 points are frontend, the rest backend
    split: 4,
    tech: ["Flutter", "Dart", "Riverpod", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Knex.js", "JWT", "Nodemailer"],
  },
];

export const internPhotos = [
  {
    src: "/magang-1.webp",
    alt: "Diskusi tim di meja kerja dengan papan tulis dan laptop saat magang",
    caption: "Diskusi tim di sela magang",
    rotate: -2.4,
  },
  {
    src: "/magang-2.webp",
    alt: "Tim melihat tampilan Lentera di layar besar dan laptop saat sesi review",
    caption: "Sesi review: Lentera tampil di layar",
    rotate: 2,
  },
];
