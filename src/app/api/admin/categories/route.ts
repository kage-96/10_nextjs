import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface CreateCategoryRequestBody {
  name:string
}

export const GET = async (request:NextRequest) => {
  try{
    const categories = await prisma.category.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })
    return NextResponse.json({
      status:'OK',
      categories
    },
  {
    status:200
  })
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({
        status:err.message
      },
    {status:400}
  )
    }
  }
}

export const POST = async (request:NextRequest) => {
  try{
    const body = await request.json();
    const {name}:CreateCategoryRequestBody = body;

    const data = await prisma.category.create({
      data:{
        name
      }
    })
    return NextResponse.json({
      status:'OK',
      message:'作成しました',
      id:data.id
    },{
      status:200
    })
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({
        status:err.message
      },{
        status:400
      })
    }
  }
}