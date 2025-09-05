import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import type { NotificationType } from "../../types/notification";

interface NotificationProps{
  notification : NotificationType | null;
  setNotification : Dispatch<SetStateAction<NotificationType | null>>;
}

export default function Notification( {notification, setNotification} : NotificationProps ){
  return(
    <div className={`w-auto h-[5vh] rounded-lg fixed bottom-15 left-8 z-100 md:w-auto`}>
      <AnimatePresence>
        {notification?.showNotification && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${notification.color ? "bg-[#105a02]/80 border-[#105a02]" : "bg-[#900800]/80 border-[#900800]"} px-6 py-3 rounded-lg shadow-lg border-2 text-xl text-white`}
            onAnimationComplete={() => {
              setTimeout(() => setNotification(null), 2000); 
            }}
          >
            <span className="text-white relative">{notification.bodyText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}