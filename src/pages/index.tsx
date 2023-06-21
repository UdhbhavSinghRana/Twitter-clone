import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Posts from "./components/Posts";
import UsersPage from "./components/UsersPage";

const Home: NextPage = () => {

  return (
    <>
      <div className="flex">
        <div className="w-full lg:w-2/3">
          <Posts />
        </div>
        <div className="w-0  p-2 sticky top-0 invisible lg:visible lg:w-1/3">
          <UsersPage />
        </div>
      </div>
    </>
  );
};

export default Home;