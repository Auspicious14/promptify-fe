"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormikHelpers } from "formik";
import { AxiosClient } from "../../components";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "../../../helper";

export const FREE_TRIAL_LIMIT = 3;

export interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  authStatus: "authenticated" | "unauthenticated";
  usage: {
    remaining: number;
    count: number;
  } | null;
  signUp: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  signIn: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  fetchUsage: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<
    "authenticated" | "unauthenticated"
  >("unauthenticated");
  const [usage, setUsage] = useState<{
    remaining: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    const { pathname } = router;
    const authRoutes = ["/signin", "/signup", "/forgot-password"];
    if (authRoutes.includes(pathname)) {
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await AxiosClient.get("/auth/check");
        const data = res.data;
        if (data.authenticated) {
          setAuthStatus("authenticated");
          setUser(data.data);
        } else {
          setAuthStatus("unauthenticated");
          setUser(null);
        }
      } catch (err) {
        setAuthStatus("unauthenticated");
        setUser(null);
      }
    };
    checkAuth();
  }, [router]);
  const handleAuthRequest = async (
    url: string,
    values: any,
    type: "signup" | "signin"
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AxiosClient.post(url, values);
      const data = response.data?.data;
      if (data) {
        if (type === "signin") {
          localStorage.setItem("token", data.token);
          setCookie("token", data?.token, 3);
          setUser(data);
        }
        toast.success("Success!");
        window.location.href = type === "signup" ? "/signin" : `/`;
        // router.push(type === "signup" ? "/signin" : `/`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = useCallback(
    async (values: any, actions: FormikHelpers<any>) => {
      await handleAuthRequest("/signup", values, "signup");
      actions.setSubmitting(false);
    },
    []
  );

  const signIn = useCallback(
    async (values: any, actions: FormikHelpers<any>) => {
      await handleAuthRequest("/login", values, "signin");
      actions.setSubmitting(false);
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      await AxiosClient.post("/forgetPassword", { email });
      toast.success("Password reset email sent");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUsage = async () => {
    const res = await AxiosClient.get("/trialUsage");
    const data = res.data;
    if (data) {
      setUser((prevUser: any) => ({
        ...prevUser,
        usage: data.usage,
      }));
    }
    setUsage({ remaining: data.remaining, count: data.count });
  };

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    deleteCookie("token");
    setUser(null);
    setAuthStatus("unauthenticated");
    toast.success("Signed out successfully");
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        isLoading,
        error,
        usage,
        signUp,
        signIn,
        signOut,
        forgotPassword,
        fetchUsage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
