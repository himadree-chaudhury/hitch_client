import { getUserInfo } from "@/services/auth/getUserInfo";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const userInfo = await getUserInfo();

  return <NavbarClient userInfo={userInfo} />;
};

export default Navbar;
