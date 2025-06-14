
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
          <h2 className="text-2xl lg:text-4xl text-sky-700 font-bold ">About Us</h2>
          <hr className="border-t-2 mt-3" />
          <div className="space-y-4 mt-4">
            <p className="">
              We are deeply touched seeing the helpless people of Bangladesh,
              the least developed country.Still, has been working in the field
              of humanitarian services since 2009. So that we can provide
              helpless people with a peaceful life.
            </p>
            <p className="">
              We can only build a better world if all of us live happily.
              Although we know it is very hard to accomplish this task. Our
              teamwork becomes more effective when you join us in this
              humanitarian project.
            </p>
            <p className="">
              It becomes very hard for us alone to support those huge amounts of
              vulnerable people. For this reason, we welcome you to be a part of
              our human services. Advance each day with the vision of
              serving humanity.
            </p>
          </div>
          <button className="btn btn-primary mt-4 lg:mt-6">Call to Action</button>
        </div>
      </div>
    </div>
  );
};

export default AboutCareLink;
