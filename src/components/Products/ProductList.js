import React from 'react';
import Product from './Product';

export default function ProductList({ products, title }) {
  // console.log(products);

  return (
    <section className='section'>
      <h2 className='section-title'>{title}</h2>
      <div className='products-center'>
        {products.map((item) => {
          return <Product key={item.key} {...item} />;
        })}
      </div>
    </section>
  );
}
