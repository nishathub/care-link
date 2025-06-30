import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const SingleDonationPackage = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const data = await getSingleItemById("package", id);

  if (!data) {
    notFound();
  }
  return (
    <div>
      <SingleItemDetails
        data={data}
        showQuote={false}
        showExpense={false}
      ></SingleItemDetails>
    </div>
  );
};

export default SingleDonationPackage;
