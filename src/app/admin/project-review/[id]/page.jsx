'use client';
import { useParams } from "next/navigation";

const page = () => {
    const { id: projectId } = useParams();
    return (
        <div>
            This is project review page. project id : {projectId}
        </div>
    );
};

export default page;