"use client"

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import React from "react";
import Link from "next/link";



export default function Projects(){
    return (
        <div>
            <h1 className="text-4xl flex justify-center p-">Projects</h1>
        <div className='grid grid-cols-3'>
        <CardContainer className="inter-var p-2">
            <CardBody className="bg-gray">
                <CardItem>
                    Hello
                </CardItem>
            </CardBody>
        </CardContainer>
        </div>
        </div>
    )
}