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
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  );
};

export default LoginPage;
