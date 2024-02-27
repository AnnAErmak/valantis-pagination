const removeDuplicates = (items) => {
  return items.filter((obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id));
};

export default removeDuplicates;
