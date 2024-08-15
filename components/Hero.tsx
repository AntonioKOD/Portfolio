import Image from "next/image";
import BoxReveal from "./magicui/box-reveal";
import SparklesText from "./magicui/sparkles-text";

export default function Hero() {
  return (
    <div className="flex mt-auto">
      <div className='h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8'>
        <BoxReveal boxColor="indigo" duration={0.5}>
            <p className='text-[3.5rem] font-semibold text-indigo'>Welcome<span>.</span></p>

        </BoxReveal>
        <BoxReveal boxColor="indigo" duration={0.5}>
            <h2 className="mt-[1.5rem] text-[1rem]">
                to <span className=" font-serif bold text-[1.5rem]">{"{ codeWithToni }"}</span>
            </h2>
        </BoxReveal>
      </div>
    </div>
  );
}
