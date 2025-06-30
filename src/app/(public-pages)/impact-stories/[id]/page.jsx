import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const SingleImpact = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const data = await getSingleItemById("story", id);

  if (!data) {
    notFound();
  }
  return (
    <div>
      <SingleItemDetails
        data={data}
        showQuote={false}
        showBankCard={false}
        showExpense={false}
        showDonationForm={false}
      ></SingleItemDetails>
    </div>
  );
};

export default SingleImpact;
