import express from 'express';
import resizeImage from '../../utilities/resize-image-middleware';

const images = express.Router();

images.get('/', resizeImage, (req, res) => {
  const r = req as express.Request & {
    processedImagePath?: string;
    processedImageError?: string;
  };
  if (r.processedImageError) {
    return res.status(400).send(r.processedImageError);
  }

  if (r.processedImagePath) {
    return res.sendFile(r.processedImagePath);
  }

  return res.status(500).send('Unknown error');
});

export default images;
