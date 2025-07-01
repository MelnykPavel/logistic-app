"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { actionSignIn } from "@/server/actions/auth/action-sign-In";
import { appRoutes } from "@/utils/appRoutes";
import { cn } from "@/utils/cn";
import { Loader2Icon } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { ComponentProps, useActionState } from "react";

export function SignInForm({ className, ...props }: ComponentProps<"form">) {
  const [state, formAction, pending] = useActionState(actionSignIn, {});

  return (
    <Form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      action={formAction}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sing in to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to sing in to your account
        </p>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="m@example.com"
            defaultValue={state.values?.email || ""}
            autoComplete="username"
          />
          <FormField onlyError error={state.errors?.email} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
          <FormField onlyError error={state.errors?.password} />
        </div>
        <FormField onlyError error={state.errors?.form} />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Please wait
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link href={appRoutes.signUp} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </Form>
  );
}
