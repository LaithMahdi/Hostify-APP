import { SlSizeFullscreen } from "react-icons/sl";
import { IoBedOutline } from "react-icons/io5";
import { Item } from "./rooms-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  room: Item;
}

const Room = ({ room }: Props) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-2xl min-h-[530px] group">
      <div className="overflow-hidden">
        <img
          src={
            room.images.length > 0
              ? room.images[0].url
              : "https://port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png"
          }
          alt="img"
          className="group-hover:scale-110 transition-all duration-300 w-full h-[330px] object-cover object-center"
        />
      </div>

      <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
        <div className="flex justify-between w-[80%]">
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <SlSizeFullscreen className="text-[15px] text-mainColor" />
            </div>
            <div className="flex gap-x-2">
              <div>Size</div>
              <div>{room.capacity}</div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <IoBedOutline className="text-[22px] text-mainColor" />
            </div>
            <div className="flex gap-x-1">
              <div>Type</div>
              <div>{room.type}</div>
            </div>
          </div>
        </div>
      </div>

      {/* name and description */}
      <div className="text-center">
        <Link href={`/room/detail/${room.id}`}>
          <h3 className="text-lg font-semibold text-slate-800">
            <span className="me-1">Room Number :</span>
            {room.roomNumber}
          </h3>
        </Link>

        <p className="max-w-[300px] mx-auto mb-2 lg:mb-4 line-clamp-1 text-slate-600 font-normal">
          {room!.description!.slice(0, 56)}..
        </p>
      </div>

      {/* button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          className="!py-5 !px-7 max-w-[240px] duration-300"
          onClick={() => router.push(`/room/detail/${room.id}`)}
        >
          Book now from ${room.pricePerNight}
        </Button>
      </div>
    </div>
  );
};

export default Room;
