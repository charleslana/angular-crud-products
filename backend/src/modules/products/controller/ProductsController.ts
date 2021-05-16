import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import UpdateActiveProductService from '../services/UpdateActiveProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listProductsService = new ListProductsService();
        const products = await listProductsService.execute();

        return response.status(200).json(products);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const showProductService = new ShowProductService();
        const products = await showProductService.execute(id);

        return response.status(200).json(products);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const product = request.body;
        const createProductService = new CreateProductService();
        const createProduct = await createProductService.execute(product);

        return response.status(200).json(createProduct);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const product = request.body;
        const updateProductService = new UpdateProductService();
        const updateProduct = await updateProductService.execute(product);

        return response.status(200).json(updateProduct);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const deleteProductService = new DeleteProductService();
        await deleteProductService.execute(id);

        return response.status(200).json({
            statusCode: 200,
            status: 'success',
            message: 'Produto excluído com sucesso.'
        });
    }

    public async updateActive(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const checkActive = request.query.active;
        let active = false;

        if (checkActive) {
            active = true;
        }

        const updateActiveProductService = new UpdateActiveProductService();
        const products = await updateActiveProductService.execute(id, active);

        return response.status(200).json(products);
    }
}