interface ErrorProps{
  title: string;
  subtitle: string;
  description?: string;
}

export function Error({title, subtitle, description}: ErrorProps){
  return(
    <>
      <main className="w-[90%] mx-auto">
        <h1 className="w-full text-center text-3xl text-[#a88050]">
          {title}
        </h1>
        <h2 className="w-full text-center text-xl text-[#]">
          {subtitle}
        </h2>
        <p className="w-full text-center text-lg">
          {description}
        </p>
      </main>
    </>
  )
}