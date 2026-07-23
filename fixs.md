PERINTAH FINAL & MUTLAK — LOGIC GATES SIMULATOR
BACA SELURUH DOKUMEN INI SEBELUM MENULIS SATU BARIS KODE PUN. INI BUKAN SARAN, INI ATURAN WAJIB.

======================================================================
ATURAN NOL — YANG PALING PENTING, BACA DULUAN
======================================================================
TUGAS INI BUKAN "REDESIGN" ATAU "BUAT VERSI BARU YANG LEBIH BAGUS".
TUGAS INI ADALAH: MEREPRODUKSI ULANG TAMPILAN YANG SUDAH ADA, SEPERSIS MUNGKIN, LALU HANYA MEMPERBAIKI BUG YANG DISEBUTKAN DI BAGIAN 1.

DILARANG KERAS (PELANGGARAN FATAL jika dilakukan):
- DILARANG menambahkan teks/label/subtitle apapun yang tidak ada di spesifikasi ini (contoh pelanggaran yang SUDAH TERJADI dan TIDAK BOLEH TERULANG: menambahkan label "INTERACTIVE TRUTH TABLES", menambahkan subtitle "Toggle each input and watch...").
- DILARANG mengubah judul halaman. Judul WAJIB PERSIS: "7 Basic Logic Gates". Bukan "Basic Logic Gates", bukan judul lain, TIDAK ADA PENGURANGAN ATAU PENAMBAHAN KATA.
- DILARANG menambahkan background pattern/grid/dot/texture apapun pada card. Background card WAJIB polos gelap solid.
- DILARANG menambahkan ornamen sudut (corner accent, corner triangle, corner ribbon, dsb) di card manapun.
- DILARANG mengubah format header card. Format header WAJIB: "<nomor> ● <Nama Gate>" (nomor lalu bulatan kecil berwarna lalu nama). CONTOH BENAR: "02 ● NOT Gate". CONTOH SALAH (JANGAN DIBUAT): "02 / NOT" dengan gaya monospace/slash.
- DILARANG menambahkan baris formula matematis/boolean (seperti "OUT = A", "OUT = NOT (A AND B)") kecuali sudah ada di spesifikasi asli. Baris yang ditampilkan HANYA: ringkasan status ("A=0 -> OUT=0") dan satu kalimat deskripsi.
- DILARANG mengubah font, ukuran judul, spacing halaman, atau elemen dekoratif lain yang tidak disebutkan di dokumen ini.
- Jika ada keraguan "boleh ditambah atau tidak" — JAWABANNYA SELALU TIDAK BOLEH. Kalau tidak tertulis di dokumen ini, JANGAN dibuat.

======================================================================
BAGIAN 1 — BUG YANG SUDAH DILAPORKAN 2X TAPI BELUM DIPERBAIKI (PRIORITAS UTAMA)
======================================================================

BUG A — Wire terputus jadi garis titik-titik (dashed)
   Kondisi saat ini (SALAH, dan INI SUDAH DILAPORKAN SEBELUMNYA, HARUS DIPERBAIKI SEKARANG): antara simbol gate dan node OUT muncul garis putus-putus (dotted/dashed line) berwarna.
   YANG BENAR: wire dari gate ke OUT (dan wire dari input ke gate) HARUS berupa SATU garis lurus SOLID (bukan dashed, bukan dotted, bukan putus-putus). Gunakan style border/stroke solid biasa, BUKAN border-style: dashed/dotted.
   CEK ULANG: sebelum submit, screenshot hasilnya dan pastikan TIDAK ADA garis putus-putus di manapun dalam circuit diagram. Jika masih ada garis titik-titik, INI MASIH SALAH dan harus diperbaiki lagi.

BUG B — Bentuk gate AND dan NAND dobel/bertumpuk
   Kondisi saat ini (SALAH): pada AND Gate dan NAND Gate, muncul DUA bentuk berbeda bertumpuk/berurutan (semacam bentuk oval/kapsul memanjang, DIIKUTI bentuk D terpisah).
   YANG BENAR: AND Gate dan NAND Gate HANYA memiliki SATU bentuk gate: bentuk "D" tunggal (sisi kiri lurus datar, sisi kanan setengah lingkaran membulat). TIDAK ADA bentuk kedua/tambahan sebelum atau sesudahnya. Hapus elemen shape duplikat apapun.

======================================================================
BAGIAN 2 — SPESIFIKASI LENGKAP TAMPILAN (WAJIB DIIKUTI PERSIS)
======================================================================

2.1 HALAMAN
- Judul halaman: "7 Basic Logic Gates" (teks putih/hijau terang, besar, tanpa eyebrow label, tanpa subtitle tambahan apapun).
- Boleh ada tombol "Back" kecil di pojok kiri atas (sudah ada sebelumnya, boleh dipertahankan).
- Background halaman: gelap polos, TANPA pola grid/dot/texture apapun.

2.2 GRID CARD
- Total 8 card (1 Basic Wire + 7 gate: NOT, AND, NAND, OR, NOR, XOR, XNOR).
- Urutan tetap: 01 Basic Wire, 02 NOT, 03 AND, 04 NAND, 05 OR, 06 NOR, 07 XOR, 08 XNOR.
- Desktop (layar lebar): grid 2 kolom.
- Mobile (layar sempit <= ~640px): grid 1 kolom, card full width, disusun ke bawah. (Catatan: bagian ini sudah mulai bekerja dengan benar di versi terakhir, PERTAHANKAN, jangan dirusak lagi.)

2.3 SETIAP CARD, urutan dari atas ke bawah — HANYA elemen ini, TIDAK LEBIH:
   1) Header: "<nomor> ● <Nama Gate>" (nomor abu-abu kecil, bulatan warna tema, nama gate putih tebal). TIDAK ADA elemen lain di baris header.
   2) Diagram sirkuit:
      - Node input (kotak sudut membulat, label A di pojok kiri atas, lingkaran isi "0"/"1" di tengah, warna sesuai status ON/OFF).
      - Wire solid (BUKAN dashed — lihat Bug A) dari input ke gate.
      - Simbol gate (SATU bentuk saja — lihat Bug B untuk AND/NAND, dan aturan bentuk per gate di bagian 2.4).
      - Wire solid dari gate ke output.
      - Node output (lingkaran, label "OUT" di atasnya, isi "0"/"1", warna sesuai status).
   3) Baris ringkasan status: "A=<nilai> -> OUT=<nilai>" (atau dengan B jika 2 input).
   4) Satu kalimat deskripsi (lihat daftar di 2.5).
   5) Truth table (kolom A/B/OUT, baris terurut biner, baris aktif ter-highlight sesuai warna tema).
   TIDAK ADA elemen lain (tidak ada formula boolean tambahan, tidak ada ikon tambahan, tidak ada badge tambahan) di dalam card.

2.4 BENTUK GATE PER JENIS (WAJIB PERSIS, SATU BENTUK SAJA PER GATE)
   - Basic Wire: tidak ada simbol gate, hanya garis lurus solid dari input ke output.
   - NOT: segitiga sisi lurus (straight-sided triangle) + bubble kecil kosong di ujung output.
   - AND: bentuk "D" tunggal (sisi kiri lurus datar, sisi kanan setengah lingkaran). TANPA bubble. HANYA SATU shape (lihat Bug B).
   - NAND: bentuk "D" tunggal SAMA seperti AND, DITAMBAH bubble kecil di ujung output. HANYA SATU shape dasar + 1 bubble (lihat Bug B).
   - OR: sisi kiri melengkung cekung (concave curve), sisi kanan meruncing ke satu titik. TANPA bubble. BEDA dari bentuk NOT (jangan pakai segitiga lurus untuk OR).
   - NOR: bentuk sama seperti OR, DITAMBAH bubble kecil di ujung output.
   - XOR: bentuk sama seperti OR, DITAMBAH satu garis lengkung tambahan terpisah di belakang body utama. TANPA bubble.
   - XNOR: bentuk sama seperti XOR (garis lengkung ganda di belakang), DITAMBAH bubble kecil di ujung output.

2.5 KALIMAT DESKRIPSI PER GATE (PERSIS TEKS INI, JANGAN DIPARAFRASE)
   - Basic Wire: "Output EXACTLY follows input"
   - NOT Gate: "Output is INVERTED from input"
   - AND Gate: "Output is 1 only if BOTH inputs are 1"
   - NAND Gate: "Output is 0 only if BOTH inputs are 1"
   - OR Gate: "Output is 1 if AT LEAST ONE input is 1"
   - NOR Gate: "Output is 0 if AT LEAST ONE input is 1"
   - XOR Gate: "Output is 1 if inputs are DIFFERENT"
   - XNOR Gate: "Output is 1 if inputs are SAME"

2.6 WARNA TEMA PER GATE (WAJIB PERSIS, dipakai konsisten di bulatan header, wire aktif, node aktif, highlight baris tabel)
   - Basic Wire -> biru muda/abu kebiruan netral
   - NOT -> merah
   - AND -> hijau
   - NAND -> oranye
   - OR -> biru
   - NOR -> ungu
   - XOR -> hijau tosca/teal
   - XNOR -> pink/magenta

======================================================================
BAGIAN 3 — PERILAKU INTERAKTIF (WAJIB)
======================================================================
- Klik node input (A/B) -> toggle 0/1.
- Saat toggle terjadi, SECARA BERSAMAAN:
  1. Tampilan node input berubah (redup "0" <-> menyala warna tema "1").
  2. Wire input->gate ikut menyala/redup (tetap SATU garis solid, lihat Bug A).
  3. OUT dihitung ulang otomatis sesuai rumus (Bagian 4).
  4. Node output & wire gate->output ikut update (tetap SATU garis solid).
  5. Baris ringkasan status ter-update.
  6. Baris truth table yang cocok ter-highlight otomatis, highlight lama hilang.
- Setiap card independen satu sama lain.

======================================================================
BAGIAN 4 — RUMUS LOGIKA (WAJIB BENAR)
======================================================================
- Basic Wire: OUT = A
- NOT: OUT = NOT A
- AND: OUT = 1 hanya jika A=1 DAN B=1
- NAND: kebalikan AND
- OR: OUT = 1 jika A=1 ATAU B=1
- NOR: kebalikan OR
- XOR: OUT = 1 jika A dan B BERBEDA
- XNOR: kebalikan XOR

======================================================================
BAGIAN 5 — CHECKLIST WAJIB SEBELUM DIANGGAP SELESAI
======================================================================
Sebelum menyatakan pekerjaan selesai, cek satu-satu, WAJIB SEMUA "YA":
[ ] Judul halaman persis "7 Basic Logic Gates"? (tanpa eyebrow, tanpa subtitle tambahan)
[ ] Background card polos gelap, TANPA pola grid/dot?
[ ] TIDAK ADA ornamen sudut/corner accent di card manapun?
[ ] Header card format "<nomor> ● <Nama>" (bukan format slash "01 / WIRE")?
[ ] TIDAK ADA baris formula boolean tambahan yang tidak diminta?
[ ] TIDAK ADA garis wire yang dashed/putus-putus di card manapun?
[ ] AND Gate dan NAND Gate masing-masing HANYA punya satu bentuk shape (bukan dobel)?
[ ] Bentuk OR/NOR/XOR/XNOR beda dari bentuk NOT (melengkung cekung, bukan segitiga lurus)?
[ ] Total 8 card, urutan benar, semua rumus logika benar?
[ ] Layout 2 kolom di desktop, 1 kolom di mobile, tetap berfungsi?

JIKA ADA SATU SAJA JAWABAN "TIDAK" DI ATAS, PEKERJAAN BELUM SELESAI. JANGAN SUBMIT SEBELUM SEMUA POIN "YA".
