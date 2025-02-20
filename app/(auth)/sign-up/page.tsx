"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { signUpSchema } from "../schema";
import { Separator } from "@/components/ui/separator";
import { roles } from "../constants";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { role } from "../types";

const SignUpPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: role.USER,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof signUpSchema>) => {
      return apiClient.post(`/auth/register`, {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Congratulations! You have successfully signed up",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Sign up failed please try again",
        variant: "error",
      });
      console.error("Sign up failed", error);
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
    mutate(values);
  };
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <Separator className="bg-gray-100" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div className="flex flex-row px-3 py-2 bg-gray-100 rounded-md">
                      {roles.map((role) => (
                        <div
                          key={role.value}
                          onClick={() => field.onChange(role.value)}
                          className={cn(
                            "w-full bg-transparent p-2 rounded-md text-center text-sm font-medium cursor-pointer transition-colors hover:font-semibold hover:bg-mainColor/20",
                            field.value === role.value &&
                              "bg-mainColor text-white"
                          )}
                        >
                          {role.label}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              loading={isPending}
              size="lg"
              className="w-full"
              variant="primary"
            >
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-[12px]">
            Already have an account?
            <Link href="/login">
              <span className="text-mainColor">&nbsp;Sign In</span>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
