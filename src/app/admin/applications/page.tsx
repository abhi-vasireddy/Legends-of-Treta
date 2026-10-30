"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  ExternalLink,
  Shield,
  Briefcase,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Database,
} from "lucide-react";

interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobTitle: string;
  university?: string;
  candidatePortfolio?: string;
  candidateOath?: string;
  status?: string;
  createdAt?: any;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications/firebase");
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const roles = Array.from(
    new Set(applications.map((a) => a.jobTitle).filter(Boolean))
  );

  const filtered = applications.filter((app) => {
    const matchesRole = filterRole === "all" || app.jobTitle === filterRole;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      app.candidateName?.toLowerCase().includes(q) ||
      app.candidateEmail?.toLowerCase().includes(q) ||
      app.university?.toLowerCase().includes(q) ||
      app.candidateOath?.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070a08] text-[#f7eedb] font-sans">
      {/* Top Bar */}
      <header className="border-b border-sand/20 bg-[#0d120e]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_20px_rgba(217,164,65,0.4)] bg-obsidian flex items-center justify-center p-0.5">
              <img src="/images/logo.png" alt="Herinova" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-wider text-ivory">
                LEGENDS OF TRETA // CANDIDATE COMMAND
              </h1>
              <p className="text-[11px] font-mono text-gold flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                Herinova Game Studios presents · <span className="text-sand/70">ramayana-jobs</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=919398113504"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366] text-xs font-mono flex items-center gap-2 text-[#25D366] hover:text-white transition-colors cursor-pointer"
            >
              <span>💬 Recruiter WA: +91 93981 13504</span>
            </a>
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="px-3.5 py-2 rounded-lg border border-sand/20 bg-bark/40 hover:bg-bark text-xs font-mono flex items-center gap-2 text-sand/80 hover:text-gold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-gold text-obsidian font-display font-bold text-xs tracking-wider hover:opacity-95 transition-opacity"
            >
              Go to Site ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-6 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sand/60 uppercase tracking-widest">
                Total Inscriptions
              </span>
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div className="text-4xl font-display font-bold text-ivory mt-2">
              {applications.length}
            </div>
            <p className="text-[11px] font-mono text-gold mt-1">Live in Firestore</p>
          </div>

          <div className="p-6 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sand/60 uppercase tracking-widest">
                Partner Institutions
              </span>
              <GraduationCap className="w-5 h-5 text-ember" />
            </div>
            <div className="text-2xl font-display font-bold text-ivory mt-2">
              MRIIRS &amp; MRU
            </div>
            <p className="text-[11px] font-mono text-sand/70 mt-1">Campus Placement Drive</p>
          </div>

          <div className="p-6 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sand/60 uppercase tracking-widest">
                Active Studio Project
              </span>
              <Sparkles className="w-5 h-5 text-goldbright" />
            </div>
            <div className="text-2xl font-display font-bold text-gold mt-2">
              Legends of Treta
            </div>
            <p className="text-[11px] font-mono text-sand/70 mt-1">Unreal Engine 5 Action RPG</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sand/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, email, oath, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e1410] border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#0e1410] border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
          >
            <option value="all">All Roles ({applications.length})</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Table or Empty State */}
        {loading ? (
          <div className="py-20 text-center font-mono text-sand/60">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-gold" />
            Querying Cloud Firestore documents...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-sand/20 rounded-2xl bg-[#0e1410]/50">
            <Briefcase className="w-10 h-10 text-sand/30 mx-auto mb-3" />
            <h3 className="font-display text-lg text-ivory">No Applications Found</h3>
            <p className="text-xs text-sand/60 mt-1">
              Submit an application on the careers board to see it appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-2xl border border-sand/15 bg-[#0e1410] hover:border-gold/40 transition-all shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-gold mb-1">
                      <span className="font-bold">{app.jobTitle}</span>
                      <span className="text-sand/40">·</span>
                      <span className="text-sand/70">{app.university || "Manav Rachana"}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-ivory">
                      {app.candidateName}
                    </h3>

                    <p className="font-mono text-xs text-sand/60 mt-0.5 flex items-center gap-2">
                      <span>{app.candidateEmail}</span>
                      {app.candidatePhone && (
                        <>
                          <span className="text-sand/30">|</span>
                          <span className="text-sand/80">📱 {app.candidatePhone}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.candidatePhone && (
                      <a
                        href={`https://api.whatsapp.com/send?phone=${app.candidatePhone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(`Namaste ${app.candidateName}! We have reviewed your application for ${app.jobTitle} at Legends of Treta (Herinova Game Studios).`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] text-xs font-mono flex items-center gap-1.5 hover:bg-[#25D366] hover:text-white transition-colors"
                      >
                        <span>WhatsApp Candidate 💬</span>
                      </a>
                    )}
                    {app.candidatePortfolio && (
                      <a
                        href={app.candidatePortfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg border border-gold/30 bg-gold/10 text-gold text-xs font-mono flex items-center gap-1.5 hover:bg-gold hover:text-obsidian transition-colors"
                      >
                        <span>Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span className="px-3 py-1 rounded-lg bg-sand/10 border border-sand/20 text-[11px] font-mono text-sand/80">
                      ID: {app.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                {app.candidateOath && (
                  <div className="mt-4 pt-4 border-t border-sand/10">
                    <p className="text-xs text-sand/80 italic font-serif leading-relaxed">
                      &ldquo;{app.candidateOath}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
