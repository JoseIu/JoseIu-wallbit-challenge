import { z } from 'zod';

// - Número enteros
// - Números positivos
// - Que no sea 0

export const addProductoSchema = z.object({
  quantity: z
    .number({ message: 'La cantidad debe ser un número' })
    .int({ message: 'La cantidad debe ser un número entero' })
    .refine((value) => value > 0, { message: 'La cantidad debe ser un número positivo y mayor a 0' }),

  id: z
    .number({ message: 'El ID del producto debe ser un número' })
    .int({ message: 'LEl ID del producto debe ser un número entero' })
    .refine((value) => value > 0, { message: 'El ID del producto debe ser positivo y mayor a 0' }),
});

export type AddProductoForm = z.infer<typeof addProductoSchema>;
