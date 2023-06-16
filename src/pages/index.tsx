import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Posts from "./components/Posts";

const Home: NextPage = () => {

  return (
    <>
      <div className="w-full">
        <Posts />
      </div>
    </>
    );
};

      export default Home;