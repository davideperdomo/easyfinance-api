export interface ProductPlainData {
	id: string;
	type: string;
}

export class Product {
	constructor(
		public id: ProductId,
		public type: ProductType,
	) {}

	static fromPlainData(data: ProductPlainData): Product {
		return new Product(
			new ProductId(data.id),
			new ProductType(data.type),
		);
	}

  toPlainData(): ProductPlainData {
    return {
      id: this.id.value,
      type: this.type.value
    };
  }
}

export class ProductId {
  constructor(public value: string) {}
}

export class ProductType {
  static options = ['credit', 'investment']; 
  constructor(public value: string) {
    this.validateOptions();
  }
  
  private validateOptions () {
    if (!ProductType.options.includes(this.value)) {
      throw new Error(`Invalid product type: ${this.value}`);
    }
  }
}
