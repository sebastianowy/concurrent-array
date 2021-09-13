import { ConcurrentArray } from '.';

describe('ConcurrentArray', () => {
  describe('map()', () => {
    it('should map array to resolve dates considering maxConcurrency', async () => {
      const nativeArray: number[] = [1, 3, 2];
      const asyncArray: ConcurrentArray<number> = new ConcurrentArray(nativeArray, {
        maxConcurrency: 2,
      });
      const singleExecutionTimeInMs = 300;

      const mappedArray = await asyncArray.map(async (): Promise<Date> => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(new Date());
          }, singleExecutionTimeInMs);
        });
      });
      const isDiffBeforeSecondAndThirdCorrect =
        mappedArray[2].getTime() - mappedArray[1].getTime() >= singleExecutionTimeInMs;

      expect(isDiffBeforeSecondAndThirdCorrect).toEqual(true);
    });
  });

  describe('iterator', () => {
    it('should cast AsyncArray to array properly', async () => {
      const nativeArray: number[] = [1, 3, 2];

      const asyncArray: ConcurrentArray<number> = new ConcurrentArray(nativeArray, {
        maxConcurrency: 2,
      });
      const castedArray: number[] = Array.from(asyncArray);

      expect(castedArray).toEqual(nativeArray);
    });
  });
});
