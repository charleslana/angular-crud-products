import AppError from '../../../AppError';
import Product from '../interface/Product';
import ProductRepository from '../repository/ProductRepository';

export default class ShowProductService {

    public async execute(id: string): Promise<Product | undefined> {
        const productRepository = new ProductRepository();
        const product = await productRepository.find(id);

        if (!product) {
            throw new AppError('Produto não encontrado.');
        }

        return product;
    }
}