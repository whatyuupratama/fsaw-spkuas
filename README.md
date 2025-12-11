<h1 align="center">🟢 GreenFlag Fuzzy SAW</h1>
<p align="center">Dashboard interaktif buat ngeranking alternatif laboratorium pakai Fuzzy Simple Additive Weighting.</p>
<p align="center">
  <a href="https://skipsi-greenflag.vercel.app/">Demo</a>
  ·
  <a href="https://github.com/whatyuupratama/skipsi-greenflag">Repo</a>
</p>

---

<table>
  <tr>
    <td>

### 🎯 Kenapa GreenFlag?
- Data lapangan seringnya "perkiraan" (rendah, sedang, tinggi), jadi kita pakai **Triangular Fuzzy Number (TFN)** supaya tetap terukur.
- SAW versi fuzzy bikin penilaian multi-kriteria jadi adil, walau data beda skala.
- Semua tahapan (input → normalisasi → pembobotan → defuzzify) kelihatan jelas, jadi gampang buat jelasin waktu demo.

### 🚀 Quick Features
- Unlimited kriteria/alternatif dengan input TFN langsung.
- Normalisasi otomatis sesuai tipe `max/min` per kriteria.
- Ringkasan bobot, matriks berbobot, skor fuzzy, dan ranking crisp.
- Halaman interpretasi yang generate narasi otomatis.

    </td>
    <td>

### 🧱 Stack Snapshot
| Layer | Tools |
| ----- | ----- |
| UI | Next.js 14, Tailwind, Framer Motion, MagicUI |
| State | Zustand (store kriteria & alternatif) |
| Logika | TypeScript utility `calculateFuzzySaw` |
| Ops | Vercel deploy, pnpm/npm scripts |

### 🧑‍🤝‍🧑 Target User
- Kepala lab / QA yang harus milih prioritas cepat.
- Tim pengadaan yang pengin transparansi bobot.
- Mahasiswa/peneliti yang lagi belajar fuzzy SAW interaktif.

    </td>
  </tr>
</table>

---

## 🗂️ Isi Halaman
1. [Alur Cerita Pengguna](#-alur-cerita-pengguna)
2. [Mesin Fuzzy SAW](#-mesin-fuzzy-saw)
3. [Cara Baca Tiap Panel](#-cara-baca-tiap-panel)
4. [File Penting](#-file-penting)
5. [Timeline & Tim](#-timeline--tim)
6. [Risiko & Catatan](#-risiko--catatan)

---

## 🧭 Alur Cerita Pengguna
| Tahap | Yang Terjadi di UI | Apa yang Dilakukan Dev |
| ----- | ------------------ | ---------------------- |
| 1. Setup Kriteria | User tambah nama kriteria, bobot, dan tipe max/min. | Zustand store bikin ID baru + TFN kosong buat semua alternatif. |
| 2. Isi TFN | User masukin `low-mid-high` per alternatif. | Handler di `FsawDetectionClient` nyimpen input sementara → commit ke store. |
| 3. Klik Lihat Hasil | UI otomatis nunjukin tabel normalisasi, pembobotan, agregasi, ranking. | `useMemo` panggil `calculateFuzzySaw` setiap state berubah. |
| 4. Interpretasi | User buka halaman interpretasi buat narasi. | Halaman `interpretasi/page.tsx` render ulang hasil dan bikin kalimat highlight. |

---

## 🧠 Mesin Fuzzy SAW
Semua logika utama ada di `src/utils/fuzzy/fuzzySaw.ts`. Berikut versi ringan yang bisa kamu ceritain saat presentasi:

1. **Decision Matrix**
   - Kumpulin TFN dari store → pastiin nggak ada undefined (`ensureFuzzy`).
   - Output: `MatrixRow[]` yang rapi.
2. **Normalisasi**
   - Bangun referensi `max/min` per kriteria (`buildNormalizationReference`).
   - Kalau tipe `max`: nilai dibagi max. Kalau `min`: referensi min dibagi nilai (biar angka kecil jadi besar).
3. **Bobot**
   - Total bobot dihitung → dinormalisasi. Kalau ada kriteria tanpa bobot, fallback 1/n.
   - TFN ternormalisasi dikali bobot pakai `multiplyFuzzy`.
4. **Agregasi**
   - Semua TFN berbobot per alternatif dijumlahin (`addFuzzy`).
   - Hasilnya TFN tunggal per alternatif (`fuzzyScore`).
5. **Defuzzify & Ranking**
   - Rumus `(low + 4*mid + high) / 6` bikin angka crisp buat dibandingin.
   - Ranking diurutkan desc, dan TFN tetap ditampilin biar konteksnya nggak hilang.

> **Why defuzzify?** Supaya orang tinggal lihat angka tunggal tanpa perlu interpretasi bentuk segitiga. Tapi TFN asli tetap penting buat lihat seberapa lebar ketidakpastian.

### Mini Cheat Sheet TFN
- `low` = batas minimum yang masih dianggap realistis.
- `mid` = nilai paling representatif (paling dipercaya).
- `high` = batas optimistis.
- Pastikan `low ≤ mid ≤ high` untuk menjaga bentuk triangular.

---

## 🖼️ Cara Baca Tiap Panel
| Panel | Tips Penjelasan | Insight Teknis |
| ----- | --------------- | -------------- |
| **Kriteria & Bobot** | Tekankan user bebas masukin bobot, sistem bakal normalisasi otomatis. | Data datang dari `useFuzzySawStore.criteria`. Toggle `max/min` langsung update `type`. |
| **Matriks Nilai Fuzzy** | Ingatkan user isi low ≤ mid ≤ high. Bisa contohin satu alternatif. | State `alternatives` simpen TFN sebagai objek `{low, mid, high}` per kriteria. |
| **Normalisasi** | Tunjuk nilai yang jadi 1 (paling bagus) vs kecil (kurang). Jelaskan beda max/min. | Fungsi `normalizeValue` baca referensi `max/min` tadi. |
| **Matriks Berbobot** | Ganti bobot besar → lihat efeknya di tabel ini. | `multiplyFuzzy` dipanggil per sel dengan bobot normalisasi. |
| **Agregasi & Ranking** | Jelaskan TFN total vs crisp. Crisp buat ranking, TFN buat lihat range. | `aggregatedScores` punya dua properti: `fuzzyScore` & `crispScore`. |
| **Interpretasi** | Cocok buat stakeholder awam: kalimat otomatis jelasin siapa unggul & kenapa. | Halaman `interpretasi` bikin narasi dari `ranking[0]` dan `ranking.at(-1)`. |

> Saat demo, ubah salah satu TFN atau bobot dan ajak audiens lihat gimana semua panel ikut bergerak. Ini bukti bahwa logika fuzzy berjalan real-time di client.

---

## 📁 File Penting
| Path | Fungsi Singkat |
| ---- | -------------- |
| `src/utils/fuzzy/fuzzySaw.ts` | Mesin Fuzzy SAW (normalisasi, pembobotan, defuzzify). |
| `src/store/fuzzySawStore.ts` | Zustand store: kriteria, alternatif, aksi CRUD. |
| `src/app/fsaw-detection/FsawDetectionClient.tsx` | UI utama kalkulator dengan tabel-tabelnya. |
| `src/app/fsaw-detection/interpretasi/page.tsx` | Halaman narasi otomatis berbasis skor fuzzy. |
| `src/components/section.tsx` dkk | Komponen UI pendukung (cards, layout). |

---

## 🗓️ Timeline & Tim

<table>
  <tr>
    <td valign="top">

### Timeline Cepat
| Minggu | Fokus |
| ------ | ----- |
| W1 | Riset teori Fuzzy SAW + kumpulin kriteria real | 
| W2 | Desain UI + setup store Zustand |
| W3 | Implementasi kalkulator & animasi | 
| W4 | Interpretasi naratif + polishing + dokumentasi |

    </td>
    <td valign="top">

### Tim
| Role | Nama | Institusi | Catatan |
| ---- | ---- | --------- | ------- |
| PM / FE | Wahyu Pratama | ITB Asia Malang | Koordinasi & UI/UX |
| FE | (Isi sesuai kebutuhan) | - | Implementasi komponen |
| Research | (Isi sesuai kebutuhan) | - | Validasi kriteria & bobot |

*(update tabel sesuai formasi terbaru ya!)*

    </td>
  </tr>
</table>

---

## ⚠️ Risiko & Catatan
- **TFN tidak urut** → bisa bikin hasil defuzzify nggak masuk akal. Tambahin validasi jika dibutuhkan.
- **Bobot ekstrem** → satu kriteria bisa mendominasi; jelasin ke user soal konsekuensinya.
- **Semua di client** → super cepat buat dataset kecil, tapi kalau alternatif ratusan, browser perlu dioptimasi.
- **Transparansi** → karena seluruh rumus kelihatan, siap-siap jawab pertanyaan detail dari audiens (sudah ada di README ini!).

---

## 📚 Sumber Belajar
- Makalah Fuzzy SAW & Triangular Fuzzy Number (bisa pakai referensi umum: Kusumadewi, Tsukamoto, dll.).
- Dataset laboratorium internal untuk tuning bobot.
- Artikel tentang defuzzification `(a + 4m + b)/6` biar gampang jelasin kenapa rumus itu dipakai.

---

## 🪪 Lisensi
Proyek edukasi & riset internal. Bebas dipakai buat belajar / demo. Kalau mau dipakai buat keputusan kritikal, pastikan ada validasi tambahan dan hubungi tim dulu.

---
