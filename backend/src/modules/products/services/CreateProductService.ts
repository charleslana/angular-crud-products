import AppError from '../../../AppError';
import Product from '../interface/Product';
import ProductRepository from '../repository/ProductRepository';

export default class CreateProductService {

    public async execute(product: Product): Promise<Product> {
        const productRepository = new ProductRepository();
        const productExists = await productRepository.findByName(product.name);

        if (productExists) {
            throw new AppError('O nome do produto já existe.');
        }

        const randomId = Math.random().toString(36).substring(2);
        const randomIdExists = await productRepository.find(randomId);

        if (randomIdExists) {
            throw new AppError('Ocorreu um erro ao gerar o id.');
        }

        const saveProduct = {
            ...product,
            id: randomId
        }

        return productRepository.save(saveProduct);
    }
}