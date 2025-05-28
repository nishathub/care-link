
const page = async ({params: paramsPromise}) => {
    const params = await paramsPromise;
    const {id} = params;
    return (
        <div>
            {id}
        </div>
    );
};

export default page;