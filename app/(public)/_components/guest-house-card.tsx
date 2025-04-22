import { FaMapMarkerAlt } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Item } from "./guest-house-section";

interface Props {
  house: Item;
}

const HuestHouseCard = ({ house }: Props) => {
  return (
    <div className="bg-white shadow-2xl min-h-[530px] group">
      <div className="overflow-hidden">
        <img
          src={
            house.images.length > 0
              ? house.images[0].url
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
              <FaMapMarkerAlt className="text-[15px] text-mainColor" />
            </div>
            <div className="flex gap-x-2">
              <div>{house.region}</div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <TiStarFullOutline className="text-[22px] text-mainColor" />
            </div>
            <p className="line-clamp-1">{house.rating}</p>
          </div>
        </div>
      </div>

      {/* name and description */}
      <div className="text-center">
        <Link href={`/room/${house.id}`}>
          <h3 className="text-lg font-semibold text-slate-800">{house.name}</h3>
        </Link>

        <p className="max-w-[300px] mx-auto mb-2 lg:mb-4 line-clamp-1 text-slate-600 font-normal">
          {house!.description!.slice(0, 56)}..
        </p>
      </div>

      {/* button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          className="!py-5 !px-7 max-w-[240px] duration-300"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default HuestHouseCard;
