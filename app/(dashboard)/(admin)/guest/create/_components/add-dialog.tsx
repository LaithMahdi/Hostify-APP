import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Gender, genderList, Relationship, relationshipsList } from "./schema";
import {
  Form,
  FormControl,
  FormDescription,
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: {
    fullName: string;
    isManier: boolean;
    gender: Gender;
    relationship: Relationship;
  }[];
  setMembers: React.Dispatch<
    React.SetStateAction<
      {
        fullName: string;
        isManier: boolean;
        gender: Gender;
        relationship: Relationship;
      }[]
    >
  >;
}

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  gender: z.nativeEnum(Gender).default(Gender.MALE),
  relationship: z.nativeEnum(Relationship).default(Relationship.OTHER),
  isManier: z.boolean().default(false),
});

const AddDialog = ({ open, onOpenChange, members, setMembers }: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      isManier: false,
      gender: Gender.MALE,
      relationship: Relationship.OTHER,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  const handleSelectGender = (e: Gender) => {
    setGender(e);
    form.setValue("gender", e);
  };

  const handleReset = () => {
    form.reset();
    setGender(Gender.MALE);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Membre</DialogTitle>
          <DialogDescription>
            This action will add a new member to the guest list. Please confirm
            to
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
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
                          {e.value}
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
              name="isManier"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Is Manier?</FormLabel>
                    <FormDescription>
                      Check this if the guest is a manier.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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

            <div className="flex flex-row gap-2 mt-3 justify-end">
              <Button
                type="reset"
                variant="outline"
                onClick={() => handleReset()}
              >
                Reset
              </Button>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
