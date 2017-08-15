const jimp = require('jimp');
const path = require('path');

class image {
	/**
	 * Creates an instance of the image object.
	 * @param {string} file - full path of the image 
	 */
	constructor (file) {
		this.file = file;
	}

	/**
	 * Clones and resizes image
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize (width = 'auto', height = 'auto') {
		this.width = width;
		this.height = height;

		return new Promise((resolve, reject) => {
			jimp.read(this.file, (err, image) => {
				if (err) reject(err);
				
				const xSize = (width === 'auto') ? jimp.AUTO : parseInt(width);
				const ySize = (height === 'auto') ? jimp.AUTO : parseInt(height);
	
				const newFilename = this.resolveNewFilename();
				const newFilePath = path.normalize(`${file.path}/resized/${newFilename}`);
	
				image.resize(xSize, ySize)
					.write(newFilePath, () => {
						resolve(newFilePath);
					});
			});
		});
	}
	
	resolveNewFilename () {
		return `${path.basename(this.file)}-${this.width}-${this.height}${path.extname(this.file)}`;
	}

	extrapolateFilePath () {
		
	}
}

module.exports = image;
