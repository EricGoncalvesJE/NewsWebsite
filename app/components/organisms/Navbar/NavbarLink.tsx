import { Link } from "@remix-run/react";

type NavbarLinkProps = {
  url: string;
  children: React.ReactNode;
};

const NavbarLink = ({ children, url }: NavbarLinkProps) => {
  return (
    <Link
      to={url}
      className="hover:text-secondary mt-1 block rounded px-2 py-1 font-semibold text-white hover:bg-black hover:bg-opacity-10 md:ml-2 md:mt-0"
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
