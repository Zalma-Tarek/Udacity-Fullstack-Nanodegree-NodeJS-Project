import { processImage } from '../utilities/resize-image';

describe('processImage function', () => {
  it('throws an error if parameters are missing', async () => {
    await expectAsync(processImage('', 200, 200)).toBeRejectedWithError(
      'Missing parameters'
    );
  });

  it('returns cached image on second call (no reprocessing)', async () => {
    const first = await processImage('fjord', 200, 200);
    const second = await processImage('fjord', 200, 200);

    expect(first).toBe(second);
  });
});
