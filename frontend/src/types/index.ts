export interface LoginResponse {
    status: boolean;
    message: string;
    data: {
      token: string;
    };
  }
  
  export interface Users {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    created_at: string;
    updated_at: string;
  }

  export interface Siswa {
    id: number;
    user_id: number;
    nama: string;
    nis: string;
    kelas: string;
    jurusan: string;
    alamat: string;
    telepon: string;
    created_at: string;
    updated_at: string;
    user?: Users | null;
  }

  export interface Guru {
    id: number;
    user_id: number;
    nip: string;
    nama: string;
    alamat: string;
    telepon: string;
    created_at: string;
    updated_at: string;
    user?: Users | null;
  }
  
  export interface Dudi {
    id: number;
    nama_perusahaan: string;
    alamat: string;
    telepon: string;
    email: string;
    penanggung_jawab: string;
    created_at: string;
    updated_at: string;
    user?: Users | null;
    siswaMagang?: number;
  }
  
  export interface Magang {
    id: number;
    user_id: number;
    dudi_id: number;
    guru_id: number;
    status: string;
    periode_mulai: string;
    periode_selesai: string;
    created_at: string;
    updated_at: string;
    user?: Users | null;
    dudi?: Dudi | null;
  }
  
  export interface Logbook {
    id: number;
    magang_id: number;
    tanggal: string;
    kegiatan: string;
    kendala: string;
    foto: string;
    status_verifikasi: 'pending' | 'disetujui' | 'ditolak';
    catatan_guru: string;
    catatan_dudi: string;
    created_at: string;
    updated_at: string;
    magang?: Magang | null;
  }