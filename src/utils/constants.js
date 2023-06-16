export const constants = {
  emailPattern: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
};

export const userChar = (name) => {
  return name.charAt(0).toUpperCase();
};
