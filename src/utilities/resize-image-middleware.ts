import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';

const resizeImage = async (
  req: express.Request & { processedImagePath?: string } & {
    processedImageError?: string;
  },
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    // Validate params
    if (!filename || !width || !height) {
      //res.status(400).send("filename, width and height are required");
      req.processedImageError = 'filename, width and height are required';
      return next();
    }

    const fullPath = path.join('assets/full', `${filename}.jpg`);
    const thumbPath = path.join(
      'assets/thumb',
      `${filename}_${width}x${height}.jpg`
    );

    try {
      // Check if processed version already exists
      await fsPromises.readFile(thumbPath);
      console.log('Serving cached image');
      req.processedImagePath = path.resolve(thumbPath);
      return next();
    } catch {
      // Read the original full-size image
      const inputBuffer = await fsPromises.readFile(fullPath);

      // Resize
      const outputBuffer = await sharp(inputBuffer)
        .resize(width, height)
        .toFormat('jpeg')
        .toBuffer();

      // Save resized image
      await fsPromises.writeFile(thumbPath, outputBuffer);

      // Serve resized image
      req.processedImagePath = path.resolve(thumbPath);
      return next();
    }
  } catch (error) {
    console.error('Resize error:', error);
    req.processedImageError = 'Image processing failed';
    return next();
  }
};

export default resizeImage;
