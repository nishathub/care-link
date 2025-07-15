export const dynamic = "force-dynamic";

import MyProfile from "@/components/Dashboard/MyProfile/MyProfile";
import { getSingleItemById } from "@/lib/getSingleItemById";

const VolunteerProfile = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const user = await getSingleItemById("user", id);

  // serialize _id to a plain string
  const plainUser = { ...user, _id: user?._id.toString() };

  return (
    <div>
      <MyProfile user={plainUser} />
    </div>
  );
};

export default VolunteerProfile;
