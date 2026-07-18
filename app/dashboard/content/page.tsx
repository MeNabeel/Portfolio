import { prisma } from "@/lib/prisma";
import { CMSForm } from "@/components/admin/CMSForm";

export default async function ContentManagementPage() {
  let content = null;
  
  try {
    content = await prisma.portfolioContent.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    console.warn("Database not seeded or connected yet.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-gray-400">Update your portfolio information and sections here.</p>
        </div>
      </div>

      <CMSForm content={content} />
    </div>
  );
}
