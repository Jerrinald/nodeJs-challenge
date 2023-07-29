const ProductService = require('../services/product.js');
const genericController = require('../controllers/generic.js');
const httpMocks = require('node-mocks-http');
const { Product } = require("../db");

jest.mock("../db", () => ({
    Product: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    }
}));

describe("genericController", () => {
    let mockRequest;
    let mockResponse;
    let controller;

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
        controller = genericController(Product);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("All products", async () => {
        const mockProducts = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];
        Product.findAll.mockResolvedValue(mockProducts);

        await controller.getAll(mockRequest, mockResponse);

        expect(mockResponse._getJSONData()).toEqual(mockProducts);
        expect(Product.findAll).toHaveBeenCalledTimes(1);
    });

    it("Find One product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.findOne.mockResolvedValue(mockProduct);

        mockRequest.params = { id: 1 };

        await controller.getOne(mockRequest, mockResponse);

        expect(mockResponse._getJSONData()).toEqual(mockProduct);
        expect(Product.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("Create product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.create.mockResolvedValue(mockProduct);

        mockRequest.body = { name: "Product 1" };

        await controller.create(mockRequest, mockResponse);

        expect(mockResponse._getJSONData()).toEqual(mockProduct);
        expect(Product.create).toHaveBeenCalledWith({ name: "Product 1" });
    });

    it("Update product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.update.mockResolvedValue([1, [mockProduct]]);

        mockRequest.params = { id: 1 };
        mockRequest.body = { name: "Product 1" };

        await controller.update(mockRequest, mockResponse);

        expect(mockResponse._getJSONData()).toEqual([mockProduct]);
        expect(Product.update).toHaveBeenCalledWith(
            { name: "Product 1" },
            { where: { id: 1 }, returning: true, individualHooks: true }
        );
    });

    it("Delete product", async () => {
        Product.destroy.mockResolvedValue(1);

        mockRequest.params = { id: 1 };

        await controller.delete(mockRequest, mockResponse);

        expect(mockResponse._getStatusCode()).toBe(200);
        expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
});
