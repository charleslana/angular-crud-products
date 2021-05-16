import AppError from '../../../AppError';
import ProductRepository from '../repository/ProductRepository';

export default class DeleteProductService {

    public async execute(id: string): Promise<void | undefined> {
        const productRepository = new ProductRepository();
        const findProduct = await productRepository.find(id);

        if (!findProduct) {
            throw new AppError('Produto não encontrado.');
        }

        productRepository.delete(findProduct);
    }
}