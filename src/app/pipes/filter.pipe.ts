import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any, input: any): any {
    if (!input) {
      return value;
    }

    return value.filter((item: any) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
  }
}
