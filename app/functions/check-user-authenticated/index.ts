export const checkUserAuthenticated = () => {
  const userToken = localStorage.getItem(
    process.env.NEXT_PUBLIC_USER_TOKEN ?? "token"
  );

  return userToken ? true : false;
};
