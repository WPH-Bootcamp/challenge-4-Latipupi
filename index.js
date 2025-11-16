const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString()
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  const text = prompt("Enter a new to-do: ").trim();

  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
 if (!text) {
    console.log("To-do text cannot be empty.");
    return;
  }

  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  const newTodo = {
    id: generateUniqueId(),
    text: text,
    isCompleted: false
  };

  // 4. Tambahkan objek to-do ini ke array `todos`
  todos.push(newTodo);

  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  console.log(`To-do added: "${text}"`);
}

function markTodoCompleted() {
  //Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Periksa length dari array `todos`. Jika kosong, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  } 

  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  const input = prompt("Enter the number of the to-do to mark as completed: ").trim();

  // Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
   if (!/^\d+$/.test(input)) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const index = parseInt(input) - 1;

  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  // 4.Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();

  // 5. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  if (todos[index].isCompleted) {
    console.log("This to-do is already marked as completed.");
    return;
  }
  todos[index].isCompleted = true;

  // 6. Beri feedback ke user bahwa to-do berhasil ditandai selesai dan Tangani kasus jika to-do sudah selesai
   console.log(`To-do marked as completed: "${todos[index].text}"`);
}

function deleteTodo() {
  // Implementasi logika untuk menghapus to-do
  // 1. Periksa length dari array `todos`. Jika kosong, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  } 
  
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  const input = prompt("Enter the number of the to-do to delete: ").trim();

  // Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
   if (!/^\d+$/.test(input)) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  const index = parseInt(input) - 1;
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  // 4. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  
  // 5. Hapus to-do yang dipilih dari array `todos`
  const removedTodo = todos.splice(index, 1);

  // 6. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log(`To-do deleted: "${removedTodo[0].text}"`);
}

function listTodos() {
  // Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  console.log("--- YOUR TO-DO LIST ---");
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos` Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  todos.forEach((todo, index) => {
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
    const status = todo.isCompleted ? "DONE" : "ACTIVE";
    console.log(`${index + 1}. [${status}] | ${todo.text}`);
  });

  // 5. Tampilkan garis penutup daftar
    console.log("-----------------------");
}

function runTodoApp() {
  // Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar

  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    console.log("\nAvailable commands:");
    console.log("1. add - Add a new to-do");
    console.log("2. complete - Mark a to-do as completed");
    console.log("3. delete - Delete a to-do");
    console.log("4. list - List all to-dos");
    console.log("5. exit - Exit the application");

   
     // 2. Minta user memasukkan perintah menggunakan `prompt()` berdasarkan perintah yang dimasukkan user
    const command = prompt("Enter a command: ").trim().toLowerCase();

     // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    switch (command) {
      case "add":
        addTodo();
        break;
      case "complete":
        markTodoCompleted();
        break;
      case "delete":
        deleteTodo();
        break;
      case "list":
        listTodos();
        break;
      // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
      case "exit":
        running = false;
        console.log("Exiting the application. Goodbye!");
        break;
      default:
        // 5. Tangani input perintah yang tidak valid
        console.log("Invalid command. Please try again.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
