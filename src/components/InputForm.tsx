import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  School, 
  Compass, 
  Target, 
  RefreshCw, 
  CheckCircle2, 
  FileCheck2, 
  ArrowRight,
  Wand2,
  Lightbulb,
  Check
} from 'lucide-react';
import { InitialDataInput, Jenjang } from '../types/modul';
import { 
  requestSuggestCpTp, 
  generateCurriculumSuggestionOffline, 
  getSmartFieldReferences,
  getModelSyntaxInfo
} from '../services/modulGenerator';

interface InputFormProps {
  formData: InitialDataInput;
  setFormData: React.Dispatch<React.SetStateAction<InitialDataInput>>;
  onGenerate: () => void;
  isGenerating: boolean;
  onSelectQuickPreset?: (jenjang: Jenjang) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  setFormData,
  onGenerate,
  isGenerating,
}) => {
  const [isSuggestingCp, setIsSuggestingCp] = useState(false);
  const [suggestNotification, setSuggestNotification] = useState<string | null>(null);

  // Compute live smart recommendations based on the currently typed topic & context
  const smartReferences = useMemo(() => {
    return getSmartFieldReferences({
      mataPelajaran: formData.mataPelajaran,
      jenjang: formData.jenjang,
      faseKelas: formData.faseKelas,
      materi: formData.materi,
    });
  }, [formData.mataPelajaran, formData.jenjang, formData.faseKelas, formData.materi]);

  // Compute live syntax steps for the selected learning model
  const currentModelSyntax = useMemo(() => {
    return getModelSyntaxInfo(formData.modelPembelajaran);
  }, [formData.modelPembelajaran]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate all references at once (CP, Kompetensi Awal 13, Model & Metode 15, Kearifan Lokal 16)
  const handleSuggestAll = async () => {
    if (!formData.materi || !formData.materi.trim()) {
      alert('Silakan isi kolom "11. Materi Pokok / Topik Pembelajaran" terlebih dahulu agar referensi dapat disesuaikan!');
      return;
    }

    setIsSuggestingCp(true);
    setSuggestNotification(null);

    try {
      const suggestion = await requestSuggestCpTp({
        mataPelajaran: formData.mataPelajaran,
        jenjang: formData.jenjang,
        faseKelas: formData.faseKelas,
        materi: formData.materi,
      });

      if (suggestion.cp) {
        setFormData((prev) => ({
          ...prev,
          capaianPembelajaran: suggestion.cp,
          kompetensiAwal: suggestion.kompetensiAwal,
          modelPembelajaran: suggestion.modelPembelajaran,
          kearifanLokal: suggestion.kearifanLokal,
        }));
        setSuggestNotification('✨ Referensi otomatis berhasil diperbarui untuk: Kompetensi Awal (13), Model & Metode (15), Kearifan Lokal (16), dan Capaian Pembelajaran (17)!');
        setTimeout(() => setSuggestNotification(null), 6000);
      }
    } catch (err) {
      console.error('Error suggesting curriculum:', err);
    } finally {
      setIsSuggestingCp(false);
    }
  };

  // Specific helper to generate single field automatically from current smart references
  const handleSuggestSingleField = (
    field: 'kompetensiAwal' | 'modelPembelajaran' | 'kearifanLokal',
    fieldLabel: string
  ) => {
    if (!formData.materi || !formData.materi.trim()) {
      alert(`Silakan isi kolom "11. Materi Pokok / Topik" terlebih dahulu untuk menyusun referensi ${fieldLabel}!`);
      return;
    }

    const value = smartReferences[field].primary;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSuggestNotification(`✨ Referensi otomatis ${fieldLabel} berhasil diterapkan sesuai materi "${formData.materi}"!`);
    setTimeout(() => setSuggestNotification(null), 4000);
  };

  const handleJenjangChange = (newJenjang: Jenjang) => {
    let defaultFase = 'Fase D / Kelas VII';
    if (newJenjang === 'SD') defaultFase = 'Fase B / Kelas IV';
    if (newJenjang === 'SMA') defaultFase = 'Fase E / Kelas X';
    if (newJenjang === 'SMK') defaultFase = 'Fase F / Kelas XI';

    setFormData((prev) => ({
      ...prev,
      jenjang: newJenjang,
      faseKelas: defaultFase,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Intro Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-sm font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-lg">
              Langkah 1: Input Data Awal
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
              Kerangka 8–3–3–4 Deep Learning
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Perancangan Modul Ajar Kurikulum Merdeka
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            Lengkapi 17 Data Awal Pembelajaran di bawah ini. Anda juga dapat memilih contoh modul siap pakai (SD, SMP, SMA, SMK) melalui menu <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Contoh Modul</strong> pada sidebar di sebelah kiri.
          </p>
        </div>
      </div>

      {/* Global Notification Banner */}
      {suggestNotification && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-3 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{suggestNotification}</span>
        </div>
      )}

      {/* Main 17-Field Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="space-y-8"
      >
        {/* Section 1: Identitas Satuan & Guru */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                1. Identitas Satuan Pendidikan & Pengajar
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Data resmi sekolah, pengampu, jenjang, fase, dan alokasi
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                1. Nama Satuan Pendidikan (Sekolah) *
              </label>
              <input
                type="text"
                name="sekolah"
                required
                value={formData.sekolah}
                onChange={handleChange}
                placeholder="Contoh: SMP Negeri 1 Merdeka Belajar"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                2. Nama Guru Pengampu *
              </label>
              <input
                type="text"
                name="namaGuru"
                required
                value={formData.namaGuru}
                onChange={handleChange}
                placeholder="Contoh: Siti Rahmawati, S.Pd., M.Pd."
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                3. Mata Pelajaran *
              </label>
              <input
                type="text"
                name="mataPelajaran"
                required
                value={formData.mataPelajaran}
                onChange={handleChange}
                placeholder="Contoh: Ilmu Pengetahuan Alam (IPA)"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                4. Jenjang Pendidikan *
              </label>
              <select
                name="jenjang"
                value={formData.jenjang}
                onChange={(e) => handleJenjangChange(e.target.value as Jenjang)}
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-semibold"
              >
                <option value="SD">SD (Sekolah Dasar)</option>
                <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                5. Kelas & Fase *
              </label>
              <input
                type="text"
                name="faseKelas"
                required
                value={formData.faseKelas}
                onChange={handleChange}
                placeholder="Contoh: Fase D / Kelas VII"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                6. Semester *
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-semibold"
              >
                <option value="Semester Ganjil">Semester Ganjil</option>
                <option value="Semester Genap">Semester Genap</option>
              </select>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                7. Tahun Pelajaran *
              </label>
              <input
                type="text"
                name="tahunPelajaran"
                required
                value={formData.tahunPelajaran}
                onChange={handleChange}
                placeholder="2025/2026"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                8. Alokasi Waktu *
              </label>
              <input
                type="text"
                name="alokasiWaktu"
                required
                value={formData.alokasiWaktu}
                onChange={handleChange}
                placeholder="Contoh: 2 JP (2 x 40 menit)"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  9. Jumlah Pertemuan *
                </label>
                <div className="flex items-center gap-1">
                  {['1', '2', '3', '4'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, jumlahPertemuan: `${num} Pertemuan` }))}
                      className={`px-1.5 py-0.5 text-[11px] font-bold rounded-md border transition-colors cursor-pointer ${
                        formData.jumlahPertemuan?.startsWith(`${num} `) || formData.jumlahPertemuan === `${num} Pertemuan`
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                      title={`Pilih ${num} Pertemuan`}
                    >
                      {num}P
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                name="jumlahPertemuan"
                required
                value={formData.jumlahPertemuan}
                onChange={handleChange}
                placeholder="Contoh: 1 Pertemuan"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                10. Jumlah Peserta Didik *
              </label>
              <input
                type="text"
                name="jumlahSiswa"
                required
                value={formData.jumlahSiswa}
                onChange={handleChange}
                placeholder="Contoh: 32 peserta didik"
                className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Topik, Karakteristik & Konteks Pembelajaran */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                2. Materi, Karakteristik Peserta Didik & Konteks Nyata
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Landasan esensial pengalaman belajar Memahami → Mengaplikasi → Merefleksi
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Topik / Materi with 1-Click All-in-One Generator Button */}
            <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="block text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  11. Materi Pokok / Topik Pembelajaran *
                </label>
                
                {/* 1-Click Auto Fill Button */}
                <button
                  type="button"
                  onClick={handleSuggestAll}
                  disabled={isSuggestingCp}
                  className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                  title="Otomatis isi Kompetensi Awal (13), Model & Metode (15), Kearifan Lokal (16), dan CP (17)"
                >
                  {isSuggestingCp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Merumuskan Referensi...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>✨ Lengkapi Semua Referensi Sesuai Materi</span>
                    </>
                  )}
                </button>
              </div>

              <input
                type="text"
                name="materi"
                required
                value={formData.materi}
                onChange={handleChange}
                placeholder="Contoh: Interaksi Antar Komponen Ekosistem dan Upaya Pelestarian Lingkungan"
                className="w-full px-4 py-3.5 text-base sm:text-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-bold text-slate-950 dark:text-white shadow-2xs"
              />
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-semibold">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Ketik materi di atas, lalu gunakan tombol referensi otomatis pada setiap kolom di bawah ini.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 12. Karakteristik Siswa */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  12. Karakteristik Peserta Didik *
                </label>
                <textarea
                  name="karakteristikSiswa"
                  rows={4}
                  required
                  value={formData.karakteristikSiswa}
                  onChange={handleChange}
                  placeholder="Contoh: Heterogen; 40% visual, 35% kinestetik, 25% auditori. Sangat antusias dengan pengamatan langsung dan kerja kelompok kolaboratif."
                  className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all leading-relaxed"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Profil gaya belajar, minat, dan kesiapan belajar murid di kelas Anda.
                </span>
              </div>

              {/* 13. Kompetensi Awal (Prasyarat) with AUTO-REFERENCING BUTTON & QUICK RECOMMENDATION CARDS */}
              <div className="space-y-2 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    13. Kompetensi Awal (Prasyarat) *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSuggestSingleField('kompetensiAwal', 'Kompetensi Awal (13)')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
                    title="Otomatis terapkan referensi kompetensi prasyarat yang sesuai dengan materi pokok"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>✨ Referensi Otomatis</span>
                  </button>
                </div>

                <textarea
                  name="kompetensiAwal"
                  rows={3}
                  required
                  value={formData.kompetensiAwal}
                  onChange={handleChange}
                  placeholder="Contoh: Peserta didik telah mampu membedakan benda hidup (biotik) dan benda mati (abiotik) di lingkungan sekitar rumah dan sekolah."
                  className="w-full px-4 py-3 text-base bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all leading-relaxed shadow-2xs"
                />

                {/* Interactive Recommendation Chips */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 dark:text-emerald-300">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Pilihan Rekomendasi Prasyarat (Klik untuk Terapkan):</span>
                  </div>
                  <div className="space-y-1.5">
                    {smartReferences.kompetensiAwal.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, kompetensiAwal: opt.text }));
                          setSuggestNotification(`✨ Kompetensi Awal diterapkan: ${opt.title}`);
                          setTimeout(() => setSuggestNotification(null), 3500);
                        }}
                        className="w-full text-left p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-slate-800 hover:bg-emerald-100/60 dark:hover:bg-slate-750 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all text-xs cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-300 group-hover:text-emerald-950 dark:group-hover:text-emerald-200">
                          <span>{opt.title}</span>
                          <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 group-hover:underline flex items-center gap-0.5">
                            Pilih <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5 leading-snug">
                          {opt.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row: 14. Sarpras, 15. Model & Metode, 16. Kearifan Lokal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              
              {/* 14. Sarana & Prasarana */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  14. Sarana dan Prasarana *
                </label>
                <textarea
                  name="sarpras"
                  rows={4}
                  required
                  value={formData.sarpras}
                  onChange={handleChange}
                  placeholder="Contoh: Taman sekolah, proyektor LCD, LKPD cetak, smartphone siswa, alat peraga konkret."
                  className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all leading-relaxed"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Media, alat, bahan ajar, dan fasilitas pendukung yang digunakan di sekolah.
                </span>
              </div>

              {/* 15. Model & Metode with AUTO-REFERENCING BUTTON & QUICK RECOMMENDATIONS */}
              <div className="space-y-2 bg-blue-50/40 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    15. Model & Metode *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSuggestSingleField('modelPembelajaran', 'Model & Metode Pembelajaran (15)')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
                    title="Otomatis sesuaikan model & metode pembelajaran yang selaras dengan topik dan jenjang"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>✨ Sesuai Materi</span>
                  </button>
                </div>

                <textarea
                  name="modelPembelajaran"
                  rows={3}
                  required
                  value={formData.modelPembelajaran}
                  onChange={handleChange}
                  placeholder="Contoh: Problem Based Learning (PBL) dipadukan dengan observasi lapangan, diskusi kelompok, dan Gallery Walk."
                  className="w-full px-4 py-3 text-base bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all leading-relaxed shadow-2xs"
                />

                {/* Interactive Model Options */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 dark:text-blue-300">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Pilihan Model Deep Learning:</span>
                  </div>
                  <div className="space-y-1.5">
                    {smartReferences.modelPembelajaran.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, modelPembelajaran: opt.text }));
                          setSuggestNotification(`✨ Model Pembelajaran diterapkan: ${opt.title}`);
                          setTimeout(() => setSuggestNotification(null), 3500);
                        }}
                        className="w-full text-left p-2.5 rounded-xl border border-blue-200 dark:border-blue-800/80 bg-white dark:bg-slate-800 hover:bg-blue-100/60 dark:hover:bg-slate-750 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-xs cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-300 group-hover:text-blue-950 dark:group-hover:text-blue-200">
                          <span>{opt.title}</span>
                          <span className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 group-hover:underline flex items-center gap-0.5">
                            Pilih <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5 leading-snug">
                          {opt.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Sintak Model Pembelajaran Terpilih Panel */}
                <div className="mt-3 p-3.5 bg-blue-100/70 dark:bg-blue-950/60 rounded-2xl border border-blue-300 dark:border-blue-800 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-blue-200 dark:border-blue-800/80">
                    <div className="flex items-center gap-1.5 font-black text-xs text-blue-950 dark:text-blue-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                      <span>Sintak Model Terpilih: {currentModelSyntax.namaModel}</span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200">
                      {currentModelSyntax.jumlahSintak} Sintaks Pembelajaran
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                    {currentModelSyntax.deskripsiUmum}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-extrabold text-blue-950 dark:text-blue-200 flex items-center justify-between">
                      <span>Rincian Sintak & Pemetaan ke Kegiatan Inti:</span>
                      <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 italic">
                        {currentModelSyntax.sumberRujukan}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {currentModelSyntax.sintakList.map((stk) => (
                        <div
                          key={stk.nomor}
                          className="p-2 bg-white dark:bg-slate-800/90 rounded-xl border border-blue-100 dark:border-blue-800/60 text-xs space-y-0.5 shadow-2xs"
                        >
                          <div className="flex items-center justify-between gap-1.5 font-bold">
                            <span className="text-blue-950 dark:text-blue-300">
                              Sintak {stk.nomor}: {stk.nama}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                                stk.tahapDeepLearning.includes('Memahami')
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                  : stk.tahapDeepLearning.includes('Mengaplikasi')
                                  ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                  : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                              }`}
                            >
                              {stk.tahapDeepLearning}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            {stk.deskripsi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 16. Konteks Lingkungan & Kearifan Lokal with AUTO-REFERENCING BUTTON & QUICK RECOMMENDATIONS */}
              <div className="space-y-2 bg-amber-50/40 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    16. Kearifan Lokal *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSuggestSingleField('kearifanLokal', 'Konteks Kearifan Lokal (16)')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-extrabold bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
                    title="Otomatis buatkan konteks lingkungan dan kearifan lokal yang kontekstual dengan materi"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-200" />
                    <span>✨ Konteks Lokal</span>
                  </button>
                </div>

                <textarea
                  name="kearifanLokal"
                  rows={3}
                  required
                  value={formData.kearifanLokal}
                  onChange={handleChange}
                  placeholder="Contoh: Taman sekolah asri, sumber mata air desa, kearifan konservasi alam pepohonan rindang Nusantara."
                  className="w-full px-4 py-3 text-base bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all leading-relaxed shadow-2xs"
                />

                {/* Interactive Kearifan Lokal Options */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 dark:text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Pilihan Kearifan & Konteks Nyata:</span>
                  </div>
                  <div className="space-y-1.5">
                    {smartReferences.kearifanLokal.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, kearifanLokal: opt.text }));
                          setSuggestNotification(`✨ Konteks Kearifan Lokal diterapkan: ${opt.title}`);
                          setTimeout(() => setSuggestNotification(null), 3500);
                        }}
                        className="w-full text-left p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-white dark:bg-slate-800 hover:bg-amber-100/60 dark:hover:bg-slate-750 hover:border-amber-500 dark:hover:border-amber-400 transition-all text-xs cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300 group-hover:text-amber-950 dark:group-hover:text-amber-200">
                          <span>{opt.title}</span>
                          <span className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400 group-hover:underline flex items-center gap-0.5">
                            Pilih <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5 leading-snug">
                          {opt.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Section 3: Capaian Pembelajaran (CP) dengan Rujukan Resmi BSKAP */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  3. Capaian Pembelajaran (CP)
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Data ke-17: Standar kompetensi fase resmi BSKAP Kemendikbudristek (Nomor 046 Tahun 2025 atau Nomor 020 Tahun 2026)
                </p>
              </div>
            </div>

            {/* Smart CP & TP Button */}
            <button
              type="button"
              onClick={handleSuggestAll}
              disabled={isSuggestingCp}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              {isSuggestingCp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
                  <span>Merumuskan CP & Referensi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>✨ Rumuskan CP & Seluruh Referensi Otomatis</span>
                </>
              )}
            </button>
          </div>

          {/* Official Regulation Callout Banner */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            smartReferences.bskapReference.isAgama
              ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200'
              : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
          }`}>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                  smartReferences.bskapReference.isAgama 
                    ? 'bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700' 
                    : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                }`}>
                  {smartReferences.bskapReference.shortBadge}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Standar Regulasi Berlaku
                </span>
              </div>
              <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {smartReferences.bskapReference.fullName}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {smartReferences.bskapReference.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const citation = `(Rujukan Resmi: ${smartReferences.bskapReference.fullName})\n`;
                if (!formData.capaianPembelajaran.includes(smartReferences.bskapReference.nomor)) {
                  setFormData((prev) => ({
                    ...prev,
                    capaianPembelajaran: citation + prev.capaianPembelajaran.replace(/^\(Rujukan Resmi:.*?\)\n/, '')
                  }));
                  setSuggestNotification(`✨ Rujukan resmi ${smartReferences.bskapReference.shortBadge} disematkan ke rumusan CP!`);
                  setTimeout(() => setSuggestNotification(null), 3500);
                } else {
                  setSuggestNotification(`Rujukan regulasi ${smartReferences.bskapReference.nomor} telah tercantum.`);
                  setTimeout(() => setSuggestNotification(null), 2500);
                }
              }}
              className="shrink-0 px-4 py-2 text-xs sm:text-sm font-extrabold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors cursor-pointer shadow-2xs text-slate-900 dark:text-white flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Sematkan Dasar Hukum BSKAP</span>
            </button>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                17. Rumusan Capaian Pembelajaran (CP) *
              </label>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                Merujuk: {smartReferences.bskapReference.shortBadge}
              </span>
            </div>
            
            <textarea
              name="capaianPembelajaran"
              rows={4}
              required
              value={formData.capaianPembelajaran}
              onChange={handleChange}
              placeholder="Peserta didik mengidentifikasi interaksi antar komponen ekosistem serta merancang solusi atas permasalahan lingkungan lokal..."
              className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all leading-relaxed"
            />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Ketentuan BSKAP Kemendikbudristek: Rumusan CP untuk <strong>Semua Mata Pelajaran selain Pendidikan Agama</strong> merujuk pada <strong>BSKAP Nomor 046 Tahun 2025</strong>. Khusus untuk <strong>Pendidikan Agama dan Budi Pekerti</strong> merujuk pada <strong>BSKAP Nomor 020 Tahun 2026</strong>.
            </p>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
              Catatan Khusus / Permintaan Tambahan Guru (Opsional)
            </label>
            <input
              type="text"
              name="catatanTambahan"
              value={formData.catatanTambahan || ''}
              onChange={handleChange}
              placeholder="Contoh: Fokuskan pada penilaian kerja kelompok; siapkan opsi luring tanpa internet..."
              className="w-full px-4 py-3 text-base bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wider uppercase">
                Siap Melakukan Penerbitan Modul Ajar
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-200 max-w-xl">
              Klik tombol di samping untuk menyusun Modul Ajar Utuh (24 Bagian), Lembar LKPD, dan Rubrik Asesmen 1–4.
            </p>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base sm:text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Menyusun Modul 8-3-3-4...</span>
              </>
            ) : (
              <>
                <span>Rancang Modul Ajar Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
};
