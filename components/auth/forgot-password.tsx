"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { InputWithIcon } from "../ui/input-with-icon";
import { ArrowRight, Mail } from "lucide-react";
import { LOGIN_URL } from "@/config/routes";
import Link from "next/link";


// Form validation schema
const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function UserForgotPassword() {
  const [isPending, setIsPending] = React.useState(false);

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission to call forget password api
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)

  }

  return (
    <div>
      <h1 className="text-[36px] font-semibold ">Rest password</h1>
      <p className="text-[#676E76] text-[14px] pb-4">Enter your email address to receive an OTP</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  ">
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
                <p className="text-[14px] text-gray-700">Enter your email address</p>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-[14px] font-semibold"
            loading={isPending}
            loadingText="Sending..."
          >
            Send me OTP <ArrowRight className="ml-3" />
          </Button>
        </form>
      </Form>
      <p className="text-[#676E76] text-[14px] mt-6">
        Remember password?{" "}
        <Link href={LOGIN_URL} className="font-semibold text-black">
          Login instead
        </Link>
      </p>
    </div>
  );
}