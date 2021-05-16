import Product from '../interface/Product';
import products from '../entity/products';

export default class ProductRepository {

    public async findAll(): Promise<Product[]> {
        return products;
    }

    public async find(id: string): Promise<Product | undefined> {
        const filterProducts = products.filter(product => product.id === id);

        return filterProducts[0];
    }

    public async findIndex(id: string): Promise<number> {
        return products.findIndex(product => product.id === id);
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const filterProducts = products.filter(product => product.name === name);

        return filterProducts[0];
    }

    public async save(product: Product): Promise<Product> {
        products.push(product);
        return products[products.length - 1];
    }

    public async saveById(product: Product): Promise<Product> {
        const index = await this.findIndex(product.id);
        products[index] = product;
        return product;
    }

    public async delete(product: Product): Promise<void> {
        const index = await this.findIndex(product.id);
        products.splice(index, 1);
    }
}