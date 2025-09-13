import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface UpdateCategoryRequestBody {
  name:string
}

export const GET = async (request:NextRequest,{params}:{params:{id:string}},) => {
  const token = request.headers.get('Authorization') ?? ''

  const {error} = await supabase.auth.getUser(token)

  if(error){
    return NextResponse.json({status:error.message},{status:400})
  }
  
  const {id} = params;
  try{
    const category = await prisma.category.findUnique({
      where:{
        id :parseInt(id)
      },
    })
    return NextResponse.json({
      status:'OK',
      category
    },{
      status:200
    })
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json(
        {
          status:err.message
        },
        {
          status:400
        }
      )
    }
   }
}

export const PUT = async(request:NextRequest,{params}:{params:{id:string}}) => {
  const token = request.headers.get('Authorization') ?? ''

  const {error} = await supabase.auth.getUser(token)

  if(error){
    return NextResponse.json({status:error.message},{status:400})
  }
  const {id} = params;
  const {name}:UpdateCategoryRequestBody = await request.json();

  try{

    const category = await prisma.category.update({
      where:{
        id:parseInt(id),
      },
      data:{
        name,
      },
    })

    return NextResponse.json({
      status:'OK',
      category
    },
  {
    status:200
  })
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({
        status:err.message
      },
      {
        status:400
      })
    }
  }
}
export const DELETE = async (request:NextRequest,{params}:{params:{id:string}}) => {
  const token = request.headers.get('Authorization') ?? ''

  const {error} = await supabase.auth.getUser(token)

  if(error){
    return NextResponse.json({status:error.message},{status:400})
  }
  const {id} = params;
  try{
    await prisma.category.delete({
      where:{
        id:parseInt(id)
      }
    })
    return NextResponse.json({
      status:'OK',
    },{
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