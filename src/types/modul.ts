export type Jenjang = 'SD' | 'SMP' | 'SMA' | 'SMK';

export type Fase = 'Fase A (Kelas 1-2)' | 'Fase B (Kelas 3-4)' | 'Fase C (Kelas 5-6)' | 'Fase D (Kelas 7-9)' | 'Fase E (Kelas 10)' | 'Fase F (Kelas 11-12)';

export interface InitialDataInput {
  sekolah: string;
  namaGuru: string;
  mataPelajaran: string;
  jenjang: Jenjang;
  faseKelas: string;
  semester: string;
  tahunPelajaran: string;
  materi: string;
  alokasiWaktu: string;
  jumlahPertemuan: string;
  jumlahSiswa: string;
  karakteristikSiswa: string;
  kompetensiAwal: string;
  sarpras: string;
  modelPembelajaran: string;
  kearifanLokal: string;
  capaianPembelajaran: string;
  catatanTambahan?: string;
}

export interface DimensiProfilItem {
  dimensi: string;
  keterkaitan: string;
  aktivitas: string;
  indikator: string;
}

export interface PrinsipItem {
  deskripsi: string;
  penerapan: string;
}

export interface PrinsipDeepLearning {
  berkesadaran: PrinsipItem;
  bermakna: PrinsipItem;
  menggembirakan: PrinsipItem;
}

export interface PengalamanBelajar {
  memahami: string;
  mengaplikasi: string;
  merefleksi: string;
}

export interface KerangkaPembelajaran {
  praktikPedagogis: {
    pendekatan: string;
    model: string;
    sintakModel?: string[];
    metode: string;
    strategi: string;
    diferensiasi: string;
  };
  kemitraanPembelajaran: {
    peranGuru: string;
    peranSiswa: string;
    temanSebaya: string;
    orangTuaMasyarakat: string;
  };
  lingkunganPembelajaran: {
    ruangKelas: string;
    lingkunganSekitar: string;
    ruangDigital: string;
  };
  pemanfaatanDigital: {
    opsiOnline: string;
    opsiOffline: string;
  };
}

export interface SkenarioLangkah {
  sintak?: string;
  sintakModel?: string;
  fase?: string;
  aktivitas?: string;
  kegiatan?: string;
  peranGuru?: string;
  peranSiswa?: string;
  waktu: string;
  fokusPrinsip?: string;
}

export interface SkenarioPembelajaran {
  pendahuluan: SkenarioLangkah[];
  inti: {
    tahap1Memahami: SkenarioLangkah[];
    tahap2Mengaplikasi: SkenarioLangkah[];
    tahap3Merefleksi: SkenarioLangkah[];
  };
  penutup: SkenarioLangkah[];
}

export interface LKPDData {
  judul: string;
  tujuan: string;
  petunjuk: string;
  stimulusKonteks: string;
  pertanyaanPemantik: string;
  langkahKegiatan: string[];
  tabelPengamatan?: {
    judul: string;
    kolom: string[];
    barisContoh: string[][];
  };
  pertanyaanAnalisis: string[];
  tugasPenerapan: string;
  kesimpulan: string;
  refleksiSiswa: string;
}

export interface AsesmenItem {
  tujuan: string;
  teknik: string;
  instrumen: string;
  tindakLanjut?: string;
  kriteriaKetuntasan?: string;
}

export interface AsesmenData {
  diagnostik: AsesmenItem;
  formatif: AsesmenItem;
  sumatif: AsesmenItem;
}

export interface RubrikItem {
  aspek: string;
  skor4: string; // Sangat Mahir
  skor3: string; // Cakap
  skor2: string; // Berkembang
  skor1: string; // Perlu Bimbingan
}

export interface DiferensiasiData {
  konten: {
    bimbingan: string;
    sedang: string;
    pengayaan: string;
  };
  proses: {
    bimbingan: string;
    sedang: string;
    pengayaan: string;
  };
  produk: {
    bimbingan: string;
    sedang: string;
    pengayaan: string;
  };
}

export interface RemedialPengayaanData {
  kriteriaRemedial: string;
  programRemedial: string;
  kriteriaPengayaan: string;
  programPengayaan: string;
}

export interface RefleksiData {
  guru: string[];
  siswa: string[];
}

export interface MateriEsensialItem {
  subtopik: string;
  uraian: string;
}

export interface ModulAjar {
  id: string;
  createdAt: string;
  identitas: InitialDataInput;
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  kompetensiAwal: string;
  karakteristikSiswa: string;
  kebutuhanBelajar: string;
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  pertanyaanEsensial: string[];
  materiEsensial: MateriEsensialItem[];
  dimensiProfilLulusan: DimensiProfilItem[];
  prinsipDeepLearning: PrinsipDeepLearning;
  pengalamanBelajar: PengalamanBelajar;
  kerangkaPembelajaran: KerangkaPembelajaran;
  skenarioPembelajaran: SkenarioPembelajaran;
  lkpd: LKPDData;
  asesmen: AsesmenData;
  rubrikPenilaian: RubrikItem[];
  diferensiasi: DiferensiasiData;
  remedialDanPengayaan: RemedialPengayaanData;
  refleksi: RefleksiData;
  produkAkhir: string;
  sumberBelajar: string[];
}
