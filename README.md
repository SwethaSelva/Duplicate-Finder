# 📖 Duplicate Finder – Smart File Deduplication Tool
🚀 Duplicate Finder is a powerful file deduplication tool that scans directories, detects duplicate files using SHA256 hashing, and moves them to a _Trash folder instead of permanently deleting them. It ensures safe and efficient storage cleanup.

## 📌 Features
✅ Content-Based Detection – Uses SHA256 hashing instead of just filenames.

✅ Safe Deletion – Moves duplicates to a _Trash folder for review.

✅ Recursive Scanning – Scans folders & subdirectories automatically.

✅ Hidden File Protection – Ignores macOS system files (.DS_Store) & hidden files.

✅ Automated Cleanup – Runs in the background for efficient deduplication.

## 📂 Use Cases

📌 Cloud & Local Storage Cleanup – Remove redundant backups before syncing.

📌 Media File Organization – Ideal for photos, videos, and document storage.

📌 Automated System Cleanup – Keep drives optimized without manual effort.

## 🛠 Installation
### 1️⃣ Clone the Repository

```

git clone https://github.com/yourusername/DuplicateFinder.git

cd DuplicateFinder

```

### 2️⃣ Install Dependencies

```
npm install
```

## 🚀 Usage
### Run Duplicate Finder on a Directory
```
node index.js /path/to/your/folder
```
📌 Replace `/path/to/your/folder` with the directory you want to scan.

### Example Usage
```
node index.js ~/Desktop/MyFiles
```

## ⚠️ Important Notes
🛑 Duplicates are moved to _Trash instead of being permanently deleted.

🛠 Mac Hidden Files (. files) are ignored by default.

🔍 Compares files by content (hash-based), ensuring accurate detection.

## 💡 Future Improvements
🔹 Interactive CLI – Allow users to confirm deletion before moving files.

🔹 Hashing Optimization – Support for MD5, SHA1, and SHA256.

🔹 GUI Version – Develop a visual interface for ease of use.

## 👨‍💻 Contributing
Feel free to submit issues, feature requests, or pull requests. Let's make Duplicate Finder better together!

## 📜 License
This project is licensed under the MIT License.

## 📩 Contact & Support

👩‍💻 **Author**: Swetha Selvakumaran

📧 **Email**: swethalakshmideepak@gmail.com

🔗 **GitHub**: github.com/SwethaSelva

✨ Keep your storage clean, efficient, and duplicate-free with Duplicate Finder! 🚀









