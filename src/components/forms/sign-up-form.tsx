"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserAction } from "@/server/actions/user/action-create-user";
import { appRoutes } from "@/utils/appRoutes";
import { cn } from "@/utils/cn";
import { Loader2Icon } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { ComponentProps, useActionState } from "react";

export function SignUpForm({ className, ...props }: ComponentProps<"form">) {
  const [state, formAction, pending] = useActionState(createUserAction, {});

  return (
    <Form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      action={formAction}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in your details below to sign up
        </p>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            defaultValue={state.values?.firstName || ""}
          />
          <FormField onlyError error={state.errors?.firstName} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            defaultValue={state.values?.lastName || ""}
          />
          <FormField onlyError error={state.errors?.lastName} />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
          <FormField onlyError error={state.errors?.password} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select name="role">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="DRIVER">Driver</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormField onlyError error={state.errors?.role} />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Please wait
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?
        <Link href={appRoutes.signIn} className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </Form>
  );
}
