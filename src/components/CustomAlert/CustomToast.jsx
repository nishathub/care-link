'use client';

import useUserStore from "@/lib/zustand/userStore";

const CustomToast = () => {
    const isToastActive = useUserStore((state)=> state?.isToastActive);
    const toastText = useUserStore((state)=> state?.toastText);    
    const toastType = useUserStore((state)=> state?.toastType);  
    const bgColor = {
        "succeed": "bg-green-600",
        "error": "bg-red-600",
        "info": "bg-sky-600",
    }
   
    return (
        <div className={`${isToastActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} duration-500 fixed z-50 inset-0 flex items-center justify-center`}>
            <div className={`${bgColor[toastType]} text-white w-72 m-4 p-4 text-center rounded-lg break-words`}>
                <p className="tracking-wider font-semibold">{toastText}</p>
            </div>
        </div>
    );
};

export default CustomToast;