import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient

export const GET = async (request:NextRequest) => {
  try{
    const posts = await prisma.post.findMany({
      include:{
        postCategories:{
          include:{
            category :{
              select:{
                id:true,
                name:true,
              },
            },
          },
        },
      },
      orderBy:{
        createdAt:'desc',
      },
    })
    return NextResponse.json(
      {
        status:"OK",
        posts:posts
      },
      {
        status:200
      }
    )
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({status:err.message},{status:400})
    }
  }
}