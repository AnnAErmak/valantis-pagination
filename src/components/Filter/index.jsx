import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './style.module.css';

function Filter({ onChangeFilter, resetFilter }) {

  const [selectedOption, setSelectedOption] = useState('brand');
  const [valueSearch, setValueSearch] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlerClick = () => {
    onChangeFilter(valueSearch, selectedOption);
  };
  const onChangeSearch = (value) => {
    if (selectedOption === 'price') setValueSearch(+value);
    if (selectedOption !== 'price') setValueSearch(value);
  };
  const handlerClickClose = () => {
    setValueSearch('')
    setSelectedOption('brand');
    resetFilter()
  }
  return (
    <form className={styles.filterForm}>
      <div className={styles.radioWrapper}>

          <input
            className={styles.radioButton}
            id="brand"
            type="radio"
            value="brand"
            checked={selectedOption === 'brand'}
            onChange={handleOptionChange}
          />
        <label htmlFor="brand">
          Бренд
        </label>

          <input
            className={styles.radioButton}
            id='price'
            type="radio"
            value="price"
            checked={selectedOption === 'price'}
            onChange={handleOptionChange}
          />
        <label htmlFor="price">
          Цена
        </label>

          <input
            className={styles.radioButton}
            id='product'
            type="radio"
            value="product"
            checked={selectedOption === 'product'}
            onChange={handleOptionChange}
          />
        <label htmlFor='product'>
          Наименование
        </label>
      </div>
      <div className={styles.wrapperSearch}>
        <input className={styles.inputSearch} type="text" value={valueSearch} placeholder="Поиск..."
               onChange={(e) => onChangeSearch(e.target.value)}/>
        <IoSearchSharp className={`${styles.iconSearch} ${!valueSearch && styles.disable}`}
                       onClick={() => handlerClick(selectedOption, valueSearch)}/>
        <IoCloseSharp className={styles.iconClose}
                      onClick={handlerClickClose}
        />
      </div>

    </form>
  );
}

export default Filter;
