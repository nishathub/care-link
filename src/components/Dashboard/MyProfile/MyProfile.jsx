"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  UserCheck,
  User,
  Briefcase,
  Heart,
} from "lucide-react";
import { formatDate } from "@/utils/formateDate";

const MyProfile = ({}) => {
  const user = {
    name: "Jibon",
    email: "jbn@gmail.com",
    phone: "88055332",
    occupation: "developer",
    address: "Mohakhali Dhaka",
    interestArea: "Health",
    reference: "Md Abu Taher",
    availableNow: true,
    imageLink:
      "https://res.cloudinary.com/dntewbv",
    approved: true,
    createdAt: "2025-07-03T03:41:44.043Z",
    role: "volunteer",
  };

  return (
    <div className="min-h-screen bg-gray-300 text-black flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-3xl w-full overflow-hidden">
        <div className="bg-sky-700 p-8 flex flex-col items-center text-white">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src={user.imageLink}
              alt={user.name}
              fill
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

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50">
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
          <div className="flex items-center gap-4">
            <User className="text-sky-800" />
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
            <span>Status: {user.approved ? "Approved" : "Pending"}</span>
          </div>
          <div className="flex items-center gap-4">
            <User className="text-sky-800" />
            <span>Joined: {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
