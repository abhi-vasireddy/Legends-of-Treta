"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Ramayana3DSeal = dynamic(() => import("@/components/three/Ramayana3DSeal"), { ssr: false });
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building, MapPin, Clock, Award, X, Send, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GameBriefing from "@/components/careers/GameBriefing";

import { submitJobApplication } from "@/lib/firebase";

interface JobOffer {
  id: string;
  roleNumber: string;
  title: string;
  sanskritTitle: string;
  department: string;
  category: "Development" | "Writing" | "Research" | "Design";
  location: string;
  type: string;
  experience: string;
  salary: string;
  summary: string;
  skills: string[];
}

const ROLES: JobOffer[] = [
  {
    id: "frontend-backend-dev",
    roleNumber: "ROLE 01",
    title: "Frontend & Backend Developer",
    sanskritTitle: "जालशिल्पी",
    department: "Full Stack & Web Systems",
    category: "Development",
    location: "Herinova Studio · Hybrid / Remote",
    type: "Full-time / Campus Placement",
    experience: "Entry to 3+ years (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Architect and develop the studio web portals, player telemetry dashboards, and game server backend for Legends of Treta. React, Next.js, Node.js, and secure API gateways.",
    skills: ["React / Next.js", "Node.js / Go", "REST / GraphQL", "Cloud Architecture"],
  },
  {
    id: "csharp-developer",
    roleNumber: "ROLE 02",
    title: "Developer (C#)",
    sanskritTitle: "यन्त्रज्ञः",
    department: "Game Engine & Gameplay Logic",
    category: "Development",
    location: "Herinova Studio · Remote",
    type: "Full-time / Campus Placement",
    experience: "Entry to 3+ years (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Implement core gameplay loops, combat mechanics, state machines, and editor automation in C#. Craft the responsive feel of Parashurama and the Vanara army combat abilities.",
    skills: ["C# OOP", "Game State Architecture", "Algorithms & Data Structures", "Tooling"],
  },
  {
    id: "technical-script-writer",
    roleNumber: "ROLE 03",
    title: "Technical Script Writer",
    sanskritTitle: "गाथाकारः",
    department: "Narrative & Mission Architecture",
    category: "Writing",
    location: "Herinova Studio · Hybrid",
    type: "Full-time / Campus Placement",
    experience: "1-4 years (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Bridge narrative lore with technical quest triggers. Write interactive quest flow logic, trigger states, branching dialogue trees, and mission scripting for Legends of Treta.",
    skills: ["Quest Scripting", "Branching Dialogue", "Screenplay + Game Logic", "Narrative State"],
  },
  {
    id: "assistant-script-writer",
    roleNumber: "ROLE 04",
    title: "Assistant Script Writer",
    sanskritTitle: "सहायकगाथाकारः",
    department: "World Lore & Dialogue",
    category: "Writing",
    location: "Herinova Studio · Hybrid / Remote",
    type: "Full-time / Campus Placement",
    experience: "Graduate / 0-2 years (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Support lead writers with world lore, ancient item inscriptions, NPC dialogue barks, environmental audio logs, and character backstories across Ayodhya, Kishkindha, and Lanka.",
    skills: ["Creative Writing", "Mythological Worldbuilding", "NPC Barks", "Lore Compilations"],
  },
  {
    id: "research-lead",
    roleNumber: "ROLE 05",
    title: "Research Lead",
    sanskritTitle: "अनुसंधाननायकः",
    department: "Vedic & Historical Research",
    category: "Research",
    location: "Herinova Studio · Hybrid / Academic Lead",
    type: "Full-time / Academic Partnership",
    experience: "Scholarly / Research Background",
    salary: "Competitive + Research Grant",
    summary: "Spearhead authentic Sanskrit and historical research for Legends of Treta. Deeply analyze Valmiki Ramayana, Dhanurveda, ancient metallurgical armor, and spiritual metaphysics.",
    skills: ["Valmiki Ramayana", "Sanskrit Texts", "Ancient Indian Warfare", "Dharma Metaphysics"],
  },
  {
    id: "cinematic-poster-designer",
    roleNumber: "ROLE 06",
    title: "Cinematic Poster Designer",
    sanskritTitle: "चित्रकारः",
    department: "Art & Marketing Visuals",
    category: "Design",
    location: "Herinova Studio · Remote / Studio",
    type: "Full-time / Campus Placement",
    experience: "Portfolio Based (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Craft theatrical teaser posters, character key art (like our Parashurama & Rama reveal posters), and cinematic promotional banners using digital painting and 3D compositing.",
    skills: ["Photoshop / Digital Painting", "Cinematic Compositing", "Typography", "Visual Storytelling"],
  },
  {
    id: "3d-sketch-artist",
    roleNumber: "ROLE 07",
    title: "3D Sketch Artist",
    sanskritTitle: "रूपचित्रकारः",
    department: "3D Concept & Sculpting",
    category: "Design",
    location: "Herinova Studio · Remote / Hybrid",
    type: "Full-time / Campus Placement",
    experience: "Portfolio Based (MRIIRS & MRU Priority)",
    salary: "Competitive + Studio Equity",
    summary: "Produce rapid 3D sculpts, anatomical meshes of mythic beings, weapon silhouettes (astras, bows, maces), and organic environment blocks in ZBrush and Blender.",
    skills: ["ZBrush / Blender", "Speed Sculpting", "Anatomy & Silhouette", "3D Ideation"],
  },
];

export default function TretaJobBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeJobModal, setActiveJobModal] = useState<JobOffer | null>(null);
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    docId: string;
    name: string;
    jobTitle: string;
    whatsAppUrl?: string;
  } | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateUniversity, setCandidateUniversity] = useState(
    "MRIIRS (Manav Rachana International Institute of Research and Studies)"
  );
  const [otherUniversityName, setOtherUniversityName] = useState("");
  const [candidatePortfolio, setCandidatePortfolio] = useState("");
  const [candidateOath, setCandidateOath] = useState("");

  useEffect(() => {
    const handleGlobalApply = (e: Event) => {
      const custom = e as CustomEvent<{ roleId?: string }>;
      if (custom.detail?.roleId) {
        const found = ROLES.find((r) => r.id === custom.detail.roleId);
        if (found) setActiveJobModal(found);
        else setActiveJobModal(ROLES[0]);
      } else {
        setActiveJobModal(ROLES[0]);
      }
      setSubmissionSuccess(null);
    };
    window.addEventListener("open-job-apply", handleGlobalApply);
    return () => window.removeEventListener("open-job-apply", handleGlobalApply);
  }, []);

  // Lock background scroll when application modal is open
  useEffect(() => {
    if (activeJobModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeJobModal]);

  const filteredRoles =
    selectedCategory === "All"
      ? ROLES
      : ROLES.filter((r) => r.category === selectedCategory);

  const handleApplyClick = (role: JobOffer) => {
    setActiveJobModal(role);
    setSubmissionError("");
    setSubmissionSuccess(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobModal) return;
    setIsSubmitting(true);
    setSubmissionError("");

    const finalUniversity =
      candidateUniversity === "Other Partner University" ||
      candidateUniversity.toLowerCase().includes("other")
        ? otherUniversityName.trim() || "Other Partner University"
        : candidateUniversity;

    try {
      const res = await fetch("/api/applications/firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: activeJobModal.id,
          jobTitle: activeJobModal.title,
          department: activeJobModal.department,
          candidateName,
          candidateEmail,
          candidatePhone,
          candidatePortfolio,
          candidateOath:
            candidateOath ||
            "To honor the dharma of games and forge the Ramayana in 120 FPS.",
          university: finalUniversity,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Submission failed");

      const docId = resData.docId;

      if (resData.whatsAppUrl) {
        try {
          window.open(resData.whatsAppUrl, "_blank");
        } catch (_) {}
      }

      setSubmissionSuccess({
        docId,
        name: candidateName,
        jobTitle: activeJobModal.title,
        whatsAppUrl: resData.whatsAppUrl,
      });

      setCandidateName("");
      setCandidateEmail("");
      setCandidatePhone("");
      setCandidatePortfolio("");
      setCandidateOath("");
      setCandidateUniversity(
        "MRIIRS (Manav Rachana International Institute of Research and Studies)"
      );
      setOtherUniversityName("");
    } catch (err: any) {
      console.error("Firestore submission error:", err);
      setSubmissionError(
        err.message ||
          "Failed to record application into Cloud Firestore. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="jobs" className="section-glow-top relative overflow-hidden py-24 md:py-36 bg-coal">
      {/* Background orbs & Parashurama glow */}
      <div className="orb pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] bg-crimson/15" aria-hidden />
      <div className="orb pointer-events-none absolute right-[-10%] bottom-[15%] h-[450px] w-[450px] bg-ember/10" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        
        {/* University Hiring Banner */}
        <div className="mb-10 rounded-2xl border border-ember/30 bg-gradient-to-r from-bark via-bark2 to-bark p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-flame/15 border border-flame/30 flex items-center justify-center text-flame text-2xl">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-flame animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-flame font-bold">
                    OFFICIAL CAMPUS RECRUITMENT DRIVE
                  </span>
                </div>
                <h4 className="font-display text-lg md:text-xl font-bold text-ivory mt-0.5">
                  MRIIRS &amp; MRU (Manav Rachana University) Partnership
                </h4>
                <p className="text-xs text-sand/70 font-mono mt-0.5">
                  Exclusive placements for Students &amp; Alumni across 07 core disciplines
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-mono font-semibold">
                LEGENDS OF TRETA
              </span>
              <span className="px-3 py-1.5 rounded-full border border-sand/20 bg-obsidian text-sand/80 text-xs font-mono">
                HERINOVA GAME STUDIOS presents
              </span>
            </div>
          </div>
        </div>

        {/* 3D Ramayana Dharma Chakra Seal */}
        <div className="my-6">
          <Ramayana3DSeal />
        </div>

        {/* Section Heading */}
        <SectionHeading
          sanskrit="नियुक्तिपत्रिका"
          eyebrow="HERINOVA GAME STUDIOS presents // CAMPUS RECRUITMENT"
          title="LEGENDS OF TRETA — Job Offers"
          subtitle="We are hiring 7 talented developers, writers, researchers, and 3D artists from MRIIRS & MRU to forge our AAA Ramayana action game."
        />

        {/* Parashurama Character Teaser Banner */}
        <div className="my-10 rounded-2xl border border-gold/25 overflow-hidden bg-obsidian relative grid grid-cols-1 md:grid-cols-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="md:col-span-5 relative min-h-[300px]">
            <Image
              src="/images/legends_of_treta_parashurama.jpg"
              alt="Character 02 - Parashurama"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-obsidian" />
          </div>

          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <span className="text-xs font-mono tracking-[0.2em] text-flame uppercase mb-1">
              HERINOVA GAME STUDIOS PRESENTS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory tracking-wide">
              LEGENDS OF TRETA: CHARACTER 02 — PARASHURAMA
            </h3>
            <p className="text-xs sm:text-sm text-sand/80 font-light mt-3 leading-relaxed">
              Kneeling in the blood-stained waters at twilight, axe resting in the sacred river, Parashurama joins the Legends of Treta roster. Our team is actively expanding to bring this vision to life with Unreal Engine 5.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="text-xs font-mono text-gold px-3 py-1 rounded border border-gold/30 bg-gold/5">
                TEASER RELEASE: 11-02-2027
              </span>
              <a
                href="#roles-grid"
                className="text-xs font-mono text-sand/70 hover:text-gold transition-colors flex items-center gap-1"
              >
                Explore 07 Open Roles Below ↓
              </a>
            </div>
          </div>
        </div>

        <GameBriefing />

        {/* Category Filters */}
        <div id="roles-grid" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sand/15">
          {["All", "Development", "Writing", "Research", "Design"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold text-obsidian font-bold shadow-[0_0_15px_rgba(217,164,65,0.4)]"
                  : "bg-bark/40 text-sand/70 hover:text-sand hover:bg-bark/80 border border-sand/15"
              }`}
            >
              {cat === "All" ? "All Roles (07)" : cat}
            </button>
          ))}
        </div>

        {/* 7 Job Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="group rounded-2xl border border-sand/15 bg-bark/40 hover:bg-bark/80 hover:border-gold/50 transition-all duration-300 p-6 flex flex-col justify-between relative shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-gold font-bold">{role.roleNumber}</span>
                  <span className="font-sanskrit text-sand/50">{role.sanskritTitle}</span>
                </div>

                <h4 className="font-display text-xl font-bold text-ivory group-hover:text-goldbright transition-colors">
                  {role.title}
                </h4>

                <p className="text-xs text-sand/70 font-mono mt-1 mb-4 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-ember" />
                  {role.department}
                </p>

                <p className="text-xs text-sand/85 font-light leading-relaxed mb-4">
                  {role.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {role.skills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian/70 border border-sand/10 text-sand/60"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="border-t border-sand/10 pt-4 mb-4 text-[11px] font-mono text-sand/60 flex items-center justify-between">
                  <span>{role.location.split("·")[0]}</span>
                  <span className="text-gold font-semibold">{role.salary}</span>
                </div>

                <button
                  onClick={() => handleApplyClick(role)}
                  className="w-full py-2.5 px-4 rounded-lg bg-gold/15 hover:bg-gold text-gold hover:text-obsidian border border-gold/40 font-display font-semibold text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  Apply For Role <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Application / Registration Modal Dialog */}
      <AnimatePresence>
        {activeJobModal && (
          <div
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveJobModal(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md overflow-y-auto overscroll-contain"
          >
            <motion.div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl rounded-2xl border border-gold/40 bg-bark2 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[88vh] overflow-y-auto overscroll-contain"
            >
              <button
                onClick={() => setActiveJobModal(null)}
                className="absolute top-5 right-5 text-sand/50 hover:text-ivory text-xl cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div>
                  <div className="flex items-center gap-2 mb-2 text-gold text-xs font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>LEGENDS OF TRETA // HERINOVA GAME STUDIOS presents</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-ivory">
                    {activeJobModal.title}
                  </h3>
                  <p className="text-xs text-sand/70 font-mono mt-1 mb-6">
                    {activeJobModal.department} · MRIIRS &amp; MRU Priority Review
                  </p>

                  {submissionSuccess ? (
                    <div className="py-6 text-center space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 border-2 border-gold text-gold shadow-[0_0_30px_rgba(217,164,65,0.5)]">
                        <Award className="h-8 w-8" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase">
                          SABHA INSCRIPTION COMPLETE // FIREBASE FIRESTORE
                        </span>
                        <h4 className="font-display text-2xl font-bold text-ivory">
                          APPLICATION INSCRIBED
                        </h4>
                        <p className="font-mono text-xs text-sand/70">
                          Welcome, <span className="text-gold font-bold">{submissionSuccess.name}</span>. Your candidacy for <span className="text-ivory font-bold">{submissionSuccess.jobTitle}</span> has been permanently stored.
                        </p>
                      </div>

                      <div className="rounded-xl border border-sand/20 bg-obsidian/80 p-4 text-left font-mono text-xs space-y-2">
                        <div className="flex justify-between text-sand/60">
                          <span>REGISTRATION ID</span>
                          <span className="text-gold font-bold">{submissionSuccess.docId}</span>
                        </div>
                        <div className="flex justify-between text-sand/60">
                          <span>TARGET REALM</span>
                          <span className="text-ivory">LEGENDS OF TRETA · Herinova Game Studios</span>
                        </div>
                        <div className="flex justify-between text-sand/60">
                          <span>INSTITUTION</span>
                          <span className="text-ivory">MRIIRS &amp; MRU Campus Pool</span>
                        </div>
                        <div className="flex justify-between text-sand/60">
                          <span>STATUS</span>
                          <span className="text-gold">VERIFIED &amp; TRANSMITTED ✓</span>
                        </div>
                      </div>

                      {submissionSuccess.whatsAppUrl && (
                        <div className="space-y-2">
                          <a
                            href={submissionSuccess.whatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(37,211,102,0.45)] transition-all cursor-pointer"
                          >
                            <span>💬 TRANSMIT TO KOUSHIK VIA WHATSAPP ↗</span>
                          </a>
                          <p className="text-[11px] font-mono text-sand/60 text-center">
                            WhatsApp opened in a new tab (+91 93981 13504). Tap button if not opened.
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => setSubmissionSuccess(null)}
                          className="flex-1 py-3 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-mono text-xs transition-colors cursor-pointer"
                        >
                          Submit Another Role
                        </button>
                        <button
                          onClick={() => setActiveJobModal(null)}
                          className="flex-1 py-3 rounded-lg bg-gold text-obsidian font-display font-bold text-xs tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(217,164,65,0.4)]"
                        >
                          Return to Sabha
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-5 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs flex items-center justify-between gap-2" role="status">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#ffd700] animate-pulse"></span>
                          <span className="font-mono text-gold font-semibold">Firebase Cloud Firestore Connected</span>
                        </div>
                        <span className="font-mono text-[10px] text-sand/60">ramayana-jobs</span>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5">
                            Candidate Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5">
                            Email Address (Student / Personal) *
                          </label>
                          <input
                            type="email"
                            required
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                            placeholder="student@mru.edu.in or personal@domain.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                            <span>WhatsApp / Mobile Number</span>
                            <span className="text-[#25D366] text-[10px] lowercase font-sans">
                              direct recruiter chat
                            </span>
                          </label>
                          <input
                            type="tel"
                            value={candidatePhone}
                            onChange={(e) => setCandidatePhone(e.target.value)}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5">
                            University / Institution *
                          </label>
                          <select
                            value={candidateUniversity}
                            onChange={(e) => setCandidateUniversity(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
                          >
                            <option value="MRIIRS (Manav Rachana International Institute of Research and Studies)">
                              MRIIRS · Manav Rachana
                            </option>
                            <option value="MRU (Manav Rachana University)">
                              MRU · Manav Rachana
                            </option>
                            <option value="Other Partner University">
                              Other Partner University
                            </option>
                          </select>
                        </div>

                        {(candidateUniversity === "Other Partner University" ||
                          candidateUniversity.toLowerCase().includes("other")) && (
                          <div className="p-3.5 rounded-xl border border-dashed border-gold/50 bg-gold/5 animate-fadeIn">
                            <label className="block text-xs font-mono text-gold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                              <span>University / College Name *</span>
                              <span className="text-[10px] text-sand/60 lowercase tracking-normal font-sans">
                                partner / accredited institution
                              </span>
                            </label>
                            <input
                              type="text"
                              required
                              autoFocus
                              value={otherUniversityName}
                              onChange={(e) => setOtherUniversityName(e.target.value)}
                              placeholder="Enter your university or college name (e.g. Delhi University, SRM, VIT, BITS, etc.)"
                              className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-gold/50 text-ivory text-sm focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none font-mono"
                            />
                            <p className="mt-1 text-[10px] font-mono text-sand/60">
                              All accredited partner and university students are eligible to apply.
                            </p>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5">
                            Portfolio / GitHub / ArtStation Link *
                          </label>
                          <input
                            type="url"
                            required
                            value={candidatePortfolio}
                            onChange={(e) => setCandidatePortfolio(e.target.value)}
                            placeholder="https://github.com/... or artstation.com/..."
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-sand/70 uppercase tracking-wider mb-1.5">
                            Statement of Intent / Sacred Oath
                          </label>
                          <textarea
                            rows={3}
                            value={candidateOath}
                            onChange={(e) => setCandidateOath(e.target.value)}
                            placeholder="Tell us about your enthusiasm for Ramayana and building Legends of Treta..."
                            className="w-full px-4 py-2.5 rounded-lg bg-obsidian border border-sand/20 text-ivory text-sm focus:border-gold focus:outline-none font-mono resize-none"
                          />
                        </div>

                        {submissionError && (
                          <p className="rounded-lg border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-ivory" role="alert">
                            {submissionError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold to-ember text-obsidian font-display font-bold text-sm tracking-wider hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(217,164,65,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                          {isSubmitting ? "INSCRIBING IN FIRESTORE..." : "SUBMIT APPLICATION & INSCRIBE IN SABHA"}
                        </button>
                      </form>
                    </>
                  )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
