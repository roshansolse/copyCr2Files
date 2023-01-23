const path = require("path");
const fs = require("fs");
const filePaths = require("./path.json");

const selectedPhotosList = [];

const directoryPath = path.join(__dirname, filePaths.selectedPhotosPath);

fs.readdir(directoryPath, async function(err, files) {
    if (err) {
        return console.log("Unable to scan directory: " + err);
    }

    files.forEach(function(file) {
        if (file.includes(".jpg") || file.includes(".JPG")) {
            selectedPhotosList.push(file.split(".")[0]);
        }
    });

    console.log("Total Files :", selectedPhotosList.length);

    const dir = "./To Edit";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    for (const file of selectedPhotosList) {
        const rawFile = `Raw Photos/${file}.CR2`;
        const toEditPath = `To Edit/${file}.CR2`;
        fs.copyFile(rawFile, toEditPath, err => {
            if (err) throw err;
            console.log("file copied");
        });
    }
});
