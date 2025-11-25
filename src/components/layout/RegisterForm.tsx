"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Loading from "../Loading";
import { toast } from "sonner";



export const RegisterForm = () => {

  //states
  const [loading, setLoading] = useState(false);


  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      setLoading(true);
      const { name, email, password } = values;
      email.toLowerCase();

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }); 

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error)
      }

      toast.success(data.message || "Conta criada com sucesso!");
      form.reset();

    } catch (error: any) {

      if (error.message === "Usuário já cadastrado") {
        toast.info("Usuário já cadastrado. Tente fazer login.");
        return;
      }

      console.error("Erro ao criar conta:", error);
      toast.error("Erro ao criar conta. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Seu email" {...field} disabled={loading} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Crie uma senha" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
          Criar conta
        </Button>
        {loading && <Loading />}
      </form>
    </Form>
  );
}
