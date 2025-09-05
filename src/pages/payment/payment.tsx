import { useState } from "react";

export default function Payment(){

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nombre: name,
      apellido: lastname,
      telefono: phone,
      email: email,
    });
    // acá podés mandar los datos al backend o API
  };
  return(
    <section className="container mx-auto flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-medium mt-2"> CONFIRMAR COMPRA </h2>
      <p className="text-lg my-2 text-center"> Para proceder con la compra rellene los siguientes datos </p>
      <div className="h-auto w-[80%] place-self-center flex flex-col justify-center rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center space-y-4"
        >
          <div className="flex w-full flex-col space-y-2">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border bg-white rounded-lg px-4 py-2 text-black placeholder-gray-800 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="flex-1 border bg-white rounded-lg px-4 py-2 text-black placeholder-gray-800 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border bg-white rounded-lg px-4 py-2 text-black placeholder-gray-800 focus:outline-none"
            />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border bg-white rounded-lg px-4 py-2 text-black placeholder-gray-800 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 border border-black text-black px-6 py-2 rounded-lg font-bold hover:cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            Continuar con la compra
          </button>
        </form>
      </div>
    </section>
  );
}