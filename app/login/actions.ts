'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import rateLimit from '@/lib/rate-limit'
import { headers, cookies } from 'next/headers'

const limiter = rateLimit({
  uniqueTokenPerInterval: 500,
  interval: 60000, // 1 minute
})

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || secret === 'your_secret_key_here') {
    // Skip if not configured so development works
    console.warn("ReCAPTCHA secret key not configured, skipping verification.");
    return true;
  }
  
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
    method: 'POST',
  });
  const data = await res.json();
  // v3 returns a score. We require >= 0.5 to pass.
  return data.success && data.score >= 0.5;
}

async function checkRateLimit() {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || '127.0.0.1'
  try {
    // Limit to 5 attempts per minute per IP
    await limiter.check(5, ip)
    return true
  } catch (e) {
    return false
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // HARDCODED ADMIN BYPASS
  if (email === 'admin' && password === 'admin') {
    const cookieStore = await cookies();
    cookieStore.set('hardcoded_admin', 'true', { path: '/' });
    revalidatePath('/', 'layout');
    redirect('/dashboard');
  }

  const supabase = await createClient()

  if (!(await checkRateLimit())) {
    return { error: "Too many attempts. Please try again in a minute." }
  }

  const recaptchaToken = formData.get('recaptchaToken') as string

  if (recaptchaToken && !(await verifyRecaptcha(recaptchaToken))) {
    return { error: "Security check failed. Please try again." }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

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

  if (!(await checkRateLimit())) {
    return { error: "Too many attempts. Please try again in a minute." }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const recaptchaToken = formData.get('recaptchaToken') as string

  if (recaptchaToken && !(await verifyRecaptcha(recaptchaToken))) {
    return { error: "Security check failed. Please try again." }
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  // Create user in Prisma is temporarily disabled because Prisma is hanging due to blocked port 5432 on this network.
  // if (authData.user) {
  //   try {
  //     const { PrismaClient } = require('@prisma/client')
  //     const prisma = new PrismaClient()
  //     prisma.user.upsert({
  //       where: { email: data.email },
  //       update: {},
  //       create: {
  //         id: authData.user.id,
  //         email: data.email,
  //       }
  //     }).catch((e: any) => console.error("Prisma background upsert failed:", e))
  //   } catch (e) {
  //     console.error("Failed to sync user to Prisma:", e)
  //   }
  // }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Or redirect to home
}
