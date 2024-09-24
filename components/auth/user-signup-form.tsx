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
import { Phone, User, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LOGIN_URL } from "@/config/routes";
import { InputWithIcon } from "../ui/input-with-icon";

// Form validation schema
const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
      <h1 className="text-[36px] font-semibold leading-none">Create an account</h1>
      <p className="text-[#676E76] text-[14px] pb-4 ">Enter your details to sign up</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="First name"
                      icon={User}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Last name"
                      icon={User}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <InputWithIcon
                    placeholder="0801 234 5678"
                    icon={Phone}
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
            Create account <ArrowRight className="ml-3" />
          </Button>
        </form>
      </Form>
      <p className="text-[#676E76] text-[14px] mt-6">
        Already have an account? <Link href={LOGIN_URL} className="font-semibold text-black">Login to your account</Link>
      </p>
    </div>
  );
}
