"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function Login({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6 border p-8 rounded-lg shadow-lg">
      <h1 className="font-bold text-4xl text-center my-5">Welcome Back</h1>
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                //   required
              />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                //   required
              />
            </Field>
          </div>
          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </FieldDescription>
              {/* <FieldDescription className="px-6 text-center">
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </FieldDescription> */}
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
