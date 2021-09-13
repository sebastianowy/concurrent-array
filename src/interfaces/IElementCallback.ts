export type IElementCallback<TElement, TResult> = (element: TElement, index?: number) => Promise<TResult>;
