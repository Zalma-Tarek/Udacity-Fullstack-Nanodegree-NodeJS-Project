import sharp from 'sharp';
import path from 'path';
import { promises as fsPromises } from 'fs';

export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  if (!filename || !width || !height) {
    throw new Error('Missing parameters');
  }

  const fullPath = path.join('assets/full', `${filename}.jpg`);
  const thumbPath = path.join(
    'assets/thumb',
    `${filename}_${width}x${height}.jpg`
  );

  try {
    // Is cached?
    await fsPromises.readFile(thumbPath);
    console.log('Serving cached image');
    return path.resolve(thumbPath);
  } catch {
    // Not cached → create it
    const inputBuffer = await fsPromises.readFile(fullPath);

    const outputBuffer = await sharp(inputBuffer)
      .resize(width, height)
      .toFormat('jpeg')
      .toBuffer();

    await fsPromises.writeFile(thumbPath, outputBuffer);

    return path.resolve(thumbPath);
  }
};
