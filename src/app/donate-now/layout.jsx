import PageCover from "@/components/PageCover/PageCover";

const DonateLayout = ({children}) => {
    return (
        <div className="min-h-screen">
            <div>
                <PageCover pageName="Donate"></PageCover>
            </div>
            <div className="border max-w-7xl mx-auto px-2 sm:px-0 py-8">
                {children}
            </div>
        </div>
    );
};

export default DonateLayout;