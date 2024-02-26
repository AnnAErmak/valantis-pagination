import React from 'react';
import numberFormat from '../../utils/numberFormat.js';

const ProductItem = ({
  id,
  price,
  brand,
  product
}) => {
  return (
    <li>
      <div>{id}</div>
      <div>
        <p>{numberFormat(price)} {'₽'}</p>
        <p>{!!brand ? brand : ' - '}</p>
        <p>{product}</p>
      </div>
    </li>
  );
};

export default ProductItem;
