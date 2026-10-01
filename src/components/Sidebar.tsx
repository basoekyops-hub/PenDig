import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  FileText, 
  BookOpen, 
  ClipboardCheck, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Download, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  School,
  ArrowRight
} from 'lucide-react';
import { ModulAjar } from '../types/modul';
import { PRESET_MODULS } from '../data/presets';
import { getBskapReference } from '../services/modulGenerator';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  activeTab: 'form' | 'document' | 'lkpd' | 'asesmen' | 'visual';
  setActiveTab: (tab: 'form' | 'document' | 'lkpd' | 'asesmen' | 'visual') => void;
  onSelectPreset: (preset: ModulAjar) => void;
  onOpenExport: () => void;
  onPrint: () => void;
  hasModul: boolean;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onSelectPreset,
  onOpenExport,
  onPrint,
  hasModul,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(true);

  const handleNavClick = (tab: 'form' | 'document' | 'lkpd' | 'asesmen' | 'visual', isLocked: boolean) => {
    if (isLocked) {
      alert('Perhatian: Langkah ini belum dapat dibuka.\nSilakan lengkapi Data Awal di Langkah 1 dan klik "Rancang Modul Ajar Sekarang" terlebih dahulu atau pilih salah satu di menu "Contoh Modul"!');
      return;
    }
    setActiveTab(tab);
    setIsOpenMobile(false);
  };

  const getJenjangBadge = (jenjang: string) => {
    switch (jenjang) {
      case 'SD':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'SMP':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'SMA':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'SMK':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'
        } no-print`}
      >
        {/* Brand / Logo Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
              <img
                src="/logo-pengawas-digital.png"
                alt="Logo Pengawas Digital"
                className="w-full h-full object-contain rounded-full transform hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight">
                Deep Learning 8–3–3–4
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Pengawas Digital · Merdeka
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle size="sm" className="hidden sm:inline-flex" />
            <button
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
          {hasModul ? (
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Modul Ajar Aktif (Langkah Terbuka)</span>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-amber-900 dark:text-amber-300 font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>Selesaikan Langkah 1 atau pilih di "Contoh Modul"</span>
            </div>
          )}
        </div>

        {/* Navigation Steps */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
            Alur Perancangan Modul
          </div>

          {/* STEP 1: Input Data */}
          <button
            onClick={() => handleNavClick('form', false)}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
              activeTab === 'form'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                activeTab === 'form' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold block">1. Input Data Awal</span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                  {hasModul ? '✓ Selesai' : 'Mulai Di Sini'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                17 Data esensial, jenjang & CP
              </p>
            </div>
          </button>

          {/* STEP 2: Modul Ajar Utuh */}
          <button
            onClick={() => handleNavClick('document', !hasModul)}
            disabled={!hasModul}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              !hasModul
                ? 'bg-slate-100/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-75'
                : activeTab === 'document'
                ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 text-blue-950 dark:text-blue-200 font-bold shadow-xs cursor-pointer'
                : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                !hasModul
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                  : activeTab === 'document'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400'
              }`}
            >
              {!hasModul ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold block">2. Modul Ajar Utuh</span>
                {!hasModul ? (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Terkunci
                  </span>
                ) : (
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded">
                    24 Bagian
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                Skenario rinci, 8-3-3-4 & pengesahan
              </p>
            </div>
          </button>

          {/* STEP 3: LKPD Siswa */}
          <button
            onClick={() => handleNavClick('lkpd', !hasModul)}
            disabled={!hasModul}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              !hasModul
                ? 'bg-slate-100/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-75'
                : activeTab === 'lkpd'
                ? 'bg-amber-50/80 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-200 font-bold shadow-xs cursor-pointer'
                : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                !hasModul
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                  : activeTab === 'lkpd'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400'
              }`}
            >
              {!hasModul ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold block">3. Lembar LKPD Siswa</span>
                {!hasModul ? (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Terkunci
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                    Siap Cetak
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                Tabel pengamatan, analisis & refleksi
              </p>
            </div>
          </button>

          {/* STEP 4: Asesmen & Rubrik */}
          <button
            onClick={() => handleNavClick('asesmen', !hasModul)}
            disabled={!hasModul}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              !hasModul
                ? 'bg-slate-100/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-75'
                : activeTab === 'asesmen'
                ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500 text-purple-950 dark:text-purple-200 font-bold shadow-xs cursor-pointer'
                : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                !hasModul
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                  : activeTab === 'asesmen'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-purple-700 dark:text-purple-400'
              }`}
            >
              {!hasModul ? <Lock className="w-5 h-5" /> : <ClipboardCheck className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold block">4. Asesmen & Rubrik</span>
                {!hasModul ? (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Terkunci
                  </span>
                ) : (
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded">
                    Skala 1–4
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                Diagnostik, formatif, sumatif & diferensiasi
              </p>
            </div>
          </button>

          {/* STEP 5: Visualisasi Alur 8-3-3-4 */}
          <button
            onClick={() => handleNavClick('visual', false)}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-teal-50/80 dark:bg-teal-950/60 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium'
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                activeTab === 'visual' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400'
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold block">5. Alur Kerangka 8–3–3–4</span>
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 rounded">
                  Panduan
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                Peta relasi dimensi, prinsip & pengalaman
              </p>
            </div>
          </button>

          {/* DEDICATED MENU "CONTOH MODUL" (MUAT CONTOH CEPAT) IN SIDEBAR */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 mb-2"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-black text-slate-900 dark:text-white block leading-tight">
                    Contoh Modul
                  </span>
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 leading-none">
                    Muat Contoh Cepat (5 Pilihan Lengkap)
                  </span>
                </div>
              </div>
              {showPresetsMenu ? (
                <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              )}
            </button>

            {/* Expandable Presets List */}
            {showPresetsMenu && (
              <div className="space-y-2.5 animate-fade-in">
                {PRESET_MODULS.map((preset) => {
                  const bskap = getBskapReference(preset.identitas.mataPelajaran);
                  return (
                    <div
                      key={preset.id}
                      className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-850 hover:bg-emerald-50/40 dark:hover:bg-slate-800 transition-all flex flex-col gap-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-md border ${getJenjangBadge(preset.identitas.jenjang)}`}>
                          {preset.identitas.jenjang}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          bskap.isAgama 
                            ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800' 
                            : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        }`}>
                          {bskap.isAgama ? 'BSKAP 020/2026' : 'BSKAP 046/2025'}
                        </span>
                      </div>

                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {preset.identitas.mataPelajaran}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                          {preset.identitas.materi}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectPreset(preset);
                          setIsOpenMobile(false);
                        }}
                        className="w-full mt-1 py-1.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Muat Contoh Cepat ({preset.identitas.jenjang})</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Actions: Print, Export, & Dark Mode */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900 transition-colors">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (!hasModul) {
                  alert('Selesaikan Langkah 1 atau pilih di "Contoh Modul" terlebih dahulu!');
                  return;
                }
                onPrint();
              }}
              disabled={!hasModul}
              className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${
                hasModul
                  ? 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer'
                  : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed bg-slate-50 dark:bg-slate-850'
              }`}
            >
              <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Cetak PDF</span>
            </button>

            <button
              onClick={() => {
                if (!hasModul) {
                  alert('Selesaikan Langkah 1 atau pilih di "Contoh Modul" terlebih dahulu!');
                  return;
                }
                onOpenExport();
              }}
              disabled={!hasModul}
              className={`p-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${
                hasModul
                  ? 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-xs cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Word</span>
            </button>
          </div>

          {/* Quick theme toggle in sidebar */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Tema Tampilan</span>
            <ThemeToggle size="sm" showLabel />
          </div>
        </div>
      </aside>
    </>
  );
};
