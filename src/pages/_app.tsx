import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import SideNav from "./components/SideNav";
import UsersPage from "./components/UsersPage";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session} >
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="This is a twitter clone" />
      </Head>
      <div className="md:flex-row md:flex bg-black text-slate-200">
        <SideNav />
        <div className="md:w-7/12">
          <Component {...pageProps} />
        </div>
      </div>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
