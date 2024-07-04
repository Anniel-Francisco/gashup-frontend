import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-end items-center w-full h-full">
      <h1 className="text-4xl font-semibold text-[#2c3e50]">
        ¡There was a problem!
      </h1>
      <div className="flex flex-col mt-4 text-[#2c3e50]">
        <span className="text-xl">
          We could not find the page you were looking for.
        </span>
        <span className="text-xl text-center text-[#2c3e50]">
          Go back to the
          <Link href="/" className="font-semibold ml-1 underline">
            Home
          </Link>
        </span>
      </div>
    </div>
  );
}
