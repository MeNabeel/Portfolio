'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function markAsRead(id: string) {
  try {
    await prisma.contact.update({
      where: { id },
      data: { status: "READ" }
    })
    revalidatePath("/dashboard/contacts")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update contact status." }
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({
      where: { id }
    })
    revalidatePath("/dashboard/contacts")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete contact." }
  }
}
