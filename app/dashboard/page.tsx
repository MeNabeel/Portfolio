import { prisma } from "@/lib/prisma";
import { Mail, Users, FileText, CheckCircle } from "lucide-react";

export default async function DashboardPage() {
  // Fetch stats from database safely (if database is not connected, fallback to 0)
  let totalContacts = 0;
  let unreadContacts = 0;
  let totalUsers = 0;

  try {
    totalContacts = await prisma.contact.count();
    unreadContacts = await prisma.contact.count({ where: { status: "UNREAD" } });
    totalUsers = await prisma.user.count();
  } catch (error) {
    console.warn("Database not seeded or connected yet. Showing default stats.");
  }

  const cards = [
    {
      title: "Total Contacts",
      value: totalContacts,
      icon: <Mail className="text-blue-400" size={24} />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "New Contacts",
      value: unreadContacts,
      icon: <CheckCircle className="text-green-400" size={24} />,
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="text-purple-400" size={24} />,
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Portfolio Content",
      value: "Live",
      icon: <FileText className="text-orange-400" size={24} />,
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your portfolio admin portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className={`glass-card p-6 rounded-xl border ${card.border}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{card.value}</h3>
            <p className="text-sm text-gray-400">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-xl mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-500">
          <p>No recent activity.</p>
        </div>
      </div>
    </div>
  );
}
