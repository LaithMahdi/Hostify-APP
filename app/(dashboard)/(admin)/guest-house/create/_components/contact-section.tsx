import { z } from "zod";
import { GuestHouse } from "./schema";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, X } from "lucide-react";
import { contactsList, ContactType } from "./types";
import { InputSelect } from "@/components/shared/input-select";

interface Props {
  formData: GuestHouse;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const ContactSection = ({ formData, errors, updateForm }: Props) => {
  const [contacts, setContacts] = useState<
    {
      type: ContactType;
      value: string;
    }[]
  >(
    formData.contacts && formData.contacts.length > 0
      ? formData.contacts
      : [{ type: ContactType.PHONE, value: "" }]
  );

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };

  const addContact = () => {
    const newContact = [...contacts, { type: ContactType.PHONE, value: "" }];
    setContacts(newContact);
    updateForm(
      "contacts",
      newContact.filter((contact) => contact.value !== "")
    );
  };

  const updateContacts = (
    index: number,
    field: string,
    value: string | ContactType
  ) => {
    const newContact = contacts.map((contact, i) => {
      if (i === index) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setContacts(newContact);
    updateForm(
      "contacts",
      newContact.filter((contact) => contact.value !== "")
    );
  };

  const removeContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
    updateForm(
      "contacts",
      newContacts.filter((contact) => contact.value !== "")
    );
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-semibold">Add Contact Information</h1>
          <p className="text-gray-500 text-sm">
            Add contact information of the guest house. You can add multiple
            contacts.
          </p>
        </div>
        <Button
          className="rounded-full !size-10"
          variant="primary"
          onClick={addContact}
          type="button"
        >
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image" className="text-slate-500 font-normal">
          Images
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
      </div>
      <div className="flex flex-col gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="relative">
            <InputSelect
              options={contactsList.map((con) => {
                return { value: con.value.toString(), label: con.label };
              })}
              selectValue={`${contact.type}`}
              onSelectChange={(value) => updateContacts(index, "type", value)}
              inputValue={contact.value}
              onInputChange={(value) => updateContacts(index, "value", value)}
            />

            {index !== 0 && (
              <div className="absolute -right-1 -top-2">
                <Button
                  className="rounded-full !size-5 !p-0"
                  variant="destructive"
                  onClick={() => removeContact(index)}
                  type="button"
                >
                  <X className="size-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        {getErrorMessage("contacts") && (
          <p className="text-red-500 text-sm">{getErrorMessage("contacts")}</p>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
