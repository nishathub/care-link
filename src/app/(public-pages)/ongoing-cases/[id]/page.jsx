import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const SingleOngoing = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const {id} = params;
  const data = await getSingleItemById("project", id);

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
