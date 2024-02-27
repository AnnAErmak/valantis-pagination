import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProdtItem';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import {
  getIds, getIdsByFilter, getProductsByIds,
} from '../../utils/api';
import { PAGINATION_LIMIT } from '../../variables/variables';
import Loader from '../Loader/Loader';
import styles from './style.module.css'


function ProductList() {
  const [countAllIds, setCountAllIds] = useState(0);
  const [products, setProducts] = useState([]);

  const [countFilterIds, setCountFilterIds] = useState(0);
  const [filteredIds, setFilteredIds] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterParams, setFilterParams] = useState({});

  const [isLoader, setIsLoader] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setIsLoader(true);

    const ids = async () => {
      const countIds = await getIds();
      if (!countIds.length) return;
      setCountAllIds(countIds.length);
      const productActive = await getIds(0);
      const productValue = await getProductsByIds(productActive);
      setProducts(productValue);
    };

    ids()
      .then(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    setIsLoader(true);

    const ids = async () => {
      const productActive = await getIds((activePage - 1) * PAGINATION_LIMIT);
      const productValue = await getProductsByIds(productActive);
      setProducts(productValue);
    };

    if (isFilter) {
      const productByIds = async () => {
        const productActive = filteredIds.slice((activePage - 1) * 50, activePage * 50);
        const productValue = await getProductsByIds(productActive);
        setProducts(productValue);
      };
      productByIds()
        .then(() => setIsLoader(false));
    }

    if (!isFilter) {
      ids()
        .then(() => setIsLoader(false));
    }
  }, [activePage]);

  useEffect(() => {
    setIsLoader(true);

    const filtIds = async () => {
      const ids = await getIdsByFilter(filterParams);
      if (!ids) return;
      setFilteredIds(ids);
      setCountFilterIds(ids.length);
    };

    filtIds()
      .then(() => setIsLoader(false));
  }, [filterParams]);

  useEffect(() => {
    if (isFilter) {
      const filter = async () => {
        const activeIds = filteredIds.slice(0, 50);
        const activeProducts = await getProductsByIds(activeIds);
        setProducts(activeProducts);
      };
      filter()
        .then(() => setIsLoader(false));
    }
  }, [filteredIds]);

  const onChangePage = (numberPage) => {
    if (numberPage) setActivePage(numberPage);
  };

  const onChangeFilter = (value, options) => {
    setIsFilter(true);
    setFilterParams({
      value,
      options,
    });
  };
  const resetFilter = () => {
    setIsFilter(false);
  };

  return (

    <Loader active={isLoader}>

      <Filter onChangeFilter={onChangeFilter} resetFilter={resetFilter}/>
      {!!products.length && (
        <ul className={styles.list}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              brand={product.brand}
              price={product.price}
              product={product.product}
            />
          ))}
        </ul>
      )}
      <Pagination
        limit={PAGINATION_LIMIT}
        count={!isFilter ? countAllIds : countFilterIds}
        page={activePage}
        indent={1}
        onChangePage={onChangePage}
      />

      {isFilter && filteredIds.length === 0 &&
        <p>Товаров с такой характеристикой нет. Попробуйте найти по другим параметрам!</p>}

    </Loader>

  );
}

export default ProductList;
