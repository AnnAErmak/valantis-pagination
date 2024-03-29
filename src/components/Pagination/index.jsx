import React from 'react';
import style from './style.module.css'

const Pagination = ({count, limit, page, indent, onChangePage}) => {

  const length = Math.ceil(count / Math.max(limit, 1));

  let left = Math.max(page - indent, 1);
  let right = Math.min(left + indent * 2, length);

  left = Math.max(right - indent * 2, 1);

  const items = [];

  if (left > 1) items.push(1);
  if (left > 2) items.push(null);

  for (let pag = left; pag <= right; pag += 1) items.push(pag);

  if (right < length - 1) items.push(null);
  if (right < length) items.push(length);
  return (
    <ul className={style.list}>
      {items.map((number, index) => (
        <li className={`${style.item} ${number === page && style.active}`} key={index} onClick={() => onChangePage(number)}>
          {number || '...'}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
