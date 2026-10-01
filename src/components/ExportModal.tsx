import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Upload, 
  Printer, 
  Code 
} from 'lucide-react';
import { ModulAjar } from '../types/modul';
import { getBskapReference, getModelSyntaxInfo } from '../services/modulGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  modul: ModulAjar | null;
  onImportModul: (modul: ModulAjar) => void;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  modul,
  onImportModul,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !modul) return null;

  // Export as Word (.doc) via HTML wrapper
  const handleExportWord = () => {
    const modelSyntax = getModelSyntaxInfo(modul.identitas.modelPembelajaran);
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${modul.identitas.materi}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 12pt; line-height: 1.6; color: #111; }
          h1 { font-size: 18pt; font-weight: bold; text-align: center; margin-bottom: 6px; }
          h2 { font-size: 14pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; border-bottom: 1.5pt solid #222; }
          h3 { font-size: 12pt; font-weight: bold; margin-top: 14px; }
          table { border-collapse: collapse; width: 100%; margin: 14px 0; }
          th, td { border: 1pt solid #444; padding: 8pt; text-align: left; vertical-align: top; font-size: 11pt; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .kop { text-align: center; border-bottom: 2pt solid #000; padding-bottom: 10pt; margin-bottom: 18pt; }
        </style>
      </head>
      <body>
    `;

    const bodyContent = `
      <div class="kop">
        <p style="margin:0; font-size:11pt; font-weight:bold; letter-spacing:1pt;">PERANGKAT AJAR KURIKULUM MERDEKA</p>
        <h1>RENCANA PEMBELAJARAN / MODUL AJAR</h1>
        <p style="margin:3pt 0; font-weight:bold; color:#047857; font-size:13pt;">PEMBELAJARAN MENDALAM (DEEP LEARNING) — KERANGKA 8–3–3–4</p>
        <p style="margin:0; font-size:11pt;">${modul.identitas.sekolah} · Tahun Ajaran ${modul.identitas.tahunPelajaran}</p>
      </div>

      <h2>1. IDENTITAS PEMBELAJARAN</h2>
      <table>
        <tr><td style="width:30%;"><b>Satuan Pendidikan</b></td><td>${modul.identitas.sekolah}</td></tr>
        <tr><td><b>Nama Guru Pengampu</b></td><td>${modul.identitas.namaGuru}</td></tr>
        <tr><td><b>Mata Pelajaran</b></td><td>${modul.identitas.mataPelajaran}</td></tr>
        <tr><td><b>Jenjang / Fase / Kelas</b></td><td>${modul.identitas.jenjang} / ${modul.identitas.faseKelas}</td></tr>
        <tr><td><b>Semester / Tahun Ajaran</b></td><td>${modul.identitas.semester} / ${modul.identitas.tahunPelajaran}</td></tr>
        <tr><td><b>Materi Pokok / Topik</b></td><td>${modul.identitas.materi}</td></tr>
        <tr><td><b>Alokasi Waktu</b></td><td>${modul.identitas.alokasiWaktu}</td></tr>
        <tr><td><b>Jumlah Pertemuan</b></td><td>${modul.identitas.jumlahPertemuan || '1 Pertemuan'}</td></tr>
        <tr><td><b>Jumlah Peserta Didik</b></td><td>${modul.identitas.jumlahSiswa}</td></tr>
        <tr><td><b>Model & Metode</b></td><td>${modul.identitas.modelPembelajaran}</td></tr>
        <tr><td><b>Konteks Kearifan Lokal</b></td><td>${modul.identitas.kearifanLokal}</td></tr>
        <tr><td><b>Kompetensi Awal</b></td><td>${modul.kompetensiAwal}</td></tr>
        <tr><td><b>Dasar Regulasi Resmi CP</b></td><td>${getBskapReference(modul.identitas.mataPelajaran).fullName}</td></tr>
      </table>

      <h2>2. CAPAIAN PEMBELAJARAN (CP)</h2>
      <p style="font-size:9pt; color:#475569; margin-bottom:4pt;"><i>Rujukan Standar Kompetensi: ${getBskapReference(modul.identitas.mataPelajaran).fullName}</i></p>
      <p>${modul.capaianPembelajaran.replace(/\n/g, '<br/>')}</p>

      <h2>3. TUJUAN PEMBELAJARAN (TP)</h2>
      <ol>
        ${modul.tujuanPembelajaran.map(t => `<li>${t}</li>`).join('')}
      </ol>

      <h2>4. 8 DIMENSI PROFIL LULUSAN</h2>
      <table>
        <thead>
          <tr>
            <th>Dimensi Profil Lulusan</th>
            <th>Keterkaitan dengan Materi</th>
            <th>Aktivitas Pembelajaran</th>
            <th>Indikator</th>
          </tr>
        </thead>
        <tbody>
          ${modul.dimensiProfilLulusan.map(d => `
            <tr>
              <td><b>${d.dimensi}</b></td>
              <td>${d.keterkaitan}</td>
              <td>${d.aktivitas}</td>
              <td>${d.indikator}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>5. 3 PRINSIP PEMBELAJARAN MENDALAM</h2>
      <p><b>A. Berkesadaran:</b> ${modul.prinsipDeepLearning.berkesadaran.deskripsi} (Penerapan: ${modul.prinsipDeepLearning.berkesadaran.penerapan})</p>
      <p><b>B. Bermakna:</b> ${modul.prinsipDeepLearning.bermakna.deskripsi} (Penerapan: ${modul.prinsipDeepLearning.bermakna.penerapan})</p>
      <p><b>C. Menggembirakan:</b> ${modul.prinsipDeepLearning.menggembirakan.deskripsi} (Penerapan: ${modul.prinsipDeepLearning.menggembirakan.penerapan})</p>

      <h2>6. 3 PENGALAMAN BELAJAR</h2>
      <p><b>1. Memahami:</b> ${modul.pengalamanBelajar.memahami}</p>
      <p><b>2. Mengaplikasi:</b> ${modul.pengalamanBelajar.mengaplikasi}</p>
      <p><b>3. Merefleksi:</b> ${modul.pengalamanBelajar.merefleksi}</p>

      <h2>7. 4 KERANGKA PEMBELAJARAN</h2>
      <p><b>A. Praktik Pedagogis:</b> Pendekatan: ${modul.kerangkaPembelajaran.praktikPedagogis.pendekatan}; Model: ${modul.kerangkaPembelajaran.praktikPedagogis.model}</p>
      <p><b>Sintak Model Pembelajaran (${modelSyntax.namaModel}):</b><br/>
      ${modelSyntax.sintakList.map(s => `• <b>Sintak ${s.nomor} (${s.nama}):</b> ${s.deskripsi} <i>[${s.tahapDeepLearning}]</i>`).join('<br/>')}
      </p>
      <p><b>Metode & Strategi:</b> ${modul.kerangkaPembelajaran.praktikPedagogis.metode}</p>
      <p><b>B. Kemitraan:</b> Guru: ${modul.kerangkaPembelajaran.kemitraanPembelajaran.peranGuru}; Siswa: ${modul.kerangkaPembelajaran.kemitraanPembelajaran.peranSiswa}; Orang tua/Masyarakat: ${modul.kerangkaPembelajaran.kemitraanPembelajaran.orangTuaMasyarakat}</p>
      <p><b>C. Lingkungan Belajar:</b> Kelas: ${modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangKelas}; Alam/Sekolah: ${modul.kerangkaPembelajaran.lingkunganPembelajaran.lingkunganSekitar}; Digital: ${modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangDigital}</p>
      <p><b>D. Pemanfaatan Digital & Offline:</b> Online: ${modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOnline}; Alternatif Offline: ${modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOffline}</p>

      <h2>8. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK</h2>
      <p><b>Pemahaman Bermakna:</b> ${modul.pemahamanBermakna}</p>
      <p><b>Pertanyaan Pemantik:</b></p>
      <ul>
        ${modul.pertanyaanPemantik.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <h2>9. SKENARIO PEMBELAJARAN</h2>
      <h3>Kegiatan Pendahuluan</h3>
      ${modul.skenarioPembelajaran.pendahuluan.map(p => `<p>• ${p.kegiatan} (${p.waktu})</p>`).join('')}
      
      <h3>Kegiatan Inti</h3>
      <p><b>Tahap 1 Memahami:</b></p>
      ${modul.skenarioPembelajaran.inti.tahap1Memahami.map((m, idx) => {
        const stk = m.sintak || (idx === 0 ? `Sintak 1: ${modelSyntax.sintakList[0]?.nama || 'Orientasi Masalah'}` : `Sintak 2: ${modelSyntax.sintakList[1]?.nama || 'Organisasi Belajar'}`);
        return `<p>• <b>[${stk}]</b> ${m.aktivitas} - <i>Guru: ${m.peranGuru} | Siswa: ${m.peranSiswa} (${m.waktu})</i></p>`;
      }).join('')}
      <p><b>Tahap 2 Mengaplikasi:</b></p>
      ${modul.skenarioPembelajaran.inti.tahap2Mengaplikasi.map((m, idx) => {
        const stk = m.sintak || (idx === 0 ? `Sintak 3: ${modelSyntax.sintakList[2]?.nama || 'Penyelidikan'}` : `Sintak 4: ${modelSyntax.sintakList[3]?.nama || 'Penyajian Karya'}`);
        return `<p>• <b>[${stk}]</b> ${m.aktivitas} - <i>Guru: ${m.peranGuru} | Siswa: ${m.peranSiswa} (${m.waktu})</i></p>`;
      }).join('')}
      <p><b>Tahap 3 Merefleksi:</b></p>
      ${modul.skenarioPembelajaran.inti.tahap3Merefleksi.map((m) => {
        const lastStk = modelSyntax.sintakList[modelSyntax.sintakList.length - 1];
        const stk = m.sintak || `Sintak ${lastStk?.nomor || 5}: ${lastStk?.nama || 'Evaluasi & Refleksi'}`;
        return `<p>• <b>[${stk}]</b> ${m.aktivitas} - <i>Guru: ${m.peranGuru} | Siswa: ${m.peranSiswa} (${m.waktu})</i></p>`;
      }).join('')}

      <h3>Kegiatan Penutup</h3>
      ${modul.skenarioPembelajaran.penutup.map(p => `<p>• ${p.kegiatan} (${p.waktu})</p>`).join('')}

      <h2>10. ASESMEN & RUBRIK PENILAIAN SKALA 1–4</h2>
      <table>
        <thead>
          <tr>
            <th>Aspek</th>
            <th>Skor 4 (Sangat Mahir)</th>
            <th>Skor 3 (Cakap)</th>
            <th>Skor 2 (Berkembang)</th>
            <th>Skor 1 (Perlu Bimbingan)</th>
          </tr>
        </thead>
        <tbody>
          ${modul.rubrikPenilaian.map(r => `
            <tr>
              <td><b>${r.aspek}</b></td>
              <td>${r.skor4}</td>
              <td>${r.skor3}</td>
              <td>${r.skor2}</td>
              <td>${r.skor1}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>11. LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
      <p><b>Judul:</b> ${modul.lkpd.judul}</p>
      <p><b>Tujuan:</b> ${modul.lkpd.tujuan}</p>
      <p><b>Petunjuk:</b> ${modul.lkpd.petunjuk}</p>
      <p><b>Stimulus:</b> ${modul.lkpd.stimulusKonteks}</p>
      <p><b>Tugas Penerapan:</b> ${modul.lkpd.tugasPenerapan}</p>

      <h2>12. LEMBAR PENGESAHAN</h2>
      <table style="border:none; margin-top:30pt;">
        <tr style="border:none;">
          <td style="border:none; text-align:center; width:50%;">
            Mengetahui,<br>Kepala Sekolah<br><br><br><br>
            <b>( .............................................................. )</b><br>
            NIP. .....................................................
          </td>
          <td style="border:none; text-align:center; width:50%;">
            Guru Mata Pelajaran<br><br><br><br><br>
            <b>${modul.identitas.namaGuru}</b><br>
            NIP. .....................................................
          </td>
        </tr>
      </table>
    `;

    const footer = '</body></html>';
    const source = header + bodyContent + footer;

    const blob = new Blob(['\ufeff' + source], {
      type: 'application/msword',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Modul_Ajar_${modul.identitas.mataPelajaran.replace(/\s+/g, '_')}_${modul.identitas.jenjang}_8334.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(modul, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Modul_Ajar_${modul.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.identitas && parsed.capaianPembelajaran) {
          onImportModul(parsed);
          onClose();
        } else {
          alert('Format berkas JSON tidak sesuai dengan skema Modul Ajar.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    const md = `
# RENCANA PEMBELAJARAN / MODUL AJAR (DEEP LEARNING 8–3–3–4)
**Satuan Pendidikan:** ${modul.identitas.sekolah}  
**Guru Pengampu:** ${modul.identitas.namaGuru}  
**Mata Pelajaran:** ${modul.identitas.mataPelajaran} (${modul.identitas.jenjang} / ${modul.identitas.faseKelas})  
**Materi Pokok:** ${modul.identitas.materi}  
**Rujukan Resmi CP:** ${getBskapReference(modul.identitas.mataPelajaran).fullName}  

---

## 1. CAPAIAN PEMBELAJARAN (CP)
*Dasar Regulasi: ${getBskapReference(modul.identitas.mataPelajaran).fullName}*  
${modul.capaianPembelajaran}

## 2. TUJUAN PEMBELAJARAN
${modul.tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`).join('\n')}

## 3. 8 DIMENSI PROFIL LULUSAN
${modul.dimensiProfilLulusan.map(d => `- **${d.dimensi}**: ${d.keterkaitan} (Aktivitas: ${d.aktivitas})`).join('\n')}

## 4. 3 PRINSIP PEMBELAJARAN MENDALAM
- **Berkesadaran**: ${modul.prinsipDeepLearning.berkesadaran.deskripsi}
- **Bermakna**: ${modul.prinsipDeepLearning.bermakna.deskripsi}
- **Menggembirakan**: ${modul.prinsipDeepLearning.menggembirakan.deskripsi}

## 5. ALUR 3 PENGALAMAN BELAJAR
- **Memahami**: ${modul.pengalamanBelajar.memahami}
- **Mengaplikasi**: ${modul.pengalamanBelajar.mengaplikasi}
- **Merefleksi**: ${modul.pengalamanBelajar.merefleksi}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Ekspor & Cetak Modul Ajar
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pilih format berkas yang Anda butuhkan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-4">
          
          {/* Word (.doc) */}
          <button
            onClick={handleExportWord}
            className="w-full p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-800/80 hover:border-blue-400 dark:hover:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white block group-hover:text-blue-900 dark:group-hover:text-blue-300">
                  Unduh Microsoft Word (.doc)
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Lengkap 24 bagian dengan tabel dan format rapi siap edit
                </span>
              </div>
            </div>
            <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          </button>

          {/* Direct Print / PDF */}
          <button
            onClick={() => {
              onClose();
              setTimeout(() => onPrint(), 200);
            }}
            className="w-full p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white block group-hover:text-emerald-900 dark:group-hover:text-emerald-300">
                  Cetak Langsung / Simpan PDF
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Format cetak standar dokumen resmi A4 dengan kop sekolah
                </span>
              </div>
            </div>
            <Printer className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </button>

          {/* Copy Markdown / Text */}
          <button
            onClick={handleCopyMarkdown}
            className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center font-bold shrink-0">
                {copied ? <Check className="w-6 h-6 text-emerald-300" /> : <Copy className="w-6 h-6" />}
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white block">
                  {copied ? 'Teks Berhasil Disalin!' : 'Salin Ringkasan Teks / Markdown'}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Untuk ditempel ke Platform Merdeka Mengajar (PMM)
                </span>
              </div>
            </div>
            <Copy className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" />
          </button>

          {/* Export JSON (Backup) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleExportJson}
              className="p-3.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Code className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Cadangan (JSON)</span>
            </button>

            <label className="p-3.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer text-center">
              <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Buka File JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};
