// Description: This script is used to delete duplicate files in a folder and its subfolders.
const fs = require('fs');
const path = require('path')
const basePath = '/Users/swetha/Desktop/media after';

/**
 * Function to delete a file
 * @param {String} filePath
 */
function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.log({ filePath, error });
  }
}

/**
 * Remove duplicate files in a folder and its subfolders
 * @param {String} folderPath - Path of the folder to process
 * @param {Set} accFileNames - Set to accumulate unique file names
 * @returns {Set} - Set of unique file names
 */
function removeDups(folderPath, accFileNames = new Set()) {
  let curFileListArr = fs.readdirSync(folderPath, { withFileTypes: true });
  let curFileListSet = new Set(curFileListArr.map(file => file.name));

  curFileListArr.forEach(file => {
    try {
      let nextPath = path.join(file.parentPath, file.name);

      if (file.name.startsWith('.')) return deleteFile(nextPath);
      if (file.isDirectory()) return removeDups(nextPath, accFileNames);

      if (!accFileNames.has(file.name)) accFileNames.add(file.name);
      else{
        deleteFile(nextPath);
        curFileListSet.delete(file.name);
      }
    } catch (error) {
      console.log({ folderPath, error });
    }
  })

  if (!curFileListSet.size) fs.rmdirSync(folderPath, { recursive: true });
}

console.log(JSON.stringify(removeDups(basePath)));