/**
 * read all the dirs
 * check the priority dirs
 * delete all other dir's duplicate file
 */
const fs = require('fs');
const path = require('path')
const basePath = '/Users/swetha/Desktop/whole pictures';

/**
 * Generate a list of duplicate files in a folder and its subfolders
 * @param {String} folderPath - Path of the folder to process
 * @param {Object} fileNames - Object to accumulate file names
 * @returns {Object} - Object containing duplicate files
 */
function generateDuplsList(folderPath, fileNames = {}) {

  fs.readdirSync(folderPath, { withFileTypes: true })
    .forEach(file => {
      try {
        if (file.name.startsWith('.')) return;
        const nextLevelPath = path.join(folderPath, file.name);

        if (file.isDirectory()) generateDuplsList(nextLevelPath, fileNames);
        else {
          if (!fileNames[file.name]) fileNames[file.name] = [];
          fileNames[file.name].push(nextLevelPath);
        }

      } catch (error) {
        console.log({ error, folderPath })
      }
    });

  // filter non-duplication files
  let result = {};
  for (const fileName in fileNames) {
    if (fileNames[fileName].length > 1) result[fileName] = fileNames[fileName];
  }
  return result;
}

const folderPath = path.join(basePath); // , 'Desktop/Pictures');
console.log(JSON.stringify(generateDuplsList(folderPath)));