import { APP_ROUTES } from "@/app/constants/app-routes";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
