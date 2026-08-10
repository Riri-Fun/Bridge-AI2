import { useState, useEffect, useRef } from "react";
import {
  Plus, History as HistoryIcon, Bookmark, Settings as SettingsIcon, User,
  Linkedin, Coffee, Mail, Compass, Loader2, Download, Copy, Check, Send,
  Trash2, Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight
} from "lucide-react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

:root{
  --cream:#F2E1C4;
  --cream-2:#FBF5E8;
  --white:#FFFFFF;
  --brown:#A97C50;
  --brown-dark:#8B6440;
  --brown-darker:#6E4E32;
  --ink:#2A1B10;
  --muted:#7C6A52;
  --line:#D9C4A0;
}

.brg-root{
  font-family:'Inter',sans-serif;
  background:var(--cream);
  color:var(--ink);
  min-height:100%;
  display:flex;
  position:relative;
}

.brg-sidebar{
  width:196px;
  flex-shrink:0;
  border-right:1.5px solid var(--brown-dark);
  padding:26px 18px;
  display:flex;
  flex-direction:column;
}
.brg-logo{
  display:flex; align-items:center; gap:9px;
  margin-bottom:30px; cursor:pointer;
}
.brg-logo-text{
  font-family:'Inter',sans-serif;
  font-weight:800;
  font-size:17px;
  letter-spacing:-.01em;
  color:var(--ink);
}
.brg-nav-btn{
  width:100%;
  background:var(--brown);
  color:#fff;
  border:none;
  border-radius:22px;
  padding:11px 18px;
  font-family:'Inter',sans-serif;
  font-weight:600;
  font-size:13.5px;
  text-align:left;
  cursor:pointer;
  margin-bottom:11px;
  display:flex; align-items:center; gap:9px;
  transition:background .15s ease, transform .1s ease;
}
.brg-nav-btn:hover{ background:var(--brown-dark); }
.brg-nav-btn:active{ transform:scale(.98); }
.brg-nav-btn.active{ background:var(--brown-darker); }
.brg-nav-btn.ghost{
  background:transparent; color:var(--brown-darker);
  border:1.5px solid var(--brown);
}
.brg-nav-btn.ghost:hover{ background:rgba(169,124,80,0.12); }

.brg-main{
  flex:1;
  padding:36px 46px 60px;
  max-width:980px;
}

.brg-mono-eyebrow{
  font-family:'IBM Plex Mono',monospace;
  font-size:11px;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--brown-dark);
  margin-bottom:8px;
}

/* Landing */
.brg-landing{ text-align:center; padding-top:6px; }
.brg-hero-wrap{ display:flex; justify-content:center; margin-bottom:14px; }
.brg-headline{
  font-family:'IBM Plex Mono',monospace;
  font-weight:700;
  font-size:27px;
  line-height:1.35;
  color:var(--ink);
  margin:6px 0 18px;
}
.brg-landing-copy{
  font-size:14.5px;
  line-height:1.75;
  color:var(--muted);
  max-width:560px;
  margin:0 auto 14px;
}
.brg-cta{
  margin-top:18px;
  background:var(--brown);
  color:#fff;
  border:none;
  border-radius:26px;
  padding:14px 34px;
  font-family:'Inter',sans-serif;
  font-weight:700;
  font-size:15px;
  cursor:pointer;
  transition:background .15s ease, transform .1s ease;
}
.brg-cta:hover{ background:var(--brown-dark); }
.brg-cta:active{ transform:scale(.98); }

/* App */
.brg-app-header{ text-align:center; margin-bottom:26px; }
.brg-app-title{
  font-family:'IBM Plex Mono',monospace;
  font-weight:700;
  font-size:20px;
  margin:0 0 4px;
}
.brg-app-sub{ font-size:13px; color:var(--muted); }

.brg-cols{
  display:grid;
  grid-template-columns:1fr 44px 1fr;
  align-items:start;
  gap:6px;
}
.brg-col-arrow{
  display:flex; align-items:center; justify-content:center;
  color:var(--brown-dark);
  padding-top:90px;
}
.brg-panel{
  background:var(--brown);
  border-radius:18px;
  padding:16px;
}
.brg-panel-title{
  background:var(--white);
  border-radius:10px;
  text-align:center;
  font-family:'IBM Plex Mono',monospace;
  font-weight:600;
  font-size:12.5px;
  padding:9px 0;
  margin-bottom:12px;
  color:var(--ink);
}
.brg-field-box{
  background:var(--white);
  border-radius:10px;
  padding:12px 14px;
  margin-bottom:10px;
  min-height:64px;
}
.brg-field-box:last-child{ margin-bottom:0; }
.brg-field-label{
  font-family:'IBM Plex Mono',monospace;
  font-size:10px;
  letter-spacing:.05em;
  text-transform:uppercase;
  color:var(--brown-dark);
  display:block;
  margin-bottom:6px;
}
.brg-field-box textarea, .brg-field-box input{
  width:100%; border:none; outline:none; resize:none;
  font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink);
  background:transparent; box-sizing:border-box;
}
.brg-field-box textarea{ min-height:56px; line-height:1.5; }
.brg-mini-input{ padding:5px 0; border-bottom:1px solid #EEE4D2 !important; margin-bottom:6px; }
.brg-mini-input:last-child{ border-bottom:none !important; margin-bottom:0; }

.brg-result-body{
  font-size:13px; line-height:1.6; color:var(--ink);
  white-space:pre-wrap; max-height:220px; overflow-y:auto;
}
.brg-result-body.empty{ color:#B9A98C; font-style:italic; }
.brg-q-list{ margin:0; padding-left:16px; }
.brg-q-list li{ margin-bottom:6px; }
.brg-copy-row{ display:flex; justify-content:flex-end; margin-top:6px; }
.brg-copy-btn{
  background:transparent; border:none; cursor:pointer;
  color:var(--brown-dark); display:flex; align-items:center; gap:4px;
  font-family:'IBM Plex Mono',monospace; font-size:10px; padding:2px 4px;
}
.brg-copy-btn:hover{ text-decoration:underline; }

.brg-generate-row{ margin-top:14px; display:flex; justify-content:center; }
.brg-generate-btn{
  background:var(--white); color:var(--brown-darker);
  border:none; border-radius:20px;
  padding:10px 24px; font-weight:700; font-size:13px;
  font-family:'Inter',sans-serif; cursor:pointer;
  display:flex; align-items:center; gap:8px;
}
.brg-generate-btn:disabled{ opacity:.6; cursor:not-allowed; }

.brg-error{
  background:#F6E4DC; color:#8A3B1E; border:1px solid #E3B49A;
  border-radius:10px; padding:10px 14px; font-size:13px; margin-bottom:14px;
  text-align:center;
}

.brg-actions-row{
  display:flex; gap:12px; justify-content:center; margin-top:24px; flex-wrap:wrap;
}
.brg-pill-btn{
  background:var(--brown); color:#fff; border:none; border-radius:22px;
  padding:11px 26px; font-family:'Inter',sans-serif; font-weight:700; font-size:13.5px;
  cursor:pointer; display:flex; align-items:center; gap:8px;
}
.brg-pill-btn:hover{ background:var(--brown-dark); }
.brg-pill-btn:disabled{ opacity:.55; cursor:not-allowed; }

.brg-spin{ animation:brg-spin .9s linear infinite; }
@keyframes brg-spin{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

/* History / Saved */
.brg-list-header{ display:flex; justify-content:center; margin-bottom:24px; }
.brg-list-title{
  background:var(--brown); color:#fff;
  font-family:'IBM Plex Mono',monospace; font-weight:700; font-size:15px;
  border-radius:22px; padding:11px 34px;
}
.brg-hist-row{
  display:flex; gap:12px; align-items:stretch; margin-bottom:12px; cursor:pointer;
}
.brg-hist-box{
  flex:1; background:var(--white); border:1.5px solid var(--brown);
  border-radius:12px; padding:12px 16px;
}
.brg-hist-name{ font-weight:700; font-size:13.5px; margin-bottom:2px; }
.brg-hist-meta{ font-size:12px; color:var(--muted); }
.brg-hist-side{ display:flex; flex-direction:column; gap:6px; justify-content:center; }
.brg-icon-btn{
  background:var(--white); border:1.5px solid var(--brown); cursor:pointer;
  color:var(--brown-dark); padding:7px; border-radius:9px; display:flex;
}
.brg-icon-btn:hover{ background:var(--cream-2); }
.brg-icon-btn.starred{ color:#C7862F; background:#FBEFD9; }

.brg-empty{ text-align:center; padding:50px 20px; color:var(--muted); font-size:14px; }

.brg-pagination{
  display:flex; align-items:center; justify-content:center; gap:14px; margin-top:22px;
  font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--brown-dark);
}
.brg-page-num{
  cursor:pointer; padding:3px 8px; border-radius:6px;
}
.brg-page-num.active{ background:var(--brown); color:#fff; }
.brg-page-arrow{ cursor:pointer; display:flex; }
.brg-page-arrow.disabled{ opacity:.3; cursor:default; }

.brg-placeholder-card{
  background:var(--white); border:1.5px solid var(--brown);
  border-radius:16px; padding:30px; text-align:center; color:var(--muted);
  font-size:14px; max-width:420px; margin:0 auto;
}

.brg-toast{
  position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
  background:var(--brown-darker); color:#fff;
  padding:11px 20px; border-radius:10px; font-size:13px;
  display:flex; align-items:center; gap:8px;
  box-shadow:0 8px 24px rgba(0,0,0,.25); z-index:50;
}

@media (max-width:760px){
  .brg-cols{ grid-template-columns:1fr; }
  .brg-col-arrow{ padding-top:0; transform:rotate(90deg); }
  .brg-main{ padding:26px 18px 44px; }
  .brg-sidebar{ width:150px; padding:20px 12px; }
}
`;

function BridgeLogo({ size = 30 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none">
      <path d="M4 30 L4 16" stroke="#8B6440" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M56 30 L56 16" stroke="#8B6440" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M2 30 H58" stroke="#2A1B10" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M4 16 Q30 0 56 16"
        stroke="#A97C50"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {[10, 18, 26, 34, 42, 50].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={30}
          x2={x}
          y2={16 - Math.abs(30 - x) * 0.18}
          stroke="#A97C50"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

function HeroIllustration() {
  const nodes = [
    { x: 230, y: 60, r: 30, c: "#4FA9A0" },
    { x: 110, y: 110, r: 24, c: "#E8825B" },
    { x: 350, y: 100, r: 24, c: "#5B6EE8" },
    { x: 60, y: 190, r: 20, c: "#E0B23E" },
    { x: 230, y: 170, r: 22, c: "#9B5FA8" },
    { x: 390, y: 195, r: 20, c: "#4C93D9" },
    { x: 300, y: 220, r: 18, c: "#5C8F5A" },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 4], [1, 3], [4, 6], [2, 5], [4, 5],
  ];
  return (
    <svg width="380" height="230" viewBox="0 0 440 260">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#B9A17E" strokeWidth="1.6" strokeDasharray="1 6" strokeLinecap="round"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
          <circle cx={n.x} cy={n.y - n.r * 0.22} r={n.r * 0.28} fill="#fff" opacity="0.9" />
          <path
            d={`M ${n.x - n.r * 0.45} ${n.y + n.r * 0.5} Q ${n.x} ${n.y - n.r * 0.05} ${n.x + n.r * 0.45} ${n.y + n.r * 0.5}`}
            fill="#fff" opacity="0.9"
          />
        </g>
      ))}
    </svg>
  );
}

const RESULT_META = [
  { key: "linkedinMessage", title: "LinkedIn Message", icon: Linkedin },
  { key: "coffeeChatQuestions", title: "Coffee Chat Questions", icon: Coffee },
  { key: "followUpEmail", title: "Follow-Up Email", icon: Mail },
  { key: "networkingStrategy", title: "Networking Strategy", icon: Compass },
];

const emptyForm = { background: "", targetName: "", targetRole: "", careerGoal: "" };
const PAGE_SIZE = 6;

export default function BridgeAI() {
  const [view, setView] = useState("landing");
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState([]);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");
  const [toast, setToast] = useState("");
  const [histPage, setHistPage] = useState(1);
  const [savedPage, setSavedPage] = useState(1);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bridge-ai-sessions");
      if (raw) setSessions(JSON.parse(raw));
    } catch (e) {
      // no sessions saved yet
    } finally {
      setSessionsLoaded(true);
    }
  }, []);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }

  function persistSessions(next) {
    setSessions(next);
    try {
      localStorage.setItem("bridge-ai-sessions", JSON.stringify(next));
    } catch (e) {
      showToast("Couldn't save — try again");
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleGenerate() {
    if (!form.background.trim() || !form.targetName.trim() || !form.careerGoal.trim()) {
      setError("Fill in your background, the person you're reaching out to, and your goal.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const system = `You are a warm, specific networking coach for international students. Given the user's background, the professional they want to reach out to, and their career goal, produce outreach content that sounds human and specific to their situation — never generic or templated. Keep it concise so the whole response fits comfortably in a short reply.

Return ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "linkedinMessage": "a warm LinkedIn connection request, under 300 characters, written in first person as the user",
  "coffeeChatQuestions": ["5 thoughtful, specific open-ended questions the user could ask in a 20-minute coffee chat"],
  "followUpEmail": "a short thank-you follow-up email (3-4 sentences) the user can send after the chat, using [bracketed placeholders] for details that would come from the actual conversation",
  "networkingStrategy": "a short 3-4 sentence strategy paragraph for how the user should approach this specific relationship and goal going forward"
}`;
      const userMsg = `My background: ${form.background}
Person I want to connect with: ${form.targetName}${form.targetRole ? ", " + form.targetRole : ""}
My goal: ${form.careerGoal}`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system, message: userMsg }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      const text = (data.content || [])
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setCurrentId(null);
    } catch (e) {
      setError("Couldn't generate a plan just now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleNewSession() {
    setForm(emptyForm);
    setResult(null);
    setError("");
    setCurrentId(null);
    setView("app");
  }

  async function handleSaveSession() {
    if (!result) return;
    const existing = currentId ? sessions.find((s) => s.id === currentId) : null;
    const session = {
      id: currentId || `${Date.now()}`,
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      starred: existing ? existing.starred : false,
      form,
      result,
    };
    const next = currentId
      ? sessions.map((s) => (s.id === currentId ? session : s))
      : [session, ...sessions];
    setCurrentId(session.id);
    await persistSessions(next);
    showToast("Session saved");
  }

  function toggleStar(id, e) {
    e.stopPropagation();
    const next = sessions.map((s) => (s.id === id ? { ...s, starred: !s.starred } : s));
    persistSessions(next);
  }

  function deleteSession(id, e) {
    e.stopPropagation();
    const next = sessions.filter((s) => s.id !== id);
    persistSessions(next);
    showToast("Session deleted");
  }

  function openSession(s) {
    setForm(s.form);
    setResult(s.result);
    setCurrentId(s.id);
    setView("app");
  }

  async function copyField(key, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1500);
    } catch (e) {
      showToast("Copy failed — select the text manually");
    }
  }

  function handleExport() {
    if (!result) return;
    const lines = [
      `BRIDGE AI — NETWORKING PLAN`,
      `${form.targetName}${form.targetRole ? ", " + form.targetRole : ""}`,
      `Goal: ${form.careerGoal}`,
      "",
      "LINKEDIN MESSAGE",
      result.linkedinMessage,
      "",
      "COFFEE CHAT QUESTIONS",
      ...(result.coffeeChatQuestions || []).map((q, i) => `${i + 1}. ${q}`),
      "",
      "FOLLOW-UP EMAIL",
      result.followUpEmail,
      "",
      "NETWORKING STRATEGY",
      result.networkingStrategy,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bridge-ai-${(form.targetName || "session").replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Plan exported");
  }

  async function handleShare() {
    if (!result) return;
    const text = `LinkedIn message: ${result.linkedinMessage}\n\nStrategy: ${result.networkingStrategy}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Bridge AI networking plan", text });
      } else {
        await navigator.clipboard.writeText(text);
        showToast("Copied — ready to share");
      }
    } catch (e) {
      // user cancelled share sheet
    }
  }

  function renderRows(list, page, setPage) {
    const start = (page - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    return (
      <>
        {pageItems.map((s) => (
          <div className="brg-hist-row" key={s.id} onClick={() => openSession(s)}>
            <div className="brg-hist-box">
              <div className="brg-hist-name">
                {s.form.targetName}
                {s.form.targetRole ? `, ${s.form.targetRole}` : ""}
              </div>
              <div className="brg-hist-meta">{new Date(s.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="brg-hist-box">
              <div className="brg-hist-meta">{s.form.careerGoal}</div>
            </div>
            <div className="brg-hist-side">
              <button
                className={`brg-icon-btn ${s.starred ? "starred" : ""}`}
                onClick={(e) => toggleStar(s.id, e)}
                title="Save as template"
              >
                <Star size={14} fill={s.starred ? "currentColor" : "none"} />
              </button>
              <button className="brg-icon-btn" onClick={(e) => deleteSession(s.id, e)} title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="brg-pagination">
            <span
              className={`brg-page-arrow ${page === 1 ? "disabled" : ""}`}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              <ChevronLeft size={16} />
            </span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <span
                key={n}
                className={`brg-page-num ${n === page ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </span>
            ))}
            <span
              className={`brg-page-arrow ${page === totalPages ? "disabled" : ""}`}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              <ChevronRight size={16} />
            </span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="brg-root">
      <style>{STYLE}</style>

      <div className="brg-sidebar">
        <div className="brg-logo" onClick={() => setView("landing")}>
          <BridgeLogo />
          <span className="brg-logo-text">Bridge AI</span>
        </div>

        <button className="brg-nav-btn" onClick={handleNewSession}>
          <Plus size={15} /> New Session
        </button>
        <button
          className={`brg-nav-btn ${view === "history" ? "active" : ""}`}
          onClick={() => setView("history")}
        >
          <HistoryIcon size={15} /> History
        </button>
        <button
          className={`brg-nav-btn ${view === "saved" ? "active" : ""}`}
          onClick={() => setView("saved")}
        >
          <Bookmark size={15} /> Saved Templates
        </button>
        <button
          className={`brg-nav-btn ghost ${view === "settings" ? "active" : ""}`}
          onClick={() => setView("settings")}
        >
          <SettingsIcon size={15} /> Settings
        </button>
        <button
          className={`brg-nav-btn ghost ${view === "profile" ? "active" : ""}`}
          onClick={() => setView("profile")}
        >
          <User size={15} /> Profile
        </button>
      </div>

      <div className="brg-main">
        {view === "landing" && (
          <div className="brg-landing">
            <div className="brg-hero-wrap">
              <HeroIllustration />
            </div>
            <div className="brg-headline">
              Every Great Opportunity
              <br />
              Starts with a Conversation
            </div>
            <p className="brg-landing-copy">
              Networking shouldn't feel intimidating. Bridge AI helps you confidently
              connect with mentors, recruiters, and industry professionals through
              personalized AI-powered outreach, thoughtful conversation starters, and
              strategic follow-ups.
            </p>
            <p className="brg-landing-copy">
              Whether you're looking for your first internship, changing careers, or
              expanding your professional network, Bridge AI helps you turn
              introductions into meaningful opportunities.
            </p>
            <button className="brg-cta" onClick={handleNewSession}>
              Let's Start
            </button>
          </div>
        )}

        {view === "app" && (
          <>
            <div className="brg-app-header">
              <div className="brg-app-title">AI Networking Assistant</div>
              <div className="brg-app-sub">Generate personalized networking plans</div>
            </div>

            {error && <div className="brg-error">{error}</div>}

            <div className="brg-cols">
              <div className="brg-panel">
                <div className="brg-panel-title">Input Section</div>

                <div className="brg-field-box">
                  <label className="brg-field-label">Your Background</label>
                  <textarea
                    placeholder="e.g. CS master's student graduating in May, two backend internships, targeting PM roles..."
                    value={form.background}
                    onChange={(e) => updateField("background", e.target.value)}
                  />
                </div>

                <div className="brg-field-box">
                  <label className="brg-field-label">Target Person</label>
                  <input
                    className="brg-mini-input"
                    placeholder="Name"
                    value={form.targetName}
                    onChange={(e) => updateField("targetName", e.target.value)}
                  />
                  <input
                    className="brg-mini-input"
                    placeholder="Role, e.g. Senior PM at Stripe"
                    value={form.targetRole}
                    onChange={(e) => updateField("targetRole", e.target.value)}
                  />
                </div>

                <div className="brg-field-box">
                  <label className="brg-field-label">Career Goal</label>
                  <input
                    placeholder="e.g. Land a PM internship for summer 2027"
                    value={form.careerGoal}
                    onChange={(e) => updateField("careerGoal", e.target.value)}
                  />
                </div>

                <div className="brg-generate-row">
                  <button className="brg-generate-btn" onClick={handleGenerate} disabled={loading}>
                    {loading ? <Loader2 size={15} className="brg-spin" /> : <Sparkles size={15} />}
                    {loading ? "Generating…" : "Generate Strategy"}
                  </button>
                </div>
              </div>

              <div className="brg-col-arrow">
                <ArrowRight size={22} />
              </div>

              <div className="brg-panel">
                <div className="brg-panel-title">Result Section</div>
                {RESULT_META.map(({ key, title, icon: Icon }) => (
                  <div className="brg-field-box" key={key}>
                    <label className="brg-field-label">
                      <Icon size={11} style={{ marginRight: 4, verticalAlign: "-2px" }} />
                      {title}
                    </label>
                    <div className={`brg-result-body ${!result ? "empty" : ""}`}>
                      {!result
                        ? "Waiting for generation…"
                        : Array.isArray(result[key])
                        ? (
                          <ol className="brg-q-list">
                            {result[key].map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ol>
                        )
                        : result[key]}
                    </div>
                    {result && (
                      <div className="brg-copy-row">
                        <button
                          className="brg-copy-btn"
                          onClick={() =>
                            copyField(
                              key,
                              Array.isArray(result[key]) ? result[key].join("\n") : result[key]
                            )
                          }
                        >
                          {copiedKey === key ? <Check size={11} /> : <Copy size={11} />}
                          {copiedKey === key ? "Copied" : "Copy"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {result && (
              <div className="brg-actions-row">
                <button className="brg-pill-btn" onClick={handleExport}>
                  <Download size={15} /> PDF
                </button>
                <button className="brg-pill-btn" onClick={handleSaveSession}>
                  <Check size={15} /> Save Session
                </button>
                <button className="brg-pill-btn" onClick={handleShare}>
                  <Send size={15} /> Share
                </button>
              </div>
            )}
          </>
        )}

        {(view === "history" || view === "saved") && (
          <>
            <div className="brg-list-header">
              <div className="brg-list-title">{view === "history" ? "History" : "Saved Templates"}</div>
            </div>

            {!sessionsLoaded ? (
              <div className="brg-empty">Loading…</div>
            ) : (() => {
                const list = view === "history" ? sessions : sessions.filter((s) => s.starred);
                if (list.length === 0) {
                  return (
                    <div className="brg-empty">
                      {view === "history"
                        ? "No sessions yet — generate a plan to save one here."
                        : "No saved templates yet. Star a session from History to keep it here."}
                    </div>
                  );
                }
                const sorted = list.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                return view === "history"
                  ? renderRows(sorted, histPage, setHistPage)
                  : renderRows(sorted, savedPage, setSavedPage);
              })()}
          </>
        )}

        {view === "settings" && (
          <>
            <div className="brg-list-header">
              <div className="brg-list-title">Settings</div>
            </div>
            <div className="brg-placeholder-card">
              Settings are on the way. For now, Bridge AI keeps your sessions saved
              automatically on this device.
            </div>
          </>
        )}

        {view === "profile" && (
          <>
            <div className="brg-list-header">
              <div className="brg-list-title">Profile</div>
            </div>
            <div className="brg-placeholder-card">
              Your profile page is coming soon — it'll pull together your saved
              templates and networking activity in one place.
            </div>
          </>
        )}
      </div>

      {toast && <div className="brg-toast">{toast}</div>}
    </div>
  );
}
