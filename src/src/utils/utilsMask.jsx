export const maskTime = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(\d{2})(\d)/, '$1');
};

export const removeMaskTime = (value) => {
  return value.split(':');
};

export const firstMaskValue = (value) => {
  const cleanValue = (Number.parseInt(value) / 1000).toString();
  let formattedValue;

  switch (cleanValue.length) {
    case 1:
      formattedValue = '000' + cleanValue;
      break;
    case 2:
      formattedValue = '00' + cleanValue;
      break;
    case 3:
      formattedValue = '0' + cleanValue;
      break;
    default:
      formattedValue = cleanValue;
  }
  return maskTime(formattedValue);
};
