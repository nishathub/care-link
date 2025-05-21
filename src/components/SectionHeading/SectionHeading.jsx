
const SectionHeading = ({heading, paragraph}) => {
    return (
        <div className="w-fit max-w-xl text-center mx-auto mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl uppercase font-bold">{heading}</h2>
            <p className="">{paragraph}</p>
        </div>
    );
};

export default SectionHeading;