import { ReactNode } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface Props {
  children: ReactNode;
  role: string;
}

const ShowComponentByRole = ({ children, role }: Props) => {
  const { user } = useAuthContext();
  if (user.role.roleName === role) return <>{children}</>;
  return undefined;
};

export default ShowComponentByRole;
