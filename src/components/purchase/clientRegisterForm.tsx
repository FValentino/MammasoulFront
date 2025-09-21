import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import {z} from "zod"
import { InputForm } from "../common/ui";
import { useNavigate } from "react-router-dom";
import { useCreateVisitor} from "../../hooks";
import type { Visitor } from "../../types";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.email({ message: "Correo inválido" }).min(1, "El correo es obligatorio"),
  phone: z.string().min(1, "El telefono es obligatorio").regex(/^\d+$/, "El teléfono solo puede contener números").min(8, "El telefono es muy corto").max(10, "El telefono es muy largo")
});

type FormValues = z.infer<typeof schema>

export default function ClientRegisterForm(){

  const navigate = useNavigate();

  const {mutate, isPending} = useCreateVisitor();

  const {control, handleSubmit, formState:{errors}} = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:{
      name: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    mutate(data, {
      onSuccess: (newVisitor: Visitor) => {
        const visitor = newVisitor;
        localStorage.setItem("visitor", JSON.stringify(visitor))
        console.log(visitor)
        navigate("/compra/confirmar")
      },
      onError: (error) => {
        console.error("Error creando cliente:", error);
      },
    });
  }

  return(
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center "> 
        <InputForm<FormValues> name="name" control={control} label="Nombre" error={errors.name} />
        <InputForm<FormValues> name="email" control={control} label="Email" error={errors.email} />
        <InputForm<FormValues> name="phone" control={control} label="Telefono"  error={errors.phone} />

        <button type="submit" className="mx-auto flex items-center border mt-3 py-2 px-4 rounded-full hover:cursor-pointer">
          {
            isPending && <div className="animate-spin w-5 h-5 rounded-full me-2 border-gray-600 border-2 border-s-3"></div>
          }
          continuar 
        </button>
      </form>
    </div>
  );
}