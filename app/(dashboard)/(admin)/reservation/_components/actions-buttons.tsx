import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Item } from "../page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "./delete-button";

interface Props {
  data: Item;
}

const ActionsButtons = ({ data }: Props) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-1">
      {/* <Button
        variant="outline"
        size="sm"
        className="!p-2"
        onClick={() => router.push(`/guest-house/update/${data.id}`)}
      >
        <PencilIcon />
      </Button> */}
      <Button
        variant="outline"
        size="sm"
        className="!p-2"
        onClick={() => setOpenDelete(true)}
      >
        <TrashIcon className="text-red-600" />
      </Button>

      <DeleteButton
        data={data}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
    </div>
  );
};

export default ActionsButtons;
