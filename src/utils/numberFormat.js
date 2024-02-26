const numberFormat = (value, locale = 'ru-RU') => {
  return new Intl.NumberFormat(locale).format(value);
};

export default numberFormat;
