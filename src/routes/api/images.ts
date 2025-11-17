import express from 'express';
import resizeImage from '../../utilities/resize-image-middleware';

const images = express.Router();

images.get('/', resizeImage, (req, res): void => {
  const r = req as express.Request & {
    processedImagePath?: string;
    processedImageError?: string;
  };
  if (r.processedImageError) {
    res.status(400).send(r.processedImageError);
    return;
  }

  if (r.processedImagePath) {
    res.sendFile(r.processedImagePath);
    return;
  }

  res.status(500).send('Unknown error');
  return;
});

export default images;
