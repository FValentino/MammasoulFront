import type { ReactElement } from "react";
import { FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface SocialInterface {
  id: number;
  name:string;
  Icon: ReactElement;
  info: string;
}

export default function SocialNetworks(){

  const socialNetworks : SocialInterface[] = [
    {id:1, name:"WhatsApp", Icon:<FaWhatsapp className="w-20 h-20"/>, info:import.meta.env.VITE_USER_WHATSAPP},
    {id:2, name:"Instagram", Icon:<FaInstagram className="w-20 h-20"/>, info:import.meta.env.VITE_USER_INSTAGRAM},
    {id:1, name:"TikTok", Icon:<FaTiktok className="w-20 h-20"/>, info:import.meta.env.VITE_USER_TIKTOK},
  ]
  
  return(
    <div className="h-auto w-full flex flex-col justify-center items-center space-x-4  md:flex-row">
      {
        socialNetworks.map((socialNetwork : SocialInterface)=>{
          return(
            <div className="w-[50%] mx-auto md:w-[20%] h-[30vh] border border-3 rounded-xl px-4 my-4">
              <a 
                href={socialNetwork.info} 
                className="w-full h-full flex flex-col items-center justify-center space-y-4"
                target="_blank"
              >
                <div>
                  {socialNetwork.Icon}
                </div>
                <p className="text-xl font-medium md:text-lg"> {socialNetwork.name} </p>
              </a>
            </div>
          )
        })
      }
    </div>
  );
}