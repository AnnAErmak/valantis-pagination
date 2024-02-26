import generatePassword from './generatePassword';
import { BASE_URL, PAGINATION_LIMIT } from '../variables/variables';

const apiResponse = async (params) => {
  const res = await fetch(BASE_URL, params);
  return res.json();
};

const apiBody = (data) => {
  const params = {
    method: 'POST',
    headers: {
      'X-Auth': generatePassword(),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  return params;
};

const getAllIds = async () => {
  const body = {
    action: 'get_ids',
  };
  const params = apiBody(body);
  const ids = await apiResponse(params);
  // const idsWithoutDuplicates = [...new Set(ids.result)];
  // return idsWithoutDuplicates.length;
  return ids.result.length;
};

const getIdsItem = async (activePage) => {
  let offset = 0;
  if (activePage > 1) offset = (activePage - 1) * 50;
  const body = {
    action: 'get_ids',
    params: {
      offset,
      limit: PAGINATION_LIMIT,
    },
  };
  const params = apiBody(body);
  const idsItem = await apiResponse(params);
  const body2 = {
    action: 'get_items',
    params: { ids: idsItem.result },
  };
  const params2 = apiBody(body2);
  const Items = await apiResponse(params2);

  const items = Items.result;
  const uniqueArray = items.filter((obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id));
  return uniqueArray;
};

const getFilteredProducts = async (filterParams) => {
  const body = {
    action: 'filter',
    params: { [filterParams.options]: filterParams.value },
  };

  const params = apiBody(body)
  const ids = await apiResponse(params)
  const body2 = {
    action: 'get_items',
    params: { ids: ids.result },
  };
  const params2 = apiBody(body2);
  const Items = await apiResponse(params2);
  const items = Items.result;
  const uniqueArray = items.filter((obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id));
  return uniqueArray;
};

const getFilteredIds = async (filterParams) => {
  const body = {
    action: 'filter',
    params: { [filterParams.options]: filterParams.value },
  };
  const params = apiBody(body)
  const ids = await apiResponse(params)
  return ids.result
}

const getItems = async (ids) => {
  const body2 = {
    action: 'get_items',
    params: { ids },
  };

  const params2 = apiBody(body2);
  const Items = await apiResponse(params2);
  const items = Items.result;

  const uniqueArray = items.filter((obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id));
  return uniqueArray;
}

export { getAllIds, getIdsItem, getFilteredProducts, getFilteredIds, getItems };
