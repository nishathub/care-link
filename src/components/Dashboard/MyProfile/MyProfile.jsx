"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  UserCheck,
  Briefcase,
  Heart,
  Shield,
  BookmarkPlus,
} from "lucide-react";
import { formatDate } from "@/utils/formateDate";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

const MyProfile = ({ user }) => {
  return (
    <div>
      <SectionHeading heading={"My Profile"} />
      <div className="p-4">
        <div className="bg-gray-300 shadow-lg rounded-2xl max-w-3xl w-full m-auto overflow-hidden border-4 border-sky-100">
          <div className="bg-sky-700 p-8 flex flex-col items-center text-white">
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={
                  user.imageLink ||
                  "https://res.cloudinary.com/dntewbvod/image/upload/v1751861766/user-avatar_vaibmz.png"
                }
                alt={user.name}
                fill
                sizes="128px"
                className="rounded-full object-cover border-4 border-white"
              />
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sky-200">{user.occupation}</p>
            {user.availableNow && (
              <div className="flex items-center gap-2 mt-2 text-green-300">
                <UserCheck size={20} /> <span>Available Now</span>
              </div>
            )}
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-300 text-black">
            <div className="flex items-center gap-4">
              <Mail className="text-sky-800" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-sky-800" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-sky-800" />
              <span>{user.address}</span>
            </div>
            <div className="flex items-center gap-4 capitalize">
              <Shield className="text-sky-800" />
              <span>Role: {user.role}</span>
            </div>
            <div className="flex items-center gap-4">
              <Briefcase className="text-sky-800" />
              <span>Reference: {user.reference}</span>
            </div>
            <div className="flex items-center gap-4">
              <Heart className="text-sky-800" />
              <span>Interest: {user.interestArea}</span>
            </div>
            <div className="flex items-center gap-4">
              <UserCheck className="text-sky-800" />
              <p>
                Status:{" "}
                <span
                  className={`${user.approved ? "text-green-700" : "text-red-700"} capitalize`}
                >
                  {user.approved === true ? "approved" : user.approved}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <BookmarkPlus className="text-sky-800" />
              <span>Joined: {user.createdAt && formatDate(user.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
