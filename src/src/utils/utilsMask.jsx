export const maskTime = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(\d{2})(\d)/, '$1');
};

export const removeMaskTime = (value) => {
  return value.split(':');
};
