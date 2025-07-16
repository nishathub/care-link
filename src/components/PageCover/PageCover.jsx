const PageCover = ({ pageName = "name" }) => {
  return (
    <div className="h-16 lg:h-24">
      <div className="w-full h-full px-4 flex justify-center items-center bg-sky-900">
        <div className="h-fit w-fit text-gray-200">
          <h4
            className={`text-2xl md:text-3xl lg:text-5xl font-semibold capitalize`}
          >
            {pageName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
