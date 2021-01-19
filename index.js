/**
 * @author [Muhammad Daffa Ilhami]
 * @email [mdaffailhami@gmail.com]
 * @create date 2021-01-18 | 20:00:00
 * @modify date 2021-01-19 | 07:38:50
 * @desc [description]
 */

// Import Modules
const fs = require("fs");
const promptSync = require("prompt-sync");

const input = promptSync();

// Main Program
while (true) {
  const kontak = JSON.parse(fs.readFileSync("./data/kontak.json"));
  console.log("\n\n\n\n\n\n\n\n\n\n\n");

  // Daftar kontak
  console.group("DAFTAR KONTAK {");
  for (let i = 0; i < kontak.length; i++) {
    console.group(i + 1 + ". " + kontak[i].nama);
    console.log(`Email: ${kontak[i].email}`);
    console.log(`Nomor: ${kontak[i].nomor}`);
    console.groupEnd();
  }
  console.groupEnd();
  console.log("}\n");

  // Menu
  console.log("1. Tambah Kontak");
  console.log("2. Edit Kontak");
  console.log("3. Hapus Kontak");
  console.log("4. Keluar");
  const pilih = input("Silahkan dipilih: ");

  // Logic ketika menu dipilih
  switch (pilih.toUpperCase()) {
    case "1":
    case "TAMBAH KONTAK":
      // Mengambil input nama, email, dan nomor kontak yg ingin ditambahkan
      const nama = input("Nama : ");
      const email = input("Email: ");
      const nomor = input("Nomor:");

      // Menambahkan kontak
      kontak.push({ nama, email, nomor });
      fs.writeFileSync("./data/kontak.json", JSON.stringify(kontak, null, 2));
      break;
    case "2":
    case "EDIT KONTAK":
      // Mengambil input kontak mana yang diedit
      let yangDiEdit = input("No. urut / Nama: ");

      // Mengecek apakah yg diinput itu No. urut atau nama
      if (!isNaN(yangDiEdit)) {
        yangDiEdit = parseInt(yangDiEdit - 1);
      } else {
        yangDiEdit = kontak.findIndex((x) => x.nama == yangDiEdit);
      }

      // Mengecek jika yangDiEdit tidak ada pada Daftar Kontak
      if (yangDiEdit >= kontak.length) break;

      // Mengambil input nama, email, dan nomor yg baru
      let newNama = input("Nama: ");
      let newEmail = input("Email: ");
      let newNomor = input("Nomor: ");

      // Mengecek jika yg diinputkan itu kosong / tidak ada apa-apa / blank
      if (newNama.length == 0) newNama = kontak[yangDiEdit].nama;
      if (newEmail.length == 0) newEmail = kontak[yangDiEdit].email;
      if (newNomor.length == 0) newNomor = kontak[yangDiEdit].nomor;

      // Mengupdate-kan kontak
      kontak.splice(yangDiEdit, 1, { nama: newNama, email: newEmail, nomor: newNomor });
      fs.writeFileSync("./data/kontak.json", JSON.stringify(kontak, null, 2));
      break;

    case "3":
    case "HAPUS KONTAK":
      // Mengambil input kontak mana yang dihapus
      let yangDiHapus = input("No. urut / Nama: ");

      // Mengecek apakah yg diinput itu No. urut atau nama
      if (!isNaN(yangDiHapus)) {
        yangDiHapus = parseInt(yangDiHapus - 1);
      } else {
        yangDiHapus = kontak.findIndex((x) => x.nama == yangDiHapus);
      }

      // Meyakinkan user apakah benar-benar ingin menghapusnya
      while (true) {
        const yakinkah = input("Apakah anda yakin ingin menghapus (y/n)? ");
        if (yakinkah.toUpperCase() == "Y") {
          // Menghapuskan kontak
          kontak.splice(yangDiHapus, 1);
          fs.writeFileSync("./data/kontak.json", JSON.stringify(kontak, null, 2));
          break;
        } else if (yakinkah.toUpperCase() == "N") {
          break;
        }
      }
  }
  if (pilih == "4" || pilih.toUpperCase() == "KELUAR") {
    break;
  }
}
