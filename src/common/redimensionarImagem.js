/**
 * https://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
 * https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
 * https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader#Methods
 * 1. loads into FileReader
 * 2. set the img src on load
 * 3. when it is done, draw into the canvas
 * 4. calculate the width and height
 * 5. redraw in canvas
 * 6. return to the promise
 *
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
export default (file) => {

  const MAX_WIDTH = 200;
  const MAX_HEIGHT = 200;
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };

    reader.onloadend = (event) => {
      let context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, width, height);

      resolve({
        filename: file.name,
        file: canvas.toDataURL(file.type),
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  });
};
