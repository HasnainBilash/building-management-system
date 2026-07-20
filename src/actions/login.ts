"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export async function loginUser(
  _prevState: any,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            errors: {
              email: ["Invalid email or password."],
            },
          };

        default:
          return {
            success: false,
            errors: {
              general: ["Something went wrong."],
            },
          };
      }
    }

    throw error;
  }
}