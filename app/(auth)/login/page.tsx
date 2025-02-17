"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signInSchema } from "../schema";
import apiClient from "@/lib/api-client";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const SignInPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof signInSchema>) => {
      return apiClient.post(`auth/login`, values);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Login successful",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "error",
      });
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <Separator className="bg-gray-100" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      {...field}
                    />
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
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href="/forgot-password" className="flex flex-row justify-end">
              <span className="text-xs font-medium text-mainColor">
                Forgot password?
              </span>
            </Link>

            <Button
              loading={isPending}
              size="lg"
              className="w-full"
              variant="primary"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-[12px]">
            Don&apos;t have an account?
            <Link href="/sign-up">
              <span className="text-mainColor">&nbsp;Sign Up</span>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
