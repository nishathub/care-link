import { ObjectId } from "mongodb";
import { getCollections } from "./dbCollections";

export const getSingleItemById = async (itemName, id) => {
  const {
    ongoingProjectsCollection,
    ImpactStoriesCollection,
    NewsCollection,
    DonationPackages,
  } = await getCollections();

  if (itemName === "package") {
    return await DonationPackages.findOne({
      _id: new ObjectId(id),
    });
  }
  if (itemName === "story") {
    return await ImpactStoriesCollection.findOne({
      _id: new ObjectId(id),
    });
  }
  if (itemName === "project") {
    return await ongoingProjectsCollection.findOne({
      _id: new ObjectId(id),
    });
  }
  if (itemName === "news") {
    return await NewsCollection.findOne({
      _id: new ObjectId(id),
    });
  }

  throw new Error(`Invalid item name:  ${itemName}`)
};
