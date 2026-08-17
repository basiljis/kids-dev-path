import { useState } from "react";
import { createFileRoute, useRouter, useSearch } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: AuthPage,
});

function AuthPage() {
  const router = useRouter();
  const { redirect } = useSearch({ from: "/auth" });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"parent" | "vendor" | "org">("parent");


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Регистрация успешна! Проверьте почту для подтверждения.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Вход выполнен");
        router.history.push(redirect || "/parent/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <ShieldCheck className="size-6" />
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? "Создать аккаунт" : "Войти в UNIVERSUM"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Введите данные для регистрации в системе"
              : "Используйте ваш email для входа в личный кабинет"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "Зарегистрироваться" : "Войти"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {isSignUp ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Войти" : "Зарегистрироваться"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
