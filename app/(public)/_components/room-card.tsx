import { BsArrowsFullscreen, BsPeople } from "react-icons/bs";
import { Item } from "./rooms-section";
import Link from "next/link";

interface Props {
  room: Item;
}

const Room = ({ room }: Props) => {
  return (
    <div className="bg-white shadow-2xl min-h-[500px] group">
      <div className="overflow-hidden">
        <img
          src={
            room.images.length > 0
              ? room.images[0].url
              : "https://port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png"
          }
          alt="img"
          className="group-hover:scale-110 transition-all duration-300 w-full"
        />
      </div>

      <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
        <div className="flex justify-between w-[80%]">
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsArrowsFullscreen className="text-[15px] text-mainColor" />
            </div>
            <div className="flex gap-x-2">
              <div>Size</div>
              <div>{room.capacity}</div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsPeople className="text-[18px] text-mainColor" />
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
        <Link href={`/room/${room.id}`}>
          <h3 className="h3">{room.roomNumber}</h3>
        </Link>

        <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
          {room!.description!.slice(0, 56)}..
        </p>
      </div>

      {/* button */}
      <Link
        href={`/room/${room.id}`}
        className="btn btn-secondary btn-sm max-w-[240px] mx-auto duration-300"
      >
        Book now from ${room.pricePerNight}
      </Link>
    </div>
  );
};

export default Room;
