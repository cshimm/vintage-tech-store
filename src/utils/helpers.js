// import url from './URL';
//flatten
export function flattenProducts(data) {
  return data.map((item) => {
    // cloudindary
    // let image = item.image[0].url;
    // local setup no deployment

    let image = (item.image && item.image.url) || null;
    return { ...item, image };
  });
}

// helper functions

export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}
