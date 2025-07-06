import { ObjectId } from "mongodb";
import { getCollections } from "./dbCollections";
import { verifyAdmin } from "./verifyAdmin";

export const getSingleItemById = async (itemName, id) => {
  const {
    ongoingProjectsCollection,
    ImpactStoriesCollection,
    NewsCollection,
    DonationPackages,
    UsersCollection,
    DonationLogs,
  } = await getCollections();

  if (itemName === "package") {
    return await DonationPackages.findOne({
      _id: new ObjectId(id),
    });
  }
  if (itemName === "log") {
    return await DonationLogs.findOne({
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
  if (itemName === "user") {
    await verifyAdmin();
    return await UsersCollection.findOne({
      _id: new ObjectId(id),
    });
  }

  throw new Error(`Invalid item name:  ${itemName}`)
};
