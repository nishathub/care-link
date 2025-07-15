import { formatDate } from "@/utils/formateDate";
import { CalendarDays, Eye, User } from "lucide-react";
import Image from "next/image";
import RecentItemsSuggestionComponent from "../RecentItemsSuggestionComp/RecentItemsSuggestionComponent";

const StoryNewsDetails = ({ singleItem, recentItems, itemName }) => {
  const fallbackImage =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="col-span-1 lg:col-span-3 space-y-8 relative">
        <div className="">
          <p className="mb-4 flex items-center gap-2">
            <span>
              <CalendarDays />
            </span>{" "}
            {singleItem?.date ? formatDate(singleItem?.date) : ""}
          </p>
          <h2 className="text-2xl font-bold">{singleItem?.title}</h2>
        </div>
        <div className="h-96 lg:h-[450px] rounded-lg shadow-2xl relative">
          <Image
            src={singleItem?.imageLink ? singleItem?.imageLink : fallbackImage}
            alt="news-photo"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover rounded-lg"
          ></Image>
        </div>
        <div className="flex gap-4">
          <p className="flex items-center gap-1">
            <span>
              <User />
            </span>
            {singleItem?.journalist}
          </p>
          <p className="flex items-center gap-1">
            <span>
              <Eye />
            </span>
            {singleItem?.views}
          </p>
        </div>
        <p className="text-justify">{singleItem?.description}</p>
      </div>
      <div className="col-span-1 pt-12">
        <p className="font-bold text-xl mb-6">Recent {itemName}</p>
        <div className="sticky top-20 max-h-[calc(100vh-220px)] overflow-auto">
          <RecentItemsSuggestionComponent
            itemCollection={recentItems}
            itemName={itemName}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryNewsDetails;
