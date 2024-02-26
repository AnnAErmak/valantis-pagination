import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";


function Filter({onChangeFilter}) {

  const [selectedOption, setSelectedOption] = useState('brand');
  const [valueSearch, setValueSearch] = useState('')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlerClick = () => {
    onChangeFilter(valueSearch, selectedOption)
  }
  const onChangeSearch = (value) => {
    setValueSearch(value)
  }
  return (
    <form>
      <label>
        <input
          type="radio"
          value="brand"
          checked={selectedOption === "brand"}
          onChange={handleOptionChange}
        />
        Бренд
      </label>
      <label>
        <input
          type="radio"
          value="price"
          checked={selectedOption === "price"}
          onChange={handleOptionChange}
        />
        Цена
      </label>
      <label>
        <input
          type="radio"
          value="product"
          checked={selectedOption === "product"}
          onChange={handleOptionChange}
        />
        Наименование
      </label>
      <div>
        <input type='text' value={valueSearch} placeholder='Поиск...' onChange={(e) => onChangeSearch(e.target.value)  }/>
        <FaSearch style={{color: 'white'}} onClick={() => handlerClick(selectedOption, valueSearch)}/>
        <IoCloseSharp />
      </div>

    </form>
  );
}

export default Filter;
