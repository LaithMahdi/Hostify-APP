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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateGuest } from "./mutation/use-update-guest";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import { Item } from "../../../page";
import {
  formSchema,
  Gender,
  genderList,
  Relationship,
  relationshipsList,
} from "../../../create/_components/schema";
import UpdateDialog from "./update-dialog";

interface Props {
  item: Item;
}

const FormUpdate = ({ item }: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<
    {
      fullName: string;
      isManier: boolean;
      gender: Gender;
      relationship: Relationship;
    }[]
  >([
    ...item.membre.map((e) => ({
      fullName: e.fullName,
      isManier: e.isManier,
      gender: e.gender as Gender,
      relationship: e.relationship as Relationship,
    })),
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const updateGuest = useUpdateGuest(item.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cin: item.cin.toString() ?? "0",
      numPassport: item.numPassport.toString() ?? "0",
      fullName: item.fullName ?? "",
      email: item.email ?? "",
      phone: item.phone.toString() ?? "",
      age: item.age.toString() ?? "0",
      gender: item.gender === "MALE" ? Gender.MALE : Gender.FEMALE,
      relationship:
        item.membre[0]?.relationship === "SPOUSE"
          ? Relationship.SPOUSE
          : Relationship.OTHER,
      members: item.membre.map((e) => ({
        fullName: e.fullName,
        isManier: e.isManier,
        gender: e.gender as Gender,
        relationship: e.relationship as Relationship,
      })),
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      updateGuest.mutate({
        ...values,
        cin: values.cin.toString(),
        numPassport: values.numPassport.toString(),
        members,
      });
      toast({
        title: "Succés",
        description: "Guest updated successfully",
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
      setLoading(false);
    }
  }

  const handleSelectGender = (e: Gender) => {
    setGender(e);
    form.setValue("gender", e);
  };

  const handleReset = () => {
    form.reset();
    setGender(Gender.MALE);
    setMembers([]);
  };

  return (
    <>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Johndoe@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col lg:flex-row gap-2">
              <FormField
                control={form.control}
                name="cin"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>ID CARD</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g 123456789"
                        {...field}
                        min={6}
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
                  <FormItem className="flex-1">
                    <FormLabel>
                      PASSPORT NUMBER
                      <span className="text-gray-500">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g 123456789"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RelationShip</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipsList.map((e) => (
                        <SelectItem value={e.value} key={e.value}>
                          {e.label}
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g 123456789"
                      {...field}
                      min={6}
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
                      min={1}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Members</h1>
              <Button
                type="button"
                onClick={() => setOpen(true)}
                size="sm"
                variant="primary"
                className="!w-10 !h-10 p-0 rounded-full "
              >
                <Plus className="text-white" />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {members.length > 0 ? (
                members.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                  >
                    <div className="space-y-0.5">
                      <p className="font-medium text-lg">
                        {e.fullName}

                        <span className="ms-1 text-sm text-gray-500">
                          ({e.gender})
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">{e.relationship}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out"
                        onClick={() => {
                          const newMembers = members.filter(
                            (_, index) => index !== i
                          );
                          setMembers(newMembers);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No members added yet. Click on the plus button to add members.
                </p>
              )}
            </div>
          </div>

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
      <UpdateDialog
        open={open}
        onOpenChange={setOpen}
        members={members}
        setMembers={setMembers}
      />
    </>
  );
};

export default FormUpdate;
