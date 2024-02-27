import React from 'react';
import numberFormat from '../../utils/numberFormat.js';
import styles from './style.module.css'

const ProductItem = ({
  id,
  price,
  brand,
  product
}) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemTitle}>{id}</div>
      <div className={styles.itemBody}>
        <p className={styles.itemBrand}>{!!brand ? brand : ' - '}</p>
        <p>{product}</p>
        <p className={styles.itemPrice}>{numberFormat(price)} {'₽'}</p>
      </div>
    </li>
  );
};

export default ProductItem;
