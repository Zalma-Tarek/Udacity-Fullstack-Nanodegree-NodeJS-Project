import express from 'express';
import { processImage } from './resize-image';

const resizeImage = async (
  req: express.Request & {
    processedImagePath?: string;
    processedImageError?: string;
  },
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    try {
      req.processedImagePath = await processImage(filename, width, height);
      return next();
    } catch (err: unknown) {
      req.processedImageError = (err as Error).message;
      return next();
    }
  } catch {
    req.processedImageError = 'Image processing failed';
    return next();
  }
};

export default resizeImage;
