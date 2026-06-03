import { NextResponse } from "next/server";
import { prisma } from "../../db";

export async function GET(request) {
  const books = await prisma.book.findMany();
  console.log("Get books called");
  return NextResponse.json(books);
}

export async function POST(request) {
  const { title, img, link } = await request.json();
  const newBook = {
    id: books.length + 1,
    title,
    link,
    img,
  };

  books.push(newBook);
  return NextResponse.json("Book added successfully!");
}
