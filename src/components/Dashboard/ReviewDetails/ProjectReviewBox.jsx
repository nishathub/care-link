import Image from "next/image";

const ProjectReviewBox = ({data}) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
        <p className="italic">Quote: "{data?.relatedQuote}"</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Tag:</span> {data?.tag}
        </p>
        <p>
          <span className="font-semibold">Author:</span> {data?.author}
        </p>
        <p>
          <span className="font-semibold">Hidden:</span>{" "}
          {data?.hidden ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-semibold">Approved:</span>{" "}
          {String(data?.approved)}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Expense Categories</h3>
        <ul className="list-disc list-inside space-y-1">
          {data?.expenseCategories?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Full Description</h3>
        <p className="text-justify leading-relaxed">{data?.description}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Attached Image</h3>
        {data?.imageLink ? (
          <div className="h-80 max-w-xl relative rounded-lg shadow-2xl">
            <Image
              src={data?.imageLink}
              alt="project-photo"
              fill
              unoptimized
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <p>No image attached</p>
        )}
      </div>
    </>
  );
};

export default ProjectReviewBox;
