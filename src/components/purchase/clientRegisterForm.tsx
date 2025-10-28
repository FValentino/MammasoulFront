import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import {z} from "zod"
import { InputForm } from "../common/ui";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.email({ message: "Correo inválido" }).min(1, "El correo es obligatorio"),
  phone: z.string().min(1, "El telefono es obligatorio").regex(/^\d+$/, "El teléfono solo puede contener números").min(8, "El telefono es muy corto").max(10, "El telefono es muy largo")
});

type FormValues = z.infer<typeof schema>

export default function ClientRegisterForm(){

  const navigate = useNavigate();

  const {control, handleSubmit, formState:{errors}} = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:{
      name: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    localStorage.setItem("visitor", JSON.stringify(data));
    navigate("/compra/confirmar")
  }

  return(
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center "> 
        <div className="w-[90%] mx-auto">
          <InputForm<FormValues> name="name" control={control} label="Nombre" error={errors.name} />
        </div>
        <div className="w-[90%] mx-auto">
          <InputForm<FormValues> name="email" control={control} label="Email" error={errors.email} />
        </div>
        <div className="w-[90%] mx-auto">
          <InputForm<FormValues> name="phone" control={control} label="Telefono"  error={errors.phone} />
          <p className="font-bold text-sm">*Ingrese el telefono sin 0 ni 15</p>
        </div>
        
        <button type="submit" className="mx-auto flex items-center border mt-3 py-2 px-4 rounded-full hover:cursor-pointer">
          continuar 
        </button>
      </form>
    </div>
  );
}