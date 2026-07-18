"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePortfolioContent(formData: FormData) {
  try {
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const aboutText = formData.get("aboutText") as string;
    
    // Convert skills and social links from JSON strings back to arrays
    const skillsJson = formData.get("skills") as string;
    const socialLinksJson = formData.get("socialLinks") as string;
    
    let skills = [];
    let socialLinks = [];
    
    try {
      skills = JSON.parse(skillsJson || "[]");
      socialLinks = JSON.parse(socialLinksJson || "[]");
    } catch (e) {
      console.error("Failed to parse JSON arrays", e);
    }

    await prisma.portfolioContent.upsert({
      where: { id: 1 },
      update: {
        heroTitle,
        heroSubtitle,
        aboutText,
        skills,
        socialLinks,
      },
      create: {
        id: 1,
        heroTitle,
        heroSubtitle,
        aboutText,
        skills,
        socialLinks,
        education: [],
        experience: [],
        projects: [],
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/dashboard/content");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update portfolio content." };
  }
}
