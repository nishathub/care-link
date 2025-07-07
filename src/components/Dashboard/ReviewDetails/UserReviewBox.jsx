import Image from "next/image";

const UserReviewBox = ({data}) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold mb-4">{data?.name}</h2>
        <p className="text-sm italic">{data?.email}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Phone:</span> {data?.phone}
        </p>
        <p>
          <span className="font-semibold">Occupation:</span> {data?.occupation}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {data?.address}
        </p>
        <p>
          <span className="font-semibold">Interest Area:</span>{" "}
          {data?.interestArea}
        </p>
        <p>
          <span className="font-semibold">Reference:</span> {data?.reference}
        </p>
        <p>
          <span className="font-semibold">Available Now:</span>{" "}
          {String(data?.availableNow)}
        </p>
        <p>
          <span className="font-semibold">Approved:</span>{" "}
          {String(data?.approved)}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {data?.role}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Profile Image</h3>
        {data?.imageLink ? (
          <div className="h-72 w-72 relative rounded-lg shadow-2xl">
            <Image
              src={data?.imageLink}
              alt="user-photo"
              fill
              unoptimized
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <p>No profile image</p>
        )}
      </div>
    </>
  );
};

export default UserReviewBox;
