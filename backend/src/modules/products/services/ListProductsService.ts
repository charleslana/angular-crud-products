import Product from '../interface/Product';
import ProductRepository from '../repository/ProductRepository';

export default class ListProductsService {

    public async execute(): Promise<Product[]> {
        const productRepository = new ProductRepository();
        return productRepository.findAll();
    }
}