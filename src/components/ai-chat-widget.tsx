"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  X, 
  Sparkles,
  Minimize2,
  Phone,
  Wifi,
  History,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function AIChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! 👋 Welcome to LidaPay Support.\n\nI'm your virtual assistant, here to help you with instant airtime top-ups, data bundles, and more across 150+ countries. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { icon: Phone, label: "Buy Airtime", href: "/airtime" },
    { icon: Wifi, label: "Buy Data", href: "/data" },
    { icon: History, label: "Transactions", href: "/transactions" },
    { icon: HelpCircle, label: "Help Center", href: "/settings/help" }
  ];

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('airtime') || lowercaseInput.includes('recharge')) {
      return "I can certainly help with airtime top-ups. You can send credit to any mobile number instantly.\n\nTo proceed, you can:\n1. Use the 'Buy Airtime' quick action below\n2. Navigate to the Airtime page from the main menu\n\nWe cover over 150 countries including Ghana, Nigeria, Kenya, and more.";
    }
    
    if (lowercaseInput.includes('data') || lowercaseInput.includes('internet') || lowercaseInput.includes('bundle')) {
      return "Need a data bundle? We've got you covered.\n\nSimply select 'Buy Data' below or visit our Data page to choose a package. We support major networks globally with instant delivery.";
    }
    
    if (lowercaseInput.includes('country') || lowercaseInput.includes('countries') || lowercaseInput.includes('where')) {
      return "LidaPay operates globally! 🌎\n\nWe support transactions to over 150 countries, including key destinations like:\n• Ghana, Nigeria, Kenya\n• USA, UK, Canada\n• South Africa, Uganda, Tanzania\n\nYou can connect with loved ones almost anywhere.";
    }
    
    if (lowercaseInput.includes('fee') || lowercaseInput.includes('cost') || lowercaseInput.includes('price')) {
      return "Transparency is key at LidaPay. 💰\n\n• Zero hidden fees\n• Competitive exchange rates\n• Upfront pricing\n\nYou'll always see the exact cost before confirming any transaction.";
    }
    
    if (lowercaseInput.includes('secure') || lowercaseInput.includes('safe') || lowercaseInput.includes('security')) {
      return "Your security is our top priority. 🔒\n\nWe utilize bank-level encryption and secure payment gateways to ensure your data and transactions are fully protected at all times.";
    }
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      return "Hello there! How can I make your LidaPay experience better today?";
    }
    
    if (lowercaseInput.includes('thank')) {
      return "You're most welcome! If you have any other questions, feel free to ask. Happy sending!";
    }

    if (lowercaseInput.includes('register') || lowercaseInput.includes('sign up') || lowercaseInput.includes('account')) {
      return "Ready to join us? Great choice! 🚀\n\nClick 'Create Free Account' on our homepage to get started. It takes just a few moments to set up your secure profile and start sending.";
    }

    return "I'm not quite sure I caught that. Could you please rephrase? I can help with airtime, data bundles, country coverage, or general account questions. You can also use the buttons below for quick access.";
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, {
      text,
      isUser: true,
      timestamp: new Date()
    }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: generateResponse(text),
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-zinc-900 dark:bg-zinc-50 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-950/50 flex items-center justify-center text-white dark:text-zinc-900 hover:shadow-xl transition-all border border-white/10 dark:border-zinc-800"
        aria-label="Open Support Chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] ${
          isMinimized ? 'h-auto' : 'h-[600px] max-h-[calc(100vh-8rem)]'
        } flex flex-col bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden ring-1 ring-black/5`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center shadow-inner">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">LidaPay Assistant</h3>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Always here to help</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!message.isUser && (
                      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                        message.isUser
                          ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-br-none"
                          : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-bl-none border border-zinc-100 dark:border-zinc-700/50"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                      <span className="text-[10px] opacity-50 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3 border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
                          animate={{
                            y: [0, -4, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Quick Actions</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (action.href) {
                          setIsOpen(false);
                          router.push(action.href);
                        }
                      }}
                      className="flex items-center gap-1.5 whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shadow-sm"
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full h-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 pl-4 pr-12 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="absolute right-1.5 h-8 w-8 rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-brand-600 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  Powered by LidaPay AI • <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
