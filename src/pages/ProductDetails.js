import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(id));

  if (products.length === 0) {
    return <Loading />;
  } else {
    // console.log(products);

    return (
      <section className='single-product'>
        <img
          src={product.url || '/'}
          alt={product.title || 'default'}
          className='single-product-image'
        />
        <article>
          <h1>{product.title}</h1>
          <h2>${product.price}</h2>
          <p>{product.value}</p>
          <button
            className='btn btn-primary btn-block'
            onClick={() => {
              //add to cart
              addToCart(product);
              history.push('/cart');
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
}
