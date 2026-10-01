import React from 'react';
import { 
  BookOpen, 
  Printer, 
  HelpCircle, 
  CheckCircle, 
  FileText
} from 'lucide-react';
import { LKPDData, InitialDataInput } from '../types/modul';

interface LKPDViewProps {
  lkpd: LKPDData;
  identitas: InitialDataInput;
  onPrint: () => void;
}

export const LKPDView: React.FC<LKPDViewProps> = ({
  lkpd,
  identitas,
  onPrint,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Lembar Kerja Peserta Didik (LKPD) Siap Pakai & Cetak
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Format 12 Komponen Interaktif untuk Aktivitas Belajar Mendalam Siswa
            </p>
          </div>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak LKPD Murid</span>
        </button>
      </div>

      {/* Printable LKPD Sheet */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black space-y-8 text-slate-900 dark:text-slate-100 font-sans leading-relaxed transition-colors">
        
        {/* Kop LKPD */}
        <div className="kop-surat avoid-break border-b-2 border-slate-900 dark:border-slate-100 print:border-black pb-6 text-center space-y-2">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            LEMBAR KERJA PESERTA DIDIK (LKPD)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
            {lkpd.judul}
          </h1>
          <p className="text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-400">
            {identitas.sekolah} · {identitas.mataPelajaran} · {identitas.faseKelas} {identitas.jumlahPertemuan ? `· ${identitas.jumlahPertemuan}` : ''}
          </p>
        </div>

        {/* 1. Identitas Peserta Didik */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Nama Kelompok:</span>
              <div className="border-b border-dashed border-slate-400 mt-2 h-6"></div>
            </div>
            <div>
              <span className="font-bold text-slate-800">Hari / Tanggal:</span>
              <div className="border-b border-dashed border-slate-400 mt-2 h-6"></div>
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-slate-800">Nama Anggota Kelompok:</span>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="border-b border-dashed border-slate-400 h-6">1. .................................................</div>
                <div className="border-b border-dashed border-slate-400 h-6">3. .................................................</div>
                <div className="border-b border-dashed border-slate-400 h-6">2. .................................................</div>
                <div className="border-b border-dashed border-slate-400 h-6">4. .................................................</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 & 4. Tujuan & Petunjuk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Tujuan Kegiatan</span>
            </h3>
            <p className="text-slate-800 whitespace-pre-line leading-relaxed">
              {lkpd.tujuan}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <h3 className="font-bold text-blue-950 text-sm uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              <span>Petunjuk Pengerjaan</span>
            </h3>
            <p className="text-slate-800 whitespace-pre-line leading-relaxed">
              {lkpd.petunjuk}
            </p>
          </div>
        </div>

        {/* 5 & 6. Stimulus Konteks & Pertanyaan Pemantik */}
        <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3 text-sm sm:text-base">
          <h3 className="font-bold text-amber-950 uppercase tracking-wider text-sm">
            Stimulus & Konteks Nyata
          </h3>
          <p className="text-slate-800 leading-relaxed text-justify">
            {lkpd.stimulusKonteks}
          </p>
          <div className="p-3.5 bg-white rounded-xl border border-amber-300 text-amber-950 font-semibold">
            <strong>Pertanyaan Pemantik:</strong> {lkpd.pertanyaanPemantik}
          </div>
        </div>

        {/* 7. Langkah Kegiatan */}
        <div className="space-y-3 text-sm sm:text-base">
          <h3 className="font-bold text-slate-950 uppercase tracking-wider text-sm sm:text-base bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            Langkah-Langkah Kegiatan Penyelidikan
          </h3>
          <ol className="space-y-2.5 list-decimal list-inside text-slate-800 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {lkpd.langkahKegiatan.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="font-semibold text-slate-900">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 8. Tabel Pengamatan / Data */}
        {lkpd.tabelPengamatan && (
          <div className="space-y-3 text-sm sm:text-base">
            <h3 className="font-bold text-slate-950 uppercase tracking-wider text-sm sm:text-base bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
              {lkpd.tabelPengamatan.judul}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-300">
                <thead className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                  <tr>
                    {lkpd.tabelPengamatan.kolom.map((col, idx) => (
                      <th key={idx} className="py-2.5 px-3.5 border border-slate-300 text-left">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {lkpd.tabelPengamatan.barisContoh.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-3.5 border border-slate-300 text-slate-800">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Empty rows for student filling in print */}
                  {[1, 2, 3].map((emptyIdx) => (
                    <tr key={`empty-${emptyIdx}`} className="h-10">
                      {lkpd.tabelPengamatan?.kolom.map((_, cIdx) => (
                        <td key={cIdx} className="border border-slate-300 text-slate-400 p-2.5 text-center">
                          {cIdx === 0 ? emptyIdx + lkpd.tabelPengamatan!.barisContoh.length : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. Pertanyaan Analisis */}
        <div className="space-y-4 text-sm sm:text-base">
          <h3 className="font-bold text-slate-950 uppercase tracking-wider text-sm sm:text-base bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-emerald-600">
            Pertanyaan Analisis & Pemecahan Masalah
          </h3>
          <div className="space-y-4">
            {lkpd.pertanyaanAnalisis.map((q, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-950">{idx + 1}. {q}</p>
                <div className="border-b border-dashed border-slate-300 h-10 w-full"></div>
                <div className="border-b border-dashed border-slate-300 h-10 w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. Tugas Penerapan Kontekstual */}
        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2 text-sm sm:text-base">
          <h3 className="font-bold text-purple-950 uppercase tracking-wider text-sm">
            Tugas Penerapan / Kreasi Solusi Nyata
          </h3>
          <p className="text-slate-800 leading-relaxed">
            {lkpd.tugasPenerapan}
          </p>
          <div className="border-b border-dashed border-purple-300 h-14 w-full mt-3"></div>
        </div>

        {/* 11. Kesimpulan */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-sm sm:text-base">
          <h3 className="font-bold text-slate-950 uppercase tracking-wider text-sm">
            Kesimpulan Tim
          </h3>
          <p className="text-slate-600 italic">
            {lkpd.kesimpulan}
          </p>
          <div className="border-b border-dashed border-slate-300 h-12 w-full"></div>
        </div>

        {/* 12. Lembar Refleksi Emosional Siswa */}
        <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-2 text-sm sm:text-base">
          <h3 className="font-bold text-emerald-950 uppercase tracking-wider text-sm">
            Refleksi Perasaan & Pembelajaran Siswa
          </h3>
          <p className="text-slate-800 whitespace-pre-line leading-relaxed">
            {lkpd.refleksiSiswa}
          </p>
          <div className="border-b border-dashed border-emerald-300 h-10 w-full mt-2"></div>
        </div>

        {/* Tanda Tangan Guru & Kelompok */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 text-sm sm:text-base text-center">
          <div>
            <p className="font-bold text-slate-800">Paraf Ketua Kelompok:</p>
            <div className="h-16"></div>
            <p className="text-slate-500">( ............................................ )</p>
          </div>
          <div>
            <p className="font-bold text-slate-800">Catatan & Nilai Guru:</p>
            <div className="h-16"></div>
            <p className="text-slate-900 font-bold">( {identitas.namaGuru} )</p>
          </div>
        </div>

      </div>

    </div>
  );
};
