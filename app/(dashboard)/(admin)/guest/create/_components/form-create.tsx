"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formSchema, Gender, genderList, Relationship } from "./schema";
import { useAddGuest } from "./mutation/use-add-guest";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const FormCreate = () => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();
  const addEquipment = useAddGuest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cin: 0,
      numPassport: 0,
      fullName: "",
      email: "",
      phone: "",
      age: 0,
      gender: Gender.MALE,
      relationship: Relationship.OTHER,
      members: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      addEquipment.mutate(values);
      toast({
        title: "Succés",
        description: "Guest created successfully",
        variant: "success",
      });
      handleReset();
      setLoading(false);
      router.push("/guest");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "error",
      });
      setLoading(true);
    }
  }

  const handleSelectGender = (e: Gender) => {
    setGender(e);
    form.setValue("gender", e);
  };

  const handleReset = () => {
    form.reset();
    setGender(Gender.MALE);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="e.g John.doe" {...field} />
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
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Johndoe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID CARD</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g 123456789"
                    {...field}
                    minLength={6}
                    maxLength={8}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numPassport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  PASSPORT NUMBER
                  <span className="text-gray-500">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g 123456789"
                    {...field}
                    minLength={6}
                    maxLength={8}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Gender</p>
            <div className="flex gap-2">
              {genderList.map((e) => (
                <div
                  key={e.value}
                  className={cn(
                    "flex items-center gap-2 py-2 px-5 rounded-md border cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out",
                    gender === e.value && "bg-gray-200 border-gray-300"
                  )}
                  onClick={() => handleSelectGender(e.value)}
                >
                  <p className="font-medium text-base">{e.label}</p>
                  <e.icon />
                </div>
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g 123456789"
                    {...field}
                    minLength={6}
                    maxLength={8}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g 1"
                    {...field}
                    minLength={1}
                    maxLength={2}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-3"></div>

        <div className="flex flex-row gap-2">
          <Button
            type="reset"
            variant="outline"
            onClick={() => handleReset()}
            loading={loading}
          >
            Reset
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCreate;
