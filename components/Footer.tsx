"use client";
import React, { FormEvent, useState } from "react";
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "react-hot-toast";

import {EmailTemplateProps} from "./email-template";





export default function Footer() {
  const [characterCount, setCharacterCount] = useState(0);
  const [formData, setFormData] = useState<EmailTemplateProps>({
    firstName: '',
    email: '',
    message: '',
    
  })
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //confirm email and message field are not empty
    if (!formData.email || !formData.message) {
      toast.error("Email and message are required fields");
      return;
    }

    try {
      setIsSending(true);
      const response = await fetch("/api/send/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          message: formData.message,

        }),
      });

      // handle success
      if (response.ok) {
        toast.success("Email Sent Successfully!");
        setFormData({
          firstName: '',
          email: "",
          message: "",

        })
      } else {
        toast.error("There was a problem sending email. Pls try again!");
      }
    } catch (error) {
      console.log("Error sending email:", error);
      toast.error("There was a problem sending email. Pls try again!");
    } finally {
      setIsSending(false);
    }
  };
  const getCharacter = () => {
    if (characterCount < 50) {
      toast.error("The text should be longer than 50 characters");
    } else {
      toast.success("Email was sent successfully");
      
    }
  };


  

  return (
    <div className="mb-0 mx-3 flex lg:flex-row flex-col md:flex-col" id="about">
      <div className="flex-col mx-auto">
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
      <div className=" p-4 mx-auto space-y-4 lg:mt-0 sm:mt-6">
        <h2 className="text-xl font-bold ">Products</h2>

        <ul>
          <li>
            <Link href="/templates" className="hover:underline">
              Templates
            </Link>
          </li>
          <li>
            <Link href="" className="hover:underline text-center">
              Become a Developer
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-center p-4 gap-4 flex-col mx-auto">
        <div className="lg:mt-0 mt-24 md:mt-24">
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <form
            onSubmit={handleSubmit}
            className="gap-4 flex-col flex"
            id="myForm"
          >
            <input
              
              type="text"
              className="border-2 rounded p-2 focus:bg-navy2 focus:text-black w-96 "
              placeholder="Full Name"
              value={formData.firstName}onChange={(e)=> setFormData({...formData, firstName: e.target.value})}
            ></input>
            <input
              
              type="email"
              className="border-2 rounded p-2 focus:bg-navy2 focus:text-black"
              placeholder="Enter Email"
              value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})}
            ></input>
            <Textarea
              placeholder="Enter Message"
              value={formData.message} onChange={e => {setCharacterCount(e.target.value.length); setFormData({...formData, message: e.target.value})}}
            ></Textarea>
            <Button onClick={getCharacter} type="submit">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
