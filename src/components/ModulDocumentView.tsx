import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Edit3, 
  Check, 
  Download,
  BookOpen,
  ChevronRight,
  BookmarkCheck
} from 'lucide-react';
import { ModulAjar } from '../types/modul';
import { getBskapReference, getModelSyntaxInfo } from '../services/modulGenerator';

interface ModulDocumentViewProps {
  modul: ModulAjar;
  setModul: React.Dispatch<React.SetStateAction<ModulAjar | null>>;
  onPrint: () => void;
  onOpenExport: () => void;
  onSwitchToLkpd: () => void;
  onSwitchToAsesmen: () => void;
}

export const ModulDocumentView: React.FC<ModulDocumentViewProps> = ({
  modul,
  setModul,
  onPrint,
  onOpenExport,
  onSwitchToLkpd,
  onSwitchToAsesmen,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const bskap = getBskapReference(modul.identitas.mataPelajaran);
  const modelSyntax = getModelSyntaxInfo(modul.identitas.modelPembelajaran);

  const handleUpdateField = (field: keyof ModulAjar, value: any) => {
    setModul((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Control Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Dokumen Rencana Pembelajaran / Modul Ajar Utuh
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Kerangka 8–3–3–4 Deep Learning (Format Resmi 24 Komponen Siap Cetak & Verifikasi)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle In-line Edit */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border transition-colors cursor-pointer ${
              isEditing
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" />
                <span>Simpan Editan</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Mode Edit Dokumen</span>
              </>
            )}
          </button>

          {/* Quick Jump to LKPD */}
          <button
            type="button"
            onClick={onSwitchToLkpd}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lihat LKPD</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>

          {/* Export Button */}
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor File</span>
          </button>
        </div>
      </div>

      {/* Official Modul Ajar Paper Document View */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black space-y-10 font-sans leading-relaxed text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Kop Dokumen Resmi */}
        <div className="kop-surat avoid-break text-center border-b-2 border-slate-900 dark:border-slate-100 print:border-black pb-8 space-y-2">
          <h2 className="text-sm sm:text-base font-bold tracking-widest uppercase text-slate-600 dark:text-slate-400">
            PERANGKAT AJAR KURIKULUM MERDEKA
          </h2>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-950 dark:text-white tracking-tight">
            RENCANA PEMBELAJARAN / MODUL AJAR
          </h1>
          <p className="text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
            PENDEKATAN PEMBELAJARAN MENDALAM (DEEP LEARNING) — KERANGKA 8–3–3–4
          </p>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {modul.identitas.sekolah} · Tahun Ajaran {modul.identitas.tahunPelajaran}
          </p>
        </div>

        {/* 1. IDENTITAS PEMBELAJARAN */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border-l-4 border-emerald-600 dark:border-emerald-500">
            <span className="font-bold text-slate-950 dark:text-white text-base sm:text-lg">
              1. IDENTITAS PEMBELAJARAN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Satuan Pendidikan:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.sekolah}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Nama Guru Pengampu:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.namaGuru}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Mata Pelajaran:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.mataPelajaran}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Jenjang / Fase / Kelas:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.jenjang} / {modul.identitas.faseKelas}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Semester / Tahun Ajaran:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.semester} / {modul.identitas.tahunPelajaran}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Alokasi Waktu:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.alokasiWaktu}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Jumlah Pertemuan:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.jumlahPertemuan || '1 Pertemuan'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Jumlah Peserta Didik:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.jumlahSiswa}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Model & Metode:</span>
              <span className="font-bold text-slate-900 dark:text-white text-right">{modul.identitas.modelPembelajaran}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-2 sm:col-span-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Rujukan Resmi Standar CP:</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-400 text-right">{bskap.fullName}</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base space-y-2 text-slate-800 dark:text-slate-200">
            <div>
              <strong className="text-slate-950 dark:text-white">Materi Pokok:</strong> {modul.identitas.materi}
            </div>
            <div>
              <strong className="text-slate-950 dark:text-white">Konteks Lingkungan & Kearifan Lokal:</strong> {modul.identitas.kearifanLokal}
            </div>
            <div>
              <strong className="text-slate-950 dark:text-white">Kompetensi Awal:</strong> {modul.kompetensiAwal}
            </div>
            <div>
              <strong className="text-slate-950 dark:text-white">Karakteristik Murid:</strong> {modul.karakteristikSiswa}
            </div>
          </div>
        </section>

        {/* 2. CAPAIAN PEMBELAJARAN (CP) */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border-l-4 border-emerald-600 dark:border-emerald-500">
            <span className="font-bold text-slate-950 dark:text-white text-base sm:text-lg">
              2. CAPAIAN PEMBELAJARAN (CP)
            </span>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-750 border border-slate-300 dark:border-slate-600 text-emerald-900 dark:text-emerald-300">
              {bskap.shortBadge}
            </span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 px-1 flex items-center gap-1.5">
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Standar Kompetensi Fase Resmi: <strong className="text-slate-900 dark:text-white">{bskap.fullName}</strong></span>
          </div>

          {isEditing ? (
            <textarea
              rows={4}
              value={modul.capaianPembelajaran}
              onChange={(e) => handleUpdateField('capaianPembelajaran', e.target.value)}
              className="w-full p-4 text-sm sm:text-base bg-amber-50/50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white rounded-xl focus:outline-none leading-relaxed"
            />
          ) : (
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-pre-line">
              {modul.capaianPembelajaran}
            </p>
          )}
        </section>

        {/* 3. TUJUAN PEMBELAJARAN (TP) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              3. TUJUAN PEMBELAJARAN (TP)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 italic">
            Dirumuskan menggunakan kata kerja operasional (KKO) yang terukur dan selaras dengan pembelajaran mendalam:
          </p>
          <ol className="space-y-2.5 list-decimal list-inside text-sm sm:text-base text-slate-800">
            {modul.tujuanPembelajaran.map((tp, idx) => (
              <li key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                {isEditing ? (
                  <input
                    type="text"
                    value={tp}
                    onChange={(e) => {
                      const next = [...modul.tujuanPembelajaran];
                      next[idx] = e.target.value;
                      handleUpdateField('tujuanPembelajaran', next);
                    }}
                    className="w-full p-2 text-sm sm:text-base bg-white border border-slate-300 rounded-lg"
                  />
                ) : (
                  <span>{tp}</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* 4. 8 DIMENSI PROFIL LULUSAN (TABEL LENGKAP) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              4. 8 DIMENSI PROFIL LULUSAN
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Keterkaitan materi pembelajaran dengan pengembangan 8 dimensi lulusan abad ke-21:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4">Dimensi Profil Lulusan</th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4">Keterkaitan dengan Materi</th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4">Aktivitas Pembelajaran</th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4">Indikator Teramati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {modul.dimensiProfilLulusan.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="py-3 px-3.5 border border-slate-300 font-bold text-slate-950 align-top">
                      {item.dimensi}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                      {item.keterkaitan}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-900 font-semibold align-top">
                      {item.aktivitas}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                      {item.indikator}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. 3 PRINSIP PEMBELAJARAN MENDALAM */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              5. 3 PRINSIP PEMBELAJARAN MENDALAM (DEEP LEARNING)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm sm:text-base">
            {/* Berkesadaran */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-emerald-800 block text-xs sm:text-sm uppercase tracking-wide">
                A. BERKESADARAN (MINDFUL)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {modul.prinsipDeepLearning.berkesadaran.deskripsi}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-900">
                <strong className="text-emerald-800">Contoh Penerapan:</strong> {modul.prinsipDeepLearning.berkesadaran.penerapan}
              </div>
            </div>

            {/* Bermakna */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-blue-800 block text-xs sm:text-sm uppercase tracking-wide">
                B. BERMAKNA (MEANINGFUL)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {modul.prinsipDeepLearning.bermakna.deskripsi}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-900">
                <strong className="text-blue-800">Contoh Penerapan:</strong> {modul.prinsipDeepLearning.bermakna.penerapan}
              </div>
            </div>

            {/* Menggembirakan */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-amber-800 block text-xs sm:text-sm uppercase tracking-wide">
                C. MENGGEMBIRAKAN (JOYFUL)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {modul.prinsipDeepLearning.menggembirakan.deskripsi}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-900">
                <strong className="text-amber-800">Contoh Penerapan:</strong> {modul.prinsipDeepLearning.menggembirakan.penerapan}
              </div>
            </div>
          </div>
        </section>

        {/* 6. 3 PENGALAMAN BELAJAR */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              6. 3 PENGALAMAN BELAJAR (MEMAHAMI → MENGAPLIKASI → MEREFLEKSI)
            </span>
          </div>

          <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-4 text-sm sm:text-base leading-relaxed">
            <div>
              <span className="font-bold text-emerald-950 block mb-1">1. MEMAHAMI (To Understand):</span>
              <p className="text-slate-800">{modul.pengalamanBelajar.memahami}</p>
            </div>
            <div className="border-t border-emerald-200/80 pt-3">
              <span className="font-bold text-blue-950 block mb-1">2. MENGAPLIKASI (To Apply):</span>
              <p className="text-slate-800">{modul.pengalamanBelajar.mengaplikasi}</p>
            </div>
            <div className="border-t border-emerald-200/80 pt-3">
              <span className="font-bold text-purple-950 block mb-1">3. MEREFLEKSI (To Reflect):</span>
              <p className="text-slate-800">{modul.pengalamanBelajar.merefleksi}</p>
            </div>
          </div>
        </section>

        {/* 7. 4 KERANGKA PEMBELAJARAN */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              7. 4 KERANGKA PEMBELAJARAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
            <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
              <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wide">
                A. Praktik Pedagogis
              </h4>
              <p><strong>Pendekatan:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.pendekatan}</p>
              <p><strong>Model:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.model}</p>

              {/* Rincian Sintak Model Pembelajaran yang Dipilih */}
              <div className="mt-2.5 p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1 pb-1.5 border-b border-indigo-100 dark:border-indigo-800/60">
                  <span className="font-extrabold text-xs text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                    Sintak Model Pembelajaran: {modelSyntax.namaModel}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {modelSyntax.jumlahSintak} Sintaks Runtut
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {modelSyntax.sintakList.map((stk) => (
                    <div key={stk.nomor} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700/80 space-y-0.5">
                      <div className="flex items-center justify-between gap-1 font-bold">
                        <span className="text-slate-900 dark:text-white">
                          Sintak {stk.nomor}: {stk.nama}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                          stk.tahapDeepLearning.includes('Memahami')
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : stk.tahapDeepLearning.includes('Mengaplikasi')
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                            : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                        }`}>
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

              <p><strong>Metode & Strategi:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.metode}</p>
              <p><strong>Diferensiasi:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.diferensiasi}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-950 uppercase tracking-wide">
                B. Kemitraan Pembelajaran
              </h4>
              <p><strong>Peran Guru:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.peranGuru}</p>
              <p><strong>Peran Murid:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.peranSiswa}</p>
              <p><strong>Teman Sebaya:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.temanSebaya}</p>
              <p><strong>Orang Tua & Masyarakat:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.orangTuaMasyarakat}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-950 uppercase tracking-wide">
                C. Lingkungan Pembelajaran
              </h4>
              <p><strong>Ruang Kelas:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangKelas}</p>
              <p><strong>Lingkungan Sekitar / Alam:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.lingkunganSekitar}</p>
              <p><strong>Lingkungan Digital:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangDigital}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-950 uppercase tracking-wide">
                D. Pemanfaatan Digital & Alternatif Offline
              </h4>
              <p><strong>Pemanfaatan Online:</strong> {modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOnline}</p>
              <p><strong>Alternatif Offline / Luring:</strong> {modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOffline}</p>
            </div>
          </div>
        </section>

        {/* 8, 9, 10: PEMAHAMAN BERMAKNA, PERTANYAAN PEMANTIK & MATERI ESENSIAL */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              8, 9, 10. PEMAHAMAN BERMAKNA, PERTANYAAN PEMANTIK & MATERI ESENSIAL
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <strong className="text-slate-950 block text-base mb-1.5">8. Pemahaman Bermakna:</strong>
              <p className="text-slate-800 leading-relaxed">{modul.pemahamanBermakna}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <strong className="text-slate-950 block text-base mb-2">9. Pertanyaan Pemantik & Esensial:</strong>
              <ul className="list-disc list-inside space-y-1.5 text-slate-800">
                {modul.pertanyaanPemantik.map((q, idx) => (
                  <li key={idx}><strong>Pemantik {idx + 1}:</strong> {q}</li>
                ))}
                {modul.pertanyaanEsensial.map((q, idx) => (
                  <li key={`es-${idx}`}><strong>Esensial {idx + 1}:</strong> {q}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <strong className="text-slate-950 block text-base mb-3">10. Materi Esensial:</strong>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {modul.materiEsensial.map((m, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-950 block mb-1">{m.subtopik}</span>
                    <span className="text-slate-700 text-xs sm:text-sm">{m.uraian}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11 & 12: SKENARIO PEMBELAJARAN RINCI */}
        <section className="space-y-5">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              11 & 12. SKENARIO PEMBELAJARAN RINCI
            </span>
          </div>

          <div className="space-y-5 text-sm sm:text-base">
            {/* Pendahuluan */}
            <div className="border border-slate-300 rounded-2xl p-5 bg-slate-50">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="font-bold text-slate-950 text-base sm:text-lg">
                  A. KEGIATAN PENDAHULUAN
                </span>
                <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-slate-200 text-slate-800 rounded-full">
                  Total ±10 Menit
                </span>
              </div>
              <div className="space-y-3">
                {modul.skenarioPembelajaran.pendahuluan.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      {item.fase && (
                        <span className="font-bold text-emerald-800 block text-xs uppercase tracking-wider">
                          {item.fase}
                        </span>
                      )}
                      <p className="text-slate-800">{item.kegiatan}</p>
                    </div>
                    <span className="text-slate-600 font-bold whitespace-nowrap bg-slate-100 px-2.5 py-1 rounded text-xs sm:text-sm">
                      {item.waktu}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kegiatan Inti (3 Tahap) */}
            <div className="border border-slate-300 rounded-2xl p-5 bg-slate-50 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-950 text-base sm:text-lg">
                  B. KEGIATAN INTI (3 TAHAP PENGALAMAN BELAJAR)
                </span>
                <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full">
                  Total ±60 Menit
                </span>
              </div>

              {/* Tahap 1: Memahami */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 text-xs sm:text-sm uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-lg inline-block border border-emerald-200 dark:border-emerald-800">
                    TAHAP 1 — MEMAHAMI (To Understand)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic">
                    Fokus: Pengenalan Konsep & Orientasi Masalah Awal
                  </span>
                </div>
                {modul.skenarioPembelajaran.inti.tahap1Memahami.map((step, idx) => {
                  const defaultSintak = idx === 0 
                    ? `Sintak 1: ${modelSyntax.sintakList[0]?.nama || 'Orientasi Masalah'}`
                    : `Sintak 2: ${modelSyntax.sintakList[1]?.nama || 'Pengorganisasian Belajar'}`;
                  const currentSintak = step.sintak || step.sintakModel || defaultSintak;

                  return (
                    <div key={idx} className="p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 rounded-lg">
                            {currentSintak}
                          </span>
                          <strong className="text-slate-950 dark:text-white text-sm sm:text-base">{step.aktivitas}</strong>
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-750 px-2.5 py-1 rounded-md">{step.waktu}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Peran Guru:</strong> {step.peranGuru}</p>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Aktivitas Siswa:</strong> {step.peranSiswa}</p>
                    </div>
                  );
                })}
              </div>

              {/* Tahap 2: Mengaplikasi */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-blue-950 dark:text-blue-300 text-xs sm:text-sm uppercase tracking-wide bg-blue-100 dark:bg-blue-950/80 px-3 py-1 rounded-lg inline-block border border-blue-200 dark:border-blue-800">
                    TAHAP 2 — MENGAPLIKASI (To Apply)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic">
                    Fokus: Penyelidikan Kolaboratif, Pemecahan Kasus & Presentasi Karya
                  </span>
                </div>
                {modul.skenarioPembelajaran.inti.tahap2Mengaplikasi.map((step, idx) => {
                  const defaultSintak = idx === 0 
                    ? `Sintak 3: ${modelSyntax.sintakList[2]?.nama || 'Penyelidikan / Eksplorasi'}`
                    : `Sintak 4: ${modelSyntax.sintakList[3]?.nama || 'Pengembangan & Penyajian Karya'}`;
                  const currentSintak = step.sintak || step.sintakModel || defaultSintak;

                  return (
                    <div key={idx} className="p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 rounded-lg">
                            {currentSintak}
                          </span>
                          <strong className="text-slate-950 dark:text-white text-sm sm:text-base">{step.aktivitas}</strong>
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-750 px-2.5 py-1 rounded-md">{step.waktu}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Peran Guru:</strong> {step.peranGuru}</p>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Aktivitas Siswa:</strong> {step.peranSiswa}</p>
                    </div>
                  );
                })}
              </div>

              {/* Tahap 3: Merefleksi */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-purple-950 dark:text-purple-300 text-xs sm:text-sm uppercase tracking-wide bg-purple-100 dark:bg-purple-950/80 px-3 py-1 rounded-lg inline-block border border-purple-200 dark:border-purple-800">
                    TAHAP 3 — MEREFLEKSI (To Reflect)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold italic">
                    Fokus: Analisis Evaluatif Solusi, Metakognisi & Tindak Lanjut
                  </span>
                </div>
                {modul.skenarioPembelajaran.inti.tahap3Merefleksi.map((step, idx) => {
                  const lastSintak = modelSyntax.sintakList[modelSyntax.sintakList.length - 1];
                  const defaultSintak = `Sintak ${lastSintak?.nomor || 5}: ${lastSintak?.nama || 'Menganalisis & Mengevaluasi Proses'}`;
                  const currentSintak = step.sintak || step.sintakModel || defaultSintak;

                  return (
                    <div key={idx} className="p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 rounded-lg">
                            {currentSintak}
                          </span>
                          <strong className="text-slate-950 dark:text-white text-sm sm:text-base">{step.aktivitas}</strong>
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-750 px-2.5 py-1 rounded-md">{step.waktu}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Peran Guru:</strong> {step.peranGuru}</p>
                      <p className="text-slate-800 dark:text-slate-200"><strong>Aktivitas Siswa:</strong> {step.peranSiswa}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Penutup */}
            <div className="border border-slate-300 rounded-2xl p-5 bg-slate-50">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="font-bold text-slate-950 text-base sm:text-lg">
                  C. KEGIATAN PENUTUP
                </span>
                <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-slate-200 text-slate-800 rounded-full">
                  Total ±10 Menit
                </span>
              </div>
              <div className="space-y-3">
                {modul.skenarioPembelajaran.penutup.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center gap-3">
                    <p className="text-slate-800">{item.kegiatan}</p>
                    <span className="text-slate-600 font-bold whitespace-nowrap text-xs sm:text-sm">{item.waktu}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. LKPD SISWA RINGKASAN */}
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              13. LEMBAR KERJA PESERTA DIDIK (LKPD)
            </span>
            <button
              onClick={onSwitchToLkpd}
              className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 no-print cursor-pointer"
            >
              <span>Buka Lembar Lengkap LKPD Siswa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-2 text-sm sm:text-base">
            <h4 className="font-bold text-slate-950 text-base sm:text-lg">{modul.lkpd.judul}</h4>
            <p className="text-slate-800"><strong>Tujuan:</strong> {modul.lkpd.tujuan}</p>
            <p className="text-slate-800"><strong>Stimulus:</strong> {modul.lkpd.stimulusKonteks}</p>
            <p className="text-slate-800"><strong>Tugas Penerapan:</strong> {modul.lkpd.tugasPenerapan}</p>
          </div>
        </section>

        {/* 14, 15, 16, 17: ASESMEN & RUBRIK PENILAIAN */}
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              14–17. ASESMEN & RUBRIK PENILAIAN (SKALA 1–4)
            </span>
            <button
              onClick={onSwitchToAsesmen}
              className="text-xs sm:text-sm font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1 no-print cursor-pointer"
            >
              <span>Buka Asesmen & Rubrik Detail</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block">Asesmen Diagnostik:</strong>
              <p><strong>Tujuan:</strong> {modul.asesmen.diagnostik.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.diagnostik.teknik}</p>
              <p><strong>Instrumen:</strong> {modul.asesmen.diagnostik.instrumen}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block">Asesmen Formatif (Proses):</strong>
              <p><strong>Tujuan:</strong> {modul.asesmen.formatif.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.formatif.teknik}</p>
              <p><strong>Instrumen:</strong> {modul.asesmen.formatif.instrumen}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block">Asesmen Sumatif (Akhir):</strong>
              <p><strong>Tujuan:</strong> {modul.asesmen.sumatif.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.sumatif.teknik}</p>
              <p><strong>Kriteria:</strong> {modul.asesmen.sumatif.kriteriaKetuntasan || 'Tercapai jika minimal skor 3 (Cakap)'}</p>
            </div>
          </div>

          {/* Rubrik Skala 1-4 Singkat */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2.5 px-3 border border-slate-300 w-1/5">Aspek Penilaian</th>
                  <th className="py-2.5 px-3 border border-slate-300 w-1/5">Skor 4 (Sangat Mahir)</th>
                  <th className="py-2.5 px-3 border border-slate-300 w-1/5">Skor 3 (Cakap)</th>
                  <th className="py-2.5 px-3 border border-slate-300 w-1/5">Skor 2 (Berkembang)</th>
                  <th className="py-2.5 px-3 border border-slate-300 w-1/5">Skor 1 (Perlu Bimbingan)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {modul.rubrikPenilaian.map((r, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-2.5 px-3 border border-slate-300 font-bold text-slate-950 align-top">
                      {r.aspek}
                    </td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700 align-top">{r.skor4}</td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700 align-top">{r.skor3}</td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700 align-top">{r.skor2}</td>
                    <td className="py-2.5 px-3 border border-slate-300 text-slate-700 align-top">{r.skor1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 18, 19, 20: DIFERENSIASI, REMEDIAL & PENGAYAAN */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              18–20. DIFERENSIASI, REMEDIAL & PENGAYAAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block font-bold">Diferensiasi Konten:</strong>
              <p><strong>Bimbingan:</strong> {modul.diferensiasi.konten.bimbingan}</p>
              <p><strong>Sedang:</strong> {modul.diferensiasi.konten.sedang}</p>
              <p><strong>Pengayaan:</strong> {modul.diferensiasi.konten.pengayaan}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block font-bold">Diferensiasi Proses:</strong>
              <p><strong>Bimbingan:</strong> {modul.diferensiasi.proses.bimbingan}</p>
              <p><strong>Sedang:</strong> {modul.diferensiasi.proses.sedang}</p>
              <p><strong>Pengayaan:</strong> {modul.diferensiasi.proses.pengayaan}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-slate-950 block font-bold">Diferensiasi Produk:</strong>
              <p><strong>Bimbingan:</strong> {modul.diferensiasi.produk.bimbingan}</p>
              <p><strong>Sedang:</strong> {modul.diferensiasi.produk.sedang}</p>
              <p><strong>Pengayaan:</strong> {modul.diferensiasi.produk.pengayaan}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-950 block font-bold mb-1">19. Program Remedial:</strong>
              <p><strong>Kriteria:</strong> {modul.remedialDanPengayaan.kriteriaRemedial}</p>
              <p><strong>Kegiatan:</strong> {modul.remedialDanPengayaan.programRemedial}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-slate-950 block font-bold mb-1">20. Program Pengayaan:</strong>
              <p><strong>Kriteria:</strong> {modul.remedialDanPengayaan.kriteriaPengayaan}</p>
              <p><strong>Kegiatan:</strong> {modul.remedialDanPengayaan.programPengayaan}</p>
            </div>
          </div>
        </section>

        {/* 21 & 22: REFLEKSI GURU & PESERTA DIDIK */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              21 & 22. REFLEKSI GURU & PESERTA DIDIK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <strong className="text-slate-950 block uppercase tracking-wide">
                21. Refleksi Guru:
              </strong>
              <ul className="list-disc list-inside space-y-1 text-slate-800">
                {modul.refleksi.guru.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <strong className="text-slate-950 block uppercase tracking-wide">
                22. Refleksi Peserta Didik:
              </strong>
              <ul className="list-disc list-inside space-y-1 text-slate-800">
                {modul.refleksi.siswa.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 23. SUMBER BELAJAR & PRODUK AKHIR */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              23 & 24. SUMBER BELAJAR, PRODUK AKHIR & LAMPIRAN
            </span>
          </div>

          <div className="space-y-2 text-sm sm:text-base">
            <p><strong>Produk Akhir Pembelajaran:</strong> {modul.produkAkhir}</p>
            <div>
              <strong>Sumber Belajar:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1 text-slate-700">
                {modul.sumberBelajar.map((sb, idx) => (
                  <li key={idx}>{sb}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LEMBAR PENGESAHAN RESMI */}
        <div className="signature-block avoid-break pt-8 border-t-2 border-slate-900 dark:border-slate-100 print:border-black mt-14 grid grid-cols-2 gap-8 text-sm sm:text-base text-center">
          <div className="space-y-16">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold text-slate-950 dark:text-white">Kepala {modul.identitas.sekolah}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold underline text-slate-950 dark:text-white">( .............................................................. )</p>
              <p className="text-slate-500 text-xs sm:text-sm">NIP. .....................................................</p>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <p>Disahkan pada: .......................................</p>
              <p className="font-bold text-slate-950 dark:text-white">Guru Mata Pelajaran</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold underline text-slate-950 dark:text-white">{modul.identitas.namaGuru}</p>
              <p className="text-slate-500 text-xs sm:text-sm">NIP. .....................................................</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
