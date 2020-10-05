import React from 'react';
import { featuredProducts, paginate } from '../utils/helpers';
export const ProductContext = React.createContext();
// import FeaturedProducts from '../components/Products/FeaturedProducts';
// { Children }
// import axios from 'axios';

//contentful
const contentful = require('contentful');
const client = contentful.createClient({
  space: 'nen878tszp0g',
  accessToken: 'lS5S6LnFpseqw_6nHTqxaiW9_sFHcFjAQSiwKXHeVyM',
});

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  // extra state values
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
  });

  //content from contentful
  React.useEffect(() => {
    setLoading(true);
    client.getEntries().then((response) => {
      const { items } = response;
      const productsArray = items.map((item) => {
        const {
          description,
          title,
          price,
          image,
          featured,
          id,
          freeShipping,
          category,
        } = item.fields;
        const value =
          (description && description.content[0].content[0].value) || null;
        const url = (image && image.fields.file.url) || null;

        return {
          title,
          value,
          price,
          url,
          key: id || null,
          id,
          featured,
          freeShipping,
          category,
        };
      });
      const featuredProduct = featuredProducts(productsArray);
      setSorted(paginate(productsArray));
      setProducts(productsArray);
      setFeatured(featuredProduct);
      setLoading(false);
    });
    return () => {};
  }, []);

  React.useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    //logic
    if (category !== 'all') {
      newProducts = newProducts.filter((item) => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(
        (item) => item.freeShipping === shipping
      );
    }
    if (search !== '') {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (price !== 'all') {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 100;
        } else if (price === 200) {
          return item.price > 200 && item.price < 400;
        } else {
          return item.price > 400;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  const changePage = (index) => {
    setPage(index);
  };
  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
