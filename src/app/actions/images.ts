'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function saveGeneratedImage(data: {
  url: string
  prompt: string
  style?: string
  width: number
  height: number
}) {
  return prisma.image.create({
    data: {
      ...data,
      isFavorite: false
    }
  })
}

export async function getImages() {
  return prisma.image.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function toggleFavorite(id: string) {
  const image = await prisma.image.findUnique({
    where: { id }
  })
  
  if (!image) throw new Error('Image not found')
  
  return prisma.image.update({
    where: { id },
    data: {
      isFavorite: !image.isFavorite
    }
  })
}

export async function deleteImage(id: string) {
  return prisma.image.delete({
    where: { id }
  })
} 