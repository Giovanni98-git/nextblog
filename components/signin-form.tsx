"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";

const SignInFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

type SignInFormValues = z.infer<typeof SignInFormSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = () => {
    authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const signInWithGoogle = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              {isLoading ? <Spinner className="size-6" /> : "Sign In"}
            </Button>
            <p>
              Don't have an account ?{" "}
              <Link href="/sign-up" className="text-blue-600">
                Sign up
              </Link>
            </p>
            <Separator />
            <Button
              type="button"
              className="text-[13px] cursor-pointer"
              onClick={signInWithGithub}
            >
              Continue with Github
            </Button>
            <Button
              type="button"
              className="text-[13px] cursor-pointer"
              onClick={signInWithGoogle}
            >
              Continue with Google
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
