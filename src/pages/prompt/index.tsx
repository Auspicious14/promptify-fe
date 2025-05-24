import AuthGuard from "@/modules/auth/guard";
import { PromptRefinerPage } from "@/modules/prompt/page";
import { GetServerSideProps } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Prompt = () => {
  return <PromptRefinerPage />;
};

export default Prompt;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const token = req.cookies?.token;
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
