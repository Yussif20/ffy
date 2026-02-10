"use client";

import Image from "next/image";

import { useGetMeQuery } from "@/redux/api/userApi";
import Container from "../Global/Container";
import { Skeleton } from "@/components/ui/skeleton"; // make sure ShadCN skeleton is imported

import userImg from "@/assets/user.png";
import { Link } from "@/i18n/navigation";

const Topbar = ({ isOpen }: { isOpen: boolean }) => {
  const { data, isLoading } = useGetMeQuery(undefined);

  // Loader while fetching user
  if (isLoading) {
    return (
      <div
        className={`bg-background border-b h-16 fixed top-0 left-0 w-full z-50 translate-all duration-200 pl-16 ${
          isOpen && "md:pl-64"
        }`}
      >
        <Container className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Skeleton className="w-40 h-6 rounded-md" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="w-24 h-4 rounded-md" />
              <Skeleton className="w-16 h-3 rounded-md" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const user = data?.data?.user;

  return (
    <div
      className={`border-b h-16 fixed top-0 left-0 w-full z-50 translate-all duration-200 pl-16 bg-background ${
        isOpen && "md:pl-64"
      }`}
    >
      <Container className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-foreground">
            Welcome back
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={`/profile`}
            className="rounded-full overflow-hidden border"
          >
            <Image
              src={!user?.profile ? userImg : `${user?.profile}`}
              alt={`${user?.fullName}`}
              width={50}
              height={50}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <h4 className="text-sm md:text-base font-semibold text-foreground">
              {user?.fullName}
            </h4>
            <h4 className="text-xs md:text-sm text-foreground/70">
              {user?.role}
            </h4>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
