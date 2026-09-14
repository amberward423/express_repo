import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  console.log(req.file.path);

  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  const new_filename_thumbnail = `upload/${req.file.filename}_thumb.png`;

  await sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(new_filename_thumbnail);
  next();
};

export {createThumbnail};
