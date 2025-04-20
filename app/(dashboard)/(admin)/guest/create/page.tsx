import BreadCrumbList from "@/components/shared/bread-crumb-list";
import FormCreate from "./_components/form-create";

const page = () => {
  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Guest", href: "/guest" },
          { label: "Create", href: "/guest/create" },
        ]}
      />

      <h1 className="text-3xl font-semibold mb-3">Create Guest</h1>

      <FormCreate />
    </section>
  );
};

export default page;
