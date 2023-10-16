"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Tenant } from "@/types";
import useLangStore from "@/store/langagueStore";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Textarea } from "../ui/textarea";

export const questionnaireSchema = z.object({
  name: z.string().min(4, {
    message:
      "Name must be at least 4 characters.",
  }),
  description: z.string().min(1, {
    message:

      "This field can't be empty.",
  }),
  vendor: z.string().min(1, {
    message:
      "This field can't be empty.",
  }),
  questions: z.array(
    z.object({
      value: z.string().min(1, {
        message:
          "This field can't be empty.",
      }),
    })
  ),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
});

type TenantFormProps = {
  onSubmit: (data: z.infer<typeof questionnaireSchema>) => void;
  formType: "add" | "edit" | "view";
  tenant?: Tenant;
  questionnaire: any;
};

const QuestionnaireForm = ({
  onSubmit,
  formType,
  questionnaire,
}: TenantFormProps) => {
  const langStore = useStore(useLangStore, (state) => state);
  const dict = langStore?.getDictionary();
  const FormSchema = z.object({
    name: z.string().min(4, {
      message:
        dict?.FromSchemaValidation.name ||
        "Name must be at least 4 characters.",
    }),
    description: z.string().min(1, {
      message:
        dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
        "This field can't be empty.",
    }),
    vendor: z.string().min(1, {
      message:
        dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
        "This field can't be empty.",
    }),
    questions: z.array(
      z.object({
        value: z.string().min(1, {
          message:
            dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
            "This field can't be empty.",
        }),
      })
    ),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    id: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: questionnaire?.name,
      description: questionnaire?.description,
      vendor: questionnaire?.vendor,
      questions: questionnaire?.questions,
      created_at: questionnaire?.created_at,
      updated_at: questionnaire?.updated_at,
      id: questionnaire?.id,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel
                  className={cn({
                    "text-right": langStore?.rtl,
                  })}
                >
                  {dict?.name || "Name"}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl,
                    })}
                    disabled={formType === "view"}
                    placeholder={dict?.name || "Name"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel
                  className={cn({
                    "text-right": langStore?.rtl,
                  })}
                >
                  {dict?.vendor || "Vendor"}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl,
                    })}
                    placeholder={dict?.vendor || "Vendor"}
                    disabled={formType === "view"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel
                  className={cn({
                    "text-right": langStore?.rtl,
                  })}
                >
                  {dict?.description || "Description"}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn({
                      "text-right": langStore?.rtl,
                    })}
                    placeholder={dict?.description || "Description"}
                    disabled={formType === "view"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`questions.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "w-100 flex	items-center ",
                      index !== 0 && "sr-only",
                      { "flex-row-reverse": langStore?.rtl }
                    )}
                  >
                    {dict?.questions || "questions"}
                    <Button
                      type="button"
                      size="sm"
                      className={cn(
                        "bg-green-500",
                        langStore?.rtl ? "mr-2 " : "ml-2 "
                      )}
                      onClick={() => append({ value: "" })}
                    >
                      <Icons.add className="w-5 h-5" />
                    </Button>
                  </FormLabel>

                  <div
                    className={cn("flex items-center", {
                      "flex-row-reverse": langStore?.rtl,
                    })}
                  >
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={formType === "view"}
                        className={cn({
                          "text-right": langStore?.rtl,
                        })}
                      />
                    </FormControl>
                    {formType !== "view" && (
                      <Button
                        className={cn(
                          "bg-red-500",
                          langStore?.rtl ? "mr-3" : "ml-3"
                        )}
                        type="button"
                        size="sm"
                        disabled={index === 0}
                        onClick={() => remove(index)}
                      >
                        <Icons.delete className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {formType !== "view" && (
          <div
            className={cn("mt-3", {
              "flex flex-row-reverse": langStore?.rtl,
            })}
          >
            <Button type="submit">
              {dict?.updateQuestionnaire || "Update Questionnaire"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
export default QuestionnaireForm;
