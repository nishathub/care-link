const PageCover = ({ pageName = "name" }) => {
  return (
    <div className="h-fit ">
      <div className="w-full h-full px-4 py-2 flex justify-center items-center bg-sky-900">
        <div className="h-fit w-fit text-gray-200">
          <h4
            className={`text-2xl sm:text-3xl lg:text-5xl font-semibold capitalize leading-snug`}
          >
            {pageName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
