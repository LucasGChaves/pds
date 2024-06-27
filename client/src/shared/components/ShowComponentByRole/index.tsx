import { ReactNode } from "react";
import { useMyContext } from "../../context/MyContext";

interface Props {
  children: ReactNode;
  role: string;
}

const ShowComponentByRole = ({ children, role }: Props) => {
  const { user } = useMyContext();
  if (user.role.roleName === role) return <>{children}</>;
  return undefined;
};

export default ShowComponentByRole;
