import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Plus, Science } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORY_LABELS } from "@/lib/universum-data";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, "Название слишком короткое"),
  vendor: z.string().min(2, "Укажите производителя"),
  category: z.string(),
  description: z.string().min(20, "Описание должно быть подробным"),
  impactMetric: z.string(),
  impactValue: z.coerce.number().min(1).max(100),
  scientificBasis: z.string().url("Укажите корректную ссылку на DOI/исследование"),
});

export const Route = createFileRoute("/vendor/add-product")({
  head: () => ({
    meta: [
      { title: "Добавить продукт — UNIVERSUM для вендоров" },
    ],
  }),
  component: AddProductPage,
});

function AddProductPage() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      vendor: "",
      category: "hardware",
      description: "",
      impactMetric: "",
      impactValue: 60,
      scientificBasis: "",
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values);
    toast.success("Продукт отправлен на валидацию UNIVERSUM");
    form.reset();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Добавить решение в маркетплейс</h1>
        <p className="mt-2 text-muted-foreground">
          Заполните данные о вашем оборудовании или ПО. Для прохождения валидации UNIVERSUM
          необходимо указать научное обоснование и метрики API.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название продукта</FormLabel>
                  <FormControl>
                    <Input placeholder="Интерактивный тренажёр..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Производитель</FormLabel>
                  <FormControl>
                    <Input placeholder="ООО Инновации..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип решения</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Расскажите о возможностях вашего оборудования..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-primary">
              <Building2 className="size-5" /> Маппинг на UNIVERSUM API
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="impactMetric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Целевая метрика развития</FormLabel>
                    <FormControl>
                      <Input placeholder="hand_eye_coordination" {...field} />
                    </FormControl>
                    <FormDescription>Код метрики из документации API</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="impactValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Интенсивность влияния (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Процент улучшения показателя за курс</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="scientificBasis"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Научное обоснование (DOI / URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://doi.org/..." {...field} />
                  </FormControl>
                  <FormDescription>Ссылка на исследование эффективности</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Plus className="mr-2 size-4" /> Добавить в каталог
          </Button>
        </form>
      </Form>
    </div>
  );
}
