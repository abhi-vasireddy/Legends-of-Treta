"use client";

import { useEffect, useState, useRef } from "react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Mail,
  Download,
  Filter,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Building2,
  Phone,
  FileSpreadsheet,
} from "lucide-react";

interface CandidateApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobTitle: string;
  department?: string;
  university?: string;
  candidatePortfolio?: string;
  candidateOath?: string;
  status?: string;
  createdAt?: any;
}

const STATUS_OPTIONS = [
  "Inscribed in Sabha",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Offer Extended",
  "Archived",
];

export default function BackendPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinDigits, setPinDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Application Data State
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // 1. Check existing session on load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/portal/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchResponses();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  // 2. Fetch candidate applications from Firestore
  const fetchResponses = async () => {
    setLoadingApps(true);
    try {
      const res = await fetch("/api/portal/responses");
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to load candidate responses:", err);
    } finally {
      setLoadingApps(false);
    }
  };

  // 3. Handle PIN digit entry
  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned && value !== "") return;

    const nextDigits = [...pinDigits];

    // If pasted full 6 digits
    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        nextDigits[i] = chars[i] || "";
      }
      setPinDigits(nextDigits);
      if (chars.length === 6) {
        verifyPin(nextDigits.join(""));
      } else {
        const nextIndex = Math.min(chars.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
      return;
    }

    nextDigits[index] = cleaned.slice(-1);
    setPinDigits(nextDigits);
    setPinError("");

    // Auto-advance to next input
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    if (cleaned && index === 5 && nextDigits.every((d) => d !== "")) {
      verifyPin(nextDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pinDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 4. Verify 6-digit PIN against server environment variable
  const verifyPin = async (fullPin?: string) => {
    const pin = fullPin || pinDigits.join("");
    if (pin.length !== 6) {
      setPinError("Please enter all 6 digits of the PIN.");
      return;
    }

    setPinLoading(true);
    setPinError("");

    try {
      const res = await fetch("/api/portal/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchResponses();
      } else {
        setPinError(data.error || "Incorrect 6-digit PIN. Access denied.");
        setPinDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setPinError("Connection error while verifying PIN.");
    } finally {
      setPinLoading(false);
    }
  };

  // 5. Logout / Lock Portal
  const handleLockPortal = async () => {
    try {
      await fetch("/api/portal/auth", { method: "DELETE" });
    } finally {
      setIsAuthenticated(false);
      setPinDigits(["", "", "", "", "", ""]);
      setApplications([]);
    }
  };

  // 6. Update Candidate Status in Cloud Firestore
  const handleStatusChange = async (docId: string, newStatus: string) => {
    setStatusUpdatingId(docId);
    try {
      const res = await fetch("/api/portal/responses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId, status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === docId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // 7. Export candidate data to CSV (Excel compatible)
  const exportToCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      "Registration ID",
      "Candidate Name",
      "Role Applied",
      "Email Address",
      "Mobile / WhatsApp",
      "University / College",
      "Portfolio Link",
      "Statement of Intent / Oath",
      "Status",
    ];

    const rows = applications.map((app) => [
      `"${app.id}"`,
      `"${(app.candidateName || "").replace(/"/g, '""')}"`,
      `"${(app.jobTitle || "").replace(/"/g, '""')}"`,
      `"${(app.candidateEmail || "").replace(/"/g, '""')}"`,
      `"${(app.candidatePhone || "").replace(/"/g, '""')}"`,
      `"${(app.university || "").replace(/"/g, '""')}"`,
      `"${(app.candidatePortfolio || "").replace(/"/g, '""')}"`,
      `"${(app.candidateOath || "").replace(/"/g, '""')}"`,
      `"${(app.status || "Inscribed in Sabha").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Legends_of_Treta_Candidates_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter lists
  const roles = Array.from(
    new Set(applications.map((a) => a.jobTitle).filter(Boolean))
  );
  const universities = Array.from(
    new Set(applications.map((a) => a.university).filter(Boolean))
  );

  const filtered = applications.filter((app) => {
    const matchesRole = selectedRole === "all" || app.jobTitle === selectedRole;
    const matchesUniversity =
      selectedUniversity === "all" || app.university === selectedUniversity;
    const matchesStatus =
      selectedStatus === "all" ||
      (app.status || "Inscribed in Sabha") === selectedStatus;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.candidateName?.toLowerCase().includes(q) ||
      app.candidateEmail?.toLowerCase().includes(q) ||
      app.candidatePhone?.toLowerCase().includes(q) ||
      app.university?.toLowerCase().includes(q) ||
      app.jobTitle?.toLowerCase().includes(q) ||
      app.candidateOath?.toLowerCase().includes(q);

    return matchesRole && matchesUniversity && matchesStatus && matchesSearch;
  });

  // Loading screen while checking initial session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070a08] flex items-center justify-center font-mono text-gold text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Authenticating Sabha Gate...
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: 6-DIGIT PIN SECURITY LOCK SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a08] text-[#f7eedb] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] top-1/4" />
        <div className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-crimson/10 blur-[100px] bottom-1/4" />

        <div className="relative z-10 w-full max-w-md bg-[#111612] border border-gold/40 rounded-2xl p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-center">
          {/* Circular Herinova Emblem */}
          <div className="mx-auto w-16 h-16 rounded-full border border-gold/50 bg-[#060907] flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.3)] mb-5">
            <Lock className="w-7 h-7 text-gold animate-pulse" />
          </div>

          <div className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase mb-1">
            HERINOVA GAME STUDIOS // RECRUITMENT
          </div>

          <h2 className="font-display text-2xl font-bold text-ivory tracking-wide mb-2">
            Sabha Candidate Portal
          </h2>

          <p className="text-xs text-sand/70 font-mono mb-8 leading-relaxed">
            Restricted access. Enter your 6-digit security PIN to unlock submitted candidate applications.
          </p>

          {/* 6 Digit Input Boxes */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyPin();
            }}
          >
            <div className="flex justify-center gap-2.5 sm:gap-3 mb-6">
              {pinDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  autoFocus={idx === 0}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold rounded-xl bg-[#060907] border ${
                    digit
                      ? "border-gold text-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                      : "border-sand/25 text-ivory"
                  } focus:border-gold focus:outline-none transition-all duration-200`}
                />
              ))}
            </div>

            {pinError && (
              <div className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
                {pinError}
              </div>
            )}

            <button
              type="submit"
              disabled={pinLoading || pinDigits.some((d) => d === "")}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold via-goldbright to-ember text-obsidian font-mono font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer flex items-center justify-center gap-2"
            >
              {pinLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying PIN...</span>
                </>
              ) : (
                <>
                  <span>Unlock Candidate Sabha</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-sand/10 flex items-center justify-center gap-2 text-[10px] font-mono text-sand/50">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>PIN configured in server environment (.env.local)</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED CANDIDATE RESPONSES PORTAL
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#070a08] text-[#f7eedb] font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-sand/20 bg-[#0d120e]/95 backdrop-blur-md px-6 py-4 sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_20px_rgba(217,164,65,0.4)] bg-obsidian flex items-center justify-center p-0.5">
              <img src="/images/logo.png" alt="Herinova" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold tracking-wider text-ivory">
                  LEGENDS OF TRETA // CANDIDATE COMMAND SABHA
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold/15 text-gold border border-gold/30">
                  PIN Verified
                </span>
              </div>
              <p className="text-[11px] font-mono text-gold flex items-center gap-1.5 mt-0.5">
                <Database className="w-3 h-3" />
                Firebase Firestore Connected · <span className="text-sand/70">ramayana-jobs / applications</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export to CSV */}
            <button
              onClick={exportToCSV}
              disabled={applications.length === 0}
              className="px-3.5 py-2 rounded-lg border border-gold/40 bg-gold/10 hover:bg-gold hover:text-obsidian text-gold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(255,215,0,0.15)] disabled:opacity-40"
              title="Download all candidate responses as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Refresh Data */}
            <button
              onClick={fetchResponses}
              disabled={loadingApps}
              className="px-3.5 py-2 rounded-lg border border-sand/20 bg-bark/40 hover:bg-bark text-xs font-mono flex items-center gap-2 text-sand/80 hover:text-gold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingApps ? "animate-spin text-gold" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* Lock / Exit Portal */}
            <button
              onClick={handleLockPortal}
              className="px-3.5 py-2 rounded-lg border border-red-500/30 bg-red-950/30 hover:bg-red-900/40 text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-sand/60 uppercase tracking-widest">
                Total Inscriptions
              </span>
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-ivory mt-2">
              {applications.length}
            </div>
            <p className="text-[10px] font-mono text-gold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Live in Cloud Firestore
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-sand/60 uppercase tracking-widest">
                Partner Institutions
              </span>
              <GraduationCap className="w-5 h-5 text-ember" />
            </div>
            <div className="text-xl font-display font-bold text-ivory mt-2 truncate">
              MRIIRS, MRU &amp; Partners
            </div>
            <p className="text-[10px] font-mono text-sand/70 mt-1">
              {universities.length} unique universities represented
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-sand/60 uppercase tracking-widest">
                Recruiter WhatsApp
              </span>
              <Phone className="w-5 h-5 text-[#25D366]" />
            </div>
            <div className="text-xl font-display font-bold text-ivory mt-2">
              +91 93981 13504
            </div>
            <p className="text-[10px] font-mono text-[#25D366] mt-1">
              Direct candidate transmission ready
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-sand/60 uppercase tracking-widest">
                Active Project
              </span>
              <Sparkles className="w-5 h-5 text-goldbright" />
            </div>
            <div className="text-xl font-display font-bold text-gold mt-2">
              Legends of Treta
            </div>
            <p className="text-[10px] font-mono text-sand/70 mt-1">
              Unreal Engine 5 Action RPG
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl border border-sand/15 bg-[#0d120e] mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sand/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, email, phone, role, university, or oath..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian border border-sand/20 text-xs font-mono text-ivory placeholder-sand/40 focus:border-gold focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-obsidian border border-sand/20 text-xs font-mono text-sand/80 focus:border-gold focus:outline-none"
            >
              <option value="all">All Roles ({applications.length})</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* University Filter */}
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-obsidian border border-sand/20 text-xs font-mono text-sand/80 focus:border-gold focus:outline-none max-w-[180px] truncate"
            >
              <option value="all">All Universities</option>
              {universities.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-obsidian border border-sand/20 text-xs font-mono text-sand/80 focus:border-gold focus:outline-none"
            >
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-xl border border-sand/20 bg-obsidian p-0.5">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === "cards" ? "bg-gold text-obsidian font-bold" : "text-sand/60 hover:text-ivory"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === "table" ? "bg-gold text-obsidian font-bold" : "text-sand/60 hover:text-ivory"
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Responses Count Subtitle */}
        <div className="flex items-center justify-between text-xs font-mono text-sand/60 mb-4 px-1">
          <div>
            Showing <span className="text-gold font-bold">{filtered.length}</span> of{" "}
            <span className="text-ivory">{applications.length}</span> total filled responses
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-ember hover:underline cursor-pointer"
            >
              Clear Search Filter ✕
            </button>
          )}
        </div>

        {/* Applications Display */}
        {loadingApps ? (
          <div className="py-24 text-center font-mono text-sand/60">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-gold" />
            Synchronizing with Firebase Cloud Firestore Sabha...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-sand/20 rounded-2xl bg-[#0e1410]/50">
            <Users className="w-10 h-10 text-sand/30 mx-auto mb-3" />
            <h3 className="font-display text-lg text-ivory">No Responses Match Filters</h3>
            <p className="text-xs text-sand/60 mt-1">
              Try clearing your search query or role filter.
            </p>
          </div>
        ) : viewMode === "cards" ? (
          /* ========================================================= */
          /* CARD DOSSIER VIEW */
          /* ========================================================= */
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-2xl border border-sand/15 bg-[#0e1410] hover:border-gold/40 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.5)] relative group"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {/* Left Column: Candidate Info */}
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
                      <span className="font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                        {app.jobTitle}
                      </span>
                      <span className="text-sand/40">·</span>
                      <span className="text-sand/80 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-sand/50" />
                        {app.university || "Manav Rachana"}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-ivory tracking-wide">
                      {app.candidateName}
                    </h3>

                    {/* Contact Badges */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono">
                      <a
                        href={`mailto:${app.candidateEmail}`}
                        className="text-sand/80 hover:text-gold flex items-center gap-1 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-gold/70" />
                        <span>{app.candidateEmail}</span>
                      </a>

                      {app.candidatePhone && (
                        <span className="text-sand/80 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>{app.candidatePhone}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Status & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Status Dropdown */}
                    <select
                      value={app.status || "Inscribed in Sabha"}
                      disabled={statusUpdatingId === app.id}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-obsidian border border-gold/30 text-gold text-xs font-mono focus:border-gold focus:outline-none cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>

                    {/* WhatsApp Chat Button */}
                    {app.candidatePhone ? (
                      <a
                        href={`https://api.whatsapp.com/send?phone=${app.candidatePhone.replace(
                          /[^0-9]/g,
                          ""
                        )}&text=${encodeURIComponent(
                          `Namaste ${app.candidateName}! Herinova Game Studios here regarding your application for ${app.jobTitle} at Legends of Treta.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Chat with candidate on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    ) : null}

                    {/* Portfolio Link */}
                    {app.candidatePortfolio && (
                      <a
                        href={app.candidatePortfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg border border-gold/30 bg-gold/10 hover:bg-gold hover:text-obsidian text-gold text-xs font-mono flex items-center gap-1.5 transition-colors"
                        title="View portfolio or GitHub"
                      >
                        <span>Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {/* Sabha ID */}
                    <span className="px-3 py-1.5 rounded-lg bg-sand/10 border border-sand/20 text-[11px] font-mono text-sand/70">
                      ID: {app.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                {/* Candidate Oath Quote */}
                {app.candidateOath && (
                  <div className="mt-4 pt-4 border-t border-sand/10">
                    <div className="text-[10px] font-mono text-sand/50 uppercase tracking-widest mb-1">
                      STATEMENT OF INTENT / OATH
                    </div>
                    <p className="text-xs text-sand/90 italic font-serif leading-relaxed bg-obsidian/60 p-3.5 rounded-xl border border-sand/10">
                      &ldquo;{app.candidateOath}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* ========================================================= */
          /* TABLE SPREADSHEET VIEW */
          /* ========================================================= */
          <div className="overflow-x-auto rounded-2xl border border-sand/15 bg-[#0e1410] shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#080d09] border-b border-sand/20 text-sand/60 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Role Applied</th>
                  <th className="py-3.5 px-4">University</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Portfolio</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-sand/5 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-ivory text-sm">
                      {app.candidateName}
                      <div className="text-[10px] font-mono text-sand/40 font-normal">
                        ID: {app.id.slice(0, 8)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gold font-semibold">
                      {app.jobTitle}
                    </td>
                    <td className="py-3.5 px-4 text-sand/80 max-w-[200px] truncate">
                      {app.university || "Manav Rachana"}
                    </td>
                    <td className="py-3.5 px-4 text-sand/70">
                      <div>{app.candidateEmail}</div>
                      {app.candidatePhone && (
                        <div className="text-[#25D366] text-[11px]">{app.candidatePhone}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.candidatePortfolio ? (
                        <a
                          href={app.candidatePortfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gold hover:underline flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sand/30">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status || "Inscribed in Sabha"}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-obsidian border border-sand/20 text-gold text-xs font-mono"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.candidatePhone && (
                          <a
                            href={`https://api.whatsapp.com/send?phone=${app.candidatePhone.replace(
                              /[^0-9]/g,
                              ""
                            )}&text=${encodeURIComponent(
                              `Namaste ${app.candidateName}! Herinova Game Studios here regarding your application for ${app.jobTitle} at Legends of Treta.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={`mailto:${app.candidateEmail}`}
                          className="p-1.5 rounded-lg bg-sand/10 hover:bg-sand/20 text-sand/80 hover:text-gold transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
