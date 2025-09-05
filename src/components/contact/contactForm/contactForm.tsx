import {  useState } from "react";
//import { sendEmail } from "../../../../services/emailService.ts";

/*interface ServiceResponse{
  success: boolean;
  message: string;
}*/

export default function ContactForms(){
  
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  //const [feedback, setFeedback] = useState<ServiceResponse>({success:false, message:"enviando"})

  /*useEffect(()=>{
    if (feedback.success){
      window.alert(`Correo enviado correctamente\n${feedback.message}` )
    } else{
      if(feedback.message !== "enviando"){
        window.alert(`Ocurrio un problema al enviar el correo\n${feedback.message}` )
      }
    }
  },[feedback]);*/

  /*async function handleSendEmail (e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const response = await sendEmail(name, email, message);
    setFeedback(response)
  }*/

  return(
    <div className="h-auto w-[80%] place-self-center flex flex-col justify-center rounded-2xl">
      <form onSubmit={undefined} className="flex flex-col justify-center space-y-4">
        <div className="flex w-full flex-col space-y-2">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="flex-1 border bg-white rounded-lg px-4 py-2 text-white placeholder-gray-800 focus:outline-none"
          />
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="flex-1 border bg-white rounded-lg px-4 py-2 text-white placeholder-gray-800 focus:outline-none"
          />
          <input
            type="text"
            placeholder="tu mensaje"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            className="flex-1 border bg-white rounded-lg px-4 py-2 text-white placeholder-gray-800 focus:outline-none"
          />
        </div>
        <button 
          type="submit"
          className="mt-4 border-1 border-black text-black px-6 py-2 rounded-lg font-bold hover:cursor-pointer md:mt-0 "
        >
          Enviar
        </button>
      </form>
    </div>
  )
}