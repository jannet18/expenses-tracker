import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 p-2 bg-white rounded-2xl shadow-md border border-gray-200/50">
      <div
        className={`w-13 h-13 flex items-center justify-center text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px]">KSH. {value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
