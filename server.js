import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.use(express.json({ limit: "10mb" }));
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime(), timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime(), timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.post("/api/suggest-cp-tp", async (req, res) => {
  try {
    const { mataPelajaran, jenjang, faseKelas, materi } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "No active API key found; falling back to offline curated knowledge base."
      });
    }
    const mapelLower = (mataPelajaran || "").toLowerCase();
    const isAgama = mapelLower.includes("agama") || mapelLower.includes("pai") || mapelLower.includes("islam") || mapelLower.includes("kristen") || mapelLower.includes("katolik") || mapelLower.includes("hindu") || mapelLower.includes("buddha") || mapelLower.includes("khonghucu") || mapelLower.includes("budi pekerti") || mapelLower.includes("kepercayaan");
    const bskapRegulationText = isAgama ? "Keputusan Kepala BSKAP Kemendikbudristek Nomor 020 Tahun 2026 (Standar Capaian Pembelajaran Pendidikan Agama dan Budi Pekerti)" : "Keputusan Kepala BSKAP Kemendikbudristek Nomor 046 Tahun 2025 (Standar Capaian Pembelajaran untuk Semua Mata Pelajaran selain Pendidikan Agama)";
    const prompt = `Anda adalah ahli kurikulum Kemendikbudristek Indonesia dan pengembang Kurikulum Merdeka.
Tolong rumuskan referensi otomatis yang selaras dengan Kurikulum Merdeka dan Pembelajaran Mendalam (Deep Learning) untuk topik berikut:
- Mata Pelajaran: ${mataPelajaran || "Umum"}
- Jenjang: ${jenjang || "SMP"}
- Fase / Kelas: ${faseKelas || "Fase D / Kelas VII"}
- Topik / Materi: ${materi || "Materi Inti"}

ATURAN STANDAR KOMPETENSI RESMI BSKAP KEMENDIKBUDRISTEK:
Data ke-16 Capaian Pembelajaran (CP) WAJIB merujuk pada:
- ${bskapRegulationText}.
Cantumkan klausul rujukan resmi ini secara eksplisit pada awal teks Capaian Pembelajaran (CP).

Secara khusus, buatkan:
1. Capaian Pembelajaran (CP) resmi/rekomendasi sesuai regulasi resmi di atas
2. 3-4 Tujuan Pembelajaran (TP) operasional (KKO Taksonomi Bloom/Anderson)
3. Kompetensi Awal (Prasyarat): Pengetahuan atau keterampilan prasyarat yang relevan dan konkret yang harus dikuasai peserta didik sebelum mempelajari topik ini
4. Model & Metode Pembelajaran: Model (misal Problem Based Learning, Project Based Learning, Inkuiri Terbimbing, Discovery Learning, Experiential Learning) dan metode yang paling cocok dan efektif untuk materi ini
5. Konteks Lingkungan & Kearifan Lokal: Konteks lingkungan sekitar sekolah/masyarakat atau kearifan lokal budaya Indonesia yang sangat relevan sebagai laboratorium nyata atau analogi bermakna untuk materi ini
6. Pemahaman Bermakna & Pertanyaan Pemantik

Format respons dalam format JSON valid dengan struktur:
{
  "cp": "Teks Capaian Pembelajaran yang lengkap diawali rujukan regulasi resmi BSKAP...",
  "elemen": "Elemen CP yang relevan (misal: Pemahaman Konsep, Keterampilan Proses)",
  "tujuanPembelajaran": [
    "TP 1...",
    "TP 2...",
    "TP 3..."
  ],
  "kompetensiAwal": "Deskripsi kompetensi prasyarat spesifik yang perlu dikuasai peserta didik terkait topik ini...",
  "modelPembelajaran": "Rekomendasi model dan metode (misal: Problem Based Learning (PBL) dipadukan dengan observasi lingkungan nyata, diskusi kelompok terarah, dan Gallery Walk)...",
  "kearifanLokal": "Rekomendasi konteks lingkungan dan kearifan lokal spesifik yang relevan dengan topik ini...",
  "pemahamanBermakna": "Inti pemahaman mendalam yang bernilai jangka panjang bagi kehidupan nyata peserta didik...",
  "pertanyaanPemantik": [
    "Pertanyaan 1...",
    "Pertanyaan 2..."
  ]
}
HANYA kembalikan JSON murni tanpa markdown wrapper.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Error in /api/suggest-cp-tp:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/generate-modul", async (req, res) => {
  try {
    const data = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "No active API key found; will use built-in expert Deep Learning generator."
      });
    }
    const systemInstruction = `Anda adalah ahli perancang pembelajaran Indonesia, pengembang kurikulum nasional (Kemendikbudristek), dan master trainer Pembelajaran Mendalam (Deep Learning) Kurikulum Merdeka.
Tugas Anda adalah merancang Rencana Pembelajaran / Modul Ajar yang SANGAT LENGKAP, SISTEMATIS, KONTEKSTUAL, FLEKSIBEL, dan SIAP DIGUNAKAN DI KELAS dengan KERANGKA 8-3-3-4:
1. 8 Dimensi Profil Lulusan (Keimanan & Ketakwaan, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi).
2. 3 Prinsip Deep Learning (Berkesadaran, Bermakna, Menggembirakan).
3. 3 Pengalaman Belajar (Memahami -> Mengaplikasi -> Merefleksi).
4. 4 Kerangka Pembelajaran (Praktik Pedagogis, Kemitraan Pembelajaran, Lingkungan Pembelajaran, Pemanfaatan Digital).

Pastikan skenario kegiatan sangat rinci dengan alokasi waktu menit konkret (Pendahuluan, Inti Tahap 1 Memahami, Inti Tahap 2 Mengaplikasi, Inti Tahap 3 Merefleksi, Penutup).
ATURAN SINTAK MODEL PEMBELAJARAN:
- Cantumkan sintak lengkap model pembelajaran yang dipilih pada praktikPedagogis.sintakModel (contoh: untuk PBL 5 sintak, PjBL 6 sintak, Discovery Learning 6 sintak, Inquiry 5 sintak, Cooperative Learning 6 sintak).
- Setiap butir kegiatan pada KEGIATAN INTI (tahap1Memahami, tahap2Mengaplikasi, tahap3Merefleksi) WAJIB mencantumkan nama sintak model pembelajaran pada properti "sintak" (contoh: "Sintak 1: Orientasi Siswa pada Masalah", "Sintak 2: Pengorganisasian Belajar", "Sintak 3: Penyelidikan Masalah", dst.) yang secara nyata diaplikasikan pada aktivitas, peran guru, dan peran siswa.
Pastikan LKPD lengkap dengan stimulus kontekstual, pertanyaan analisis, tugas penerapan, dan kesimpulan.
Pastikan Asesmen (Diagnostik, Formatif, Sumatif) dan Rubrik Penilaian Skala 1-4 sangat konkret dan operasional.
Pastikan Diferensiasi (Konten, Proses, Produk untuk 3 kelompok), Remedial, Pengayaan, dan Refleksi Guru & Peserta Didik disajikan utuh.`;
    const mapelLower = (data.mataPelajaran || "").toLowerCase();
    const isAgama = mapelLower.includes("agama") || mapelLower.includes("pai") || mapelLower.includes("islam") || mapelLower.includes("kristen") || mapelLower.includes("katolik") || mapelLower.includes("hindu") || mapelLower.includes("buddha") || mapelLower.includes("khonghucu") || mapelLower.includes("budi pekerti") || mapelLower.includes("kepercayaan");
    const bskapRegulationText = isAgama ? "Keputusan Kepala BSKAP Kemendikbudristek Nomor 020 Tahun 2026 (Pendidikan Agama dan Budi Pekerti)" : "Keputusan Kepala BSKAP Kemendikbudristek Nomor 046 Tahun 2025 (Semua Mata Pelajaran selain Pendidikan Agama)";
    const userPrompt = `Rancang modul ajar Kurikulum Merdeka dengan data berikut:
- Satuan Pendidikan: ${data.sekolah || "SMP Negeri 1 Merdeka"}
- Nama Guru: ${data.namaGuru || "Guru Penggerak"}
- Mata Pelajaran: ${data.mataPelajaran || "Ilmu Pengetahuan Alam"}
- Jenjang: ${data.jenjang || "SMP"}
- Fase & Kelas: ${data.faseKelas || "Fase D / Kelas VII"}
- Semester & Tahun: ${data.semester || "Semester Ganjil"} / ${data.tahunPelajaran || "2025/2026"}
- Materi / Topik: ${data.materi || "Ekosistem dan Interaksi Makhluk Hidup"}
- Alokasi Waktu: ${data.alokasiWaktu || "2 JP (2 x 40 menit)"}
- Jumlah Pertemuan: ${data.jumlahPertemuan || "1 Pertemuan"}
- Jumlah Peserta Didik: ${data.jumlahSiswa || "32 siswa"}
- Karakteristik Siswa: ${data.karakteristikSiswa || "Heterogen, sebagian kinestetik dan visual, menyukai kerja kelompok"}
- Kompetensi Awal: ${data.kompetensiAwal || "Memahami komponen biotik dan abiotik dasar"}
- Sarana & Prasarana: ${data.sarpras || "Proyektor, LKPD cetak, smartphone, lingkungan taman sekolah"}
- Model & Metode: ${data.modelPembelajaran || "Problem Based Learning (PBL) dipadukan pengamatan langsung"}
- Konteks Lingkungan / Kearifan Lokal: ${data.kearifanLokal || "Kawasan perkebunan/taman lokal daerah setempat"}
- Capaian Pembelajaran: ${data.capaianPembelajaran || "Peserta didik mengidentifikasi interaksi antar makhluk hidup dan lingkungannya serta merancang upaya pencegahan pencemaran"}
- Dasar Regulasi Resmi Standar Kompetensi BSKAP: ${bskapRegulationText}
- Catatan Tambahan: ${data.catatanTambahan || "-"}

Kembalikan dokumen lengkap dalam format JSON terstruktur dengan skema berikut:
{
  "identitas": {
    "sekolah": "...",
    "namaGuru": "...",
    "mataPelajaran": "...",
    "jenjang": "...",
    "faseKelas": "...",
    "semester": "...",
    "tahunPelajaran": "...",
    "materi": "...",
    "alokasiWaktu": "...",
    "jumlahPertemuan": "...",
    "jumlahSiswa": "..."
  },
  "capaianPembelajaran": "...",
  "tujuanPembelajaran": ["TP 1...", "TP 2...", "TP 3..."],
  "kompetensiAwal": "...",
  "karakteristikSiswa": "...",
  "kebutuhanBelajar": "...",
  "pemahamanBermakna": "...",
  "pertanyaanPemantik": ["..."],
  "pertanyaanEsensial": ["..."],
  "materiEsensial": [
    { "subtopik": "...", "uraian": "..." }
  ],
  "dimensiProfilLulusan": [
    { "dimensi": "Penalaran Kritis", "keterkaitan": "...", "aktivitas": "...", "indikator": "..." }
  ],
  "prinsipDeepLearning": {
    "berkesadaran": { "deskripsi": "...", "penerapan": "..." },
    "bermakna": { "deskripsi": "...", "penerapan": "..." },
    "menggembirakan": { "deskripsi": "...", "penerapan": "..." }
  },
  "pengalamanBelajar": {
    "memahami": "...",
    "mengaplikasi": "...",
    "merefleksi": "..."
  },
  "kerangkaPembelajaran": {
    "praktikPedagogis": { "pendekatan": "...", "model": "...", "sintakModel": ["Sintak 1: ...", "Sintak 2: ..."], "metode": "...", "strategi": "...", "diferensiasi": "..." },
    "kemitraanPembelajaran": { "peranGuru": "...", "peranSiswa": "...", "temanSebaya": "...", "orangTuaMasyarakat": "..." },
    "lingkunganPembelajaran": { "ruangKelas": "...", "lingkunganSekitar": "...", "ruangDigital": "..." },
    "pemanfaatanDigital": { "opsiOnline": "...", "opsiOffline": "..." }
  },
  "skenarioPembelajaran": {
    "pendahuluan": [
      { "fase": "Orientasi & Apersepsi", "kegiatan": "...", "waktu": "10 menit" }
    ],
    "inti": {
      "tahap1Memahami": [
        { "sintak": "Sintak 1: ...", "aktivitas": "...", "peranGuru": "...", "peranSiswa": "...", "waktu": "20 menit" }
      ],
      "tahap2Mengaplikasi": [
        { "sintak": "Sintak 3: ...", "aktivitas": "...", "peranGuru": "...", "peranSiswa": "...", "waktu": "35 menit" }
      ],
      "tahap3Merefleksi": [
        { "sintak": "Sintak 5: ...", "aktivitas": "...", "peranGuru": "...", "peranSiswa": "...", "waktu": "15 menit" }
      ]
    },
    "penutup": [
      { "kegiatan": "...", "waktu": "10 menit" }
    ]
  },
  "lkpd": {
    "judul": "...",
    "tujuan": "...",
    "petunjuk": "...",
    "stimulusKonteks": "...",
    "pertanyaanPemantik": "...",
    "langkahKegiatan": ["..."],
    "tabelPengamatan": {
      "judul": "...",
      "kolom": ["No", "..."],
      "barisContoh": [["1", "..."]]
    },
    "pertanyaanAnalisis": ["..."],
    "tugasPenerapan": "...",
    "kesimpulan": "...",
    "refleksiSiswa": "..."
  },
  "asesmen": {
    "diagnostik": { "tujuan": "...", "teknik": "...", "instrumen": "...", "tindakLanjut": "..." },
    "formatif": { "tujuan": "...", "teknik": "...", "instrumen": "...", "tindakLanjut": "..." },
    "sumatif": { "tujuan": "...", "teknik": "...", "instrumen": "...", "kriteriaKetuntasan": "..." }
  },
  "rubrikPenilaian": [
    {
      "aspek": "Penalaran Kritis & Pemecahan Masalah",
      "skor4": "Deskripsi sangat mahir...",
      "skor3": "Deskripsi cakap...",
      "skor2": "Deskripsi berkembang...",
      "skor1": "Deskripsi perlu bimbingan..."
    }
  ],
  "diferensiasi": {
    "konten": { "bimbingan": "...", "sedang": "...", "pengayaan": "..." },
    "proses": { "bimbingan": "...", "sedang": "...", "pengayaan": "..." },
    "produk": { "bimbingan": "...", "sedang": "...", "pengayaan": "..." }
  },
  "remedialDanPengayaan": {
    "kriteriaRemedial": "...",
    "programRemedial": "...",
    "kriteriaPengayaan": "...",
    "programPengayaan": "..."
  },
  "refleksi": {
    "guru": ["Apa yang berhasil?", "Apa tantangan?", "Apa perbaikan?"],
    "siswa": ["Apa yang saya pahami?", "Apa yang menantang?", "Bagaimana menerapkannya?"]
  },
  "produkAkhir": "...",
  "sumberBelajar": ["..."]
}
HANYA berikan output JSON yang valid tanpa markdown codeblock.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Error generating modul:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/refine-section", async (req, res) => {
  try {
    const { sectionName, currentData, promptModifier } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "No active API key found."
      });
    }
    const prompt = `Anda adalah ahli kurikulum Merdeka dan Pembelajaran Mendalam (Deep Learning).
Perbaiki atau kembangkan bagian "${sectionName}" dari Modul Ajar berikut berdasarkan instruksi: "${promptModifier || "Tingkatkan kualitas, rincian aktivitas, dan nilai kontekstualnya"}".

Data bagian saat ini:
${JSON.stringify(currentData, null, 2)}

Format jawaban HANYA berupa JSON valid yang memperbarui objek data bagian tersebut.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Error in /api/refine-section:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
async function startServer() {
  const isCompiledJs = __filename.endsWith(".js");
  const isProd = process.env.NODE_ENV === "production" || isCompiledJs;
  const distPath = path.resolve(process.cwd(), "dist");
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Endpoint API tidak ditemukan" });
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (mode: ${isProd ? "production" : "development"})`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
