
const PageCover = ({
  pageName = "name",
  image = "https://i.pinimg.com/736x/9b/b1/2c/9bb12c765423608e519fea6cae537dcc.jpg",
}) => {
  return (
    <div
      className="h-[20vh] lg:h-[40vh]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full px-4 flex justify-center items-center bg-black/50">
        <div className="h-fit w-fit text-gray-200">
          <h4 className={`text-3xl lg:text-6xl uppercase`}>
            {pageName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PageCover;