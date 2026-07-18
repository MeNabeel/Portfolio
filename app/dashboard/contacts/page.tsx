import { prisma } from "@/lib/prisma";
import { ContactTable } from "@/components/admin/ContactTable";

export default async function ContactsPage() {
  let contacts: any[] = [];
  
  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database not seeded or connected yet. Showing empty contacts.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contacts</h1>
          <p className="text-gray-400">Manage your portfolio contact submissions.</p>
        </div>
      </div>

      <ContactTable contacts={contacts} />
    </div>
  );
}
