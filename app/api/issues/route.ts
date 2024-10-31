import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(2).max(500),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const checkSchema = createIssueSchema.safeParse(body); //zod validation body

  if (!checkSchema.success) {
    return NextResponse.json(checkSchema.error.errors, { status: 400 }); //client send bad request
  }
  //if client send good request we have to access the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
