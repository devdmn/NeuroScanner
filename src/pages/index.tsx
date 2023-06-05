import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Comfortaa, Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function Home() {
  const [dementia, setDementia] = useState("");
  const [tumor, setTumor] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // @ts-ignore 
    if (!formData.get("image").name) return;

    setLoading(true);
    setDementia("");
    setTumor("");

    await fetch("/api/result", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setDementia(res.dementia);
        setTumor(res.tumor);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) {
      setPreview(undefined);
      return;
    }

    const reader = new FileReader();
    const savePreview = () => {
      if (!reader.result || typeof reader.result !== "string") {
        setPreview(undefined);
      } else {
        setPreview(reader.result);
      }
    };
    reader.addEventListener("load", savePreview);
    reader.readAsDataURL(file);

    return () => reader.removeEventListener("load", savePreview);
  };

  return (
    <main
      style={inter.style}
      className="flex flex-col w-full min-h-screen gap-8 p-8"
    >
      <Head>
        <title>NeuroScanner</title>
      </Head>

      <h1 style={comfortaa.style} className="text-4xl md:text-5xl">
        NeuroScanner
      </h1>
      <div className="flex flex-col w-full grid-cols-2 gap-8 sm:grid max-w-[1080px]">
        <form
          className="flex flex-col w-full gap-4 p-4 rounded-sm bg-opacity-70 drop-shadow-md backdrop-blur-[2px] bg-gunmetal"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl">Upload MRI Scan</h2>
          <span className="w-full -mt-2 bg-cadet rounded-full outline-none h-[1px]" />
          {/* image/* */}
          <input
            className="rounded-sm outline-none cursor-pointer select-none focus-visible:ring-2 ring-dark-cyan ring-offset-2 ring-offset-gunmetal file:p-2 file:px-3 bg-cadet file:cursor-pointer file:mr-2 file:text-neutral-200 file:border-0 file:bg-charcoal hover:file:bg-dark-cyan"
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
          {preview ? (
            <Image
              className="object-contain w-full rounded-md opacity-90"
              width={100}
              height={100}
              src={preview}
              alt="Uploaded Image"
            />
          ) : null}
          <button
            className="p-2 rounded-sm outline-none select-none focus-visible:ring-2 ring-dark-cyan ring-offset-2 ring-offset-gunmetal bg-charcoal text-neutral-200 hover:bg-dark-cyan"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="flex flex-col w-full gap-4 p-4 rounded-sm bg-opacity-70 backdrop-blur-[2px] bg-gunmetal drop-shadow-md">
          <h2 className="text-xl">Result</h2>
          <span className="w-full -mt-2 bg-cadet rounded-full h-[1px]" />
          {!loading && dementia ? (
            <p>
              <span className="font-bold">Dementia:</span> {dementia}
            </p>
          ) : null}
          {!loading && tumor ? (
            <p>
              <span className="font-bold">Tumor:</span> {tumor}
            </p>
          ) : null}
          {loading ? (
            <p className="flex items-center justify-center w-full h-full ">
              <span className="loader"></span>
            </p>
          ) : null}
          {!(dementia || tumor || loading) ? (
            <p className="flex w-full h-full text-sm sm:justify-center sm:items-center sm:text-base text-cadet">
              No Results To Be Shown.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
