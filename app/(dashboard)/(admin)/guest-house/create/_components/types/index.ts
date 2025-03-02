export enum ContactType {
  PHONE = "PHONE",
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
  EMAIL = "EMAIL",
  WEBSITE = "WEBSITE",
}

export const contactsList = [
  {
    value: ContactType.PHONE,
    label: "Phone",
  },
  {
    value: ContactType.FACEBOOK,
    label: "Facebook",
  },
  {
    value: ContactType.INSTAGRAM,
    label: "Instagram",
  },
  {
    value: ContactType.EMAIL,
    label: "Email",
  },
  {
    value: ContactType.WEBSITE,
    label: "Website",
  },
];
