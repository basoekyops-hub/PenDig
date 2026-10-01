import { ModulAjar, InitialDataInput } from '../types/modul';

export interface SmartOption {
  title: string;
  text: string;
}

export interface BskapReference {
  nomor: string;
  tahun: string;
  fullName: string;
  isAgama: boolean;
  shortBadge: string;
  description: string;
}

export interface ModelSyntaxStep {
  nomor: number;
  nama: string;
  deskripsi: string;
  tahapDeepLearning: 'Tahap 1: Memahami' | 'Tahap 2: Mengaplikasi' | 'Tahap 3: Merefleksi';
}

export interface ModelSyntaxInfo {
  namaModel: string;
  namaSingkat: string;
  jumlahSintak: number;
  sumberRujukan: string;
  deskripsiUmum: string;
  sintakList: ModelSyntaxStep[];
}

export function getModelSyntaxInfo(modelText: string): ModelSyntaxInfo {
  const text = (modelText || '').toLowerCase();

  // 1. PROJECT BASED LEARNING (PjBL)
  if (text.includes('pjbl') || text.includes('project based') || text.includes('proyek') || text.includes('design thinking') || text.includes('design sprint')) {
    return {
      namaModel: 'Project Based Learning (PjBL)',
      namaSingkat: 'PjBL',
      jumlahSintak: 6,
      sumberRujukan: 'Kemendikbudristek / The George Lucas Educational Foundation',
      deskripsiUmum: 'Model pembelajaran berbasis proyek yang memandu peserta didik merancang dan menghasilkan karya/produk nyata secara kolaboratif guna menjawab tantangan esensial.',
      sintakList: [
        {
          nomor: 1,
          nama: 'Penentuan Pertanyaan Mendasar (Start with the Essential Question)',
          deskripsi: 'Guru memantik pembelajaran dengan pertanyaan mendasar berbasis masalah kontekstual; siswa mengeksplorasi kebutuhan pembuatan karya/produk nyata.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 2,
          nama: 'Mendesain Perencanaan Proyek (Design a Plan for the Project)',
          deskripsi: 'Guru dan siswa merancang aturan main, pemilihan aktivitas, serta alat dan bahan kontekstual yang mendukung penyelesaian proyek.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 3,
          nama: 'Menyusun Jadwal Aktivitas (Create a Schedule)',
          deskripsi: 'Guru dan siswa membuat alokasi waktu dan batas akhir tahapan pengerjaan proyek secara realistis dan terstruktur.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 4,
          nama: 'Memonitor Keaktifan dan Perkembangan Proyek (Monitor the Students & Progress)',
          deskripsi: 'Guru memantau keaktifan peserta didik, membimbing proses pembuatan karya, dan memfasilitasi solusi saat tim menghadapi kendala teknis.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 5,
          nama: 'Menguji Hasil Produk Proyek (Assess the Outcome)',
          deskripsi: 'Menilai ketercapaian standar produk proyek, menguji kelayakan dan fungsionalitas karya, serta memfasilitasi presentasi/pameran karya.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 6,
          nama: 'Mengevaluasi Pengalaman Belajar (Evaluate the Experience)',
          deskripsi: 'Guru dan peserta didik melakukan refleksi mendalam terhadap seluruh proses pembuatan proyek dan menyusun komitmen perbaikan mutu.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
      ],
    };
  }

  // 2. DISCOVERY LEARNING
  if (text.includes('discovery') || text.includes('penemuan')) {
    return {
      namaModel: 'Discovery Learning',
      namaSingkat: 'Discovery Learning',
      jumlahSintak: 6,
      sumberRujukan: 'Kemendikbudristek / Jerome Bruner',
      deskripsiUmum: 'Model pembelajaran penemuan yang mengarahkan murid mengorganisasi konsep secara mandiri melalui serangkaian eksplorasi dan pembuktian data faktual.',
      sintakList: [
        {
          nomor: 1,
          nama: 'Pemberian Rangsangan (Stimulation)',
          deskripsi: 'Guru memberikan stimulasi fenomena yang membingungkan atau menarik minat agar timbul dorongan menyelidiki konsep secara mandiri.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 2,
          nama: 'Pernyataan / Identifikasi Masalah (Problem Statement)',
          deskripsi: 'Peserta didik mengidentifikasi sebanyak mungkin agenda masalah dan merumuskannya dalam bentuk hipotesis yang akan dibuktikan.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 3,
          nama: 'Pengumpulan Data (Data Collection)',
          deskripsi: 'Peserta didik mengumpulkan data relevan melalui observasi, wawancara, membaca literatur, atau uji coba sederhana.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 4,
          nama: 'Pengolahan Data (Data Processing)',
          deskripsi: 'Peserta didik mengolah, mengklasifikasi, dan menafsirkan data yang telah dikumpulkan dalam kelompok kerja kolaboratif.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 5,
          nama: 'Pembuktian (Verification)',
          deskripsi: 'Peserta didik memeriksa secara cermat untuk membuktikan kebenaran hipotesis yang telah dirumuskan dengan temuan faktual.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 6,
          nama: 'Menarik Simpulan / Generalisasi (Generalization)',
          deskripsi: 'Menarik simpulan umum berdasarkan hasil verifikasi data dan merefleksikan prinsip umum yang ditemukan untuk memecahkan kasus lain.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
      ],
    };
  }

  // 3. INQUIRY LEARNING (INKUIRI TERBIMBING)
  if (text.includes('inkuiri') || text.includes('inquiry')) {
    return {
      namaModel: 'Inquiry Learning (Inkuiri Terbimbing)',
      namaSingkat: 'Inquiry',
      jumlahSintak: 5,
      sumberRujukan: 'Kemendikbudristek / Richard Suchman',
      deskripsiUmum: 'Model pembelajaran penyelidikan ilmiah sistematis untuk mencari dan menemukan sendiri jawaban atas suatu masalah ilmiah secara bernalar kritis.',
      sintakList: [
        {
          nomor: 1,
          nama: 'Orientasi Masalah Ilmiah (Orientation)',
          deskripsi: 'Membangun suasana kondusif, merangsang rasa ingin tahu, dan memusatkan perhatian murid pada topik penyelidikan ilmiah.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 2,
          nama: 'Merumuskan Masalah & Hipotesis (Formulating Problem & Hypothesis)',
          deskripsi: 'Membimbing peserta didik merumuskan pertanyaan inti penelitian dan menyusun dugaan sementara (hipotesis operasional).',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 3,
          nama: 'Mengumpulkan Data & Eksperimentasi (Collecting Data & Experimentation)',
          deskripsi: 'Peserta didik melakukan pengujian empiris, eksperimen terarah, atau observasi lapangan untuk mengumpulkan bukti ilmiah.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 4,
          nama: 'Menguji Hipotesis & Analisis Data (Testing Hypothesis)',
          deskripsi: 'Menganalisis data hasil uji coba, membandingkan dengan hipotesis awal, dan menyimpulkan keterkaitan antar-variabel secara logis.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 5,
          nama: 'Merumuskan Kesimpulan & Refleksi Inkuiri (Conclusion & Reflection)',
          deskripsi: 'Mendeskripsikan temuan kesimpulan akhir dan merefleksikan proses penyelidikan ilmiah yang telah dialami bersama tim.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
      ],
    };
  }

  // 4. EXPERIENTIAL LEARNING
  if (text.includes('experiential') || text.includes('pengalaman') || text.includes('kolb')) {
    return {
      namaModel: 'Experiential Learning',
      namaSingkat: 'Experiential Learning',
      jumlahSintak: 5,
      sumberRujukan: 'David A. Kolb (Experiential Learning Theory)',
      deskripsiUmum: 'Model pembelajaran yang berfokus pada transformasi pengalaman nyata menjadi pemahaman konseptual dan aksi eksperimentasi aktif.',
      sintakList: [
        {
          nomor: 1,
          nama: 'Pengalaman Konkret (Concrete Experience)',
          deskripsi: 'Peserta didik mengalami langsung peristiwa belajar nyata melalui observasi objek riil atau simulasi permainan peran aktif.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 2,
          nama: 'Observasi Reflektif (Reflective Observation)',
          deskripsi: 'Peserta didik mengamati dan merefleksikan pengalaman yang baru dialami dari berbagai sudut pandang pribadi dan tim.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 3,
          nama: 'Konseptualisasi Abstrak (Abstract Conceptualization)',
          deskripsi: 'Peserta didik membentuk teori, kaidah, dan konsep bermakna berdasarkan hasil refleksi pengalaman nyata.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 4,
          nama: 'Eksperimentasi Aktif (Active Experimentation)',
          deskripsi: 'Peserta didik menguji dan menerapkan teori baru yang dirumuskan ke dalam situasi atau permasalahan kontekstual lain.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 5,
          nama: 'Konsolidasi & Refleksi Penerapan Lanjutan',
          deskripsi: 'Mengevaluasi hasil eksperimen dan merumuskan komitmen penerapan nilai pembelajaran dalam kehidupan sehari-hari.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
      ],
    };
  }

  // 5. COOPERATIVE LEARNING (STAD / TGT / JIGSAW)
  if (text.includes('cooperative') || text.includes('kooperatif') || text.includes('tgt') || text.includes('stad') || text.includes('jigsaw')) {
    return {
      namaModel: 'Cooperative Learning',
      namaSingkat: 'Cooperative Learning',
      jumlahSintak: 6,
      sumberRujukan: 'Kemendikbudristek / Robert Slavin',
      deskripsiUmum: 'Model pembelajaran kooperatif berstruktur yang mengoptimalkan interaksi sejawat, saling ketergantungan positif, dan tanggung jawab individual.',
      sintakList: [
        {
          nomor: 1,
          nama: 'Menyampaikan Tujuan & Memotivasi Siswa',
          deskripsi: 'Guru menyampaikan tujuan pembelajaran, memberikan motivasi kontekstual, dan mengaitkan materi dengan kehidupan.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 2,
          nama: 'Menyajikan Informasi Konsep Dasar',
          deskripsi: 'Guru menyajikan materi pengantar esensial melalui demonstrasi konkret atau media visual terarah.',
          tahapDeepLearning: 'Tahap 1: Memahami',
        },
        {
          nomor: 3,
          nama: 'Mengorganisasikan Peserta Didik ke dalam Kelompok Belajar',
          deskripsi: 'Membentuk kelompok heterogen dan menjelaskan prosedur kerja sama kelompok secara jelas.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 4,
          nama: 'Membimbing Kelompok Bekerja dan Belajar',
          deskripsi: 'Mendampingi kelompok saat menyelesaikan lembar kerja tim, berdiskusi, dan saling membantu menguasai konsep.',
          tahapDeepLearning: 'Tahap 2: Mengaplikasi',
        },
        {
          nomor: 5,
          nama: 'Evaluasi & Presentasi Hasil Kerja Kelompok',
          deskripsi: 'Menguji penguasaan materi melalui kuis individual atau unjuk presentasi kelompok di hadapan kelas.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
        {
          nomor: 6,
          nama: 'Memberikan Penghargaan Tim (Team Recognition)',
          deskripsi: 'Memberikan apresiasi atas keberhasilan kelompok dan merayakan kemajuan belajar bersama.',
          tahapDeepLearning: 'Tahap 3: Merefleksi',
        },
      ],
    };
  }

  // DEFAULT: PROBLEM BASED LEARNING (PBL) (STANDAR EMAS KURIKULUM MERDEKA DEEP LEARNING)
  return {
    namaModel: 'Problem Based Learning (PBL)',
    namaSingkat: 'PBL',
    jumlahSintak: 5,
    sumberRujukan: 'Kemendikbudristek / Richard I. Arends (2012)',
    deskripsiUmum: 'Model pembelajaran berbasis masalah autentik yang melatih nalar kritis, kemampuan memecahkan masalah kontekstual, dan kemandirian belajar.',
    sintakList: [
      {
        nomor: 1,
        nama: 'Orientasi Peserta Didik pada Masalah',
        deskripsi: 'Guru menyajikan masalah autentik kontekstual, memantik rasa ingin tahu dan kesadaran awal murid terhadap permasalahan yang harus diselesaikan.',
        tahapDeepLearning: 'Tahap 1: Memahami',
      },
      {
        nomor: 2,
        nama: 'Mengorganisasikan Peserta Didik untuk Belajar',
        deskripsi: 'Guru memfasilitasi pembentukan kelompok, pembagian tugas penyelidikan, dan pendefinisian fokus masalah pada LKPD.',
        tahapDeepLearning: 'Tahap 1: Memahami',
      },
      {
        nomor: 3,
        nama: 'Membimbing Penyelidikan Individu maupun Kelompok',
        deskripsi: 'Guru mendorong pengumpulan data relevan, penyelidikan lapangan/literatur, dan eksperimen pemecahan masalah secara kolaboratif.',
        tahapDeepLearning: 'Tahap 2: Mengaplikasi',
      },
      {
        nomor: 4,
        nama: 'Mengembangkan dan Menyajikan Hasil Karya',
        deskripsi: 'Peserta didik menyusun laporan/karya solusi nyata, menyajikan hasil di hadapan kelas (Gallery Walk), dan mendiskusikan temuan.',
        tahapDeepLearning: 'Tahap 2: Mengaplikasi',
      },
      {
        nomor: 5,
        nama: 'Menganalisis dan Mengevaluasi Proses Pemecahan Masalah',
        deskripsi: 'Guru bersama peserta didik mengevaluasi efektivitas solusi, merefleksikan proses investigasi, dan menarik simpulan bermakna.',
        tahapDeepLearning: 'Tahap 3: Merefleksi',
      },
    ],
  };
}

export function generateIntiSkenarioByModel(
  modelText: string,
  topik: string,
  kearifan: string
): {
  tahap1Memahami: { sintak: string; aktivitas: string; peranGuru: string; peranSiswa: string; waktu: string }[];
  tahap2Mengaplikasi: { sintak: string; aktivitas: string; peranGuru: string; peranSiswa: string; waktu: string }[];
  tahap3Merefleksi: { sintak: string; aktivitas: string; peranGuru: string; peranSiswa: string; waktu: string }[];
} {
  const info = getModelSyntaxInfo(modelText);
  const text = (modelText || '').toLowerCase();

  // PjBL SCENARIO
  if (info.namaSingkat === 'PjBL') {
    return {
      tahap1Memahami: [
        {
          sintak: 'Sintak 1: Penentuan Pertanyaan Mendasar',
          aktivitas: `Eksplorasi Tantangan Nyata & Rumusan Pertanyaan Kunci Proyek ${topik}`,
          peranGuru: `Menyajikan tantangan kontekstual di lingkungan (${kearifan}) dan memantik pertanyaan mendasar yang menuntut solusi produk nyata.`,
          peranSiswa: `Menganalisis urgensi permasalahan, mengidentifikasi kebutuhan pemecahan masalah, dan merumuskan fokus produk proyek tim.`,
          waktu: '15 menit',
        },
        {
          sintak: 'Sintak 2: Mendesain Perencanaan Proyek',
          aktivitas: `Perancangan Sketsa Karya, Alat-Bahan & Pembagian Peran Tim`,
          peranGuru: `Membimbing kelompok merancang sketsa rancangan karya, menyepakati kriteria mutu produk, dan membagikan lembar kerja proyek.`,
          peranSiswa: `Menyusun desain kerja proyek, memilih alat dan bahan kontekstual yang ramah lingkungan, serta membagi peran anggota tim.`,
          waktu: '15 menit',
        },
      ],
      tahap2Mengaplikasi: [
        {
          sintak: 'Sintak 3 & 4: Menyusun Jadwal & Memonitor Pelaksanaan Proyek',
          aktivitas: `Eksekusi Pembuatan Produk & Pemantauan Progres Proyek`,
          peranGuru: `Memonitor keaktifan tiap anggota tim, memeriksa ketepatan tahapan jadwal, dan membimbing penanganan kendala teknis pembuatan produk.`,
          peranSiswa: `Bekerja kolaboratif merealisasikan produk karya, mencatat logbook kemajuan, dan menguji coba fungsi awal prototipe.`,
          waktu: '30 menit',
        },
        {
          sintak: 'Sintak 5: Menguji Hasil Produk Proyek',
          aktivitas: `Uji Kelayakan Karya & Gelar Karya / Presentasi Produk`,
          peranGuru: `Menilai ketercapaian spesifikasi karya berdasarkan rubrik penilaian, memfasilitasi uji coba, dan memandu pameran gelar karya.`,
          peranSiswa: `Mendemonstrasikan fungsi produk karya di depan kelas, menerima masukan uji kelayakan, dan mencatat saran perbaikan.`,
          waktu: '15 menit',
        },
      ],
      tahap3Merefleksi: [
        {
          sintak: 'Sintak 6: Mengevaluasi Pengalaman Belajar',
          aktivitas: `Evaluasi Pengalaman Proyek & Refleksi Nilai Kebermaknaan`,
          peranGuru: `Memfasilitasi diskusi refleksi mengenai kendala, keberhasilan, dan hikmah berharga selama proses perancangan proyek.`,
          peranSiswa: `Mengevaluasi efektivitas produk, mengidentifikasi pembelajaran bermakna (lesson learned), serta menyusun rencana tindak lanjut.`,
          waktu: '10 menit',
        },
      ],
    };
  }

  // DISCOVERY LEARNING SCENARIO
  if (info.namaSingkat === 'Discovery Learning') {
    return {
      tahap1Memahami: [
        {
          sintak: 'Sintak 1: Pemberian Rangsangan (Stimulation)',
          aktivitas: `Pemberian Stimulus Fenomena Pemantik & Pengamatan Objek Konsep ${topik}`,
          peranGuru: `Menyajikan tayangan/benda konkret/kasus anomali terkait ${topik} yang memicu pertanyaan keingintahuan mendalam pada murid.`,
          peranSiswa: `Mengamati stimulus secara cermat, mencatat kejanggalan/keunikan fenomena, dan mengungkapkan rasa ingin tahunya.`,
          waktu: '15 menit',
        },
        {
          sintak: 'Sintak 2: Identifikasi Masalah (Problem Statement)',
          aktivitas: `Perumusan Masalah & Penyusunan Hipotesis Awal`,
          peranGuru: `Membimbing siswa merumuskan pernyataan masalah dan hipotesis dugaan sementara yang relevan untuk diuji.`,
          peranSiswa: `Berdiskusi dalam kelompok merumuskan pertanyaan penyelidikan dan menyusun hipotesis pada lembar kerja.`,
          waktu: '10 menit',
        },
      ],
      tahap2Mengaplikasi: [
        {
          sintak: 'Sintak 3 & 4: Pengumpulan Data & Pengolahan Data',
          aktivitas: `Penyelidikan Empiris, Pengumpulan Fakta & Analisis Data Kontekstual`,
          peranGuru: `Memfasilitasi lembar data, mengarahkan eksplorasi bukti kontekstual (${kearifan}), dan membimbing pengolahan tabel data.`,
          peranSiswa: `Mengumpulkan data dari pengamatan/literatur, mengolah dan mengklasifikasikan informasi ke dalam tabel analisis LKPD.`,
          waktu: '30 menit',
        },
        {
          sintak: 'Sintak 5: Pembuktian (Verification)',
          aktivitas: `Uji Kebenaran Hipotesis & Pembuktian Temuan Melalui Diskusi Kelas`,
          peranGuru: `Memandu diskusi verifikasi antar-kelompok, memeriksa ketepatan pembuktian logika siswa dengan teori keilmuan.`,
          peranSiswa: `Mencocokkan temuan data dengan hipotesis awal, memverifikasi kesesuaian fakta, dan memaparkan bukti pembuktiannya.`,
          waktu: '15 menit',
        },
      ],
      tahap3Merefleksi: [
        {
          sintak: 'Sintak 6: Menarik Simpulan / Generalisasi',
          aktivitas: `Penarikan Simpulan Umum Konsep & Refleksi Prinsip Penemuan`,
          peranGuru: `Menegaskan prinsip umum konsep yang telah ditemukan siswa dan memandu refleksi proses penemuan mandiri.`,
          peranSiswa: `Merumuskan simpulan umum (generalisasi) berdasarkan pembuktian data serta menuliskan refleksi pemahaman bermakna.`,
          waktu: '10 menit',
        },
      ],
    };
  }

  // INQUIRY LEARNING SCENARIO
  if (info.namaSingkat === 'Inquiry') {
    return {
      tahap1Memahami: [
        {
          sintak: 'Sintak 1 & 2: Orientasi Masalah & Perumusan Hipotesis',
          aktivitas: `Orientasi Penyelidikan Ilmiah & Perumusan Hipotesis Penelitian ${topik}`,
          peranGuru: `Mengarahkan fokus masalah ilmiah, memicu nalar kritis siswa dengan data awal, dan membimbing formulasi hipotesis.`,
          peranSiswa: `Menganalisis pertanyaan penyelidikan ilmiah dan menyusun dugaan sementara (hipotesis kerja) secara kelompok.`,
          waktu: '20 menit',
        },
      ],
      tahap2Mengaplikasi: [
        {
          sintak: 'Sintak 3: Mengumpulkan Data & Eksperimentasi',
          aktivitas: `Pelaksanaan Eksperimen Terarah & Pengumpulan Bukti Lapangan`,
          peranGuru: `Mengawasi ketertiban dan keselamatan eksperimen, memberikan scaffolding pertanyaan panduan observasi.`,
          peranSiswa: `Melakukan eksperimen/observasi sistematis, mengukur variabel, dan mencatat data empiris pada lembar kerja inkuiri.`,
          waktu: '25 menit',
        },
        {
          sintak: 'Sintak 4: Menguji Hipotesis & Analisis Data',
          aktivitas: `Analisis Data Hasil Percobaan & Pengujian Hipotesis Ilmiah`,
          peranGuru: `Membimbing analisis grafik/tabel data dan memoderasi presentasi komparasi hasil temuan antar-kelompok.`,
          peranSiswa: `Mengolah data hasil uji coba, membuktikan keabsahan hipotesis, dan mempresentasikan hasil analisis bukti ilmiah.`,
          waktu: '20 menit',
        },
      ],
      tahap3Merefleksi: [
        {
          sintak: 'Sintak 5: Merumuskan Kesimpulan & Refleksi Inkuiri',
          aktivitas: `Formulasi Simpulan Ilmiah & Refleksi Metakognisi Penyelidikan`,
          peranGuru: `Mengajak siswa merajut benang merah konsep ilmiah, menegaskan pemahaman bermakna, dan memandu refleksi metakognisi.`,
          peranSiswa: `Menyimpulkan hukum/konsep esensial yang ditemukan dan merefleksikan keterampilan proses ilmiah yang meningkat.`,
          waktu: '15 menit',
        },
      ],
    };
  }

  // EXPERIENTIAL LEARNING SCENARIO
  if (info.namaSingkat === 'Experiential Learning') {
    return {
      tahap1Memahami: [
        {
          sintak: 'Sintak 1: Pengalaman Konkret (Concrete Experience)',
          aktivitas: `Keterlibatan Langsung pada Pengalaman Nyata & Observasi Objek Konkret`,
          peranGuru: `Menghadirkan stimulus pengalaman langsung (simulasi peran / objek fisik riil lingkungan ${kearifan}) tanpa penghakiman awal.`,
          peranSiswa: `Terlibat aktif merasakan, mengamati, dan berinteraksi langsung dengan objek/peran pengalaman nyata.`,
          waktu: '15 menit',
        },
        {
          sintak: 'Sintak 2: Observasi Reflektif (Reflective Observation)',
          aktivitas: `Pencatatan Perasaan, Pengamatan Fenomena & Refleksi Awal`,
          peranGuru: `Mengajukan pertanyaan reflektif: "Apa yang kalian lihat, rasakan, dan temukan selama pengalaman tadi?"`,
          peranSiswa: `Mendiskusikan pengalaman dari berbagai sudut pandang anggota tim dan mencatat pengamatan kunci pada LKPD.`,
          waktu: '10 menit',
        },
      ],
      tahap2Mengaplikasi: [
        {
          sintak: 'Sintak 3: Konseptualisasi Abstrak (Abstract Conceptualization)',
          aktivitas: `Perumusan Kaidah Teori & Pemodelan Konsep Bermakna ${topik}`,
          peranGuru: `Membantu siswa mengintegrasikan pengalaman nyata dengan teori/konsep ilmiah Kurikulum Merdeka.`,
          peranSiswa: `Menyusun bagan/model konseptual keteraturan yang menjelaskan mengapa pengalaman tersebut terjadi.`,
          waktu: '20 menit',
        },
        {
          sintak: 'Sintak 4: Eksperimentasi Aktif (Active Experimentation)',
          aktivitas: `Uji Coba Penerapan Konsep pada Kasus / Tantangan Kontekstual Baru`,
          peranGuru: `Memberikan skenario tantangan baru di lingkungan sekitar untuk dipecahkan menggunakan konsep yang telah dipahami.`,
          peranSiswa: `Menerapkan konsep yang telah dikonstruksi untuk memecahkan masalah baru dan menciptakan karya solutif.`,
          waktu: '25 menit',
        },
      ],
      tahap3Merefleksi: [
        {
          sintak: 'Sintak 5: Konsolidasi & Refleksi Penerapan Lanjutan',
          aktivitas: `Konsolidasi Belajar Berkesadaran & Janji Aksi Penerapan Nyata`,
          peranGuru: `Memfasilitasi refleksi menyeluruh atas siklus pengalaman yang telah dilalui dan mengapresiasi keterlibatan penuh siswa.`,
          peranSiswa: `Merefleksikan perubahan cara pandang dan merumuskan komitmen tindakan nyata di rumah atau lingkungan sekolah.`,
          waktu: '10 menit',
        },
      ],
    };
  }

  // COOPERATIVE LEARNING SCENARIO
  if (info.namaSingkat === 'Cooperative Learning') {
    return {
      tahap1Memahami: [
        {
          sintak: 'Sintak 1 & 2: Menyampaikan Tujuan, Motivasi & Penyajian Konsep Dasar',
          aktivitas: `Penyampaian Misi Tim & Demonstrasi Pengantar Konsep ${topik}`,
          peranGuru: `Menyampaikan tujuan pembelajaran, skenario kerja tim kooperatif, dan menyajikan materi konsep pengantar yang memikat.`,
          peranSiswa: `Menyimak arahan misi belajar, memahami aturan main kelompok, dan mencatat konsep kunci yang disajikan guru.`,
          waktu: '20 menit',
        },
      ],
      tahap2Mengaplikasi: [
        {
          sintak: 'Sintak 3 & 4: Pengorganisasian Kelompok & Bimbingan Kerja Kolaboratif',
          aktivitas: `Eksplorasi Tim Kooperatif, Penyelesaian LKPD & Saling Mengajar Antarteman`,
          peranGuru: `Membentuk kelompok heterogen, berkeliling mendampingi diskusi tim, dan memastikan terjadinya saling ketergantungan positif.`,
          peranSiswa: `Bekerja sama dalam tim memecahkan tantangan LKPD, saling menjelaskan materi kepada rekan satu tim, dan merangkum hasil bersama.`,
          waktu: '35 menit',
        },
      ],
      tahap3Merefleksi: [
        {
          sintak: 'Sintak 5 & 6: Evaluasi Hasil Kerja Kelompok & Penghargaan Tim (Team Recognition)',
          aktivitas: `Uji Penguasaan Materi, Pameran Hasil Tim & Apresiasi Prestasi Kooperatif`,
          peranGuru: `Memandu evaluasi/kuis tim, memberikan umpan balik menyeluruh, dan memberikan penghargaan prestasi bagi tim berkinerja solid.`,
          peranSiswa: `Mempresentasikan hasil temuan kelompok, merayakan pencapaian tim bersama, dan merefleksikan nilai kerja sama gotong royong.`,
          waktu: '20 menit',
        },
      ],
    };
  }

  // DEFAULT: PROBLEM BASED LEARNING (PBL) SCENARIO
  return {
    tahap1Memahami: [
      {
        sintak: 'Sintak 1: Orientasi peserta didik pada masalah',
        aktivitas: `Orientasi Fenomena Autentik & Pemantik Masalah Kontekstual ${topik}`,
        peranGuru: `Menyajikan masalah nyata di lingkungan sekitar/sekolah (${kearifan}) melalui tayangan gambar/studi kasus, memicu rasa ingin tahu murid.`,
        peranSiswa: `Mengamati fenomena masalah kontekstual, mengidentifikasi isu-isu yang membingungkan, dan merumuskan fokus masalah utama.`,
        waktu: '15 menit',
      },
      {
        sintak: 'Sintak 2: Mengorganisasikan peserta didik untuk belajar',
        aktivitas: `Pengorganisasian Kelompok Belajar & Pembagian Tugas Investigasi`,
        peranGuru: `Membagi kelompok belajar heterogen, membagikan LKPD pemecahan masalah, dan membantu siswa mendefinisikan tugas penyelidikan.`,
        peranSiswa: `Berkumpul bersama kelompok, menyepakati pembagian peran (ketua, pencatat data, juru bicara), dan menelaah langkah kerja LKPD.`,
        waktu: '10 menit',
      },
    ],
    tahap2Mengaplikasi: [
      {
        sintak: 'Sintak 3: Membimbing penyelidikan individu maupun kelompok',
        aktivitas: `Penyelidikan Lapangan / Analisis Data & Pengumpulan Fakta Solutif`,
        peranGuru: `Memfasilitasi akses sumber belajar, berkeliling memberikan bimbingan bertingkat (scaffolding), serta mendorong nalar kritis siswa.`,
        peranSiswa: `Mengumpulkan data dari pengamatan/literatur, menganalisis sebab-akibat masalah, dan mendiskusikan alternatif solusi pada LKPD.`,
        waktu: '25 menit',
      },
      {
        sintak: 'Sintak 4: Mengembangkan dan menyajikan hasil karya',
        aktivitas: `Penyusunan Produk Solusi & Presentasi Karya Interaktif (Gallery Walk)`,
        peranGuru: `Memandu jalannya presentasi/pameran karya (Gallery Walk) antarkelompok, memoderasi tanya jawab, serta memberi apresiasi.`,
        peranSiswa: `Menyusun laporan/infografis/skema solusi, mempresentasikan karya di depan rekan sebaya, serta memberikan umpan balik konstruktif.`,
        waktu: '20 menit',
      },
    ],
    tahap3Merefleksi: [
      {
        sintak: 'Sintak 5: Menganalisis dan mengevaluasi proses pemecahan masalah',
        aktivitas: `Evaluasi Kritis Pemecahan Masalah & Refleksi Pengalaman Belajar`,
        peranGuru: `Membimbing analisis efektivitas solusi yang diajukan, meluruskan miskonsepsi konsep ${topik}, dan memandu refleksi diri murid.`,
        peranSiswa: `Mengevaluasi kelebihan dan keterbatasan solusi kelompok, merefleksikan proses belajar diri, serta menyusun komitmen aksi nyata.`,
        waktu: '15 menit',
      },
    ],
  };
}

export function getBskapReference(mataPelajaran: string): BskapReference {
  const mapel = (mataPelajaran || '').toLowerCase();
  const isAgama = 
    mapel.includes('agama') || 
    mapel.includes('pai') || 
    mapel.includes('islam') || 
    mapel.includes('kristen') || 
    mapel.includes('katolik') || 
    mapel.includes('hindu') || 
    mapel.includes('buddha') || 
    mapel.includes('khonghucu') ||
    mapel.includes('budi pekerti') ||
    mapel.includes('kepercayaan');

  if (isAgama) {
    return {
      nomor: '020',
      tahun: '2026',
      fullName: 'Keputusan Kepala BSKAP Kemendikbudristek Nomor 020 Tahun 2026 tentang Capaian Pembelajaran Pendidikan Agama dan Budi Pekerti',
      isAgama: true,
      shortBadge: 'BSKAP No. 020 Tahun 2026 (Pendidikan Agama & Budi Pekerti)',
      description: 'Mata Pelajaran Pendidikan Agama & Budi Pekerti merujuk pada BSKAP Nomor 020 Tahun 2026.',
    };
  }

  return {
    nomor: '046',
    tahun: '2025',
    fullName: 'Keputusan Kepala BSKAP Kemendikbudristek Nomor 046 Tahun 2025 tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah',
    isAgama: false,
    shortBadge: 'BSKAP No. 046 Tahun 2025 (Semua Mapel Non-Agama)',
    description: 'Semua Mata Pelajaran selain Pendidikan Agama merujuk pada standar kompetensi fase resmi BSKAP Nomor 046 Tahun 2025.',
  };
}

export interface FieldSmartSuggestions {
  primary: string;
  options: SmartOption[];
}

export interface ComprehensiveReferences {
  kompetensiAwal: FieldSmartSuggestions;
  modelPembelajaran: FieldSmartSuggestions;
  kearifanLokal: FieldSmartSuggestions;
  cp: string;
  elemen: string;
  tujuanPembelajaran: string[];
  bskapReference: BskapReference;
}

export interface CurriculumSuggestion {
  cp: string;
  elemen: string;
  tujuanPembelajaran: string[];
  kompetensiAwal: string;
  modelPembelajaran: string;
  kearifanLokal: string;
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  fieldReferences?: ComprehensiveReferences;
  bskapReference?: BskapReference;
}

export async function requestSuggestCpTp(input: {
  mataPelajaran: string;
  jenjang: string;
  faseKelas: string;
  materi: string;
}): Promise<CurriculumSuggestion> {
  try {
    const res = await fetch('/api/suggest-cp-tp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.cp) {
        return {
          ...generateCurriculumSuggestionOffline(input),
          ...json.data,
        };
      }
    }
  } catch (err) {
    console.warn('API call failed, generating via expert curriculum heuristics:', err);
  }

  // Fallback intelligent formulation based on Kurikulum Merdeka standards
  return generateCurriculumSuggestionOffline(input);
}

export function getSmartFieldReferences(input: {
  mataPelajaran: string;
  jenjang: string;
  faseKelas: string;
  materi: string;
}): ComprehensiveReferences {
  const { mataPelajaran, faseKelas, materi, jenjang } = input;
  const topik = materi.trim() || 'Topik Pembelajaran';
  const topikLower = topik.toLowerCase();
  const mapelLower = (mataPelajaran || '').toLowerCase();
  const fase = faseKelas || 'Fase Terpilih';

  // 1. KOMPETENSI AWAL (PRASYARAT) HEURISTICS
  let primaryKompetensi = `Peserta didik telah memahami pengantar konsep dasar ${topik}, memiliki rasa ingin tahu tinggi, serta terbiasa melakukan pengamatan dan diskusi kelompok terbimbing.`;
  let kompetensiOptions: SmartOption[] = [
    {
      title: 'Pemahaman Konsep Kunci',
      text: `Peserta didik telah memahami konsep dasar dan peristilahan penting yang melandasi materi ${topik}.`,
    },
    {
      title: 'Keterampilan Proses & Analisis',
      text: `Peserta didik telah terampil mengamati fenomena, mencatat data sederhana, dan mendiskusikan temuan dalam kelompok.`,
    },
    {
      title: 'Pengalaman Keseharian',
      text: `Peserta didik telah mengenali contoh dan peristiwa nyata terkait ${topik} yang sering dijumpai di lingkungan sekitar rumah dan sekolah.`,
    },
  ];

  if (topikLower.includes('ekosistem') || topikLower.includes('rantai makanan') || topikLower.includes('lingkungan') || topikLower.includes('biodiversitas') || topikLower.includes('habitat')) {
    primaryKompetensi = 'Peserta didik telah mampu membedakan komponen hidup (biotik) dan tak hidup (abiotik) serta mengenali kebutuhan dasar organisme di lingkungan sekitar rumah dan sekolah.';
    kompetensiOptions = [
      {
        title: 'Komponen Biotik & Abiotik',
        text: 'Peserta didik telah mampu mengidentifikasi komponen biotik dan abiotik di pekarangan rumah atau sekolah secara mandiri.',
      },
      {
        title: 'Hubungan Makan & Dimakan',
        text: 'Peserta didik telah memahami konsep bahwa makhluk hidup membutuhkan makanan dan energi untuk bertumbuh dan bertahan hidup.',
      },
      {
        title: 'Kepedulian Lingkungan',
        text: 'Peserta didik telah menunjukkan kebiasaan memelihara tanaman, tidak merusak tanaman, dan membuang sampah pada tempatnya.',
      },
    ];
  } else if (topikLower.includes('bioteknologi') || topikLower.includes('fermentasi') || topikLower.includes('sel') || topikLower.includes('mikro') || topikLower.includes('genetika')) {
    primaryKompetensi = 'Peserta didik telah memahami struktur sel mikroskopis (jamur/bakteri), konsep respirasi anaerob dasar, dan memiliki kepedulian terhadap higienitas alat laboratorium.';
    kompetensiOptions = [
      {
        title: 'Struktur Sel & Mikroorganisme',
        text: 'Peserta didik telah memahami perbedaan organisme uniseluler dan multiseluler serta cara kerja mikroorganisme sederhana (ragi/bakteri).',
      },
      {
        title: 'Konsep Kimia / Biologi Dasar',
        text: 'Peserta didik telah memahami prinsip perubahan zat (fisika dan kimia) serta faktor-faktor yang memengaruhi reaksi fermentasi.',
      },
      {
        title: 'Budaya Higienitas Pangan',
        text: 'Peserta didik terbiasa menerapkan standar sanitasi, kebersihan tangan, dan kehati-hatian dalam memperlakukan bahan makanan tradisional.',
      },
    ];
  } else if (topikLower.includes('ui/ux') || topikLower.includes('desain') || topikLower.includes('antarmuka') || topikLower.includes('figma') || topikLower.includes('grafis') || topikLower.includes('kemasan')) {
    primaryKompetensi = 'Peserta didik telah menguasai prinsip dasar tata letak visual (grid, kontras warna, hierarki teks) dan memiliki keterampilan dasar mengoperasikan perangkat komputer grafis.';
    kompetensiOptions = [
      {
        title: 'Prinsip Desain & Tata Letak',
        text: 'Peserta didik telah menguasai unsur visual berupa garis, bentuk, warna, dan hierarki tipografi dalam media komunikasi visual.',
      },
      {
        title: 'Literasi Digital & Software',
        text: 'Peserta didik telah mengenal antarmuka perangkat lunak desain berbasis vektor/layar serta terbiasa menyimpan berkas secara rapi.',
      },
      {
        title: 'Empati Pengguna (User-Centered)',
        text: 'Peserta didik memiliki kepekaan terhadap kenyamanan dan kemudahan masyarakat saat menggunakan media informasi atau produk kemasan.',
      },
    ];
  } else if (topikLower.includes('gaya') || topikLower.includes('energi') || topikLower.includes('gerak') || topikLower.includes('listrik') || topikLower.includes('magnet') || topikLower.includes('tekanan')) {
    primaryKompetensi = 'Peserta didik telah mengenal jenis-jenis gaya dalam kehidupan sehari-hari (dorongan dan tarikan) serta memahami bahwa energi tidak dapat dimusnahkan melainkan berpindah bentuk.';
    kompetensiOptions = [
      {
        title: 'Hukum Gerak & Pengukuran',
        text: 'Peserta didik telah terbiasa menggunakan alat ukur panjang dan waktu serta memahami konsep kecepatan dasar.',
      },
      {
        title: 'Bentuk Perubahan Energi',
        text: 'Peserta didik telah mampu memberikan contoh perubahan energi listrik menjadi panas, gerak, dan cahaya di rumah.',
      },
      {
        title: 'Keselamatan Penggunaan Energi',
        text: 'Peserta didik memahami bahaya kelistrikan dan pentingnya sikap hemat energi dalam kehidupan sehari-hari.',
      },
    ];
  } else if (topikLower.includes('pecahan') || topikLower.includes('aljabar') || topikLower.includes('statistika') || topikLower.includes('geometri') || topikLower.includes('persamaan') || mapelLower.includes('matematika')) {
    primaryKompetensi = 'Peserta didik telah menguasai operasi hitung dasar bilangan cacah/bulat dan mampu membaca serta merepresentasikan informasi matematis secara sistematis.';
    kompetensiOptions = [
      {
        title: 'Keterampilan Numerasi Dasar',
        text: 'Peserta didik lancar dalam operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan real.',
      },
      {
        title: 'Penalaran Matematis Logis',
        text: 'Peserta didik telah mampu menerjemahkan masalah cerita kontekstual ke dalam bentuk model matematika sederhana.',
      },
      {
        title: 'Penyajian & Visualisasi Data',
        text: 'Peserta didik telah terbiasa membaca tabel frekuensi dan diagram batang sederhana.',
      },
    ];
  } else if (topikLower.includes('teks') || topikLower.includes('cerita') || topikLower.includes('laporan') || topikLower.includes('puisi') || topikLower.includes('observasi') || mapelLower.includes('bahasa')) {
    primaryKompetensi = 'Peserta didik telah mampu mengidentifikasi ide pokok dalam sebuah paragraf dan terbiasa menuliskan gagasan dengan ejaan serta tanda baca yang tepat.';
    kompetensiOptions = [
      {
        title: 'Literasi Membaca & Menyimak',
        text: 'Peserta didik mampu menemukan gagasan utama dan informasi tersurat maupun tersirat dalam bacaan informatif/naratif.',
      },
      {
        title: 'Keterampilan Menulis Terstruktur',
        text: 'Peserta didik terbiasa menyusun kalimat efektif sesuai kaidah PUEBI/tata bahasa yang baik.',
      },
      {
        title: 'Kemampuan Berbicara & Percaya Diri',
        text: 'Peserta didik terbiasa menyampaikan pendapat dalam forum diskusi kelas dengan santun dan berani.',
      },
    ];
  } else if (topikLower.includes('pancasila') || topikLower.includes('norma') || topikLower.includes('hukum') || topikLower.includes('demokrasi') || mapelLower.includes('pkn') || mapelLower.includes('pancasila')) {
    primaryKompetensi = 'Peserta didik telah mengenali hak dan kewajiban dasar sebagai warga sekolah serta terbiasa bermusyawarah dalam mengambil keputusan bersama di kelas.';
    kompetensiOptions = [
      {
        title: 'Nilai-Nilai Pancasila',
        text: 'Peserta didik hafal kelima sila Pancasila dan dapat mencontohkan perilaku sila ke-1 sampai ke-5 di rumah.',
      },
      {
        title: 'Ketaatan terhadap Norma',
        text: 'Peserta didik telah memahami aturan-aturan yang berlaku di lingkungan keluarga dan tata tertib sekolah.',
      },
      {
        title: 'Toleransi & Kebinekaan',
        text: 'Peserta didik memiliki sikap saling menghormati perbedaan suku, agama, dan latar belakang antarteman sekelas.',
      },
    ];
  } else if (topikLower.includes('sejarah') || topikLower.includes('pasar') || topikLower.includes('peta') || topikLower.includes('sosial') || mapelLower.includes('ips')) {
    primaryKompetensi = 'Peserta didik telah mengenal letak lingkungan tempat tinggalnya serta terbiasa mengamati kegiatan jual-beli dan interaksi sosial masyarakat sekitar.';
    kompetensiOptions = [
      {
        title: 'Pemahaman Spasial & Peta',
        text: 'Peserta didik telah dapat membaca peta mata angin dan simbol-simbol geografis dasar.',
      },
      {
        title: 'Kegiatan Ekonomi Sehari-hari',
        text: 'Peserta didik memahami peran produsen, distributor, dan konsumen yang ada di pasar atau warung terdekat.',
      },
      {
        title: 'Kesadaran Sejarah Kebangsaan',
        text: 'Peserta didik telah mengenal tokoh-tokoh pahlawan nasional dan momentum penting kemerdekaan Indonesia.',
      },
    ];
  }

  // 2. MODEL & METODE PEMBELAJARAN HEURISTICS
  let primaryModel = 'Problem Based Learning (PBL) dipadukan dengan observasi lapangan, diskusi kelompok terarah, dan presentasi Gallery Walk.';
  let modelOptions: SmartOption[] = [
    {
      title: 'Problem Based Learning (PBL)',
      text: `Problem Based Learning (PBL) 5 Sintaks: Orientasi masalah kontekstual ${topik}, penyelidikan kelompok, dan presentasi solusi nyata.`,
    },
    {
      title: 'Project Based Learning (PjBL)',
      text: `Project Based Learning (PjBL): Peserta didik merancang dan menghasilkan karya/produk kreatif terkait ${topik} melalui unjuk kerja kolaboratif.`,
    },
    {
      title: 'Inkuiri Terbimbing / Experiential',
      text: `Inkuiri Terbimbing (Guided Inquiry): Eksplorasi langsung fenomena ${topik}, uji coba sederhana, dan penarikan kesimpulan mandiri.`,
    },
  ];

  if (jenjang === 'SD') {
    primaryModel = 'Experiential Learning & Cooperative Learning tipe Teams Games Tournament (TGT) dengan media konkret, nyanyian edukasi, dan eksplorasi gembira.';
    modelOptions = [
      {
        title: 'Experiential & Konkret (SD)',
        text: 'Experiential Learning berbantuan benda konkret di lingkungan kelas/sekolah dengan aktivitas mengamati, memegang, dan bermain peran.',
      },
      {
        title: 'Cooperative Learning (TGT/STAD)',
        text: 'Pembelajaran Kooperatif kelompok kecil dengan turnamen kuis ceria, kartu tantangan edukatif, dan apresiasi bintang prestasi.',
      },
      {
        title: 'Discovery Learning Terbimbing',
        text: 'Model Penemuan Terbimbing di mana guru menuntun siswa menemukan sendiri pola konsep melalui pertanyaan pemantik ramah anak.',
      },
    ];
  } else if (jenjang === 'SMK' || topikLower.includes('desain') || topikLower.includes('proyek') || topikLower.includes('produk') || topikLower.includes('kemasan')) {
    primaryModel = 'Project Based Learning (PjBL) terintegrasi metodologi industri Design Thinking & Design Sprint (Empathize, Define, Ideate, Prototype, Testing).';
    modelOptions = [
      {
        title: 'Design Thinking & PjBL Vokasi',
        text: 'PjBL dengan alur industri: Riset kebutuhan pasar/klien, pembuatan sketsa alternatif, purwarupa (prototyping), dan validasi pengguna.',
      },
      {
        title: 'Teaching Factory (TeFa)',
        text: 'Pembelajaran berbasis standar industri nyata dengan pembagian peran spesifik (Project Manager, Visual Designer, Quality Control).',
      },
      {
        title: 'Problem Based Learning Kontekstual',
        text: 'PBL berbasis brief pesanan nyata dari UMKM/mitra dunia usaha lokal untuk menyelesaikan masalah branding/fungsional.',
      },
    ];
  } else if (topikLower.includes('eksperimen') || topikLower.includes('praktikum') || topikLower.includes('bioteknologi') || topikLower.includes('kimia') || topikLower.includes('fisika')) {
    primaryModel = 'Project Based Learning (PjBL) terintegrasi pendekatan STEAM dengan praktikum terpadu, lembar kerja ilmiah, dan gelar karya sains.';
    modelOptions = [
      {
        title: 'STEAM PjBL (Sains & Teknologi)',
        text: 'PjBL berbasis STEAM: Perancangan eksperimen/produk olahan berbasis investigasi variabel kontrol dan pencatatan logbook ilmiah.',
      },
      {
        title: 'Guided Inquiry Laboratory',
        text: 'Inkuiri Terbimbing di laboratorium: Menguji hipotesis melalui pengamatan mikroskop/reaksi, analisis data, dan verifikasi teori.',
      },
      {
        title: 'Problem Based Learning (PBL)',
        text: 'PBL berbasis isu krisis lokal: Analisis dampak dan rancangan solusi teknologi tepat guna yang ramah lingkungan.',
      },
    ];
  } else if (topikLower.includes('teks') || topikLower.includes('puisi') || topikLower.includes('cerpen') || mapelLower.includes('bahasa')) {
    primaryModel = 'Genre-Based Approach (Pedagogi Genre) dipadukan dengan Think-Pair-Share, diskusi bedah teks autentik, dan pameran karya tulis (Gallery Walk).';
    modelOptions = [
      {
        title: 'Pedagogi Genre (BKP, MD, BTM, BM)',
        text: 'Membangun Konteks, Menelaah Model Teks (Dekonstruksi), Mengonstruksi Bersama, dan Mengonstruksi Teks Mandiri.',
      },
      {
        title: 'Project Based Learning (Penerbitan Karya)',
        text: 'PjBL menyusun majalah dinding / antologi karya teks kreatif peserta didik yang dipresentasikan ke audiens kelas.',
      },
      {
        title: 'Cooperative Jigsaw & Gallery Walk',
        text: 'Diskusi kelompok ahli untuk menelaah struktur teks, lalu berkeliling mengapresiasi dan memberikan umpan balik sticky notes.',
      },
    ];
  }

  // 3. KONTEKS LINGKUNGAN & KEARIFAN LOKAL HEURISTICS
  let primaryKearifan = `Pemanfaatan lingkungan taman sekolah, interaksi kehidupan masyarakat sekitar, serta nilai kearifan lokal gotong royong khas Nusantara.`;
  let kearifanOptions: SmartOption[] = [
    {
      title: 'Lingkungan Alam & Sekolah',
      text: `Laboratorium alam taman sekolah, pepohonan rindang, dan observasi langsung fenomena ${topik} di pekarangan.`,
    },
    {
      title: 'Kearifan Tradisi & Budaya Daerah',
      text: `Nilai luhur gotong royong, musyawarah mufakat, dan falsafah hidup selaras alam warisan nenek moyang Nusantara.`,
    },
    {
      title: 'Kehidupan Nyata Komunitas / UMKM',
      text: `Keterlibatan aktivitas ekonomi lokal, pasar tradisional, dan solusi praktis untuk kebutuhan masyarakat sekitar.`,
    },
  ];

  if (topikLower.includes('ekosistem') || topikLower.includes('alam') || topikLower.includes('pohon') || topikLower.includes('lingkungan') || topikLower.includes('konservasi')) {
    primaryKearifan = 'Taman sekolah asri, sumber mata air desa, kearifan konservasi alam pepohonan peneduh Nusantara, serta tradisi larangan menebang pohon pelindung mata air.';
    kearifanOptions = [
      {
        title: 'Konservasi Pohon & Sumber Air',
        text: 'Kearifan lokal perlindungan pohon beringin/mata air desa yang menjaga ketersediaan air bersih dan keseimbangan mikrohabitat alami.',
      },
      {
        title: 'Taman Sekolah sebagai Miniatur Habitat',
        text: 'Pemanfaatan halaman dan kebun sekolah untuk menyelidiki rantai makanan produsen (rumput/bunga), herbivor (belalang), dan predator (burung).',
      },
      {
        title: 'Sistem Persawahan Tradisional',
        text: 'Sistem irigasi persawahan (seperti Subak di Bali atau Terasering Jawa-Sumatra) yang menjaga kesuburan tanah dan keseimbangan hama secara alami.',
      },
    ];
  } else if (topikLower.includes('tempe') || topikLower.includes('fermentasi') || topikLower.includes('bioteknologi') || topikLower.includes('makanan') || topikLower.includes('pangan')) {
    primaryKearifan = 'Sentra perajin tempe/tape/oncom tradisional nusantara, pemanfaatan pembungkus alami daun pisang/daun jati, dan gerakan kedaulatan diversifikasi pangan lokal.';
    kearifanOptions = [
      {
        title: 'Sentra Perajin Tempe & Tape Tradisional',
        text: 'Tradisi fermentasi kedelai dan singkong warisan leluhur yang diakui dunia sebagai sumber protein nabati bergizi tinggi.',
      },
      {
        title: 'Pembungkus Daun Alami Ramah Lingkungan',
        text: 'Kearifan penggunaan daun pisang, daun jati, atau daun waru yang memberikan aroma khas sekaligus mengurangi limbah plastik.',
      },
      {
        title: 'Diversifikasi Pangan Umbi-umbian Nusantara',
        text: 'Pemberdayaan komoditas pangan lokal non-beras (singkong, ubi jalar, sukun, jagung) untuk ketahanan pangan keluarga.',
      },
    ];
  } else if (topikLower.includes('ui/ux') || topikLower.includes('desain') || topikLower.includes('antarmuka') || topikLower.includes('kemasan') || topikLower.includes('umkm')) {
    primaryKearifan = 'Digitalisasi dan perancangan kemasan bagi produk UMKM sentra kerajinan/kuliner lokal (anyaman bambu, batik, keripik pisang daerah) agar berdaya saing global.';
    kearifanOptions = [
      {
        title: 'Revitalisasi Identitas Visual UMKM Lokal',
        text: 'Membantu pelaku usaha mikro sekitar sekolah merancang logo, antarmuka media sosial, dan kemasan berciri khas etnik nusantara.',
      },
      {
        title: 'Antarmuka Ramah Warga & Lansia',
        text: 'Merancang antarmuka layanan publik desa/posyandu yang inklusif, mudah dibaca, dan sederhana bagi seluruh lapisan masyarakat.',
      },
      {
        title: 'Motif Ornamen Tradisional Daerah',
        text: 'Mengadopsi pola ragam hias daerah setempat (batik pesisiran, ukiran Jepara/Toraja/Dayak) ke dalam elemen visual modern.',
      },
    ];
  } else if (topikLower.includes('sampah') || topikLower.includes('limbah') || topikLower.includes('polusi') || topikLower.includes('plastik')) {
    primaryKearifan = 'Bank Sampah unit RT/RW setempat, gerakan sedekah sampah desa, tradisi komposting dedaunan pekarangan, dan kearifan masyarakat pesisir menjaga kebersihan laut/sungai.';
    kearifanOptions = [
      {
        title: 'Gerakan Bank Sampah Komunitas',
        text: 'Sistem pemilahan sampah anorganik bernilai ekonomi yang dikelola secara gotong royong oleh ibu-ibu PKK dan warga rukun tetangga.',
      },
      {
        title: 'Komposting Daun Luruh Pekarangan',
        text: 'Tradisi menimbun dedaunan kering di lubang tanah (jugangan) yang secara alami menjadi pupuk humus penyubur tanaman buah.',
      },
      {
        title: 'Budaya Bersih Sungai & Pesisir',
        text: 'Kearifan adat bersih kali/sungai desa secara serentak menjelang musim hujan untuk mencegah banjir dan menjaga populasi ikan lokal.',
      },
    ];
  } else if (topikLower.includes('pancasila') || topikLower.includes('norma') || topikLower.includes('musyawarah') || topikLower.includes('sosial')) {
    primaryKearifan = 'Falsafah musyawarah mufakat di balai desa, kearifan rumah adat panggung tahan gempa Nusantara, dan tradisi kesenian tutur daerah yang sarat petuah moral luhur.';
    kearifanOptions = [
      {
        title: 'Musyawarah Mufakat Balai Warga',
        text: 'Tradisi rembuk desa di mana setiap warga diberi kesempatan menyampaikan aspirasi dengan mengedepankan kerukunan bersama.',
      },
      {
        title: 'Tradisi Sambatan & Gotong Royong',
        text: 'Kearifan saling membantu mendirikan rumah tetangga atau membersihkan selokan kampung tanpa mengharapkan upah materi.',
      },
      {
        title: 'Pribahasa & Petuah Bijak Nusantara',
        text: 'Penggalian nilai kearifan lokal seperti "Silih Asih, Silih Asah, Silih Asuh" atau "Bhinneka Tunggal Ika" dalam keseharian siswa.',
      },
    ];
  }

  const bskap = getBskapReference(mataPelajaran);

  return {
    kompetensiAwal: {
      primary: primaryKompetensi,
      options: kompetensiOptions,
    },
    modelPembelajaran: {
      primary: primaryModel,
      options: modelOptions,
    },
    kearifanLokal: {
      primary: primaryKearifan,
      options: kearifanOptions,
    },
    cp: `(Rujukan Resmi: ${bskap.fullName})\nPada akhir ${fase}, peserta didik memiliki kemampuan menganalisis, mengaplikasikan konsep, dan mengevaluasi fenomena terkait ${topik} dalam konteks ${mataPelajaran || 'Mata Pelajaran'} secara kritis, mandiri, dan berkesadaran lingkungan untuk memecahkan permasalahan nyata dalam kehidupan sehari-hari.`,
    elemen: `Pemahaman Konsep & Keterampilan Proses Penyelidikan Kontekstual`,
    tujuanPembelajaran: [
      `Mengidentifikasi dan menganalisis prinsip-prinsip esensial ${topik} melalui pengamatan fenomena nyata dan penyelidikan terbimbing secara cermat.`,
      `Menerapkan konsep ${topik} untuk merumuskan dan memecahkan permasalahan kontekstual di lingkungan sekitar peserta didik secara bernalar kritis dan kreatif.`,
      `Merancang karya/solusi nyata sederhana yang relevan dengan ${topik} dan mengomunikasikannya secara kolaboratif dengan bahasa yang santun dan berkesadaran.`
    ],
    bskapReference: bskap,
  };
}

export function generateCurriculumSuggestionOffline(input: {
  mataPelajaran: string;
  jenjang: string;
  faseKelas: string;
  materi: string;
}): CurriculumSuggestion {
  const smart = getSmartFieldReferences(input);
  const { materi, jenjang } = input;
  const topik = materi.trim() || 'Topik Pembelajaran';

  return {
    cp: smart.cp,
    elemen: smart.elemen,
    tujuanPembelajaran: smart.tujuanPembelajaran,
    kompetensiAwal: smart.kompetensiAwal.primary,
    modelPembelajaran: smart.modelPembelajaran.primary,
    kearifanLokal: smart.kearifanLokal.primary,
    pemahamanBermakna: `Mempelajari ${topik} bukan sekadar menghafal teori, melainkan membekali diri dengan cara berpikir kritis untuk memahami cara kerja dunia, mengapresiasi keagungan alam, dan berkontribusi nyata bagi kelestarian lingkungan serta kemajuan masyarakat.`,
    pertanyaanPemantik: [
      `Bagaimana peristiwa atau fenomena terkait ${topik} memengaruhi kehidupan kita dan orang-orang di sekitar kita setiap hari?`,
      `Apa yang dapat kita pelajari dari lingkungan sekitar untuk memecahkan masalah yang berkaitan dengan ${topik}?`
    ],
    fieldReferences: smart,
    bskapReference: smart.bskapReference,
  };
}

export async function generateFullModul(input: InitialDataInput): Promise<ModulAjar> {
  try {
    const res = await fetch('/api/generate-modul', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.identitas) {
        return {
          id: `modul-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          ...json.data,
          identitas: {
            ...input,
            ...json.data.identitas,
          }
        };
      }
    }
  } catch (err) {
    console.warn('API call failed, generating via expert curriculum generator:', err);
  }

  // Fallback high-fidelity Deep Learning 8-3-3-4 generation
  return generateFullModulOffline(input);
}

function generateFullModulOffline(input: InitialDataInput): ModulAjar {
  const mapel = input.mataPelajaran || 'Mata Pelajaran';
  const topik = input.materi || 'Materi Pokok';
  const fase = input.faseKelas || 'Fase D';
  const sekolah = input.sekolah || 'Satuan Pendidikan';
  const guru = input.namaGuru || 'Guru Mata Pelajaran';
  const kearifan = input.kearifanLokal || 'Lingkungan dan kearifan masyarakat lokal sekitar';
  const model = input.modelPembelajaran || 'Problem Based Learning (PBL)';
  const modelSyntaxInfo = getModelSyntaxInfo(model);
  const intiSkenario = generateIntiSkenarioByModel(model, topik, kearifan);

  const cp = input.capaianPembelajaran || `Peserta didik mampu menganalisis, mengaplikasikan konsep, dan mengevaluasi fenomena terkait ${topik} dalam konteks ${mapel} pada ${fase} secara kritis, kolaboratif, dan solutif.`;

  return {
    id: `modul-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    identitas: {
      ...input,
      sekolah,
      namaGuru: guru,
      mataPelajaran: mapel,
      materi: topik,
      faseKelas: fase,
      jumlahPertemuan: input.jumlahPertemuan || '1 Pertemuan',
      modelPembelajaran: model,
      kearifanLokal: kearifan,
      capaianPembelajaran: cp,
    },
    capaianPembelajaran: cp,
    tujuanPembelajaran: [
      `Menganalisis prinsip-prinsip esensial dari ${topik} melalui pengamatan fenomena nyata dan penyelidikan terbimbing secara mendalam.`,
      `Mengaplikasikan konsep ${topik} untuk merumuskan dan menyelesaikan permasalahan kontekstual di lingkungan peserta didik secara bernalar kritis dan kreatif.`,
      `Mengevaluasi hasil karya/solusi yang dibuat serta merefleksikan proses belajar dan komitmen tindak lanjut secara berkesadaran.`
    ],
    kompetensiAwal: input.kompetensiAwal || `Peserta didik telah memiliki pengetahuan dasar tentang fenomena sekitar yang melandasi topik ${topik} dan mampu bekerja sama dalam kelompok.`,
    karakteristikSiswa: input.karakteristikSiswa || `Peserta didik memiliki gaya belajar bervariasi (visual, auditori, kinestetik) dan memerlukan stimulasi masalah kontekstual yang dekat dengan kehidupan mereka.`,
    kebutuhanBelajar: `Diferensiasi pembelajaran melalui variasi media dan pendampingan bertingkat (scaffolding) untuk mengakomodasi kelompok perintis, cakap, dan mahir.`,
    pemahamanBermakna: `Pemahaman terhadap ${topik} memberikan peserta didik kemampuan melihat keteraturan alam dan kehidupan, memecahkan masalah praktis, serta bertanggung jawab terhadap kelestarian lingkungan dan masyarakat sekitar.`,
    pertanyaanPemantik: [
      `Pernahkah kalian menjumpai peristiwa terkait ${topik} di sekitar rumah atau sekolah? Apa yang membuat hal itu terjadi?`,
      `Bagaimana jika kita menggunakan pemahaman tentang ${topik} ini untuk menyelesaikan masalah yang dihadapi masyarakat kita saat ini?`
    ],
    pertanyaanEsensial: [
      `Mengapa konsep ${topik} sangat penting dipelajari untuk masa depan kita dan keberlanjutan lingkungan hidup?`,
      `Bagaimana cara terbaik menerapkan ilmu tentang ${topik} agar bermanfaat bagi orang banyak?`
    ],
    materiEsensial: [
      {
        subtopik: `Konsep Dasar dan Karakteristik ${topik}`,
        uraian: `Membahas hakikat, definisi operasional, dan prinsip dasar yang mengatur ${topik} dalam kehidupan sehari-hari.`
      },
      {
        subtopik: `Mekanisme dan Hubungan Sebab-Akibat`,
        uraian: `Analisis cara kerja fenomena ${topik}, faktor-faktor yang memengaruhi, serta dampaknya terhadap lingkungan sekitar.`
      },
      {
        subtopik: `Aplikasi Nyata dan Solusi Kontekstual`,
        uraian: `Pemanfaatan prinsip ${topik} dalam rekayasa solusi, studi kasus lokal (${kearifan}), dan mitigasi risiko masalah di masa depan.`
      }
    ],
    dimensiProfilLulusan: [
      {
        dimensi: 'Keimanan dan Ketakwaan kepada Tuhan YME',
        keterkaitan: `Menginsafi kebesaran Sang Pencipta melalui keteraturan dan keajaiban ilmu ${mapel} pada topik ${topik}.`,
        aktivitas: `Berdoa dengan khusyuk di awal dan akhir kegiatan, serta merawat sarana belajar sebagai wujud rasa syukur.`,
        indikator: `Menunjukkan sikap takjub, bersyukur, dan menjaga amanah kebaikan selama kegiatan belajar.`
      },
      {
        dimensi: 'Penalaran Kritis',
        keterkaitan: `Menganalisis data, membedah fakta vs opini, dan mengevaluasi efektivitas solusi atas masalah ${topik}.`,
        aktivitas: `Memecahkan studi kasus kontekstual pada LKPD dan menguji argumen hipotesis secara ilmiah.`,
        indikator: `Mampu mengajukan pertanyaan mendalam, mengidentifikasi bias, dan menarik kesimpulan berdasarkan data yang valid.`
      },
      {
        dimensi: 'Kreativitas',
        keterkaitan: `Menghasilkan gagasan orisinal, model representasi visual, atau produk karya solusi ${topik}.`,
        aktivitas: `Merancang prototipe, poster infografis, atau skema alur pemecahan masalah dengan ide-ide baru.`,
        indikator: `Menghasilkan gagasan atau karya yang fleksibel, orisinal, serta memiliki nilai guna praktis.`
      },
      {
        dimensi: 'Kolaborasi',
        keterkaitan: `Bekerja sama dalam regu belajar untuk mengumpulkan informasi, berdiskusi, dan menuntaskan tugas bersama.`,
        aktivitas: `Pembagian peran aktif dalam diskusi kelompok, saling mendukung, dan mendengarkan pendapat rekan tim.`,
        indikator: `Menunjukkan sikap terbuka, saling menghargai, dan berkontribusi seimbang dalam kelompok.`
      },
      {
        dimensi: 'Kemandirian',
        keterkaitan: `Mengelola waktu belajar, memantau kemajuan diri, dan bertanggung jawab atas hasil kerja individu.`,
        aktivitas: `Menyelesaikan target tahapan belajar pada lembar kerja dan mengisi rubrik penilaian diri sendiri.`,
        indikator: `Mampu memprakarsai tindakan belajar tanpa bergantung sepenuhnya pada perintah guru.`
      },
      {
        dimensi: 'Komunikasi',
        keterkaitan: `Menyampaikan gagasan, hasil penyelidikan, dan tanggapan dengan bahasa yang santun, runtut, dan jelas.`,
        aktivitas: `Mempresentasikan hasil kerja kelompok dan memberikan umpan balik konstruktif pada kelompok lain.`,
        indikator: `Mengartikulasikan pemikiran secara sistematis dan menjadi pendengar yang empatik.`
      }
    ],
    prinsipDeepLearning: {
      berkesadaran: {
        deskripsi: `Peserta didik mengetahui dengan jelas tujuan belajar materi ${topik}, memahami mengapa materi ini esensial, menyadari proses berpikirnya, dan memantau kemajuan diri.`,
        penerapan: `Guru membuka kelas dengan transparan mengenai kriteria sukses (learning intentions & success criteria) dan memberi waktu hening untuk menetapkan target personal siswa.`
      },
      bermakna: {
        deskripsi: `Pembelajaran berakar pada kehidupan nyata, mengaitkan dengan pengalaman awal siswa, memanfaatkan konteks ${kearifan}, dan memberi ruang aplikasi langsung.`,
        penerapan: `Studi kasus dan contoh yang diangkat bersumber dari lingkungan terdekat yang dikenali peserta didik sehingga konsep ${topik} tidak abstrak melainkan hidup.`
      },
      menggembirakan: {
        deskripsi: `Menciptakan iklim kelas yang aman secara psikologis, memicu antusiasme, memberikan tantangan yang seimbang dengan kemampuan (zone of proximal development), dan kaya apresiasi.`,
        penerapan: `Menggunakan strategi interaktif, permainan edukatif, diskusi dinamis, dan budaya saling mengapresiasi keberanian mencoba tanpa takut salah.`
      }
    },
    pengalamanBelajar: {
      memahami: `Peserta didik mengamati fenomena pemantik, membaca materi stimulus, mengeksplorasi data awal, dan mengidentifikasi konsep esensial terkait ${topik}.`,
      mengaplikasi: `Peserta didik menerapkan konsep dalam memecahkan masalah kontekstual, melakukan penyelidikan/proyek bersama tim, dan menghasilkan karya nyata.`,
      merefleksi: `Peserta didik mengevaluasi proses berpikir, mengidentifikasi kekuatan dan kendala belajar, merumuskan kesimpulan bermakna, dan merencanakan tindak lanjut.`
    },
    kerangkaPembelajaran: {
      praktikPedagogis: {
        pendekatan: `Pembelajaran Berpusat pada Peserta Didik (Student-Centered) & Deep Learning`,
        model: `${model}`,
        sintakModel: modelSyntaxInfo.sintakList.map((s) => `Sintak ${s.nomor}: ${s.nama}`),
        metode: `Eksplorasi Terbimbing, Diskusi Kolaboratif, Pemecahan Masalah, Presentasi Interaktif`,
        strategi: `Scaffolding bertingkat dan diferensiasi berbasis kesiapan belajar`,
        diferensiasi: `Penyediaan bantuan bertahap bagi kelompok perintis dan pemberian tantangan analisis tingkat tinggi bagi kelompok mahir.`
      },
      kemitraanPembelajaran: {
        peranGuru: `Fasilitator, perancang pengalaman belajar, pemantik nalar kritis, dan mitra refleksi.`,
        peranSiswa: `Pelaku utama belajar yang aktif mengeksplorasi, berkreasi, dan mengambil keputusan.`,
        temanSebaya: `Mitra kolaborasi dan pemberi umpan balik konstruktif dalam suasana saling mendukung.`,
        orangTuaMasyarakat: `Mitra penguat pengalaman kontekstual di rumah dan lingkungan masyarakat sekitar (${kearifan}).`
      },
      lingkunganPembelajaran: {
        ruangKelas: `Pengaturan meja fleksibel untuk memfasilitasi kerja kelompok, diskusi, dan pameran karya.`,
        lingkunganSekitar: `Pemanfaatan lingkungan sekolah dan masyarakat sebagai laboratorium nyata observasi fenomena.`,
        ruangDigital: `Pemanfaatan sumber belajar digital dan media interaktif untuk memperluas cakrawala berpikir.`
      },
      pemanfaatanDigital: {
        opsiOnline: `Pencarian referensi digital, presentasi multimedia interaktif, dan kuis refleksi daring.`,
        opsiOffline: `Pemanfaatan LKPD cetak kontekstual, media konkret manipulatif, kartu konsep, dan papan pajang karya fisik.`
      }
    },
    skenarioPembelajaran: {
      pendahuluan: [
        {
          fase: `1. Pembukaan & Pemeriksaan Kesiapan Belajar (Berkesadaran)`,
          kegiatan: `Guru menyapa peserta didik dengan hangat, memandu doa bersama, memeriksa kehadiran, dan mengajak siswa melakukan latihan fokus sejenak (teknik pernapasan sadar).`,
          waktu: `5 menit`
        },
        {
          fase: `2. Apersepsi & Pertanyaan Pemantik (Bermakna)`,
          kegiatan: `Guru mengaitkan materi sebelumnya dengan topik hari ini (${topik}) melalui penyajian gambar/video/cerita fenomena kontekstual di lingkungan sekitar. Guru melontarkan pertanyaan pemantik untuk memicu rasa ingin tahu.`,
          waktu: `7 menit`
        },
        {
          fase: `3. Penyampaian Tujuan & Motivasi (Menggembirakan)`,
          kegiatan: `Guru menyampaikan tujuan pembelajaran, manfaat mempelajari ${topik} dalam kehidupan nyata, garis besar alur kegiatan, dan membentuk kelompok kolaboratif secara adil.`,
          waktu: `3 menit`
        }
      ],
      inti: intiSkenario,
      penutup: [
        {
          kegiatan: `Guru bersama siswa menyimpulkan keseluruhan pembelajaran hari ini. Guru memberikan apresiasi menyeluruh atas keterlibatan aktif peserta didik, menyampaikan rencana materi pertemuan berikutnya, serta menutup dengan doa dan salam.`,
          waktu: `5 menit`
        }
      ]
    },
    lkpd: {
      judul: `Lembar Kerja Peserta Didik (LKPD): Eksplorasi Mendalam ${topik}`,
      tujuan: `1. Menemukan konsep esensial dan pola interaksi dalam materi ${topik}.\n2. Menerapkan konsep untuk memecahkan studi kasus kontekstual di lingkungan sekitar.\n3. Menyusun kesimpulan dan refleksi diri mengenai proses belajar yang telah dialami.`,
      petunjuk: `1. Bacalah basmalah / berdoalah sebelum memulai kegiatan.\n2. Tuliskan identitas anggota kelompokmu pada kolom yang disediakan.\n3. Cermati stimulus konteks dan diskusikan setiap langkah kerja bersama rekan kelompokmu.\n4. Tanyakan kepada guru apabila terdapat instruksi yang belum jelas.`,
      stimulusKonteks: `Dalam kehidupan sehari-hari, kita tidak pernah lepas dari pengaruh ${topik}. Banyak tantangan di sekitar kita (${kearifan}) yang membutuhkan pemahaman mendalam tentang prinsip-prinsip ini agar tercipta solusi yang berkelanjutan dan bermanfaat bagi masyarakat luas.`,
      pertanyaanPemantik: `Bagaimana kita dapat membuktikan bahwa konsep ${topik} benar-benar bekerja dan memberi dampak nyata di lingkungan tempat tinggal kita?`,
      langkahKegiatan: [
        `Diskusikan bersama kelompok mengenai fenomena ${topik} yang tertera pada stimulus di atas.`,
        `Identifikasi minimal 3 fakta penting dan 2 pertanyaan mendasar yang muncul dalam pikiran kalian.`,
        `Kumpulkan data dan informasi pendukung melalui bahan bacaan atau pengamatan lingkungan.`,
        `Tuangkan hasil temuan kalian ke dalam Tabel Analisis di bawah ini.`,
        `Diskusikan solusi atas pertanyaan analisis kasus dan rumuskan simpulan bersama.`
      ],
      tabelPengamatan: {
        judul: `Tabel Analisis dan Data Pengamatan ${topik}`,
        kolom: [`No`, `Aspek yang Diamati`, `Kondisi Fakta Nyata`, `Faktor Penyebab`, `Dampak yang Ditimbulkan`],
        barisContoh: [
          [`1`, `Kondisi Eksisting di Lingkungan`, `Terjadi ketidaksesuaian dengan prinsip ideal`, `Kurangnya kesadaran dan pemahaman konsep`, `Efisiensi menurun dan terjadi pemborosan`],
          [`2`, `Upaya Perbaikan yang Pernah Dilakukan`, `Bersifat sementara dan belum menyentuh akar masalah`, `Pendekatan parsial tanpa kolaborasi bersama`, `Masalah berulang kembali di kemudian hari`],
          [`3`, `Peluang Solusi Berkelanjutan`, `Menerapkan konsep ${topik} secara utuh`, `Inisiatif kelompok pemuda/pelajar`, `Tercipta lingkungan yang lebih sehat dan harmonis`]
        ]
      },
      pertanyaanAnalisis: [
        `Berdasarkan data pada tabel di atas, apa hubungan mendasar antara faktor penyebab dengan dampak yang terjadi? Jelaskan secara logis!`,
        `Bagaimana konsep esensial dari ${topik} dapat dijadikan landasan ilmiah untuk merancang solusi yang efektif atas masalah tersebut?`,
        `Tantangan apa saja yang mungkin dihadapi saat menerapkan solusi tersebut di masyarakat nyata, dan bagaimana cara kalian mengatasinya?`
      ],
      tugasPenerapan: `Rancanglah sebuah rencana aksi nyata atau produk sederhana (skema alur / infografis / prototipe karya) yang mendemonstrasikan penerapan ${topik} sebagai solusi di lingkungan sekolah atau tempat tinggal kalian!`,
      kesimpulan: `Tuliskan simpulan kelompokmu mengenai prinsip utama yang kalian pelajari hari ini dan bagaimana ilmu ini mengubah cara pandang kalian terhadap lingkungan sekitar:`,
      refleksiSiswa: `Lingkari pilihan perasaanmu: [ Sangat Puas & Paham ]  [ Cukup Paham ]  [ Masih Bingung ]\nSatu hal paling berharga yang kupelajari hari ini adalah: ................................................................`
    },
    asesmen: {
      diagnostik: {
        tujuan: `Mengidentifikasi kompetensi awal, kesiapan belajar (readiness), dan minat peserta didik terhadap materi ${topik}.`,
        teknik: `Pertanyaan apersepsi lisan, survei minat singkat, atau kuis pemetaan konsep awal.`,
        instrumen: `Daftar 3 pertanyaan pemantik esensial dan lembar observasi respons awal siswa.`,
        tindakLanjut: `Pengelompokan heterogen fleksibel dan penyiapan bahan belajar bertingkat sesuai kesiapan siswa.`
      },
      formatif: {
        tujuan: `Memantau perkembangan penalaran kritis, kolaborasi, dan pemahaman konsep selama proses pembelajaran berlangsung.`,
        teknik: `Observasi kinerja diskusi kelompok, penilaian lembar kerja (LKPD), dan umpan balik lisan langsung.`,
        instrumen: `Lembar ceklis observasi dimensi profil lulusan dan catatan anekdotal guru selama pendampingan.`,
        tindakLanjut: `Pemberian bimbingan langsung (scaffolding) bagi kelompok yang mengalami kesulitan dan pemberian pertanyaan pengayaan bagi kelompok yang bergerak cepat.`
      },
      sumatif: {
        tujuan: `Mengukur pencapaian Tujuan Pembelajaran secara komprehensif pada akhir siklus pembelajaran.`,
        teknik: `Penilaian Produk / Portofolio (Hasil LKPD & Solusi Karya) serta Tes Tertulis Penalaran Kontekstual.`,
        instrumen: `Rubrik penilaian autentik produk skala 1-4 dan soal uraian berbasis masalah nyata (HOTS).`,
        kriteriaKetuntasan: `Peserta didik dinyatakan mencapai KKTP apabila mencapai minimal kategori "Cakap" (Skor 3 dari skala 1-4) pada seluruh kriteria ketercapaian esensial.`
      }
    },
    rubrikPenilaian: [
      {
        aspek: `Pemahaman Konsep & Penalaran Kritis`,
        skor4: `Sangat Mahir: Menguasai konsep ${topik} secara mendalam, mampu mengidentifikasi akar masalah dengan tepat, menganalisis data secara tajam, dan menyajikan argumen berbasis bukti yang kokoh.`,
        skor3: `Cakap: Memahami konsep ${topik} dengan baik, mampu menganalisis hubungan sebab-akibat, dan menyusun argumen yang logis.`,
        skor2: `Berkembang: Memahami konsep dasar namun analisis sebab-akibat masih sederhana dan membutuhkan arahan untuk menghubungkan konsep dengan fakta.`,
        skor1: `Perlu Bimbingan: Mengalami kesulitan dalam menjelaskan konsep esensial dan belum mampu menganalisis masalah tanpa bimbingan intensif.`
      },
      {
        aspek: `Kolaborasi & Partisipasi Aktif`,
        skor4: `Sangat Mahir: Menunjukkan kepemimpinan positif, membagi peran secara adil, mendengarkan aktif setiap pendapat anggota, dan proaktif membantu menyelesaikan tugas tim.`,
        skor3: `Cakap: Terlibat aktif dalam kerja kelompok, menjalankan peran dengan penuh tanggung jawab, dan bekerja sama dengan baik bersama rekan kerja.`,
        skor2: `Berkembang: Ikut serta dalam diskusi kelompok namun partisipasinya masih pasif atau membutuhkan dorongan sesekali dari rekan atau guru.`,
        skor1: `Perlu Bimbingan: Cenderung pasif, menarik diri dari kerja kelompok, atau mendominasi tanpa menghargai pendapat orang lain.`
      },
      {
        aspek: `Kreativitas & Kualitas Solusi Karya`,
        skor4: `Sangat Mahir: Solusi atau karya yang dihasilkan sangat orisinal, relevan secara kontekstual, estetis, serta memiliki kelayakan implementasi yang tinggi.`,
        skor3: `Cakap: Menghasilkan solusi atau karya yang runtut, memenuhi seluruh kriteria fungsional, dan dapat diimplementasikan dengan baik.`,
        skor2: `Berkembang: Karya yang dihasilkan cukup baik namun masih meniru contoh yang sudah ada dan kurang memperlihatkan eksplorasi gagasan baru.`,
        skor1: `Perlu Bimbingan: Karya belum selesai sesuai batas waktu dan belum memenuhi kriteria fungsional dasar yang diharapkan.`
      },
      {
        aspek: `Komunikasi Ilmiah & Presentasi`,
        skor4: `Sangat Mahir: Menyampaikan gagasan dengan bahasa yang sangat runtut, santun, artikulatif, menggunakan media visual yang efektif, serta sigap menanggapi pertanyaan.`,
        skor3: `Cakap: Menyampaikan presentasi dengan jelas, terstruktur, percaya diri, dan mampu menjawab pertanyaan inti dari audiens.`,
        skor2: `Berkembang: Menyampaikan materi namun masih terpaku membaca teks presentasi dan kurang melakukan kontak mata dengan audiens.`,
        skor1: `Perlu Bimbingan: Mengalami kesulitan dalam mengartikulasikan ide dan belum siap melakukan presentasi di hadapan kelas.`
      }
    ],
    diferensiasi: {
      konten: {
        bimbingan: `Disediakan ringkasan materi bergambar dengan panduan kosakata kunci dan diagram alur terarah.`,
        sedang: `Disediakan bahan ajar kontekstual standar dengan studi kasus lingkungan sekitar.`,
        pengayaan: `Disediakan artikel ilmiah populer atau studi kasus kompleks multi-variabel untuk ditelaah secara kritis.`
      },
      proses: {
        bimbingan: `Guru memberikan pendampingan intensif (scaffolding bertahap) dan pemodelan langkah kerja secara langsung.`,
        sedang: `Peserta didik bekerja dalam kelompok kolaboratif dengan pemantauan berkala dan konsultasi mandiri saat menghadapi kendala.`,
        pengayaan: `Peserta didik memimpin penyelidikan inkuiri secara independen dan dapat berperan sebagai tutor sebaya bagi kelompok lain.`
      },
      produk: {
        bimbingan: `Menyajikan hasil analisis dalam bentuk format tabel isian terstruktur atau diagram visual sederhana.`,
        sedang: `Menyajikan laporan hasil telaah dalam bentuk poster infografis atau ringkasan presentasi digital.`,
        pengayaan: `Menyajikan proposal solusi komprehensif, video edukasi kontekstual, atau prototipe karya nyata yang siap dipamerkan.`
      }
    },
    remedialDanPengayaan: {
      kriteriaRemedial: `Peserta didik yang belum mencapai batas minimal predikat Cakap (Skor < 3) pada indikator pemahaman konsep inti ${topik}.`,
      programRemedial: `Bimbingan khusus secara individual atau kelompok kecil melalui penjelasan ulang konsep dengan analogi konkret, dilanjutkan dengan pengerjaan latihan terbimbing hingga konsep esensial terkuasai.`,
      kriteriaPengayaan: `Peserta didik yang telah mencapai predikat Sangat Mahir (Skor 4) pada seluruh indikator ketercapaian tujuan pembelajaran.`,
      programPengayaan: `Pemberian proyek eksploratif lanjutan, misalnya merancang modul aksi advokasi lingkungan, menguji hipotesis baru, atau mendalami aplikasi teknologi modern terkait ${topik}.`
    },
    refleksi: {
      guru: [
        `Apakah skenario pembelajaran yang dirancang berhasil membangkitkan rasa ingin tahu dan keterlibatan aktif seluruh peserta didik?`,
        `Bagian mana dari aktivitas yang paling menantang bagi siswa, dan penyesuaian apa yang perlu saya lakukan pada pertemuan berikutnya?`,
        `Apakah diferensiasi pembelajaran yang diterapkan sudah tepat sasaran dalam memfasilitasi keberagaman kebutuhan belajar siswa?`
      ],
      siswa: [
        `Apa konsep atau wawasan paling bermakna yang saya temukan dan pahami dari pembelajaran hari ini?`,
        `Pada bagian mana saya merasa paling tertantang, dan strategi apa yang saya gunakan untuk mengatasi kesulitan tersebut?`,
        `Bagaimana saya akan menerapkan pemahaman baru ini dalam tindakan nyata di kehidupan sehari-hari?`
      ]
    },
    produkAkhir: `Laporan Hasil Penyelidikan Kontekstual ${topik}, Portofolio Lembar Kerja Peserta Didik (LKPD), serta Karya/Prototipe Solusi Berkelanjutan.`,
    sumberBelajar: [
      `Buku Panduan Guru & Siswa ${mapel} ${fase} Kemendikbudristek Kurikulum Merdeka.`,
      `Lingkungan sekolah dan sumber kearifan lokal sekitar (${kearifan}).`,
      `Bahan bacaan digital dan video pembelajaran interaktif terkait materi ${topik}.`,
      `Alat dan bahan kontekstual yang tersedia di satuan pendidikan.`
    ]
  };
}
