"use client";

import { ExpenseCategoryEnum, ExpenseCategoryLabels, IncomeCategoryEnum, IncomeCategoryLabels, TransactionSchema, TransactionType } from "@/schemas/newTransitionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

// shadcn components
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardHeader,
    CardContent

} from "../ui/card";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";


const NewTransitionForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const incomeCategoryList = IncomeCategoryEnum.options;
    const expenseCategoryList = ExpenseCategoryEnum.options;


    const form = useForm<TransactionType>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            type: "INCOME",
            amount: 0,
            category: "SALARIO",
            date: new Date().toISOString().split("T")[0],
            description: "",
        },
    });

    const onSubmit = async (data: TransactionType) => {
        setIsLoading(true);

        try {
            console.log("ENVIANDO:", data);

            // coloque sua request aqui
            // await fetch("/api/transactions", { ... })

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="space-y-3 my-4 lg-my-8 max-w-lg mx-auto">
            <CardHeader>
                <h2 className="text-xl font-semibold">Nova Transação</h2>
                <p className="text-md  text-gray-600 italic">Registre suas receitas e despesas</p>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                        {/*linha 1 */}
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {/* TIPO */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <FormControl className="w-2">
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectItem value="INCOME">Entrada</SelectItem>
                                                    <SelectItem value="EXPENSE">Saída</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* CATEGORIA */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel >Categoria</FormLabel>
                                        <FormControl >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {form.watch("type") === "INCOME"
                                                        ? incomeCategoryList.map((cat) => (
                                                            <SelectItem key={cat} value={cat}>
                                                                {IncomeCategoryLabels[cat]}
                                                            </SelectItem>
                                                        ))
                                                        : expenseCategoryList.map((cat) => (
                                                            <SelectItem key={cat} value={cat}>
                                                                {ExpenseCategoryLabels[cat]}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>

                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* VALOR */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor (R$)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        {/* DATA */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* DESCRIÇÃO */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição (opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ex: Pagamento do salário mensal, compra no mercado, etc."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* BOTÃO */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Salvando..." : "Adicionar Transação"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default NewTransitionForm;
