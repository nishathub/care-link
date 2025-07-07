import ReviewDetails from "@/components/Dashboard/ReviewDetails/ReviewDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const ProjectReview = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const {id} = params;
  const data = await getSingleItemById("project", id);

  if (!data) {
    notFound();
  }
  // serialize _id to a plain string
  const plainData = {...data, _id: data._id.toString()};
  
  return (
    <div>
        <ReviewDetails type={"project"} data={plainData}/>
    </div>
  );
};

export default ProjectReview;