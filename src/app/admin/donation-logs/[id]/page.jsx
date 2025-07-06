import DonationReviewDetails from "@/components/Dashboard/DonationReview/DonationReviewDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const DonationLogReview = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const {id} = params;
  const data = await getSingleItemById("log", id);

  if (!data) {
    notFound();
  }
  // serialize _id to a plain string
  const plainData = {...data, _id: data._id.toString()};
  
  return (
    <div>
        <DonationReviewDetails data={plainData}/>
    </div>
  );
};

export default DonationLogReview;