export const getIsValidPhone = (phone: string) => {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
};
