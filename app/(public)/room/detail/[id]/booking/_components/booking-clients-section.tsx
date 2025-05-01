"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { BadgeInfo } from "lucide-react";
import { useState } from "react";
import {
  formSchema,
  Gender,
  genderList,
  Relationship,
  relationshipsList,
} from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingClientsSection = () => {
  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["client-added-by"],
    queryFn: async () => {
      const response = await apiClient.get("client/added-by");
      return response.data;
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [members, setMembers] = useState<
    {
      fullName: string;
      isManier: boolean;
      gender: Gender;
      relationship: Relationship;
    }[]
  >([]);

  const user = data?.data[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cin: user?.cin.toString() ?? "0",
      numPassport: user?.numPassport.toString() ?? "0",
      fullName: user?.fullName == null ? "" : user?.fullName,
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      age: user?.age == null ? "0" : user?.age.toString(),
      gender: Gender.MALE,
      relationship: Relationship.OTHER,
      members: [],
    },
    mode: "onChange",
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // submit logic
  }

  const handleSelectGender = (e: Gender) => {
    setGender(e);
    form.setValue("gender", e);
  };

  return (
    <div className="flex flex-col bg-white w-full text-justify rounded-lg shadow-lg">
      <div className="flex items-center gap-2 bg-mainColor p-[18px] rounded-t-lg">
        <BadgeInfo className="text-white size-7" />
        <p className="text-white text-lg font-medium">
          Booking Clients Information
        </p>
      </div>
      <div className="flex py-4 px-5 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
          >
            <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingClientsSection;

export type DataType = {
  data: Array<{
    id: string;
    cin: number;
    numPassport: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    relationship: string;
    membre: Array<{
      id: number;
      fullName: string;
      gender: string;
      relationship: string;
      isManier: boolean;
    }>;
  }>;
};
