import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atkDef',
  // 1. Pure is a defaut configuration
  // pure: true,
})
export class AtkDefPipe implements PipeTransform {
  transform(value: string | number | undefined | null): string {
    if (value === undefined || value === null) {
      return '?';
    }

    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(numValue)) {
      return '?';
    }

    return numValue.toLocaleString('es-BO');
    // LocaleString could made a standard string
    // return numValue.toLocaleString('en-US');
  }
}
