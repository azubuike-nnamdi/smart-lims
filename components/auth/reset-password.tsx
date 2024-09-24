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
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { REGISTER_URL } from "@/config/routes";
import { InputWithIcon } from "../ui/input-with-icon";

// Form validation schema
const FormSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function ResetPassword() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Use react-hook-form with Zod schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
      <h1 className="text-[36px] font-semibold leading-none">Create new password</h1>
      <p className="text-[#676E76] text-[14px] pb-4">Secure your account with a new password.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter new password</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <InputWithIcon
                    placeholder="********"
                    type="confirmPassword"
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
            loadingText="Loading..."
          >
            Create new password <ArrowRight className="ml-3" />
          </Button>
        </form>
      </Form>

    </div>
  );
}
