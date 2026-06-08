import { NextResponse } from "next/server";
import { prisma } from "../../../db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

 const filteredBooks = await prisma.book.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive'
      }
    }
  });

  console.log(searchParams.get("query"));
  return NextResponse.json(filteredBooks);
}
