/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { InputForm } from './components/InputForm';
import { ModulDocumentView } from './components/ModulDocumentView';
import { LKPDView } from './components/LKPDView';
import { AsesmenRubrikView } from './components/AsesmenRubrikView';
import { VisualDiagram8334 } from './components/VisualDiagram8334';
import { ExportModal } from './components/ExportModal';
import { PrintPDFModal, PrintTargetType } from './components/PrintPDFModal';
import { ThemeToggle } from './components/ThemeToggle';
import { InitialDataInput, Jenjang, ModulAjar } from './types/modul';
import { PRESET_MODULS } from './data/presets';
import { generateFullModul } from './services/modulGenerator';
import { Menu, Lock, Sparkles, Mail, Printer } from 'lucide-react';

export default function App() {
  // Start on Tab 1 (Input Form) and currentModul = null so subsequent tabs are disabled until step 1 is done
  const [activeTab, setActiveTab] = useState<'form' | 'document' | 'lkpd' | 'asesmen' | 'visual'>('form');
  const [currentModul, setCurrentModul] = useState<ModulAjar | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [isPrintingBundle, setIsPrintingBundle] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Reset printing bundle state when print dialog closes
  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrintingBundle(false);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  // Default empty/ready form data based on standard SMP template for easy teacher filling
  const defaultSMP = PRESET_MODULS[0];
  const [formData, setFormData] = useState<InitialDataInput>({
    sekolah: defaultSMP.identitas.sekolah,
    namaGuru: defaultSMP.identitas.namaGuru,
    mataPelajaran: defaultSMP.identitas.mataPelajaran,
    jenjang: defaultSMP.identitas.jenjang,
    faseKelas: defaultSMP.identitas.faseKelas,
    semester: defaultSMP.identitas.semester,
    tahunPelajaran: defaultSMP.identitas.tahunPelajaran,
    materi: defaultSMP.identitas.materi,
    alokasiWaktu: defaultSMP.identitas.alokasiWaktu,
    jumlahPertemuan: defaultSMP.identitas.jumlahPertemuan || '1 Pertemuan',
    jumlahSiswa: defaultSMP.identitas.jumlahSiswa,
    karakteristikSiswa: defaultSMP.identitas.karakteristikSiswa,
    kompetensiAwal: defaultSMP.identitas.kompetensiAwal,
    sarpras: defaultSMP.identitas.sarpras,
    modelPembelajaran: defaultSMP.identitas.modelPembelajaran,
    kearifanLokal: defaultSMP.identitas.kearifanLokal,
    capaianPembelajaran: defaultSMP.identitas.capaianPembelajaran,
    catatanTambahan: defaultSMP.identitas.catatanTambahan || '',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateFullModul(formData);
      setCurrentModul(generated);
      setActiveTab('document');
    } catch (err) {
      console.error('Error generating modul:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPreset = (preset: ModulAjar) => {
    setCurrentModul(preset);
    setFormData({
      sekolah: preset.identitas.sekolah,
      namaGuru: preset.identitas.namaGuru,
      mataPelajaran: preset.identitas.mataPelajaran,
      jenjang: preset.identitas.jenjang,
      faseKelas: preset.identitas.faseKelas,
      semester: preset.identitas.semester,
      tahunPelajaran: preset.identitas.tahunPelajaran,
      materi: preset.identitas.materi,
      alokasiWaktu: preset.identitas.alokasiWaktu,
      jumlahPertemuan: preset.identitas.jumlahPertemuan || '1 Pertemuan',
      jumlahSiswa: preset.identitas.jumlahSiswa,
      karakteristikSiswa: preset.identitas.karakteristikSiswa,
      kompetensiAwal: preset.identitas.kompetensiAwal,
      sarpras: preset.identitas.sarpras,
      modelPembelajaran: preset.identitas.modelPembelajaran,
      kearifanLokal: preset.identitas.kearifanLokal,
      capaianPembelajaran: preset.identitas.capaianPembelajaran,
      catatanTambahan: preset.identitas.catatanTambahan || '',
    });
    setActiveTab('document');
  };

  const handleSelectQuickPreset = (jenjang: Jenjang) => {
    const found = PRESET_MODULS.find((p) => p.identitas.jenjang === jenjang) || PRESET_MODULS[0];
    handleSelectPreset(found);
  };

  const handleOpenPrintModal = () => {
    if (!currentModul) {
      alert('Selesaikan Langkah 1 atau pilih "Contoh Modul" terlebih dahulu untuk mencetak dokumen!');
      return;
    }
    setPrintModalOpen(true);
  };

  const handleExecutePrint = (target: PrintTargetType) => {
    setPrintModalOpen(false);
    if (target === 'modul') {
      setActiveTab('document');
      setTimeout(() => {
        window.print();
      }, 200);
    } else if (target === 'lkpd') {
      setActiveTab('lkpd');
      setTimeout(() => {
        window.print();
      }, 200);
    } else if (target === 'asesmen') {
      setActiveTab('asesmen');
      setTimeout(() => {
        window.print();
      }, 200);
    } else if (target === 'bundle') {
      setIsPrintingBundle(true);
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          setIsPrintingBundle(false);
        }, 1200);
      }, 250);
    }
  };

  const hasModul = currentModul !== null;

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-200">
      
      {/* Left Sidebar (Desktop fixed, Mobile slide-in) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        onOpenExport={() => setExportModalOpen(true)}
        onPrint={handleOpenPrintModal}
        hasModul={hasModul}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area (Offset for desktop sidebar w-80 = 20rem / 320px) */}
      <div className="flex-1 md:pl-80 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Bar for Mobile & Quick Status & Dark/Light Mode Button */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between no-print shadow-2xs transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpenMobile(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Buka Menu Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {activeTab === 'form' && 'Langkah 1: Pengisian Data Awal (17 Elemen)'}
                  {activeTab === 'document' && 'Langkah 2: Modul Ajar Utuh (24 Komponen)'}
                  {activeTab === 'lkpd' && 'Langkah 3: Lembar Kerja Peserta Didik (LKPD)'}
                  {activeTab === 'asesmen' && 'Langkah 4: Asesmen & Rubrik Penilaian Skala 1–4'}
                  {activeTab === 'visual' && 'Arsitektur Pedagogis Kerangka 8–3–3–4'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {hasModul
                  ? `${currentModul?.identitas.sekolah} · ${currentModul?.identitas.mataPelajaran} (${currentModul?.identitas.faseKelas})`
                  : 'Lengkapi data awal untuk menghasilkan modul ajar lengkap siap pakai'}
              </p>
            </div>
          </div>

          {/* Quick Header Actions: Cetak PDF Button, Dark/Light Mode, & Status */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {hasModul && (
              <button
                type="button"
                onClick={handleOpenPrintModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl shadow-2xs transition-colors cursor-pointer"
                title="Buka dialog cetak PDF rapi"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Cetak PDF</span>
              </button>
            )}

            {/* Tombol Gelap / Terang */}
            <ThemeToggle showLabel size="md" className="hidden sm:inline-flex" />
            <ThemeToggle size="md" className="sm:hidden" />

            {!hasModul ? (
              <span className="text-xs font-semibold px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-xl border border-amber-200 dark:border-amber-800/80 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="hidden md:inline">Langkah 2–4 Terkunci</span>
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden md:inline">Modul Siap</span>
              </span>
            )}
          </div>
        </header>

        {/* Dynamic Main View with bottom padding so fixed footer never obstructs scrollable elements */}
        <main className={`flex-1 p-4 sm:p-8 pb-28 ${isPrintingBundle ? 'hidden print:hidden' : ''}`}>
          
          {/* If subsequent tab was somehow requested without modul, show friendly warning */}
          {!hasModul && activeTab !== 'form' && activeTab !== 'visual' ? (
            <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Tahap Ini Belum Dapat Dibuka
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                Silakan isi data awal pembelajaran pada <strong>Langkah 1 (Input Data Awal)</strong> dan klik tombol <strong>"Rancang Modul Ajar Sekarang"</strong> terlebih dahulu untuk menerbitkan dokumen dan lembar kerja.
              </p>
              <button
                onClick={() => setActiveTab('form')}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Menuju Langkah 1: Input Data Awal
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'form' && (
                <InputForm
                  formData={formData}
                  setFormData={setFormData}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  onSelectQuickPreset={handleSelectQuickPreset}
                />
              )}

              {activeTab === 'document' && currentModul && (
                <ModulDocumentView
                  modul={currentModul}
                  setModul={setCurrentModul}
                  onPrint={handleOpenPrintModal}
                  onOpenExport={() => setExportModalOpen(true)}
                  onSwitchToLkpd={() => setActiveTab('lkpd')}
                  onSwitchToAsesmen={() => setActiveTab('asesmen')}
                />
              )}

              {activeTab === 'lkpd' && currentModul && (
                <LKPDView
                  lkpd={currentModul.lkpd}
                  identitas={currentModul.identitas}
                  onPrint={handleOpenPrintModal}
                />
              )}

              {activeTab === 'asesmen' && currentModul && (
                <AsesmenRubrikView
                  modul={currentModul}
                  onPrint={handleOpenPrintModal}
                />
              )}

              {activeTab === 'visual' && (
                <VisualDiagram8334 modul={currentModul} />
              )}
            </>
          )}

        </main>

        {/* Dedicated Print Bundle Container (Only rendered when printing all documents at once) */}
        {isPrintingBundle && currentModul && (
          <div className="print-bundle-container print-only space-y-10">
            {/* Part 1: Modul Ajar Utuh */}
            <div className="printable-bundle-part">
              <ModulDocumentView
                modul={currentModul}
                setModul={setCurrentModul}
                onPrint={() => {}}
                onOpenExport={() => {}}
                onSwitchToLkpd={() => {}}
                onSwitchToAsesmen={() => {}}
              />
            </div>

            <div className="page-break" />

            {/* Part 2: Lembar Kerja Peserta Didik (LKPD) */}
            <div className="printable-bundle-part">
              <LKPDView
                lkpd={currentModul.lkpd}
                identitas={currentModul.identitas}
                onPrint={() => {}}
              />
            </div>

            <div className="page-break" />

            {/* Part 3: Asesmen & Rubrik Penilaian */}
            <div className="printable-bundle-part">
              <AsesmenRubrikView
                modul={currentModul}
                onPrint={() => {}}
              />
            </div>
          </div>
        )}

        {/* Global Export Modal */}
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          modul={currentModul}
          onImportModul={(imported) => {
            setCurrentModul(imported);
            setActiveTab('document');
          }}
          onPrint={handleOpenPrintModal}
        />

        {/* Dedicated Clean Print & PDF Modal */}
        <PrintPDFModal
          isOpen={printModalOpen}
          onClose={() => setPrintModalOpen(false)}
          modul={currentModul}
          currentTab={activeTab}
          onExecutePrint={handleExecutePrint}
        />

        {/* Fixed Non-Intrusive Bottom Footer (Tidak terganggu saat scroll) */}
        <footer 
          aria-label="Footer Informasi Pengawas Digital"
          className="fixed bottom-0 left-0 right-0 md:left-80 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print transition-colors duration-200"
        >
          <div className="flex flex-wrap items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
            <img
              src="/logo-pengawas-digital.png"
              alt="Logo Pengawas Digital"
              className="w-6 h-6 rounded-full object-contain shrink-0 border border-emerald-500/40 shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <span>@2026. Pengawas Digital. Email :</span>
            <a
              href="mailto:digitalpengawas@gmail.com"
              className="text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-bold hover:underline inline-flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 inline text-emerald-600 dark:text-emerald-400" />
              <span>digitalpengawas@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-slate-400 dark:text-slate-500 font-medium">
              Kurikulum Merdeka · Deep Learning 8–3–3–4
            </span>
            <ThemeToggle size="sm" showLabel={false} className="border-slate-200 dark:border-slate-700" />
          </div>
        </footer>

      </div>

    </div>
  );
}
