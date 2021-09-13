import { AsyncArray } from '@sebowy/async-array';
import { ConcurrentQueue } from '@sebowy/concurrent-queue';
import { IConcurrentArray } from './interfaces/IConcurrentArray';
import { IConcurrentArrayOptions } from './interfaces/IConcurrentArrayOptions';
import { IElementCallback } from './interfaces/IElementCallback';

export class ConcurrentArray<TElement> implements IConcurrentArray<TElement> {
  private readonly _asyncArray: AsyncArray<TElement>;
  constructor(_array: Array<TElement>, private readonly _options: IConcurrentArrayOptions = {}) {
    this._asyncArray = new AsyncArray(_array);
  }

  *[Symbol.iterator](): Iterator<TElement> {
    const array = Array.from(this._asyncArray);
    for (const element of array) {
      yield element;
    }
  }

  public map<TResult>(
    callback: IElementCallback<TElement, TResult>,
    options: IConcurrentArrayOptions = {},
  ): Promise<TResult[]> {
    const queue = this.createQueue(options);
    return this._asyncArray.map((element: TElement, index: number) => queue.add(() => callback(element, index)));
  }

  public async forEach(
    callback: IElementCallback<TElement, void>,
    options: IConcurrentArrayOptions = {},
  ): Promise<void> {
    const queue = this.createQueue(options);
    return this._asyncArray.forEach((element: TElement, index: number) => queue.add(() => callback(element, index)));
  }

  public async filter(
    callback: IElementCallback<TElement, boolean>,
    options: IConcurrentArrayOptions = {},
  ): Promise<TElement[]> {
    const queue = this.createQueue(options);
    return this._asyncArray.filter((element: TElement, index: number) => queue.add(() => callback(element, index)));
  }

  public async sort(
    callback: (left: TElement, right: TElement) => Promise<number>,
    options: IConcurrentArrayOptions = {},
  ): Promise<TElement[]> {
    const queue = this.createQueue(options);
    return this._asyncArray.sort((left: TElement, right: TElement) => queue.add(() => callback(left, right)));
  }

  private createQueue(options: IConcurrentArrayOptions): ConcurrentQueue {
    return new ConcurrentQueue({
      maxConcurrency: this._options?.maxConcurrency ?? options.maxConcurrency,
    });
  }
}
