/**
 * A collection of json/javascript helper utilities
 */
export class ObjectUtils {
  /**
   * Sanitize a JS object
   * @param obj - Any object
   */
  static sanitize(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
  }
}
