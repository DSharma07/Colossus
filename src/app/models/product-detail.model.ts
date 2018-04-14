export class ProductDetail {
  public image: string;
  public label: string;
  public reference: string;
  public cost: number;
  public brand: string;
  public model: string;
  public items_available: string;

  public updateFrom(src: ProductDetail): void {
    this.image = src.image;
    this.label = src.label;
    this.reference = src.reference;
    this.cost = src.cost;
    this.brand = src.brand;
    this.model = src.model;
    this.items_available = src.items_available;
  }
}
