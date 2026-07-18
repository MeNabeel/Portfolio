"use client";

import { useState } from "react";
import { updatePortfolioContent } from "../../app/dashboard/content/actions";
import { Loader2, Save } from "lucide-react";

export function CMSForm({ content }: { content: any }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [skills, setSkills] = useState<string[]>(content?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("skills", JSON.stringify(skills));
    formData.set("socialLinks", JSON.stringify(content?.socialLinks || [])); // Passing existing for now

    const result = await updatePortfolioContent(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Portfolio content updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    }

    setIsPending(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 rounded-xl border border-white/10">
      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${
          message.type === "success" 
            ? "bg-green-500/10 border border-green-500/20 text-green-400" 
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
              <input
                name="heroTitle"
                defaultValue={content?.heroTitle || ""}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                disabled={isPending}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Subtitle</label>
              <textarea
                name="heroSubtitle"
                defaultValue={content?.heroSubtitle || ""}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-y"
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">About Section</h3>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">About Me Text</label>
            <textarea
              name="aboutText"
              defaultValue={content?.aboutText || ""}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-y"
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Skills (Tags)</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="bg-primary/20 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={isPending || !newSkill.trim()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ml-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
