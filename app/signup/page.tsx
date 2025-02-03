'use client'


import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from 'next/link';


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email().transform((value) => value.trim()),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .transform((value) => value.trim()),
  name: z.string().min(5).transform((value) => value.trim()),
});

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "".trim(),
      password: "".trim(),
      name: "".trim(),
    },
  });

  const handleSignup = async (values: z.infer<typeof schema>) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      console.log(values);
      router.push("/verify-notice");
    } else {
      alert("Error creating account");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Signup</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormDescription className="text-sm text-gray-500">
              Password must be at least 8 characters long and contain at least
              one letter, one number, and one special character.
            </FormDescription>
            <p>Already have an account? <Link href='/login' className="text-indigo font-bold underline">Log in</Link></p>
            <Button
              type="submit"
              className="w-full bg-indigo py-2 rounded-md hover:bg-indigo-600 transition"
            >
              Signup
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}