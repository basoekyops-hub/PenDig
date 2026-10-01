import React from 'react';
import { 
  ClipboardCheck, 
  Printer
} from 'lucide-react';
import { ModulAjar } from '../types/modul';

interface AsesmenRubrikViewProps {
  modul: ModulAjar;
  onPrint: () => void;
}

export const AsesmenRubrikView: React.FC<AsesmenRubrikViewProps> = ({
  modul,
  onPrint,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Instrumen Asesmen, Rubrik Skala 1–4 & Diferensiasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Sistem Penilaian Otentik Berkelanjutan Kurikulum Merdeka
            </p>
          </div>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-purple-700 hover:bg-purple-800 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Lembar Asesmen</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black space-y-9 text-slate-900 dark:text-slate-100 font-sans leading-relaxed transition-colors">
        
        {/* Header */}
        <div className="kop-surat avoid-break border-b-2 border-slate-900 dark:border-slate-100 print:border-black pb-6 text-center space-y-2">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            PANDUAN PENILAIAN AUTENTIK & DIFERENSIASI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
            ASESMEN & RUBRIK KINERJA BELAJAR MENDALAM
          </h1>
          <p className="text-sm sm:text-base font-bold text-purple-800 dark:text-purple-300">
            {modul.identitas.sekolah} · {modul.identitas.mataPelajaran} · {modul.identitas.faseKelas}
          </p>
        </div>

        {/* 1. Asesmen Diagnostik, Formatif, Sumatif */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-purple-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              1. RANCANGAN SISTEM ASESMEN KOMPREHENSIF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm sm:text-base">
            {/* Diagnostik */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 rounded-md">
                Awal Pembelajaran
              </span>
              <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                Asesmen Diagnostik
              </h3>
              <p><strong>Tujuan:</strong> {modul.asesmen.diagnostik.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.diagnostik.teknik}</p>
              <p><strong>Instrumen:</strong> {modul.asesmen.diagnostik.instrumen}</p>
              <p className="text-slate-600"><strong>Tindak Lanjut:</strong> {modul.asesmen.diagnostik.tindakLanjut}</p>
            </div>

            {/* Formatif */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 rounded-md">
                Selama Proses
              </span>
              <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                Asesmen Formatif
              </h3>
              <p><strong>Tujuan:</strong> {modul.asesmen.formatif.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.formatif.teknik}</p>
              <p><strong>Instrumen:</strong> {modul.asesmen.formatif.instrumen}</p>
              <p className="text-slate-600"><strong>Tindak Lanjut:</strong> {modul.asesmen.formatif.tindakLanjut}</p>
            </div>

            {/* Sumatif */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 rounded-md">
                Akhir Pembelajaran
              </span>
              <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                Asesmen Sumatif
              </h3>
              <p><strong>Tujuan:</strong> {modul.asesmen.sumatif.tujuan}</p>
              <p><strong>Teknik:</strong> {modul.asesmen.sumatif.teknik}</p>
              <p><strong>Instrumen:</strong> {modul.asesmen.sumatif.instrumen}</p>
              <p className="text-slate-600"><strong>KKTP:</strong> {modul.asesmen.sumatif.kriteriaKetuntasan || 'Minimal predikat Cakap (Skor 3)'}</p>
            </div>
          </div>
        </section>

        {/* 2. Rubrik Penilaian Skala 1-4 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-purple-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              2. RUBRIK PENILAIAN AUTENTIK (SKALA 1–4 DENGAN DESKRIPSI KINERJA KONKRET)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/5">Aspek Penilaian</th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/5 bg-emerald-50 text-emerald-950">
                    Skor 4 (Sangat Mahir)
                  </th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/5 bg-blue-50 text-blue-950">
                    Skor 3 (Cakap)
                  </th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/5 bg-amber-50 text-amber-950">
                    Skor 2 (Berkembang)
                  </th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/5 bg-rose-50 text-rose-950">
                    Skor 1 (Perlu Bimbingan)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {modul.rubrikPenilaian.map((r, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 px-3.5 border border-slate-300 font-bold text-slate-950 align-top">
                      {r.aspek}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top bg-emerald-50/20">
                      {r.skor4}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top bg-blue-50/20">
                      {r.skor3}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top bg-amber-50/20">
                      {r.skor2}
                    </td>
                    <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top bg-rose-50/20">
                      {r.skor1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Diferensiasi Pembelajaran (Konten, Proses, Produk) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-purple-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              3. STRATEGI DIFERENSIASI BERDASARKAN KESIAPAN BELAJAR MURID
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4">Elemen Diferensiasi</th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4 text-rose-900 bg-rose-50">
                    Kelompok Perlu Bimbingan
                  </th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4 text-blue-900 bg-blue-50">
                    Kelompok Kemampuan Sedang / Cakap
                  </th>
                  <th className="py-3 px-3.5 border border-slate-300 w-1/4 text-emerald-900 bg-emerald-50">
                    Kelompok Mahir / Pengayaan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3.5 border border-slate-300 font-bold text-slate-950">
                    Diferensiasi Konten
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.konten.bimbingan}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.konten.sedang}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.konten.pengayaan}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-3 px-3.5 border border-slate-300 font-bold text-slate-950">
                    Diferensiasi Proses
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.proses.bimbingan}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.proses.sedang}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.proses.pengayaan}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 border border-slate-300 font-bold text-slate-950">
                    Diferensiasi Produk
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.produk.bimbingan}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.produk.sedang}
                  </td>
                  <td className="py-3 px-3.5 border border-slate-300 text-slate-700 align-top">
                    {modul.diferensiasi.produk.pengayaan}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Remedial & Pengayaan */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-l-4 border-purple-600">
            <span className="font-bold text-slate-950 text-base sm:text-lg">
              4. PROGRAM REMEDIAL DAN PENGAYAAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
            <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-2">
              <h4 className="font-bold text-rose-950 uppercase tracking-wider text-sm">
                Program Remedial
              </h4>
              <p><strong>Kriteria Murid:</strong> {modul.remedialDanPengayaan.kriteriaRemedial}</p>
              <p><strong>Bentuk Program:</strong> {modul.remedialDanPengayaan.programRemedial}</p>
            </div>

            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-sm">
                Program Pengayaan
              </h4>
              <p><strong>Kriteria Murid:</strong> {modul.remedialDanPengayaan.kriteriaPengayaan}</p>
              <p><strong>Bentuk Program:</strong> {modul.remedialDanPengayaan.programPengayaan}</p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};
