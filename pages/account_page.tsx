import { NextPage } from "next";
import Layout from "../components/layout";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 px-14 text-center">
          You are signed in as {session.user.name} <br />
          Email Address: {session.user.email} <br />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 px-14 text-center">
        Not signed in <br />
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-teal-500 mt-4 lg:mt-0"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </Layout>
  );
};

export default LoginPage;
