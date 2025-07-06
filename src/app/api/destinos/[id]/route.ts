// filepath: src/app/api/destinos/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  await prisma.cadastro_destino.delete({ where: { id } })
  return NextResponse.json({ sucesso: true })
}