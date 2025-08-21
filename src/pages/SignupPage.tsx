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

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof schema>;

const SignupPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const form = useForm<SignupValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values: SignupValues) => {
    setTimeout(() => {
      toast.success(`Account created for ${values.email}`);
      navigate("/login");
    }, 300);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...form.register("name")}/>
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
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            {...form.register("confirmPassword")}
          />
          <Button type="submit" className="w-full">Create Account</Button>
          <p className="text-center text-sm">
            Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
