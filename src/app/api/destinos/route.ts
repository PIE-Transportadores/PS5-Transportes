import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const destinos = await prisma.cadastro_destino.findMany()
  return NextResponse.json(destinos)
}