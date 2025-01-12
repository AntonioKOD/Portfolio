import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/utils/resend";
import {randomBytes} from "crypto";



const prisma = new PrismaClient();


export async function POST(req: Request) {
  if(req.method === "POST"){
  const { email, password, name } = await req.json();
  
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const emailVerificationToken= randomBytes(32).toString("hex");

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username: name,
      emailVerificationToken,
      emailVerified: false,
      password: hashedPassword,
    },
  });
  await sendVerificationEmail(email, emailVerificationToken);

  return NextResponse.json({ user });
} else{
  return NextResponse.error();

}
}