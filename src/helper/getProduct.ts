import { ProductInterface } from '../interfaces/product.interface';

export const getProduct = async (id: string): Promise<ProductInterface> => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('Error en la conexión con el servidor');
    }

    const contentLength = response.headers.get('Content-Length');
    if (contentLength === '0') {
      throw new Error(`Producto con id ${id} no encontrado`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error desconocido');
  }
};
