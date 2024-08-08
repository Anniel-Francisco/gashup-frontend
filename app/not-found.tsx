import Link from "next/link";
export default function NotFound() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <h1 className="text-4xl max-md:text-2xl font-semibold text-[#2c3e50]">
        ¡Hubo un problema!
      </h1>
      <div className="flex flex-col mt-4 text-[#2c3e50]">
        <span className="text-xl max-md:text-sm">
          No pudimos encontrar la página que estabas buscando.
        </span>
        <span className="text-xl max-md:text-sm text-center text-[#2c3e50]">
          volver al
          <Link href="/" className="font-semibold ml-1 underline">
            Home
          </Link>
        </span>
      </div>
    </div>
  );
}
