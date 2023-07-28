const ProductService = require("../services/product.js");
const { Product } = require("../db");
const Sequelize = require("sequelize");

jest.mock("../db", () => ({
    Product: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    }
}));

describe("ProductService", () => {
    let service;

    beforeEach(() => {
        service = ProductService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("All products", async () => {
        const mockProducts = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];
        Product.findAll.mockResolvedValue(mockProducts);
        const products = await service.findAll({});
        expect(products).toEqual(mockProducts);
        expect(Product.findAll).toHaveBeenCalledTimes(1);
    });

    it("Find one product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.findOne.mockResolvedValue(mockProduct);
        const product = await service.findOne({ id: 1 });
        expect(product).toEqual(mockProduct);
        expect(Product.findOne).toHaveBeenCalledTimes(1);
    });

    it("Create product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.create.mockResolvedValue(mockProduct);
        const product = await service.create({ name: "Product 1" });
        expect(product).toEqual(mockProduct);
        expect(Product.create).toHaveBeenCalledTimes(1);
    });

    it("Replace product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.destroy.mockResolvedValue(1);
        Product.create.mockResolvedValue(mockProduct);
        const [product, wasReplaced] = await service.replace({ id: 1 }, { name: "Product 1" });
        expect(product).toEqual(mockProduct);
        expect(wasReplaced).toEqual(false);
        expect(Product.destroy).toHaveBeenCalledTimes(1);
        expect(Product.create).toHaveBeenCalledTimes(1);
    });

    it("Update product", async () => {
        const mockProduct = { id: 1, name: "Product 1" };
        Product.update.mockResolvedValue([1, [mockProduct]]);
        const products = await service.update({ id: 1 }, { name: "Product 1" });
        expect(products).toEqual([mockProduct]);
        expect(Product.update).toHaveBeenCalledTimes(1);
    });

    it("Delete product", async () => {
        Product.destroy.mockResolvedValue(1);
        const nbDeleted = await service.delete({ id: 1 });
        expect(nbDeleted).toEqual(1);
        expect(Product.destroy).toHaveBeenCalledTimes(1);
    });
});
