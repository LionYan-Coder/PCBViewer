import Image from "next/image";
export function PCBView() {
  return (
    <div className="w-full h-full">
      <Image
        src="/temp.jpg"
        alt="test"
        width={500}
        height={500}
        className="w-full h-full object-contain"
      ></Image>
    </div>
  );
}
