import { formatDate } from "@/utils/formateDate";

const DonationReviewBox = ({data}) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
        <p className="text-sm italic">Donor: {data?.donor}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Payment ID:</span> {data?.paymentId}
        </p>
        <p>
          <span className="font-semibold">Contact:</span> {data?.contact}
        </p>
        <p>
          <span className="font-semibold">Amount:</span> ${data?.amount}
        </p>
        <p>
          <span className="font-semibold">Tag:</span> {data?.tag}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {formatDate(data?.date)}
        </p>
        <p>
          <span className="font-semibold">Approved:</span>{" "}
          {String(data?.approved)}
        </p>
      </div>
    </>
  );
};

export default DonationReviewBox;
