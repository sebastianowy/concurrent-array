import { IConcurrentArrayOptions } from './IConcurrentArrayOptions';
import { IElementCallback } from './IElementCallback';

export interface IConcurrentArray<TElement> {
  map<TResult>(callback: IElementCallback<TElement, TResult>, options?: IConcurrentArrayOptions): Promise<TResult[]>;

  forEach(callback: IElementCallback<TElement, void>, options?: IConcurrentArrayOptions): Promise<void>;

  filter(callback: IElementCallback<TElement, boolean>, options?: IConcurrentArrayOptions): Promise<TElement[]>;

  sort(
    callback: (left: TElement, right: TElement) => Promise<number>,
    options?: IConcurrentArrayOptions,
  ): Promise<TElement[]>;
}
