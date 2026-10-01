import React, { useState } from 'react';
import { 
  Layers, 
  Briefcase,
  Users,
  Building,
  Wifi
} from 'lucide-react';
import { ModulAjar } from '../types/modul';

interface VisualDiagramProps {
  modul?: ModulAjar | null;
}

export const VisualDiagram8334: React.FC<VisualDiagramProps> = ({ modul }) => {
  const [selectedNode, setSelectedNode] = useState<string>('dimensi');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Arsitektur Pedagogis: Kerangka 8–3–3–4 Pembelajaran Mendalam
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Integrasi menyeluruh Kurikulum Merdeka yang menghubungkan profil lulusan hingga refleksi aksi nyata di kelas.
            </p>
          </div>
        </div>

        {/* Big Pipeline Hierarchy Banner */}
        <div className="mt-6 p-6 sm:p-8 bg-slate-900 dark:bg-slate-950 rounded-2xl text-white space-y-4 border border-slate-800">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400">
            Alur Hubungan Antar-Komponen Pembelajaran Mendalam
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm sm:text-base font-bold">
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-emerald-300 border border-slate-700">
              8 DIMENSI LULUSAN
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-blue-300 border border-slate-700">
              3 PRINSIP DEEP LEARNING
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-purple-300 border border-slate-700">
              4 KERANGKA BELAJAR
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-amber-300 border border-slate-700">
              3 PENGALAMAN (MEMAHAMI → APLIKASI → REFLEKSI)
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-rose-300 border border-slate-700">
              AKTIVITAS LKPD
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-slate-800 rounded-xl text-cyan-300 border border-slate-700">
              ASESMEN
            </span>
            <span className="text-slate-500 font-black">→</span>
            <span className="px-4 py-2 bg-emerald-600 rounded-xl text-white font-extrabold shadow-sm">
              REFLEKSI & TINDAK LANJUT
            </span>
          </div>
        </div>
      </div>

      {/* Grid of the 4 Foundation Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: 8 Dimensi Profil Lulusan */}
        <div 
          onClick={() => setSelectedNode('dimensi')}
          className={`cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-sm hover:shadow-md ${
            selectedNode === 'dimensi' ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-md">
              Komponen 1
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center">
              8
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
            8 Dimensi Profil Lulusan
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Fondasi karakter dan kecakapan komprehensif abad ke-21.
          </p>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside font-medium">
            <li>Keimanan & Ketakwaan YME</li>
            <li>Kewargaan & Sosial</li>
            <li>Penalaran Kritis</li>
            <li>Kreativitas</li>
            <li>Kolaborasi</li>
            <li>Kemandirian</li>
            <li>Kesehatan</li>
            <li>Komunikasi</li>
          </ul>
        </div>

        {/* Card 2: 3 Prinsip Deep Learning */}
        <div 
          onClick={() => setSelectedNode('prinsip')}
          className={`cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-sm hover:shadow-md ${
            selectedNode === 'prinsip' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-3 py-1 rounded-md">
              Komponen 2
            </span>
            <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-sm font-bold flex items-center justify-center">
              3
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
            3 Prinsip Deep Learning
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Kualitas esensial agar belajar menetap dan bernilai nyata.
          </p>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 font-medium">
              <strong>1. Berkesadaran:</strong> Tahu tujuan & pantau kemajuan diri.
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 font-medium">
              <strong>2. Bermakna:</strong> Terhubung konteks kehidupan nyata.
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 font-medium">
              <strong>3. Menggembirakan:</strong> Positif, apresiatif & menantang.
            </div>
          </div>
        </div>

        {/* Card 3: 3 Pengalaman Belajar */}
        <div 
          onClick={() => setSelectedNode('pengalaman')}
          className={`cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-sm hover:shadow-md ${
            selectedNode === 'pengalaman' ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-md">
              Komponen 3
            </span>
            <span className="w-8 h-8 rounded-full bg-amber-600 text-white text-sm font-bold flex items-center justify-center">
              3
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
            3 Pengalaman Belajar
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Alur siklus kognitif dan aksi murid di skenario inti.
          </p>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-medium">
              <strong>1. Memahami:</strong> Mengamati, eksplorasi, menanya konsep.
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-medium">
              <strong>2. Mengaplikasi:</strong> Eksperimen, studi kasus, solusi karya.
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-medium">
              <strong>3. Merefleksi:</strong> Evaluasi proses & tindak lanjut aksi.
            </div>
          </div>
        </div>

        {/* Card 4: 4 Kerangka Pembelajaran */}
        <div 
          onClick={() => setSelectedNode('kerangka')}
          className={`cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-sm hover:shadow-md ${
            selectedNode === 'kerangka' ? 'ring-2 ring-purple-500 border-purple-500' : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-3 py-1 rounded-md">
              Komponen 4
            </span>
            <span className="w-8 h-8 rounded-full bg-purple-700 text-white text-sm font-bold flex items-center justify-center">
              4
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
            4 Kerangka Pembelajaran
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Ekosistem pendukung pedagogis yang fleksibel.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span><strong>Pedagogis:</strong> Model & diferensiasi</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span><strong>Kemitraan:</strong> Guru, siswa, ortu, DUDI</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span><strong>Lingkungan:</strong> Kelas, lab, alam sekitar</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span><strong>Digital & Offline:</strong> Opsi fleksibel</span>
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Detail Card Based on Active Modul */}
      {modul && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Penerapan Riil pada Modul Ajar Saat Ini
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-1">
                  {modul.identitas.materi}
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                {modul.identitas.jenjang} · {modul.identitas.faseKelas}
              </span>
            </div>
          </div>

          {selectedNode === 'dimensi' && (
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Penerapan 8 Dimensi Profil Lulusan pada Topik Ini:
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm sm:text-base text-left border border-slate-300 dark:border-slate-700">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-300 dark:border-slate-700">
                    <tr>
                      <th className="py-3 px-3.5 border border-slate-300 dark:border-slate-700">Dimensi Profil Lulusan</th>
                      <th className="py-3 px-3.5 border border-slate-300 dark:border-slate-700">Keterkaitan Materi</th>
                      <th className="py-3 px-3.5 border border-slate-300 dark:border-slate-700">Aktivitas di Kelas</th>
                      <th className="py-3 px-3.5 border border-slate-300 dark:border-slate-700">Indikator Teramati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {modul.dimensiProfilLulusan.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-850'}>
                        <td className="py-3 px-3.5 border border-slate-300 dark:border-slate-700 font-bold text-emerald-950 dark:text-emerald-300">
                          {item.dimensi}
                        </td>
                        <td className="py-3 px-3.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">{item.keterkaitan}</td>
                        <td className="py-3 px-3.5 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold">{item.aktivitas}</td>
                        <td className="py-3 px-3.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">{item.indikator}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedNode === 'prinsip' && (
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Wujud 3 Prinsip Deep Learning dalam Modul Ini:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm sm:text-base">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm uppercase tracking-wide">
                    A. Berkesadaran (Mindful)
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    {modul.prinsipDeepLearning.berkesadaran.deskripsi}
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mt-2">
                    <strong className="text-emerald-800 dark:text-emerald-400">Penerapan:</strong> {modul.prinsipDeepLearning.berkesadaran.penerapan}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 text-sm uppercase tracking-wide">
                    B. Bermakna (Meaningful)
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    {modul.prinsipDeepLearning.bermakna.deskripsi}
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mt-2">
                    <strong className="text-blue-800 dark:text-blue-400">Penerapan:</strong> {modul.prinsipDeepLearning.bermakna.penerapan}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300 text-sm uppercase tracking-wide">
                    C. Menggembirakan (Joyful)
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    {modul.prinsipDeepLearning.menggembirakan.deskripsi}
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-750 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white mt-2">
                    <strong className="text-amber-800 dark:text-amber-400">Penerapan:</strong> {modul.prinsipDeepLearning.menggembirakan.penerapan}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedNode === 'pengalaman' && (
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Alur 3 Pengalaman Belajar (Memahami → Mengaplikasi → Merefleksi):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm sm:text-base">
                <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded shadow-2xs">
                    Tahap 1
                  </span>
                  <h5 className="font-bold text-slate-950 dark:text-white text-base">
                    MEMAHAMI
                  </h5>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    {modul.pengalamanBelajar.memahami}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-800/80 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded shadow-2xs">
                    Tahap 2
                  </span>
                  <h5 className="font-bold text-slate-950 dark:text-white text-base">
                    MENGAPLIKASI
                  </h5>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    {modul.pengalamanBelajar.mengaplikasi}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/30 space-y-2">
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded shadow-2xs">
                    Tahap 3
                  </span>
                  <h5 className="font-bold text-slate-950 dark:text-white text-base">
                    MEREFLEKSI
                  </h5>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    {modul.pengalamanBelajar.merefleksi}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedNode === 'kerangka' && (
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Penerapan 4 Kerangka Pembelajaran:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-950 dark:text-white block text-base mb-2">A. Praktik Pedagogis</strong>
                  <p><strong>Pendekatan:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.pendekatan}</p>
                  <p><strong>Model:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.model}</p>
                  <p><strong>Metode:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.metode}</p>
                  <p><strong>Diferensiasi:</strong> {modul.kerangkaPembelajaran.praktikPedagogis.diferensiasi}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-950 dark:text-white block text-base mb-2">B. Kemitraan Pembelajaran</strong>
                  <p><strong>Guru:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.peranGuru}</p>
                  <p><strong>Murid:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.peranSiswa}</p>
                  <p><strong>Sebaya:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.temanSebaya}</p>
                  <p><strong>Orang Tua/DUDI:</strong> {modul.kerangkaPembelajaran.kemitraanPembelajaran.orangTuaMasyarakat}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-950 dark:text-white block text-base mb-2">C. Lingkungan Pembelajaran</strong>
                  <p><strong>Kelas:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangKelas}</p>
                  <p><strong>Sekitar:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.lingkunganSekitar}</p>
                  <p><strong>Digital:</strong> {modul.kerangkaPembelajaran.lingkunganPembelajaran.ruangDigital}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-950 dark:text-white block text-base mb-2">D. Pemanfaatan Digital & Offline</strong>
                  <p><strong>Opsi Online:</strong> {modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOnline}</p>
                  <p><strong>Alternatif Offline:</strong> {modul.kerangkaPembelajaran.pemanfaatanDigital.opsiOffline}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
