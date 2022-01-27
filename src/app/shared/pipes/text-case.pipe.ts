import { Pipe, PipeTransform } from '@angular/core';

/**
 * Change the casing of a text input
 * Types available: Pascal, upper, lower, kebab
 */
@Pipe({
  name: 'textCase',
})
export class TextCasePipe implements PipeTransform {
  transform(value: string, type?: 'pascal' | 'upper' | 'lower') {
    if (value && typeof value === 'string') {
      switch (type) {
        case 'pascal':
          return String(value).toUpperCase();
        case 'upper':
          return value.toUpperCase();
        case 'lower':
          return value.toLowerCase();
        default:
          return String(value).toUpperCase();
      }
    }

    return value;
  }
}
