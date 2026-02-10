import { BsGrid3X3Gap } from "react-icons/bs";

import imageOne from "@/assets/webToggler/funder-for-you.png";
import imageTwo from "@/assets/webToggler/funded-for-me.png";
import imageThree from "@/assets/webToggler/funded-for-us.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import logo1 from "@/assets/logo.png";
export default function WebToggler() {
  const data = [
    {
      image: imageOne,
      title: "Funded For You",
      link: "/#top",
    },
    {
      image: imageTwo,
      title: "Funded For Me",
      link: "/coming-soon",
    },
    {
      image: imageThree,
      title: "Funded For Us",
      link: "/coming-soon",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BsGrid3X3Gap className="text-xl sm:text-2xl cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-background/80 border-none space-y-5 p-5"
        align="start"
      >
        {data?.map((item) => (
          <DropdownMenuItem
            asChild
            key={item?.title}
            className="p-0 cursor-pointer hover:bg-transparent!"
          >
            <Link
              href={item?.link}
              className="aspect-[400/173] w-[400px] relative"
            >
              <Image
                src={item?.image}
                alt="image"
                width={2000}
                height={866}
                className="object-cover hover:brightness-125 transition-all duration-300 border-transparent hover:border-primary/50 border-2 rounded-[20px]"
              />
              <div className="flex items-center gap-2 absolute bottom-4 left-4">
                <div className="w-10 h-10 relative">
                  <Image
                    src={logo1}
                    alt="image"
                    fill
                    className={"object-cover"}
                  />
                </div>
                <h3 className="text-xl font-semibold">{item?.title}</h3>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
