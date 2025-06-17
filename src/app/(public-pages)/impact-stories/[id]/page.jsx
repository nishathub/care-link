import SingleItemDetails from "@/components/SingleItemDetails/SingleItemDetails";
import { notFound } from "next/navigation";

const SingleImpact = async ({ params: paramsPromise }) => {
  const careLinkApi = process.env.CareLinkAPI;
  const params = await paramsPromise;
  const { id } = params;
  const res = await fetch(`${careLinkApi}/impactStories/${id}`);
  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();

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
