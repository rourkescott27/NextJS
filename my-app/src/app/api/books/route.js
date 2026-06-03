import { NextResponse } from "next/server";
import { prisma } from "../../db";

export async function GET(request) {
  const books = await prisma.book.findMany();
  console.log("Get books called");
  return NextResponse.json(books);
}

export async function POST(request) {
  const { title, img, link } = await request.json();
  
  await prisma.book.create({
    data: {
      title: title,
      link: link,
      img: img
    }
  });
  return NextResponse.json("Book added successfully!");
}
