import AppError from '../../../AppError';
import Product from '../interface/Product';
import ProductRepository from '../repository/ProductRepository';

export default class UpdateProductService {

    public async execute(product: Product): Promise<Product | undefined> {
        const productRepository = new ProductRepository();
        const findProduct = await productRepository.find(product.id);

        if (!findProduct) {
            throw new AppError('Produto não encontrado.');
        }

        const productExists = await productRepository.findByName(product.name);

        if (productExists && product.name !== findProduct.name) {
            throw new AppError('O nome do produto já existe.');
        }

        return productRepository.saveById(product);
    }
}