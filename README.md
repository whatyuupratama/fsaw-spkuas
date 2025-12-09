# 🦷 GigiSehat – Kenali Risiko Gigi Berlubang pada Anak Usia Dini

## 🌐 Live Website

[🔗 Vercel Deployment](https://caps-gigi-lmdw.vercel.app/)

## 📦 GitHub Repository

[🔗 GitHub Repo](https://github.com/whatyuupratama/caps-gigi)

---

## 📌 Deskripsi Proyek

Gigi berlubang pada anak usia 3–6 tahun sering dianggap sepele, padahal bisa berdampak jangka panjang terhadap kesehatan mulut hingga dewasa. Masalah utamanya adalah kurangnya edukasi sederhana kepada orang tua terkait kebiasaan harian anak. Oleh karena itu, **GigiSehat** hadir sebagai platform edukatif berbasis web untuk membantu orang tua:

- Menilai risiko gigi berlubang pada anak usia dini berdasarkan kebiasaan harian.
- Memberikan prediksi risiko secara langsung (rendah atau tinggi) menggunakan Machine Learning.
- Menyediakan edukasi singkat yang mudah dipahami dan digunakan.

---

## 💡 Latar Belakang & Tujuan

Tim kami menemukan ide ini berdasarkan fakta banyaknya kasus gigi berlubang yang terjadi karena kurangnya edukasi. Kami ingin menyediakan alat bantu digital prediktif dan mudah diakses untuk membantu para orang tua sadar pentingnya menjaga kebiasaan sehat anak sejak dini.

---

## 🧠 Statement & Research Question

### 🔍 Pernyataan Masalah

Masih banyak orang tua belum sadar pentingnya menjaga kebiasaan kesehatan gigi anak sejak dini, sehingga menyebabkan tingginya angka gigi berlubang pada usia balita.

### ❓ Pertanyaan Penelitian

Bagaimana membangun sistem berbasis ML untuk memprediksi risiko gigi berlubang anak usia dini berdasarkan kebiasaan sehari-hari?

---

## 📆 Timeline Proyek

| Minggu | Aktivitas                       |
| ------ | ------------------------------- |
| W1     | Riset kebutuhan, analisis scope |
| W2     | Perancangan UI/UX, mulai coding |
| W3     | Pengembangan web + model ML     |
| W4     | Testing, bug fix, dokumentasi   |

---

## ⚙️ Teknologi yang Digunakan

### Frontend

- **Next.js** – Framework React modern
- **Tailwind CSS** – Utility-first CSS
- **Shadcn UI** – Komponen UI modern

### Backend

- **Flask** – Python web framework untuk API ML
- **REST API** – Integrasi Frontend–Backend

### Machine Learning

- **Scikit-learn / TensorFlow** – Algoritma klasifikasi (Decision Tree, Logistic Regression)
- **Joblib** – Menyimpan model dalam format `.pkl`
- **Google Colab** – Eksperimen dan pelatihan model

---

## 🤖 Alur Kerja Machine Learning

1. User mengisi kuesioner berbasis pilihan "iya/tidak"
2. Data dikirim ke API Flask
3. Model melakukan prediksi risiko (rendah/tinggi)
4. Hasil dikembalikan dan ditampilkan ke user

---

## 👨‍👩‍👦 Target Pengguna

- Orang tua dengan anak usia 3–6 tahun
- Tenaga pengajar PAUD dan TK
- Tenaga kesehatan dasar yang membutuhkan alat bantu edukasi

---

## 🧪 Bukti & Dokumentasi

- ✅ [Link ke GitHub repository](https://github.com/whatyuupratama/caps-gigi)
- ✅ [Deploy hasil kerja](https://caps-gigi-lmdw.vercel.app/)
- 📸 Tambahkan screenshot (opsional)

---

## 👥 Tim Pengembang

| Role | Nama                       | Institusi                 | ID Peserta   |
| ---- | -------------------------- | ------------------------- | ------------ |
| PM   | Wahyu Pratama              | ITB Asia Malang           | MC479D5Y0473 |
| ML   | Mochammad Fiqi Fahrudillah | ITB Asia Malang           | MC479D5Y0487 |
| ML   | Mohammad 'Alwan Fauzi      | Universitas Brawijaya     | MC006D5Y1380 |
| FEBE | Muhammad Faris             | Universitas Potensi Utama | FC304D5Y0770 |
| FEBE | Fahreza Finandika Pardana  | IT Insan Cendekia Mandiri | FC816D5Y0368 |

---

## 📚 Kebutuhan Pendukung

- Jurnal atau studi terkait kebiasaan dan kesehatan gigi anak
- Materi atau panduan integrasi Frontend ↔ Backend ↔ Model ML

---

## ⚠️ Potensi Risiko

- Validasi model terbatas oleh minimnya data nyata
- Integrasi API ML bisa mengalami kendala deployment
- Kesulitan teknis dalam pengolahan input user yang bersifat boolean

---

## 📄 Lisensi

Open Source untuk keperluan edukasi dan portofolio capstone. Tidak digunakan untuk diagnosis medis.

---
