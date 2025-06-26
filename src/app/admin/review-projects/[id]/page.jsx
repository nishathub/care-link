import ProjectReviewDetails from "@/components/ProjectReview/ProjectReviewDetails";
import { notFound } from "next/navigation";

const ProjectReview = async ({ params: paramsPromise }) => {
  const careLinkApi = process.env.CareLinkAPI;
  const params = await paramsPromise;
  const {id} = params;
  const res = await fetch(`${careLinkApi}/ongoingProjects/${id}`);
  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();

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