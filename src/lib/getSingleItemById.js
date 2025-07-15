import { ObjectId } from "mongodb";
import { getCollections, getUserByEmail } from "./dbCollections";
import { verifyAdmin } from "./verifyAdmin";
import { verifyTokenJWT } from "./verifyToken";

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
    // if volunteer, get only his info
    const decoded = await verifyTokenJWT();
    const user = await getUserByEmail(decoded?.email);
    if (user.role === "volunteer" && user._id.toString() === id) {
      return await UsersCollection.findOne({
        _id: new ObjectId(id),
      });
    }
    await verifyAdmin();
    return await UsersCollection.findOne({
      _id: new ObjectId(id),
    });
  }

  throw new Error(`Invalid item name:  ${itemName}`);
};
