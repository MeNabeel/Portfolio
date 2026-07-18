'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in production, use zod to validate these inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  // Also create user in Prisma (optional depending on your exact requirements, but recommended)
  if (authData.user) {
    try {
      const { PrismaClient } = require('@prisma/client')
      const prisma = new PrismaClient()
      await prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: {
          id: authData.user.id,
          email: data.email,
        }
      })
    } catch (e) {
      console.error("Failed to sync user to Prisma:", e)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Or redirect to home
}
