const AboutCareLink = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://static.toiimg.com/img/79679098/Master.jpg"
          alt=""
          className="max-w-xs lg:max-w-md"
        />
        <div>
          <h2 className="text-2xl lg:text-4xl text-sky-700 font-bold ">
            About Us
          </h2>
          <hr className="border-t-2 mt-3" />
          <div className="space-y-4 mt-4">
            <p className="">
              We are moved by the struggles of helpless people in Bangladesh,
              one of the least developed countries. We have been dedicated to
              providing them with a more peaceful life through our humanitarian
              work.
            </p>
            <p className="">
              A better world is only possible when everyone can live happily —
              though we know this goal is not easy to achieve. Our efforts
              become stronger when you join us.
            </p>
            <p className="">
              Supporting so many vulnerable people alone is challenging. That is
              why we invite you to stand with us. Move forward each day with a
              vision to serve humanity.
            </p>
          </div>
          <button className="btn btn-primary mt-4 lg:mt-6">
            Call to Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutCareLink;
