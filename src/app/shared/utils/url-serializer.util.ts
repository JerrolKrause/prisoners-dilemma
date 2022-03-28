import { UrlTree, DefaultUrlSerializer } from '@angular/router';

/**
 * Preserves the trailing slash in routing urls
 * This improves SEO and also solves a lot of problems with SSR routing
 * @link
 * See https://github.com/angular/angular/issues/16051
 * @example
 * http://localhost:4200/users > http://localhost:4200/users/
 *
 */
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    return this._withTrailingSlash(super.serialize(tree));
  }

  private _withTrailingSlash(url: string): string {
    const splitOn = url.indexOf('?') > -1 ? '?' : '#';
    const pathArr = url.split(splitOn);

    if (!pathArr[0].endsWith('/')) {
      let fileName: string = url.substring(url.lastIndexOf('/') + 1);
      if (fileName.indexOf('.') === -1) {
        pathArr[0] += '/';
      }
    }
    return pathArr.join(splitOn);
  }
}
