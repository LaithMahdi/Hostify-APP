import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteButton from "./delete-button";
import { useRouter } from "next/navigation";
import { Item } from "../page";

interface Props {
  data: Item;
}

const ActionsButtons = ({ data }: Props) => {  // Ajout de 'data' ici
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        className="!p-2"
        onClick={() => router.push(`/room/update/${data.id}`)}  // Correction ici
      >
        <PencilIcon />
      </Button>
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
