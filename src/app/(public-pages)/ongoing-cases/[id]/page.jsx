import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";
import { notFound } from "next/navigation";

const SingleOngoing = async ({ params: paramsPromise }) => {
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
      <SingleItemDetails data={data}></SingleItemDetails>
    </div>
  );
};

export default SingleOngoing;
