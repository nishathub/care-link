import { formatDate } from "@/utils/formateDate";
import { CalendarDays, Eye, User } from "lucide-react";
import Image from "next/image";
import RecentItemsSuggestionComponent from "../RecentItemsSuggestionComp/RecentItemsSuggestionComponent";
import SocialShareButton from "../SocialShareCard/SocialShareButton";

const StoryNewsDetails = ({ singleItem, recentItems, itemName }) => {
  const fallbackImage =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 px-2">
      <div className="col-span-1 lg:col-span-3 space-y-8 relative">
        <div className="">
          <p className="mb-4 flex items-center gap-2 font-semibold">
            <span>
              <CalendarDays />
            </span>{" "}
            {singleItem?.date ? formatDate(singleItem?.date) : ""}
          </p>
          <h2 className="text-lg lg:text-2xl font-bold">{singleItem?.title}</h2>
        </div>
        <div className="h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-2xl relative">
          <Image
            src={singleItem?.imageLink ? singleItem?.imageLink : fallbackImage}
            alt="news-photo"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover rounded-lg"
          ></Image>
        </div>
        <div className="flex gap-4 items-center justify-between flex-wrap">
          <div className="flex gap-4 text-gray-800 text-sm">
            <p className="flex items-center gap-1">
              <span>
                <User className="w-4 h-4" />
              </span>
              {singleItem?.journalist}
            </p>
            <p className="flex items-center gap-1">
              <span>
                <Eye className="w-4 h-4" />
              </span>
              {singleItem?.views}
            </p>
          </div>
          <div><SocialShareButton/></div>
        </div>
        {/* Content Sections */}
        <div className="space-y-6 text-gray-800 text-[14px] lg:text-[16px] leading-relaxed">
          {singleItem?.introduction && (
            <p className="text-justify">{singleItem.introduction}</p>
          )}

          {/* For News */}
          {singleItem?.context && (
            <p className="text-justify">{singleItem.context}</p>
          )}
          {singleItem?.opportunity && (
            <p className="text-justify">{singleItem.opportunity}</p>
          )}
          {singleItem?.strategy && (
            <p className="text-justify">{singleItem.strategy}</p>
          )}
          {singleItem?.appeal && (
            <p className="text-justify">{singleItem.appeal}</p>
          )}
          {singleItem?.outcome && (
            <p className="text-justify">{singleItem.outcome}</p>
          )}

          {/* For Impact Story */}
          {singleItem?.challenge && (
            <p className="text-justify">{singleItem.challenge}</p>
          )}
          {singleItem?.contribution && (
            <p className="text-justify">{singleItem.contribution}</p>
          )}

          {/* Common  */}
          {singleItem?.description && (
            <p className="text-justify">{singleItem.description}</p>
          )}
          {singleItem?.conclusion && (
            <p className="text-justify">{singleItem.conclusion}</p>
          )}
        </div>
      </div>
      <div className="col-span-1 pt-12">
        <p className="font-bold text-xl mb-6">Recent {itemName}</p>
        <div className="sticky top-24 max-h-[calc(100vh-220px)] overflow-auto">
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
