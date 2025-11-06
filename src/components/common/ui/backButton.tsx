import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton () {
  const navigate = useNavigate();
  return (
    <div>
      <button 
        onClick={() => navigate("/")}
        className="flex items-center border-3 rounded-[50%] text-[#313030] hover:scale-110 hover:cursor-pointer">
        <ArrowLeft className="w-8 h-8"/>
      </button>
    </div>
  );
}