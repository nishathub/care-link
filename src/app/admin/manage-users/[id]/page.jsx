import UserReviewDetails from "@/components/Dashboard/UserReviewDetails/UserReviewDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const UserReview = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const {id} = params;
  const data = await getSingleItemById("user", id);

  if (!data) {
    notFound();
  }
  // serialize _id to a plain string
  const plainData = {...data, _id: data._id.toString()};
  
  return (
    <div>
    <UserReviewDetails data={plainData}/>
    </div>
  );
};

export default UserReview;