// Description: Script to remove duplicate files by checking content hash and moving duplicates to Trash instead of deleting instantly.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const basePath = '/Users/swetha/Desktop/media before copy';
const trashPath = path.join(basePath, '_Trash'); // A folder to store duplicates

// Ensure Trash directory exists
if (!fs.existsSync(trashPath)) {
  fs.mkdirSync(trashPath, { recursive: true });
}

/**
 * Generate SHA256 hash for file content
 * @param {String} filePath
 * @returns {String} - Hash value of the file
 */
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * Move file to Trash instead of deleting
 * @param {String} filePath
 */
function moveToTrash(filePath) {
  try {
    const fileName = path.basename(filePath);
    const trashFilePath = path.join(trashPath, fileName);
    fs.renameSync(filePath, trashFilePath);
    console.log(`Moved duplicate: ${filePath} -> ${trashFilePath}`);
  } catch (error) {
    console.log(`Error moving ${filePath} to Trash`, error);
  }
}

/**
 * Remove duplicate files based on content hash
 * @param {String} folderPath - Path of the folder to process
 * @param {Set} fileHashes - Set to accumulate unique file hashes
 */
function removeDups(folderPath, fileHashes = new Set()) {
  const curFileListArr = fs.readdirSync(folderPath, { withFileTypes: true });

  curFileListArr.forEach(file => {
    try {
      const filePath = path.join(folderPath, file.name);

      // Exclude system-hidden files unless explicitly allowed
      if (file.name.startsWith('.')) {
        console.log(`Skipping hidden file: ${filePath}`);
        return;
      }

      if (file.isDirectory()) removeDups(filePath, fileHashes);
      else {
        const fileHash = getFileHash(filePath);

        if (!fileHashes.has(fileHash)) fileHashes.add(fileHash);
        else moveToTrash(filePath);
      }
    } catch (error) {
      console.log({ folderPath, error });
    }
  });

  // Remove empty folders after processing
  if (fs.readdirSync(folderPath).length === 0 && folderPath !== trashPath) {
    fs.rmdirSync(folderPath, { recursive: true });
    console.log(`Deleted empty folder: ${folderPath}`);
  }
}

// Start process
console.log(`Processing: ${basePath}`);
removeDups(basePath);
console.log(`Duplicate cleanup complete. Check the "_Trash" folder for duplicates.`);
