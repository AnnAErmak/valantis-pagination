import generatePassword from './generatePassword';
import { BASE_URL, PAGINATION_LIMIT } from '../variables/variables';
import removeDuplicates from './removeDuplicates.js';

const getData = async (body) => {
  const params = {
    method: 'POST',
    headers: {
      'X-Auth': generatePassword(),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(BASE_URL, params);

    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();

    return data.result;

  } catch (err) {
    console.log(err);
    // await getData(body);
  }
};

const getIds = async (offset) => {
  const params = offset >= 0 ? {
    offset,
    limit: PAGINATION_LIMIT,
  } : null;
  const body = {
    action: 'get_ids',
    params: params || {},
  };

  const ids = await getData(body);

  return ids;
};

const getProductsByIds = async (ids) => {

  const body = {
    action: 'get_items',
    params: { ids },
  };
  const products = await getData(body);
  const noTakes = removeDuplicates(products);
  return noTakes;
};

const getIdsByFilter = async (filterParams) => {
  const body = {
    action: 'filter',
    params: { [filterParams.options]: filterParams.value },
  };
  const products = await getData(body);
  return products;
};

export { getIds, getProductsByIds, getIdsByFilter };
