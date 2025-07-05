import { getCollections } from "./dbCollections";

export const getDonationLogs = async () => {
  const { DonationLogs } = await getCollections();
  const Logs = await DonationLogs.find().toArray();
  return Logs;
};
