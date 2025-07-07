
const SectionHeading = ({heading, paragraph, position = "center", textColor = "white"}) => {
    return (
        <div className={`${position === "left" ? "ml-12 lg:ml-0" : "w-fit max-w-xl text-center mx-auto"}  mb-8 lg:mb-12 text-${textColor}`}>
            <h2 className="text-2xl lg:text-4xl uppercase font-bold">{heading}</h2>
            <p className="">{paragraph}</p>
        </div>
    );
};

export default SectionHeading;