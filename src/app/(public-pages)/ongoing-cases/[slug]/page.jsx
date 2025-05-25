import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";

const SingleOngoing = async ({ params }) => {
  const careLinkApi = process.env.CareLinkAPI;
  const id = params.slug;
  const res = await fetch(`${careLinkApi}/ongoingProjects/${id}`);
  const { data } = await res.json();
  
  return (
    <div>
      <SingleItemDetails data={data}></SingleItemDetails>
    </div>
  );
};

export default SingleOngoing;
