import ProjectReviewDetails from "@/components/ProjectReview/ProjectReviewDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const ProjectReview = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const {id} = params;
  const data = await getSingleItemById("project", id);

  if (!data) {
    notFound();
  }
  return (
    <div>
        <ProjectReviewDetails data={data}/>
    </div>
  );
};

export default ProjectReview;