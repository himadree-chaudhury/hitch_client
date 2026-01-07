"use client";

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
import { IResponseError } from "@/types/response.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// * Register form validation using the provided Zod schema
const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Please enter a password")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});

export function Register() {
  // *Form type check-up via Zod & setting default values
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [errMessage, setErrMessage] = useState<string | null>(null);

  // *Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating account...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData: IResponseError = await response.json();
        setErrMessage(
          errorData.errors ? errorData.errors[0] : errorData.message
        );
        throw errorData;
      }
      toast.success("User logged in successfully", { id: toastId });
      router.push("/login");
    } catch (error: unknown) {
      const err = error as IResponseError;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  return (
    <div className="flex flex-col gap-6 border p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h1 className="font-bold text-4xl text-center my-5">Create Account</h1>
      {errMessage && (
        <div
          className="p-4 text-sm text-red-700 bg-red-100 rounded-lg text-center"
          role="alert"
        >
          {errMessage}
        </div>
      )}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          {/* Optional social login placeholder */}
        </div>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
