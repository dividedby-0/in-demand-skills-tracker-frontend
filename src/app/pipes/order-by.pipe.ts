import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderBy",
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    array.sort((a, b) => b[field] - a[field]);
    return array;
  }
}
