import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.jpg";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
      <Link href="/" className="flex items-center">
        <Image
          src={Logo}
          width={"150"}
          height={"60"}
          className="h-16 w-auto"
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/events?create=true">
          <Button className="flex items-center gap-2">
            {" "}
            <PenBox size={18} /> Create event
          </Button>
        </Link>
        <Button variant={"outline"}>Login</Button>
      </div>
    </nav>
  );
};

export default Header;
