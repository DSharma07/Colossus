export class Product {
  public image: string;
  public label: string;
  public ref: string;
  public cost: number;

  public updateFrom(src: Product): void {
    this.image = src.image;
    this.label = src.label;
    this.ref = src.ref;
    this.cost = src.cost;
  }
}
