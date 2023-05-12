/**
 * Memoize is a decorator function that caches the return value of a method with
 * the same set of arguments. Improves performance for costly function calls.
 * @returns {Function} A function that takes in a target, key, and descriptor and
 * returns a modified descriptor with the memoized method.
 * @example
 * ```
 *  ＠Memoize()
 *  function doSomething(){
 *    // Some costly computation
 *  }
 * ```
 */
export function Memoize() {
  const cache = new Map();
  return (_target: unknown, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = args.join('-');
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
      const result = originalMethod.apply(this, args);
      cache.set(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}
