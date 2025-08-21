import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof schema>;

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginValues) => {
    login();
    setTimeout(() => {
      toast.success(`Welcome back, ${values.email}`);
      navigate("/");
    }, 300);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input type="email" placeholder="Email" {...form.register("email")}/>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              {...form.register("password")}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button type="submit" className="w-full">Log In</Button>
          <p className="text-center text-sm">
            Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
