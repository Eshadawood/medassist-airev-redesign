import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  HeartPulse,
  Hospital,
  Menu,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Modal = "booking" | "triage" | "login" | null;
type LoginRole = "User" | "Doctor" | "Admin";

const doctors = [
  { name: "Dr. Fatima Zahra", specialty: "Family Medicine", meta: "MBBS, FCPS", rating: "4.9", fee: "Rs. 1,500", initials: "FZ", color: "#d9f7ed", status: "Available now" },
  { name: "Dr. Tariq Mahmood", specialty: "Cardiology", meta: "MBBS, FCPS", rating: "5.0", fee: "Rs. 2,500", initials: "TM", color: "#d8ecff", status: "Next at 4:30 PM" },
  { name: "Dr. Ayesha Siddiqi", specialty: "Dermatology", meta: "MBBS, MRCOG, FCPS", rating: "4.9", fee: "Rs. 2,000", initials: "AS", color: "#fae4d6", status: "Tomorrow 11:00 AM" },
  { name: "Dr. Usman Khawaja", specialty: "Pediatrics", meta: "MBBS, DCH, FCPS", rating: "4.8", fee: "Rs. 1,600", initials: "UK", color: "#eee4ff", status: "Available in 10 min" },
];

const specialties = ["All specialties", "Family Medicine", "Cardiology", "Dermatology", "Pediatrics", "Mental Health"];

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [loginRole, setLoginRole] = useState<LoginRole>("User");
  const [specialty, setSpecialty] = useState("All specialties");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [triageStep, setTriageStep] = useState(0);

  const filteredDoctors = useMemo(() => doctors.filter((doctor) => {
    const matchesSpecialty = specialty === "All specialties" || doctor.specialty === specialty;
    const q = search.toLowerCase();
    return matchesSpecialty && (!q || `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(q));
  }), [specialty, search]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const openBooking = () => setModal("booking");

  return (
    <div className="app-shell">
      <div className="top-banner"><span className="pulse-dot" /> PMDC-certified telehealth · MedAssist AI is here for your family, 24/7 <button onClick={() => go("services")}>Learn more <ArrowRight size={12} /></button></div>
      <header className="site-header">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => go("top")} aria-label="MedAssist home">
            <span className="brand-mark"><HeartPulse size={20} /></span><span><strong>MedAssist</strong><small>AI healthcare by <b>AIREV</b></small></span>
          </button>
          <nav className={mobileOpen ? "main-nav mobile-nav" : "main-nav"}>
            <button onClick={() => go("top")}>Home</button><button onClick={() => go("services")}>Features</button><button onClick={() => setModal("triage")}>AI Assistant</button><button onClick={() => go("doctors")}>Find Doctors</button><button onClick={() => go("services")}>Telehealth</button><button onClick={() => go("providers")}>For Providers</button>
          </nav>
          <div className="nav-actions"><button className="emergency-link" onClick={() => toast.error("For medical emergencies, call Rescue 1122")}> <PhoneCall size={14} /> Helpline: 1122</button><button className="sign-in" onClick={() => setModal("login")}>Sign in</button><button className="dark-button nav-book" onClick={openBooking}>Book consultation <ArrowRight size={15} /></button><button className="icon-button" onClick={() => setModal("login")} aria-label="Account"><UserRound size={17} /></button></div>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy"><div className="eyebrow light"><span className="spark-dot" /> 24/7 clinical telehealth & ambient AI</div><h1>Healthcare that<br /><em>keeps up</em> with life.</h1><p>Instant access to PMDC-verified doctors, AI-assisted symptom guidance, and a calmer way to care for every member of your family.</p><div className="hero-actions"><button className="mint-button" onClick={openBooking}>Book instant consultation <ArrowRight size={16} /></button><button className="ghost-light" onClick={() => setModal("triage")}><Sparkles size={16} /> Try free AI triage</button></div><div className="trust-row"><span><Check size={13} /> No waiting queues</span><span><ShieldCheck size={13} /> 100% PMDC-verified</span><span><FileText size={13} /> HIPAA-ready workflows</span></div></div>
            <div className="hero-visual"><div className="hero-image"><img src="/manus-storage/medassist-consultation_6f805633.jpg" alt="Doctor consulting a patient" /><div className="image-overlay" /></div><div className="floating-note note-top"><span className="mini-icon"><HeartPulse size={14} /></span><span><b>24/7 care access</b><small>Across Pakistan</small></span></div><div className="floating-note note-bottom"><span className="avatar-stack"><i /> <i /> <i /></span><span><b>15,000+ specialists</b><small>Ready when you are</small></span><ArrowRight size={18} /></div><div className="curve-shape" /></div>
          </div>
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        </section>

        <section className="search-dock container"><div className="dock-tabs"><button className="active"><VideoIcon /> Video consultation</button><button onClick={() => toast.info("In-clinic visits are available in Karachi, Lahore and Islamabad.")}><Hospital size={15} /> In-clinic hospital visit</button></div><div className="search-fields"><label>Find the right doctor <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>{specialties.map((s) => <option key={s}>{s}</option>)}</select></label><label>Location <select defaultValue="Pakistan"><option>Pakistan · All zones</option><option>Karachi</option><option>Lahore</option><option>Islamabad</option></select></label><label>Availability <select defaultValue="Now"><option>Now · under 5 mins</option><option>Today</option><option>This week</option></select></label><button className="dark-button search-button" onClick={() => go("doctors")}><Search size={16} /> Search 15,000+ doctors</button></div></section>

        <section className="triage-section container" id="assistant"><div className="triage-copy"><div className="eyebrow"><span className="spark-dot" /> Trained on Pakistani epidemiological models</div><h2>Clarity before<br /><em>your doctor connects.</em></h2><p>Describe what you’re feeling in plain language. MedAssist spots patterns across common conditions in Pakistan and helps you prepare for the right next step.</p><div className="stat-grid"><div><strong>15,000+</strong><span>PMDC-verified specialists</span></div><div><strong>&lt;5 Mins</strong><span>Direct video wait time</span></div><div><strong>Rs. 0</strong><span>Free symptom check</span></div><div><strong>24/7</strong><span>Telehealth coverage</span></div></div><button className="light-outline" onClick={() => setModal("triage")}>Open symptom analyzer <ArrowRight size={16} /></button></div><div className="triage-card"><div className="triage-head"><span className="ai-badge">AI</span><div><b>Sehat Symptom Analyzer</b><small>Live engine · private by design</small></div><span className="online"><i /> Live</span></div><div className="triage-input">Describe your symptoms or tap a quick prompt… <Sparkles size={16} /></div><div className="prompt-chips"><button onClick={() => setModal("triage")}>Dengue fever protocol</button><button onClick={() => setModal("triage")}>Fasting sugar 16.0 mg/dL</button><button onClick={() => setModal("triage")}>Pediatric high fever</button><button onClick={() => setModal("triage")}>Typhoid & abdominal pain</button></div><div className="triage-footer"><span><ShieldCheck size={13} /> Encrypted · clinical-grade</span><button className="dark-button" onClick={() => setModal("triage")}>Run free AI check <ArrowRight size={14} /></button></div></div></section>

        <section className="doctors-section container" id="doctors"><div className="section-heading"><div><div className="eyebrow">Instant access</div><h2>Meet your next<br /><em>trusted doctor.</em></h2></div><div className="doctor-tools"><div className="search-box"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctors" /></div><button className="text-link" onClick={() => { setSearch(""); setSpecialty("All specialties"); }}>View all 15,000+ <ArrowRight size={15} /></button></div></div><div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className="doctor-card-top"><div className="doctor-avatar" style={{ background: doctor.color }}>{doctor.initials}</div><span className="verified"><ShieldCheck size={12} /> Verified</span></div><h3>{doctor.name}</h3><p>{doctor.specialty} <span>·</span> {doctor.meta}</p><div className="doctor-meta"><span><Hospital size={13} /> Aga Khan University Hospital</span><span><Clock3 size={13} /> 10+ years experience</span></div><div className="rating"><b>★ {doctor.rating}</b><span>(420 patient reviews)</span></div><div className="fee-row"><span>Consultation fee<strong>{doctor.fee}</strong></span><small>{doctor.status}</small></div><button className="book-card" onClick={openBooking}>Book video call <ArrowRight size={14} /></button></article>)}</div>{filteredDoctors.length === 0 && <div className="empty-state">No doctors found for this search. <button onClick={() => { setSearch(""); setSpecialty("All specialties"); }}>Reset filters</button></div>}</section>

        <section className="services-section" id="services"><div className="container"><div className="center-heading"><div className="eyebrow">A holistic health ecosystem</div><h2>Everything your family<br /><em>needs to feel well.</em></h2><p>One trusted place for consultation, diagnostics, prescriptions, records, and everyday health guidance.</p></div><div className="service-grid"><ServiceCard icon={<VideoIcon />} title="Instant 24/7 video consults" text="Connect with verified PMDC doctors within minutes. Instant digital prescriptions sent directly to your phone." action="Start at Rs. 899 per session" onClick={openBooking} /><ServiceCard icon={<Activity />} title="At-home diagnostic labs" text="Sample collection from home in Karachi, Lahore & Islamabad. Partnered with Shaukat Khanum." action="Up to 20% lab discount" onClick={() => toast.info("Lab booking opens shortly.")} /><ServiceCard icon={<FileText />} title="DRAP-approved pharmacy" text="100% authentic medicines, temperature-controlled and delivered to your doorstep in 2 hours across major cities." action="2-hour express delivery" onClick={() => toast.info("Pharmacy catalog opens shortly.")} /><ServiceCard icon={<ShieldCheck />} title="AI Sehat health vault" text="Keep your family’s lifetime medical records, prescriptions, and lab reports encrypted and organized." action="Free lifetime cloud storage" onClick={() => toast.info("Health Vault is ready for sign-in.")} /></div></div></section>

        <section className="providers-section container" id="providers"><div className="provider-panel"><div><div className="eyebrow light">For providers & care teams</div><h2>Make every<br /><em>connection count.</em></h2><p>Join the AIREV care network and give your patients a more intelligent, more human way to access care.</p><button className="mint-button" onClick={() => toast.success("Provider onboarding request started.")}>Explore provider onboarding <ArrowRight size={16} /></button></div><div className="provider-perks"><div><Award size={20} /><b>Grow your practice</b><span>Reach families across Pakistan</span></div><div><MessageCircle size={20} /><b>Better continuity</b><span>Smart notes and follow-ups</span></div><div><CalendarDays size={20} /><b>Flexible hours</b><span>Control your availability</span></div></div></div></section>

        <section className="emergency-section container"><div><span className="emergency-icon">✦</span><div><b>Experiencing a critical medical emergency?</b><p>For trauma, acute chest pain, stroke symptoms or severe road accidents, call Pakistan Emergency Services immediately.</p></div></div><div className="emergency-actions"><button onClick={() => toast.error("Calling Rescue 1122…")}><PhoneCall size={14} /> Call Rescue 1122</button><button onClick={() => toast.error("Calling Edhi Ambulance 115…")}><Activity size={14} /> Edhi Ambulance 115</button></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><button className="brand footer-brand-button" onClick={() => go("top")}><span className="brand-mark"><HeartPulse size={20} /></span><span><strong>MedAssist</strong><small>AI healthcare by <b>AIREV</b></small></span></button><p>High-precision clinical AI support integrated with PMDC-verified physicians and immediate triage services.</p><div className="footer-tags"><span>PMDC Verified</span><span>DRAP Compliant</span><span>HIPAA Ready</span></div><div className="footer-emergency"><b>Emergency contacts:</b><br />Rescue: <strong>1122</strong> · Edhi Ambulance: <strong>115</strong></div></div><FooterColumn title="Platform" links={["AI Symptom Checker", "Virtual Consultations", "Physician Directory", "Electronic Prescriptions", "Clinical Lab Triage"]} onClick={go} /><FooterColumn title="Specialties" links={["Primary Family Care", "Internal Medicine", "Cardiology Support", "Pediatric Guidance", "Mental & Behavioral Health"]} onClick={() => toast.info("Specialty catalog coming soon.")} /><FooterColumn title="Providers & Legal" links={["Provider Network Onboarding", "Clinical Governance", "Privacy Policy", "Terms of Service", "FDA Disclosures"]} onClick={() => toast.info("This policy page is available from the account portal.")} /></div><div className="container footer-bottom"><span>© 2025 MedAssist AI Technologies Inc. All rights reserved.</span><span>AIREV · <a href="https://airev.ai" target="_blank" rel="noreferrer">airev.ai</a> · <a href="mailto:hello@airev.ai">hello@airev.ai</a> · <strong>Powered by Esha</strong></span></div></footer>

      {modal && <ModalShell onClose={() => { setModal(null); setTriageStep(0); }}>
        {modal === "booking" && <BookingModal onClose={() => setModal(null)} onLogin={() => setModal("login")} />}
        {modal === "triage" && <TriageModal step={triageStep} setStep={setTriageStep} onClose={() => setModal(null)} />}
        {modal === "login" && <LoginModal role={loginRole} setRole={setLoginRole} onClose={() => setModal(null)} onSubmit={() => { toast.success(`${loginRole} sign-in is ready for your credentials.`); setModal(null); }} />}
      </ModalShell>}
    </div>
  );
}

function VideoIcon() { return <span className="video-icon"><span /></span>; }
function ServiceCard({ icon, title, text, action, onClick }: { icon: React.ReactNode; title: string; text: string; action: string; onClick: () => void }) { return <article className="service-card"><div className="service-icon">{icon}</div><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action} <ArrowRight size={14} /></button></article>; }
function FooterColumn({ title, links, onClick }: { title: string; links: string[]; onClick: (id: string) => void }) { return <div className="footer-column"><h4>{title}</h4>{links.map((link) => <button key={link} onClick={() => onClick("services")}>{link}</button>)}</div>; }
function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal-card" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button>{children}</div></div>; }
function BookingModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) { return <div className="modal-content"><div className="modal-kicker"><CalendarDays size={16} /> Consultation desk</div><h2>Book care around<br /><em>your schedule.</em></h2><p>Choose a specialty and preferred mode. We’ll match you with a verified clinician in minutes.</p><div className="modal-options"><button onClick={() => toast.success("Searching for available doctors now.")}><VideoIcon /><span><b>Video consultation</b><small>From Rs. 899 · instant access</small></span><ArrowRight size={17} /></button><button onClick={() => toast.info("In-clinic availability is coming next.")}><Hospital size={18} /><span><b>In-clinic visit</b><small>Karachi · Lahore · Islamabad</small></span><ArrowRight size={17} /></button></div><div className="modal-note"><ShieldCheck size={15} /> Sign in to save prescriptions and family records. <button onClick={onLogin}>Sign in</button></div><button className="dark-button full-button" onClick={() => { toast.success("A care coordinator will call you shortly."); onClose(); }}>Continue as guest <ArrowRight size={15} /></button></div>; }
function TriageModal({ step, setStep, onClose }: { step: number; setStep: (step: number) => void; onClose: () => void }) { return <div className="modal-content"><div className="modal-kicker"><Sparkles size={16} /> Sehat Symptom Analyzer</div>{step === 0 ? <><h2>Let’s understand<br /><em>what you’re feeling.</em></h2><p>This free check is not a diagnosis. It helps you prepare for the right clinical next step.</p><textarea placeholder="Describe symptoms, duration, age, and anything that changed recently…" /><div className="prompt-chips modal-chips"><button onClick={() => setStep(1)}>Fever / flu</button><button onClick={() => setStep(1)}>Stomach pain</button><button onClick={() => setStep(1)}>Headache</button><button onClick={() => setStep(1)}>Child health</button></div><button className="dark-button full-button" onClick={() => setStep(1)}>Analyze symptoms <ArrowRight size={15} /></button></> : <><div className="result-icon"><HeartPulse size={25} /></div><h2>We found a<br /><em>useful next step.</em></h2><p>Your symptoms could have several causes. A clinician can help you check the pattern safely and quickly.</p><div className="result-list"><span><Check size={15} /> Talk to a Family Medicine doctor</span><span><Check size={15} /> Keep fluids nearby and note your temperature</span><span><Check size={15} /> Seek urgent help if symptoms worsen suddenly</span></div><button className="dark-button full-button" onClick={onClose}>Find a doctor now <ArrowRight size={15} /></button></>}</div>; }
function LoginModal({ role, setRole, onClose, onSubmit }: { role: LoginRole; setRole: (role: LoginRole) => void; onClose: () => void; onSubmit: () => void }) { return <div className="modal-content"><div className="modal-kicker"><UserRound size={16} /> MedAssist account</div><h2>Welcome<br /><em>back.</em></h2><p>Choose your workspace to continue into the MedAssist care network.</p><div className="role-tabs">{(["User", "Doctor", "Admin"] as LoginRole[]).map((item) => <button className={role === item ? "active" : ""} key={item} onClick={() => setRole(item)}>{item} login</button>)}</div><label className="form-label">Email address<input type="email" placeholder="you@example.com" /></label><label className="form-label">Password<input type="password" placeholder="••••••••" /></label><div className="form-row"><label><input type="checkbox" /> Remember me</label><button onClick={() => toast.info("Password reset link requested.")}>Forgot password?</button></div><button className="dark-button full-button" onClick={onSubmit}>Sign in as {role} <ArrowRight size={15} /></button><div className="modal-note centered"><ShieldCheck size={15} /> Secure, encrypted sign in</div></div>; }
