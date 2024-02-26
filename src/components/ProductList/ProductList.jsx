import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProdtItem';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import {
  getAllIds,
  getFilteredIds,
  getFilteredProducts,
  getIdsItem,
  getItems
} from '../../utils/api';
import { PAGINATION_LIMIT } from '../../variables/variables';

function ProductList() {
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPageCount, setFilteredPageCount] = useState(0);

  const [idsFiltered, setIdsFiltered] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [filterParams, setFilterParams] = useState({});
  useEffect(() => {
    getAllIds()
      .then((ids) => setPageCount(ids));
  }, []);

  useEffect(() => {
    if(!isFiltered){
      getIdsItem(activePage)
        .then((items) => setProducts(items));
    }
    if(isFiltered){
      const filteredIds = idsFiltered.slice((activePage - 1) * 50, activePage * 50)
      getItems(filteredIds).then(r => setFilteredItems(r))
    }

  }, [activePage]);

  useEffect(() => {
    if (isFiltered) {

      getFilteredIds(filterParams)
        .then((ids => {
          setIdsFiltered(ids);
          setFilteredPageCount(ids.length);
          const productActive = ids.slice(0, 50)
          return productActive
        }))
        .then(productsActive => {
            getItems(productsActive).then((r) => {
              setFilteredItems(r);
            })

        });

      setActivePage(1)
    }
  }, [isFiltered]);

  const onChangePage = (numberPage) => {
    if (numberPage) setActivePage(numberPage);
  };

  const onChangeFilter = (value, options) => {
    setIsFiltered(!isFiltered);
    setFilterParams({
      value,
      options,
    });
  };


  return (
    <div>
      {isFiltered ? 'Фильтр включен' : 'Фильтр выключен'}
      <Filter onChangeFilter={onChangeFilter}/>
      {!isFiltered && !!products.length && (
        <>
          <ol>
            {products.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                brand={product.brand}
                price={product.price}
                product={product.product}
              />
            ))}
          </ol>
          <Pagination
            limit={PAGINATION_LIMIT}
            count={pageCount}
            page={activePage}
            indent={1}
            onChangePage={onChangePage}
          />
        </>
      )
      }

      {isFiltered && !!filteredItems.length && (
        <>
          <ol>
            {filteredItems.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                brand={product.brand}
                price={product.price}
                product={product.product}
              />
            ))}
          </ol>
          <Pagination
            limit={PAGINATION_LIMIT}
            count={filteredPageCount}
            page={activePage}
            indent={1}
            onChangePage={onChangePage}
          />
        </>
      )
      }
      {/* <ol> */}
      {/*   {isFiltered && !!filteredProducts.length && filteredProducts.map((product) => ( */}
      {/*     <ProductItem */}
      {/*       key={product.id} */}
      {/*       id={product.id} */}
      {/*       brand={product.brand} */}
      {/*       price={product.price} */}
      {/*       product={product.product} */}
      {/*     /> */}
      {/*   ))} */}
      {/*   {!isFiltered && !!products.length && products.map((product) => ( */}
      {/*     <ProductItem */}
      {/*       key={product.id} */}
      {/*       id={product.id} */}
      {/*       brand={product.brand} */}
      {/*       price={product.price} */}
      {/*       product={product.product} */}
      {/*     /> */}
      {/*   ))} */}

      {/* </ol> */}
      {/* <Pagination */}
      {/*   limit={PAGINATION_LIMIT} */}
      {/*   count={!isFiltered ? pageCount : filteredPageCount} */}
      {/*   page={activePage} */}
      {/*   indent={1} */}
      {/*   onChangePage={onChangePage} */}
      {/* /> */}
    </div>

  );
}

export default ProductList;
