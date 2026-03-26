import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/redux/Auth/Action";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data));
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      form.setError("root", { type: "manual", message: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full lg:w-[480px] h-auto lg:h-[551px] border-1 bg-[#eff4f4] p-6 rounded-xl border bg-card text-card-foreground shadow mx-auto max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Username"
                      className="flex w-full border border-gray-300 rounded-md py-4 px-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="flex w-full border border-gray-300 rounded-md py-4 px-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#004C7B] text-white hover:bg-[#003a6e] rounded-lg py-2"
            >
              Login
            </Button>
            {form.formState.errors.root?.message ? (
              <p className="text-sm text-red-600 text-center">
                {form.formState.errors.root.message}
              </p>
            ) : null}

            <div className="mt-4 text-center">
              <a
                href="/passwordrecovery"
                className="text-sm text-[#004C7B] hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
