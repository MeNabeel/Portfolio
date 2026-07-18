"use client";

import { useState } from "react";
import { markAsRead, deleteContact } from "../../app/dashboard/contacts/actions";
import { Eye, Trash2, X, CheckCircle } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "READ" | "UNREAD";
  createdAt: Date;
};

export function ContactTable({ contacts }: { contacts: Contact[] }) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(id);
      await deleteContact(id);
      setIsDeleting(null);
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    }
  };

  return (
    <div>
      <div className="glass-card rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-semibold text-gray-300">Name</th>
                <th className="p-4 font-semibold text-gray-300">Email</th>
                <th className="p-4 font-semibold text-gray-300">Subject</th>
                <th className="p-4 font-semibold text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-300">Date</th>
                <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{contact.name}</td>
                    <td className="p-4 text-gray-400">{contact.email}</td>
                    <td className="p-4 text-gray-300 truncate max-w-xs">{contact.subject}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.status === "UNREAD" 
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" 
                          : "bg-green-500/20 text-green-400 border border-green-500/20"
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      {contact.status === "UNREAD" && (
                        <button 
                          onClick={() => handleMarkRead(contact.id)}
                          className="p-2 rounded-lg hover:bg-green-500/20 text-green-400 transition-colors"
                          title="Mark as Read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedContact(contact)}
                        className="p-2 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                        title="View Message"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(contact.id)}
                        disabled={isDeleting === contact.id}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">Message Details</h3>
              <button 
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">From</p>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-primary text-sm">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date</p>
                  <p className="font-medium">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Subject</p>
                <p className="font-bold text-lg">{selectedContact.subject}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Message</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              {selectedContact.status === "UNREAD" && (
                <button
                  onClick={() => {
                    handleMarkRead(selectedContact.id);
                    setSelectedContact({ ...selectedContact, status: "READ" });
                  }}
                  className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg font-medium transition-colors"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedContact.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
