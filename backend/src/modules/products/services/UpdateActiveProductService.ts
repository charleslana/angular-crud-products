import AppError from '../../../AppError';
import Product from '../interface/Product';
import ProductRepository from '../repository/ProductRepository';

export default class UpdateActiveProductService {

    public async execute(id: string, active: boolean): Promise<Product | undefined> {
        const productRepository = new ProductRepository();
        const findProduct = await productRepository.find(id);

        if (!findProduct) {
            throw new AppError('Produto não encontrado.');
        }

        const saveProduct = {
            ...findProduct,
            active: active
        }

        return productRepository.saveById(saveProduct);
    }
}