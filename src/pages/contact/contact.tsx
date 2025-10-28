import ContactForms from "../../components/contact/contactForm/contactForm";
import SocialNetworks from "../../components/contact/socialNetwork/socialNetwork";
import SEOContact from "../../components/seo/seoContact";


export default function Contact(){

  return (
    <section className="container flex flex-col justify-center items-center mx-auto">

      <SEOContact/>

      <div className="w-full mt-4">
        <h1 className="text-center text-2xl font-bold"> Contactanos </h1>
        <h2 className="text-center text-xl font-bold"> ¿Querés comunicarte con nosotros? </h2>
      </div>

      <div className="w-full flex flex-col items-stretch justify-center md:flex-row">
        <div className="w-full flex-1 my-4 py-4 md:w-[50%]">
          <h3 className="text-center text-2xl my-4"> Nuestras redes sociales</h3>
          <SocialNetworks/>
        </div>

        <div className="w-full flex-1 my-4 py-4 md:w-[50%]">
          <h3 className="text-center text-2xl my-4"> Mandanos un correo </h3>
          <ContactForms/>
        </div>
      </div>
    </section>
  );
}