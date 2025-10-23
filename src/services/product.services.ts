// Importamos nuestro modelo para trabajar en el. / We import our model to work on it.
import { Product } from "../models/product.model.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para productos - GET. / Products service - GET.
export const getAllProductsService = async () => {
    try {
        const products = await Product.findAll();

        if (products.length === 0) {
            console.warn("❓ There are no registered products yet.");
            return [];
        }

        return products;
    } catch (error) {
        console.error("❌ An error occurred in 'getAllProductsService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para productos - GET por ID. / Products service - GET by ID.
export const getProductByIdService = async (id: number) => {
    try {
        const product = await Product.findByPk(id);

        if (!product) {
            console.warn("❓ Product not found...");
            return null;
        }

        return product;
    } catch (error) {
        console.error("❌ An error occurred in 'getProductByIdService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para productos - POST. / Products service - POST.
export const createNewProductService = async (name: string, description: string, value: number, stock: number) => {
    try {
        if (!name || typeof value !== "number" || isNaN(value)) {
            throw new Error("❗ Missing or invalid required fields: name or value.");
        };

        if (value < 0 || stock < 0) {
            throw new Error("❗ Value and stock must be greater than or equal to 0.");
        };

        const existing = await Product.findOne({ where: { name } });
        if (existing) throw new Error("❗ A product with this name already exists.");

        const product = await Product.create({
            name: name.trim(),
            description: description?.trim() || null,
            value,
            stock,
            created_at: new Date()
        });

        return product;
    } catch (error) {
        console.error("❌ An error occurred in 'createNewProductService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para productos - PUT o PATCH. / Products service - PUT or PATCH.

// Definimos un tipo específico para actualizar productos. / Define a specific type for updating products.
type ProductUpdateData = {
    name?: string;
    description?: string;
    value?: number;
    stock?: number;
    deleted_at?: Date | null;
};

export const updateProductService = async (id: number, data: ProductUpdateData) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            console.warn("❓ Product not found...");
            return null;
        };

        if (Object.keys(data).length === 0) {
            throw new Error("❗ No data provided to update.");
        };

        delete (data as any).id_product;

        // Validamos valores numéricos. / Validate numeric values.
        if (data.value !== undefined && data.value < 0) {
            throw new Error("❗ 'value' must be greater than or equal to 0.");
        };

        if (data.stock !== undefined && data.stock < 0) {
            throw new Error("❗ 'stock' must be greater than or equal to 0.");
        };

        await product.update(data);

        console.log(`✔️ Product with ID ${id} successfully updated!`);
        return product;
    } catch (error) {
        console.error("❌ An error occurred in 'updateProductService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para productos - DELETE. / Products service - DELETE.
export const deleteProductService = async (id: number) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            console.warn("❓ Product not found...");
            return null;
        };

        await product.destroy();
        console.log(`✔️ Product with ID ${id} successfully deleted!`);
        return { message: "Product deleted successfully", id: product.id_product };
    } catch (error) {
        console.error("❌ An error occurred in 'deleteProductService'.", error);
        throw error;
    };
};
