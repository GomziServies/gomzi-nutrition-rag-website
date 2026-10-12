export const setToken = (token) => {
  localStorage.setItem("authorization", token);
};

export const getToken = () => {
  return localStorage.getItem("authorization");
};

export const removeToken = () => {
  localStorage.removeItem("authorization");
};
