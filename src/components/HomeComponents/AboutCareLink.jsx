import Link from "next/link";

const AboutCareLink = () => {
  return (
    <div className="hero bg-sky-100 rounded-lg">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://res.cloudinary.com/dntewbvod/image/upload/v1753069068/Master_hzz02z.jpg"
          alt="care-a-plant"
          className="max-w-md hidden lg:flex"
        />
        <div>
          <h2 className="text-2xl lg:text-4xl text-center md:text-left text-sky-700 font-bold font-cinzel">
            About Us
          </h2>
          <hr className="border-t-2 mt-3" />
          <div className="space-y-4 mt-4 font-domine">
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
              Through this interactive platform, caring volunteers can bring
              urgent situations to light, and together we turn them into real
              success stories. Supporting so many vulnerable people alone is
              challenging — that is why we invite you to stand with us and move
              forward each day with a vision to serve humanity.
            </p>
          </div>
          <Link
            href={"/donate-now"}
            className="btn font-cinzel bg-sky-800 hover:bg-sky-700 text-white w-full sm:w-fit mt-4 lg:mt-6"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutCareLink;
