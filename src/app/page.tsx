import Image from "next/image";

export const App = () =>{
  return (
    <div className="relative h-screen px-4 py-4 md:py-6 lg:py-8 overflow-hidden">
      {/* imagem de fundo */}

      <Image
        src="/background.jpeg"
        alt="Background Image"
        fill
        className="object-cover object-center absolute inset-0 -z-10 opacity-30"
        priority
      />


    </div>
  )
}

export default App;