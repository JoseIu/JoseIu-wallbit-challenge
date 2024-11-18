import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAddOutline } from 'react-icons/io5';
import { getProduct } from '../../helper';
import { useCart } from '../../hook';
import { FormInput } from '../form-input/FormInput';
import './addToCart.scss';
import { AddProductoForm, addProductoSchema } from './formSchema';

export const AddToCart = () => {
  const { addToCart } = useCart();
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductoForm>({
    resolver: zodResolver(addProductoSchema),
  });

  const onAddProduct: SubmitHandler<AddProductoForm> = async (data) => {
    const { id, quantity } = data;
    setIsFetching(true);

    try {
      const product = await getProduct(id.toString());
      if (!product) return;
      addToCart({ product, quantity: quantity });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="add-cart">
      <h2 className="add-cart__title">Agregar Producto</h2>
      <span className="add-cart__subtitle">Ingrese la cantidad y el ID del producto</span>
      <form className="form" onSubmit={handleSubmit(onAddProduct)}>
        <FormInput
          type="text"
          id="quantity"
          label="Cantidad"
          placeholder="ejemplo: 1"
          error={errors['quantity']}
          {...register('quantity', { setValueAs: (value) => Number(value) })}
        />
        <FormInput
          type="text"
          id="product-id"
          label="ID del Producto"
          placeholder="ejemplo: 1"
          error={errors['id']}
          {...register('id', { setValueAs: (value) => Number(value) })}
        />

        <button className="form__submit" type="submit">
          <IoAddOutline size={25} className="form__submit-icon" />
          {isFetching ? 'Agregando producto...' : 'Agregar'}
        </button>
      </form>
    </div>
  );
};
