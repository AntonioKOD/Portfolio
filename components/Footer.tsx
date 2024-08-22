"use client"
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {toast} from "react-hot-toast"

emailjs.init({
    publicKey: 'YGwCQ-eUJ_tALWECM',
    blockHeadless: false,
    
})



export default function Footer() {
    const [characterCount, setCharacterCount]= useState(0);

    const getCharacter = () => {
        if(characterCount<50){
            toast.error("The text should be longer than 50 characters")
        }else {
            toast.success("Email was sent successfully")
            window.location.reload()
            
        }
    }
    
    
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const onSubmit = (data: any) => {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    emailjs
      .send("service_4vkdgm4", "template_1viu2ja", templateParams)
      .then(() => {
        console.log("email sent successfully");
        reset();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div className="mb-0 mx-3 flex">
      <div>
        <h3 className="text-lg p-4 -mx-3 text-indigo">{"{codeWithToni}"}</h3>
        <div className="flex gap-4 pb-4">
          <Link href="https://github.com/AntonioKOD">
            <IconBrandGithub />
          </Link>
          <Link href="https://x.com/antonio_kodheli">
            <IconBrandTwitter />
          </Link>
        </div>
      </div>
      <div className=" p-4 mx-24 space-y-4">
        <h2 className="text-xl font-bold ">Products</h2>

        <ul>
          <li>
            <Link href="" className="hover:underline">
              Templates
            </Link>
          </li>
          <li>
            <Link href="" className="hover:underline">
              Become a Developer
            </Link>
          </li>
          <li>
            <Link href="https://digitaldynasty.io" className="hover:underline">
              Digital Dynasty
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 flex absolute right-[7rem] ">
        <div>
        <h2 className="text-xl font-bold">Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("name", { required: "Full Name" })}
            type="text"
            className="border-2 rounded p-2 focus:bg-navy2 focus:text-black w-96"
            placeholder="Full Name"
          ></input>
          <input {...register("email", {required: "Please enter email"})}
          type="email"
          className="border-2 rounded p-2 focus:bg-navy2 focus:text-black"
          placeholder="Enter Email">
          </input>
          <Textarea {...register("message", {required: true, minLength: 50,})} onChange={(e) => setCharacterCount(e.target.value.length)}placeholder="Enter Message"></Textarea>
            <Button onClick={getCharacter}  type="submit">Send Message</Button>
        </form>
        </div>
      </div>
    </div>
  );
}
