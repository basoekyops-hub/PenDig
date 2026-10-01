import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  FileText, 
  BookOpen, 
  ClipboardCheck, 
  Layers, 
  CheckCircle2, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ModulAjar } from '../types/modul';

export type PrintTargetType = 'modul' | 'lkpd' | 'asesmen' | 'bundle';

interface PrintPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  modul: ModulAjar | null;
  currentTab: 'form' | 'document' | 'lkpd' | 'asesmen' | 'visual';
  onExecutePrint: (target: PrintTargetType) => void;
}

export const PrintPDFModal: React.FC<PrintPDFModalProps> = ({
  isOpen,
  onClose,
  modul,
  currentTab,
  onExecutePrint,
}) => {
  // Determine default target based on current view
  const getInitialTarget = (): PrintTargetType => {
    if (currentTab === 'lkpd') return 'lkpd';
    if (currentTab === 'asesmen') return 'asesmen';
    return 'modul';
  };

  const [selectedTarget, setSelectedTarget] = useState<PrintTargetType>(getInitialTarget);
  const [includeSignature, setIncludeSignature] = useState(true);

  if (!isOpen || !modul) return null;

  const handlePrintClick = () => {
    onExecutePrint(selectedTarget);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs animate-fade-in no-print overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6 my-auto transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
              <img
                src="/logo-pengawas-digital.png"
                alt="Logo Pengawas Digital"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 id="print-modal-title" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Cetak Dokumen & Simpan ke PDF
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Pilih berkas Kurikulum Merdeka yang siap dicetak rapi pada kertas A4
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup jendela cetak"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* School & Topic Summary Bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {modul.identitas.sekolah} · {modul.identitas.mataPelajaran} ({modul.identitas.faseKelas})
          </span>
          <span className="font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md">
            Materi: {modul.identitas.materi}
          </span>
        </div>

        {/* Document Selection Options */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
            Pilih Dokumen yang Akan Dicetak:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Modul Ajar Utuh */}
            <button
              type="button"
              onClick={() => setSelectedTarget('modul')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                selectedTarget === 'modul'
                  ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    selectedTarget === 'modul' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      1. Modul Ajar Utuh
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                      24 Komponen + Pengesahan
                    </span>
                  </div>
                </div>
                {selectedTarget === 'modul' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Dokumen komprehensif 8–3–3–4 untuk arsip perangkat ajar dinas, supervisi kepala sekolah, dan kurikulum.
              </p>
            </button>

            {/* 2. LKPD Siswa */}
            <button
              type="button"
              onClick={() => setSelectedTarget('lkpd')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                selectedTarget === 'lkpd'
                  ? 'border-amber-600 dark:border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    selectedTarget === 'lkpd' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      2. Lembar LKPD Siswa
                    </h3>
                    <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                      Siap Bagikan ke Kelas
                    </span>
                  </div>
                </div>
                {selectedTarget === 'lkpd' && (
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Lembar kerja kelompok/individu berisi stimulus fenomena, tabel pengamatan, pertanyaan analisis, dan refleksi murid.
              </p>
            </button>

            {/* 3. Asesmen & Rubrik */}
            <button
              type="button"
              onClick={() => setSelectedTarget('asesmen')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                selectedTarget === 'asesmen'
                  ? 'border-purple-600 dark:border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 ring-2 ring-purple-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    selectedTarget === 'asesmen' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                  }`}>
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      3. Asesmen & Rubrik
                    </h3>
                    <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300">
                      Skala 1–4 & Diferensiasi
                    </span>
                  </div>
                </div>
                {selectedTarget === 'asesmen' && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Panduan evaluasi guru: instrumen diagnostik, formatif, sumatif, dan rubrik autentik 4 kriteria capaian.
              </p>
            </button>

            {/* 4. Paket Bundel Lengkap */}
            <button
              type="button"
              onClick={() => setSelectedTarget('bundle')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                selectedTarget === 'bundle'
                  ? 'border-teal-600 dark:border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    selectedTarget === 'bundle' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      4. Paket Bundel Lengkap
                    </h3>
                    <span className="text-[11px] font-semibold text-teal-800 dark:text-teal-300">
                      Semua Berkas (1 File PDF)
                    </span>
                  </div>
                </div>
                {selectedTarget === 'bundle' && (
                  <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Mencetak berurutan sekaligus: Modul Ajar + LKPD Siswa + Asesmen & Rubrik secara terstruktur dan terpaginasi.
              </p>
            </button>

          </div>
        </div>

        {/* Tips Cetak PDF Bersih & Rapi */}
        <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>Petunjuk Agar Hasil Cetak PDF Sangat Rapi:</span>
          </div>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
            <li>
              Pada jendela print browser, ubah <strong>Tujuan / Destination</strong> menjadi <strong>"Simpan sebagai PDF" (Save as PDF)</strong>.
            </li>
            <li>
              Pilih <strong>Ukuran Kertas: A4</strong> dan <strong>Tata Letak: Potret (Portrait)</strong>.
            </li>
            <li>
              Buka menu <em>Setelan lainnya (More settings)</em> lalu <strong>CENTANG "Grafik latar belakang" (Background graphics)</strong> agar border kop dan warna tabel tampil sempurna.
            </li>
            <li>
              <strong>HILANGKAN CENTANG "Header dan footer"</strong> agar alamat URL browser tidak tercetak di tepi halaman.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer text-center"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handlePrintClick}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
