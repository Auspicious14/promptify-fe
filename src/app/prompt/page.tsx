import AuthGuard from "@/modules/auth/guard";
import { PromptRefinerPage } from "@/modules/prompt/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Prompt = async () => {
  // const cookie = await cookies();
  // const token = cookie.get("token")?.value;
  // console.log({ cookie });
  // console.log({ token });
  // if (!token) {
  //   redirect("/signin");
  // }
  return (
    <AuthGuard>
      <PromptRefinerPage />
    </AuthGuard>
  );
};

export default Prompt;
