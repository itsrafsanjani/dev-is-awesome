import Container from "@/components/Container";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import { AuthService } from "@/services/auth-service";
import { CustomNextPage } from "@/types/next";
import { getAuth, User } from "firebase/auth";
import { GetStaticProps } from "next";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LogInPage: CustomNextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const onSignInWithGoogle = useCallback(async () => {
    AuthService.signInWithGoogle();
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <PageHeader title={user ? "You are logged in" : " Log In"} />
      <Container className="my-16 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl w-full p-8 shadow-xl">
          {user ? (
            <div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {!!user.photoURL && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                      src={user.photoURL}
                      alt="User avatar"
                      layout="fill"
                    />
                  )}
                </div>
                <h3>{user.displayName}</h3>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">Log in with</p>
              {[
                {
                  label: "Log In With Google",
                  onClck: onSignInWithGoogle,
                  icon: <FaGoogle className="text-2xl" />,
                },
              ].map((item, index) => (
                <button
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 w-full items-center justify-center text-start flex gap-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={item.onClck}
                >
                  <div>{item.icon}</div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

LogInPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default LogInPage;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
