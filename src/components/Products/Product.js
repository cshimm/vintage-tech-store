import React from 'react';
import { Link } from 'react-router-dom';
// import url from '../../utils/URL';

import PropTypes from 'prop-types';
import img from '../../assets/mainBcg.jpeg';

export default function Product({ url, title, id, price }) {
  return (
    <article className='product'>
      <div className='img-container'>
        <img src={url || img} alt={title || 'default title'} />
        {id ? (
          <Link to={`products/${id}`} className='btn btn-primary product-link'>
            details
          </Link>
        ) : null}
      </div>
      <div className='product-footer'>
        <p className='product-title'>{title || 'default title'}</p>
        <p className='product-price'>${price || 0}</p>
      </div>
    </article>
  );
}
Product.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
