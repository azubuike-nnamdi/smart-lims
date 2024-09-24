"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FORGOT_PASSWORD_URL, REGISTER_URL } from "@/config/routes";
import { InputWithIcon } from "../ui/input-with-icon";

// Form validation schema
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    // Add your sign-up logic here
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-[36px] font-semibold leading-none">Login</h1>
      <p className="text-[#676E76] text-[14px] pb-4">Enter your details to log in</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputWithIcon
                    placeholder="hello@email.com"
                    icon={Mail}
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
                  <InputWithIcon
                    placeholder="********"
                    type="password"
                    icon={Lock}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="flex justify-end leading-none">
                  <Link
                    href={FORGOT_PASSWORD_URL}
                    className="text-black font-semibold text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-[14px] font-semibold"
            loading={isLoading}
            loadingText="Signing up..."
          >
            Log in <ArrowRight className="ml-3" />
          </Button>
        </form>
      </Form>
      <p className="text-[#676E76] text-[14px] mt-6">
        Don&apos;t have an account?{" "}
        <Link href={REGISTER_URL} className="font-semibold text-black">
          Create an account
        </Link>
      </p>
    </div>
  );
}
