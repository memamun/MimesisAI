import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveImage(data: {
  prompt: string;
  url: string;
  width: number;
  height: number;
  style?: string;
}) {
  return prisma.image.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
}

export async function getImages() {
  return prisma.image.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

// Add a function to update favorite status if needed
export async function updateImageFavorite(id: string, isFavorite: boolean) {
  return prisma.image.update({
    where: { id },
    data: { isFavorite }
  });
} 