"use client";

import { motion, useReducedMotion, useScroll, useTransform, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { Footer } from "@/components/footer";
import { 
  Globe, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Wifi, 
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Globe2,
  ChevronDown,
  BadgeCheck,
  Shield
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroMode, setHeroMode] = useState<"airtime" | "data" | "convert">("airtime");
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mouse tracking for hero glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Hero stats (fintech tone)
  const stats = [
    { value: "150+", label: "Countries", icon: Globe2 },
    { value: "Instant", label: "Settlement", icon: Zap },
    { value: "Secure", label: "Checkout", icon: Shield },
    { value: "Real‑time", label: "Tracking", icon: ShieldCheck }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 overflow-hidden selection:bg-brand-500/30 selection:text-brand-900 dark:selection:text-brand-50">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen w-full overflow-hidden flex flex-col"
      >
        {/* Video + Image fallback background (covers header + hero) */}
        <div className="absolute inset-0 z-0">
          {/* Fallback image always present (video fades in over it) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1556742049-9086f7106d4b?auto=format&fit=crop&w=2400&q=70')]"
          />

          {/* Video layer */}
          {!videoFailed && (
            <video
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              className={[
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                videoReady ? "opacity-100" : "opacity-0"
              ].join(" ")}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230b1220'/%3E%3Cstop offset='60%25' stop-color='%23111a2e'/%3E%3Cstop offset='100%25' stop-color='%230b1220'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23g)'/%3E%3C/svg%3E"
            >
              <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
            </video>
          )}

          {/* Readability overlays + Grid Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950/90" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#3b82f615,transparent)]" />

          {/* Mouse-following glow */}
          <motion.div
            style={{ x: mousePosition.x - 240, y: mousePosition.y - 240 }}
            className="absolute h-[480px] w-[480px] rounded-full bg-white/10 blur-[80px] pointer-events-none opacity-70"
          />
        </div>

        {/* Floating Island Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-inner">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight text-white">LidaPay</div>
                  <div className="text-[10px] font-medium text-zinc-400">Global Remittance</div>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                {[
                  { name: "Airtime", href: "/airtime" },
                  { name: "Internet Data", href: "/data" },
                  { name: "Help", href: "/settings/help" }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="px-4 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-white/10 rounded-full h-9">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-white text-zinc-900 hover:bg-zinc-200 rounded-full h-9 px-5 font-semibold shadow-lg shadow-white/10">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full pt-32 pb-0 sm:pt-36 sm:pb-0">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20 mb-8"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Fintech-grade infrastructure</span>
                </motion.div>
                
                <motion.h1 
                  key={heroMode}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-8"
                >
                  {heroMode === "airtime" ? (
                    <>
                      Global <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        Airtime Remittance.
                      </span>
                    </>
                  ) : heroMode === "data" ? (
                    <>
                      Instant <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        Data Bundles.
                      </span>
                    </>
                  ) : (
                    <>
                      Convert <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white">
                        Airtime to Cash.
                      </span>
                    </>
                  )}
                </motion.h1>
                
                <motion.p 
                  key={`p-${heroMode}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10 font-medium"
                >
                  {heroMode === "airtime"
                    ? "Connect with family across 150+ countries. Send mobile credit instantly with bank-grade security and zero hidden fees."
                    : heroMode === "data"
                    ? "Keep them online. Purchase data plans for major global networks directly from your dashboard. Real-time delivery guaranteed."
                    : "Liquidity for your mobile assets. Swap unused airtime for cash or digital currency at market-leading rates."}
                </motion.p>

                {/* Premium Toggle */}
                <LayoutGroup>
                  <div className="mb-12 inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                    {['airtime', 'data', 'convert'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setHeroMode(mode as any)}
                        className="relative px-6 py-2.5 text-sm font-semibold rounded-full transition-colors z-10"
                      >
                        {heroMode === mode && (
                          <motion.div
                            layoutId="heroToggle"
                            className="absolute inset-0 bg-white rounded-full shadow-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className={`relative z-10 ${heroMode === mode ? "text-zinc-950" : "text-zinc-400 hover:text-white"}`}>
                          {mode === 'convert' ? 'Convert to Cash' : mode === 'data' ? 'Data Bundles' : 'Airtime'}
                        </span>
                      </button>
                    ))}
                  </div>
                </LayoutGroup>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 items-start mb-12"
                >
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 bg-white text-zinc-900 hover:bg-zinc-100">
                      Start Sending Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link 
                    href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className="h-14 sm:h-16 w-auto hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pb-10"
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="p-4 rounded-2xl bg-zinc-950/35 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                          <stat.icon className="h-5 w-5 text-brand-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xl sm:text-2xl font-black text-white leading-none tracking-tight">{stat.value}</div>
                          <div className="text-xs text-white/70 font-semibold leading-tight">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Phone Mockup (reduced size) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.4, 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <div className="relative z-10 w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px]">
                  <div className="rounded-[1.75rem] border-[6px] border-zinc-900 dark:border-zinc-800 bg-zinc-950 shadow-2xl">
                    <div className="h-[28px] w-full bg-zinc-900 rounded-t-[1.25rem] flex items-center justify-center relative overflow-hidden">
                      <div className="h-3 w-20 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="relative aspect-[9/19] bg-zinc-900 overflow-hidden rounded-b-[1.25rem]">
                      <div className="absolute inset-0 bg-white dark:bg-zinc-950">
                        <div className="h-full w-full p-4 flex flex-col">
                          {heroMode === "convert" ? (
                            // Convert Mode UI
                            <div className="flex flex-col h-full">
                              <div className="text-center mb-6">
                                <div className="text-xs font-medium text-zinc-500 mb-1">Convert Airtime</div>
                                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">$50.00</div>
                                <div className="text-[10px] text-emerald-500 font-medium mt-1">Available to swap</div>
                              </div>

                              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 mb-2 border border-zinc-100 dark:border-zinc-800">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[10px] font-medium text-zinc-500">Sell</span>
                                  <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50">Airtime</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">50.00</span>
                                  <div className="h-7 w-7 rounded-full bg-pink-100 flex items-center justify-center">
                                    <Phone className="h-3.5 w-3.5 text-pink-600" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-center -my-2.5 relative z-10">
                                <div className="h-7 w-7 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-zinc-100 dark:border-zinc-700 flex items-center justify-center">
                                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400 rotate-90" />
                                </div>
                              </div>

                              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 mt-2 mb-4 border border-zinc-100 dark:border-zinc-800">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[10px] font-medium text-zinc-500">Receive</span>
                                  <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50">Cash</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold text-emerald-500">40.00</span>
                                  <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <div className="text-[10px] font-bold text-emerald-700">$</div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-auto">
                                <button className="w-full h-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-bold text-xs shadow-lg hover:scale-[1.02] transition-transform">
                                  Convert Now
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Airtime/Data Mode UI
                            <>
                              <div className="flex items-center justify-between mb-6">
                                <div>
                                  <div className="text-xs text-zinc-500 mb-1">Total Balance</div>
                                  <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50">$1,240.50</div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600" />
                              </div>

                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <motion.div 
                                  animate={{ 
                                    scale: heroMode === "airtime" ? 1.05 : 1,
                                    borderColor: heroMode === "airtime" ? "var(--brand-500)" : "transparent"
                                  }}
                                  className="flex flex-col justify-center items-start p-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg border-2 border-transparent transition-all"
                                >
                                  <Phone className="h-7 w-7 mb-2" />
                                  <div className="text-base font-black leading-tight mb-1">Airtime</div>
                                  <div className="text-xs text-white/90">Top up instantly</div>
                                </motion.div>
                                <motion.div 
                                  animate={{ 
                                    scale: heroMode === "data" ? 1.05 : 1,
                                    borderColor: heroMode === "data" ? "var(--indigo-500)" : "transparent"
                                  }}
                                  className="flex flex-col justify-center items-start p-4 rounded-2xl bg-gradient-to-br from-indigoBrand-500 to-indigoBrand-600 text-white shadow-lg border-2 border-transparent transition-all"
                                >
                                  <Wifi className="h-7 w-7 mb-2" />
                                  <div className="text-base font-black leading-tight mb-1">Data</div>
                                  <div className="text-xs text-white/90">Buy bundles</div>
                                </motion.div>
                              </div>

                              <div className="mt-auto">
                                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-2">Recent Activity</div>
                                <div className="space-y-1.5">
                                  {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                      <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                        <CheckCircle className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-50">Sent to Sarah</div>
                                        <div className="text-[10px] text-zinc-500">Today, 10:23 AM</div>
                                      </div>
                                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-50">-$20.00</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-1 sm:-right-3 top-3 sm:top-6 z-20 rounded-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur p-2 shadow-xl border border-zinc-200 dark:border-zinc-800 scale-65 sm:scale-75 origin-left"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-[8px] font-medium text-zinc-500">Status</p>
                      <p className="font-bold text-[9px] text-zinc-900 dark:text-zinc-50">Successful</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-1 sm:-left-3 bottom-10 sm:bottom-16 z-20 rounded-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur p-2 shadow-xl border border-zinc-200 dark:border-zinc-800 scale-65 sm:scale-75 origin-right"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 dark:bg-brand-900/30 text-brand-600">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-[8px] font-medium text-zinc-500">Settlement</p>
                      <p className="font-bold text-[9px] text-zinc-900 dark:text-zinc-50">Instant</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
          </motion.div>
        </motion.div>

        {/* Trusted Networks & Partners (streamlined into hero) */}
        <section className="relative z-10 overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_40%_at_30%_40%,rgba(236,72,153,0.10),transparent),radial-gradient(50%_35%_at_75%_60%,rgba(79,70,229,0.10),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_0,rgba(255,255,255,0)_12%,rgba(255,255,255,0.04)_25%)] opacity-25" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-9">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60 mb-4">
              <span className="inline-block h-[1px] w-8 bg-white/30" />
              Trusted Networks & Partners
              <span className="inline-block h-[1px] w-8 bg-white/30" />
            </div>

            <div className="relative h-20 overflow-hidden">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="flex h-20 items-center gap-10 sm:gap-14 text-white/80 will-change-transform"
                style={{ width: "max-content" }}
              >
                {["MTN", "Airtel", "Vodafone", "Safaricom", "Orange", "Tigo", "Verizon", "AT&T", "Glo", "Telkom"].map((brand, i) => (
                  <div key={`brand-${i}`} className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    <span className="tracking-tight whitespace-nowrap">{brand}</span>
                  </div>
                ))}
                {/* duplicate sequence for seamless loop */}
                {["MTN", "Airtel", "Vodafone", "Safaricom", "Orange", "Tigo", "Verizon", "AT&T", "Glo", "Telkom"].map((brand, i) => (
                  <div key={`dup-${i}`} className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    <span className="tracking-tight whitespace-nowrap">{brand}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </motion.section>

      <main>
        {/* Liquid Assets / Airtime Convert */}
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20 mb-6"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>New Feature</span>
                </motion.div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
                  Don't let unused airtime expire. <span className="text-emerald-400">Cash it out.</span>
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                  LidaPay isn't just for sending—it's for liquidity. Convert your excess mobile credit into cash or digital currency instantly at market-leading rates.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Instant Valuation", desc: "See exactly how much your airtime is worth in real-time." },
                    { title: "Zero Friction", desc: "No complex forms. Select amount, confirm, and get paid." },
                    { title: "Bank Transfer", desc: "Withdraw funds directly to your bank account or mobile wallet." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-zinc-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Link href="/convert">
                    <Button size="lg" className="h-14 px-8 font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400">
                      Start Converting
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                    <span className="text-sm font-medium text-zinc-400">Live Exchange Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-400">Active</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-zinc-500">You Sell</span>
                        <span className="text-xs text-zinc-400">Balance: 5,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-mono text-white">100.00</span>
                        <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-bold text-zinc-300">GHS Airtime</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-zinc-800 rounded-full p-2 border border-zinc-700">
                        <ArrowRight className="h-4 w-4 text-zinc-400 rotate-90" />
                      </div>
                    </div>

                    <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-zinc-500">You Receive</span>
                        <span className="text-xs text-emerald-500 font-bold">80% Payout</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-mono text-emerald-400">80.00</span>
                        <span className="bg-emerald-900/30 px-2 py-1 rounded text-xs font-bold text-emerald-400">GHS Cash</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-zinc-500 mb-4">Funds deposited to your wallet instantly.</p>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fees / Pricing (premium, transparent) */}
        <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400">
                  Transparent Pricing
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  No hidden fees. Ever.
                </h2>
                <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  You always see the full cost before checkout—fees, rates, and delivery time. Built for both local top-ups and global remittance.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="h-12 px-7 font-bold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                      Create free account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/airtime">
                    <Button variant="secondary" size="lg" className="h-12 px-7 font-bold">
                      Explore coverage
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Local Airtime",
                    price: "Low fees",
                    desc: "Fast top-ups for your home country with instant delivery.",
                    icon: Phone,
                    accent: "from-brand-500/15 to-rose-500/15"
                  },
                  {
                    title: "International Data",
                    price: "Best value",
                    desc: "Bundles for 150+ countries across major networks.",
                    icon: Wifi,
                    accent: "from-indigoBrand-500/15 to-sky-500/15"
                  },
                  {
                    title: "Secure Checkout",
                    price: "Bank‑grade",
                    desc: "Encrypted payments and real-time confirmations.",
                    icon: ShieldCheck,
                    accent: "from-emerald-500/15 to-green-500/15"
                  }
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.accent}`} />
                    <div className="relative">
                      <div className="h-12 w-12 rounded-2xl bg-white/90 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center">
                        <c.icon className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
                      </div>
                      <div className="mt-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">{c.title}</p>
                          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{c.price}</p>
                        </div>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Bento Grid */}
        <section className="py-20 sm:py-32 relative overflow-hidden bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6"
              >
                Why Choose LidaPay?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                Experience the difference with our world-class remittance platform designed for speed, security, and simplicity.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Instant Delivery",
                  desc: "Transactions are processed in real-time. No waiting, no delays.",
                  gradient: "from-amber-400 to-orange-500",
                  bg: "bg-amber-50 dark:bg-amber-900/10",
                  colSpan: "md:col-span-1"
                },
                {
                  icon: ShieldCheck,
                  title: "Bank-Grade Security",
                  desc: "Your data and payments are protected by enterprise-level encryption.",
                  gradient: "from-emerald-400 to-green-500",
                  bg: "bg-emerald-50 dark:bg-emerald-900/10",
                  colSpan: "md:col-span-1"
                },
                {
                  icon: Globe2,
                  title: "Global Reach",
                  desc: "Connect with over 150 countries instantly through our vast network.",
                  gradient: "from-blue-400 to-indigo-500",
                  bg: "bg-blue-50 dark:bg-blue-900/10",
                  colSpan: "md:col-span-2 lg:col-span-1"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden group ${feature.colSpan}`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-[100%] transition-transform group-hover:scale-125`} />
                  
                  <div className={`h-16 w-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 relative z-10`}>
                    <feature.icon className="h-8 w-8 text-zinc-900 dark:text-zinc-50" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                  How It Works
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
                  Sending airtime and data is as easy as 1-2-3. No complicated forms or long waiting times.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Create an Account",
                      desc: "Sign up in seconds for free. No hidden fees or maintenance charges."
                    },
                    {
                      step: "02",
                      title: "Choose Recipient",
                      desc: "Select from over 150 countries and enter the recipient's phone number."
                    },
                    {
                      step: "03",
                      title: "Send Instantly",
                      desc: "Choose amount and pay. The top-up arrives instantly on their phone."
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 text-white flex items-center justify-center font-black text-lg shadow-lg">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-2">{item.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-indigoBrand-500/20 rounded-[3rem] blur-3xl" />
                <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Exchange Rate</div>
                        <div className="font-black text-2xl text-zinc-900 dark:text-zinc-50">1 USD = 15.50 GHS</div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 mb-2">You Send</div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">100.00</span>
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg px-3 py-2 shadow-sm border border-zinc-200 dark:border-zinc-700">
                            <img src="https://flagcdn.com/w40/us.png" className="w-6 h-auto rounded-sm" alt="US" />
                            <span className="font-bold text-sm">USD</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center -my-3 relative z-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 text-white flex items-center justify-center shadow-lg border-4 border-white dark:border-zinc-950">
                          <ArrowRight className="h-5 w-5 rotate-90" />
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 mb-2">Recipient Gets</div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">1,550.00</span>
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg px-3 py-2 shadow-sm border border-zinc-200 dark:border-zinc-700">
                            <img src="https://flagcdn.com/w40/gh.png" className="w-6 h-auto rounded-sm" alt="GH" />
                            <span className="font-bold text-sm">GHS</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full h-14 text-base font-black bg-gradient-to-r from-brand-500 to-indigoBrand-600 text-white rounded-xl shadow-lg shadow-brand-500/20 hover:shadow-xl">
                      Send Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Reach */}
        <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/3 -left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[140px]" />
            <div className="absolute -bottom-1/3 -right-1/4 h-[28rem] w-[28rem] rounded-full bg-indigoBrand-500/10 blur-[160px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr,0.9fr]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500 mb-6">
                  Global Network
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                  Connecting You to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-rose-500 to-indigoBrand-500">150+</span> Countries
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-12">
                  Whether you're sending airtime to family in Nigeria, data to friends in Ghana, or topping up your own phone while traveling in Kenya, LidaPay has you covered with reliable coverage on every continent.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { name: "Ghana", code: "gh" },
                    { name: "Nigeria", code: "ng" },
                    { name: "Kenya", code: "ke" },
                    { name: "South Africa", code: "za" },
                    { name: "Uganda", code: "ug" },
                    { name: "Tanzania", code: "tz" },
                    { name: "USA", code: "us" },
                    { name: "UK", code: "gb" },
                    { name: "Canada", code: "ca" }
                  ].map((country, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-left shadow-[0_8px_25px_rgba(15,23,42,0.08)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/70 cursor-pointer"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                        <img
                          src={`https://flagcdn.com/w40/${country.code}.png`}
                          alt={country.name}
                          className="h-5 w-8 rounded-sm object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-100">{country.name}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/airtime"
                  className="inline-flex items-center gap-2 text-base font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  View all supported countries
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 via-purple-500/20 to-indigoBrand-500/20 blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-white/40 bg-white/95 p-8 shadow-[0_45px_120px_rgba(15,23,42,0.15)] dark:border-zinc-800 dark:bg-zinc-950/90">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                      <p className="text-sm text-zinc-500">Live activity across our network</p>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Recent Transfers</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { country: "Ghana", from: "United Kingdom", amount: "GHS 150.00", time: "Just now", icon: Phone, accent: "from-pink-500/10 to-pink-500/20", iconColor: "text-pink-600" },
                      { country: "Nigeria", from: "United States", amount: "NGN 5,000", time: "2 mins ago", icon: Wifi, accent: "from-rose-500/10 to-rose-500/20", iconColor: "text-rose-600" },
                      { country: "Kenya", from: "Canada", amount: "KES 1,000", time: "5 mins ago", icon: Phone, accent: "from-indigo-500/10 to-indigo-500/20", iconColor: "text-indigo-600" },
                      { country: "South Africa", from: "Germany", amount: "ZAR 200", time: "12 mins ago", icon: Wifi, accent: "from-purple-500/10 to-purple-500/20", iconColor: "text-purple-600" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between rounded-2xl border border-zinc-100/80 bg-white/90 p-4 shadow-sm transition hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900/70"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center ${item.iconColor}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">{item.country}</p>
                            <p className="text-xs text-zinc-500">From {item.from}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-zinc-900 dark:text-white">{item.amount}</p>
                          <p className="text-xs text-zinc-500">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between text-sm text-zinc-500 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand-500" />
                      Transparent FX rates, zero hidden fees
                    </div>
                    <Link href="/app" className="font-semibold text-brand-600 hover:text-brand-700">
                      Live dashboard →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400">
                  Trusted Worldwide
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  People love how fast it is.
                </h2>
                <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The experience is designed to feel instant: select country, pick bundle, pay securely, delivered in seconds.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[
                  {
                    title: "Instant delivery",
                    text: "I sent data to my brother in minutes. The confirmation came immediately.",
                    meta: "UK → Ghana"
                  },
                  {
                    title: "Clean & simple",
                    text: "No confusing steps. It just works, and the pricing is clear.",
                    meta: "US → Nigeria"
                  },
                  {
                    title: "Reliable",
                    text: "I use it weekly for local airtime and it never fails.",
                    meta: "Ghana (Local)"
                  }
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex items-center gap-1 text-yellow-300 mb-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className="inline-block h-4 w-4">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <path d="M12 17.27l5.18 3.12-1.39-5.9L20.5 9.9l-6.06-.52L12 3.8 9.56 9.38 3.5 9.9l4.71 4.59-1.39 5.9L12 17.27z" />
                          </svg>
                        </span>
                      ))}
                    </div>
                    <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">{t.title}</p>
                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.text}</p>
                    <p className="mt-4 text-xs font-semibold text-zinc-500 dark:text-zinc-500">{t.meta}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-600 dark:text-brand-400">
                FAQ
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Everything you need to know
              </h2>
              <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400">
                Quick answers about delivery, pricing, and security.
              </p>
            </motion.div>

            <div className="mt-12 space-y-4">
              {[
                {
                  q: "How fast is delivery?",
                  a: "Most airtime and data bundles deliver in seconds. If a network is temporarily delayed, you’ll see status updates in your transactions."
                },
                {
                  q: "Do you support local and international top-ups?",
                  a: "Yes—local top-ups (e.g., Ghana) and international transfers across 150+ countries are supported."
                },
                {
                  q: "Are there hidden fees?",
                  a: "No. You’ll always see the exact amount, rate (if applicable), and any fees before you confirm."
                },
                {
                  q: "Is LidaPay secure?",
                  a: "We use bank-grade security practices and encrypted connections to protect your data and payments."
                }
              ].map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-zinc-200/70 bg-white px-6 py-4 shadow-sm open:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  <summary className="cursor-pointer list-none select-none flex items-center justify-between gap-4">
                    <span className="text-base font-black text-zinc-900 dark:text-zinc-50">{item.q}</span>
                    <span className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center transition group-open:rotate-45">
                      <span className="text-xl leading-none text-zinc-700 dark:text-zinc-200">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-50 dark:via-white dark:to-zinc-50 overflow-hidden px-6 py-16 sm:px-16 sm:py-24 text-center"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-brand-500/30 blur-[100px]"
                />
                <motion.div
                  animate={{
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-indigoBrand-500/30 blur-[100px]"
                />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white dark:text-zinc-900 mb-6">
                  Ready to get started?
                </h2>
                <p className="text-xl text-zinc-300 dark:text-zinc-600 max-w-2xl mx-auto mb-10">
                  Join thousands of users who trust LidaPay for their international airtime and data needs. Create your free account today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/register">
                    <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 border-none shadow-xl">
                      Create Free Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link 
                    href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className="h-14 sm:h-16 w-auto hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}
