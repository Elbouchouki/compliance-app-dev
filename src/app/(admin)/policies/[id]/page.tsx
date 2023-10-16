"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import usePolicyStore from "@/store/policyStore";
import { FileEdit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';
import Footer from "@/components/layout/footer";
import Editor from '@/components/editor';
import { ContentState, EditorState } from 'draft-js';
import useLangStore from "@/store/langagueStore";
import BackButton from "@/components/back-button";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";
import { Icons } from "@/components/icons";


export default function PolicesDetails() {

  const params = useParams()
  const router = useRouter()
  const policyStore = useStore(usePolicyStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const policy = trpc.policy.get.useQuery({
    id: params.id as string
  })
  const utils = trpc.useContext();
  const mutation = trpc.policy.addOrUpdate.useMutation()

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(ContentState.createFromText(policy?.data?.content || ""))
  );

  const FormSchema = z.object({
    reference: z.optional(z.string()),
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    content: z.optional(z.string()),
    description: z.optional(z.string()),
    id: z.optional(z.string())
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    if (policy.data) {
      form.setValue("reference", policy?.data?.reference as string)
      form.setValue("name", policy?.data?.name as string)
      form.setValue("description", policy?.data?.description as string)
      form.setValue("content", policy?.data?.content as string || "")
      form.setValue("id", policy?.data?.id as string)
      setEditorState(
        EditorState.createWithContent(ContentState.createFromText(policy?.data?.content || ""))
      );
    }
    if (!policy.isLoading && !policy.data) {
      router.push(`/policies`)
    }
  }, [form, policy.data, policy.isLoading, router])


  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(
      {
        name: data.name,
        reference: data.reference,
        content: editorState.getCurrentContent().getPlainText(),
        description: data.description,
        id: data.id ?? undefined
      },
      {
        onSuccess: () => {
          utils.policy.get.refetch().then(() => {
            policyStore?.setEditModalOpen(false)
            policyStore?.setEditModalPolicy(undefined)
            toast.success(
              dict?.policyUpdatedSuccessfully || "Policy Updated Successfully"
            )
            router.push(`/policies`)
          })
        }
      }
    )
  }

  if (policy.isLoading || !policy.data) {
    return <Skeleton className='w-full h-full' />
  } else {
    return (
      <PageWrapper className='flex flex-col w-full h-full gap-4 px-2 ' >
        <div className={cn("w-full border-b py-2 flex flex-row gap-4 ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <BackButton />
          <div className={cn("text-lg md:text-xl font-semibold grow flex flex-row gap-2 items-center", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.policy || "Policy"
              }
            </span>
            <span>
              {" - "}
            </span>
            <span>
              {policy?.data?.name}
            </span>
          </div>
        </div>
        <div className='w-full h-full flex flex-col gap-4 justify-start'>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grow flex flex-col gap-3">
              <div className={cn('flex flex-col sm:flex-row w-full  flex-wrap gap-3', {
                "sm:flex-row-reverse": langStore?.rtl
              })}>
                <div className="w-full  sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field, fieldState }) => (
                      <FormItem
                        className="w-full flex flex-col"
                      >
                        <FormLabel className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.reference || "Reference"
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder="ref-123" {...field} />
                        </FormControl>
                        <FormDescription className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.thisIsTheReferenceForThePolicy || "This is the reference for the policy."
                          }
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem
                        className="w-full flex flex-col"
                      >
                        <FormLabel className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.name || "Name"
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder="ahmed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem
                        className="w-full flex flex-col"
                      >
                        <FormLabel className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.description || "Description"
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder={
                              dict?.description || "description"
                            } {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem
                      className="w-full flex flex-col"
                    >
                      <FormLabel className={cn({
                        "text-right": langStore?.rtl
                      })}>
                        {
                          dict?.content || "Content"
                        }
                      </FormLabel>
                      <FormControl>
                        <Editor
                          editorState={editorState}
                          setEditorState={setEditorState}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn("mt-3", {
                "flex flex-row-reverse": langStore?.rtl
              })}>
                <Button type="submit" size="sm" className={cn("flex flex-row gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}
                  disabled={mutation.isLoading}
                >
                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    hidden: !mutation.isLoading
                  })} />
                  <FileEdit
                    className={cn(" w-4 h-4", {
                      hidden: mutation.isLoading
                    })}
                  />
                  <span>
                    {
                      dict?.updatePolicy || "Update Policy"
                    }
                  </span>
                </Button>
              </div>
              <Footer className='mt-3 flex grow items-end' />
            </form>
          </Form>
        </div>
      </PageWrapper>
    )
  }

}