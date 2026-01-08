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
  HelpCircle
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
      text: "Hello! 👋 I'm your Lidapay AI assistant. I can help you with:\n\n" +
            "• Buying airtime & data bundles\n" +
            "• Understanding our services\n" +
            "• Answering questions\n\n" +
            "What would you like to know?",
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
    { icon: HelpCircle, label: "Help", href: "/settings/help" }
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
      return "Great! I can help you buy airtime. Here's how:\n\n" +
             "1. Click 'Buy Airtime' below, or\n" +
             "2. Visit the Airtime page from the menu\n\n" +
             "You can send airtime to any phone number in 150+ countries instantly! 🌍";
    }
    
    if (lowercaseInput.includes('data') || lowercaseInput.includes('internet') || lowercaseInput.includes('bundle')) {
      return "Looking to buy data bundles? Perfect! 📶\n\n" +
             "1. Click 'Buy Data' below, or\n" +
             "2. Go to the Data page\n\n" +
             "We support all major networks worldwide. Just select the country, network, and your preferred bundle size.";
    }
    
    if (lowercaseInput.includes('country') || lowercaseInput.includes('countries')) {
      return "Lidapay supports 150+ countries! 🌎\n\n" +
             "Some popular destinations include:\n" +
             "• Ghana, Nigeria, Kenya\n" +
             "• USA, UK, Canada\n" +
             "• South Africa, Uganda, Tanzania\n\n" +
             "You can send airtime and data to almost anywhere in the world!";
    }
    
    if (lowercaseInput.includes('fee') || lowercaseInput.includes('charge') || lowercaseInput.includes('cost') || lowercaseInput.includes('price')) {
      return "Lidapay offers transparent pricing! 💰\n\n" +
             "• No hidden fees\n" +
             "• Competitive rates\n" +
             "• What you see is what you pay\n\n" +
             "The exact amount is always shown before you confirm any transaction.";
    }
    
    if (lowercaseInput.includes('secure') || lowercaseInput.includes('safe') || lowercaseInput.includes('security')) {
      return "Security is our top priority! 🔒\n\n" +
             "• Bank-level encryption\n" +
             "• Secure payment processing\n" +
             "• Your data is protected\n\n" +
             "We use industry-standard security measures to keep your transactions safe.";
    }
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      return "Hello! 👋 Welcome to Lidapay!\n\n" +
             "I'm here to help you with:\n" +
             "• Airtime & data purchases\n" +
             "• Understanding our services\n" +
             "• General questions\n\n" +
             "What would you like to know?";
    }
    
    if (lowercaseInput.includes('thank')) {
      return "You're very welcome! 😊\n\n" +
             "Is there anything else I can help you with?";
    }

    if (lowercaseInput.includes('register') || lowercaseInput.includes('sign up') || lowercaseInput.includes('account')) {
      return "Creating an account is easy! 🚀\n\n" +
             "1. Click 'Create Free Account' on the page\n" +
             "2. Fill in your details\n" +
             "3. Start sending airtime and data!\n\n" +
             "It only takes a few seconds to get started.";
    }

    return "I understand you're asking about \"" + input + "\". While I'm still learning, here's what I can help with:\n\n" +
           "• Airtime & Data purchases\n" +
           "• Understanding our services\n" +
           "• Account setup\n" +
           "• General support\n\n" +
           "Try asking about airtime, data bundles, or our services. Or use the quick actions below!";
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
    }, 1200);
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
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-lg shadow-brand-500/50 flex items-center justify-center text-white hover:shadow-xl transition-shadow"
        aria-label="Open AI Chat"
      >
        <Sparkles className="h-6 w-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] ${
          isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-8rem)]'
        } flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-500 to-indigoBrand-600 text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Lidapay AI</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span className="text-xs text-white/90">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-zinc-950">
              <AnimatePresence>
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {!message.isUser && (
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm ${
                          message.isUser
                            ? "bg-brand-600 text-white rounded-br-md"
                            : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-bl-md border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed text-xs">
                          {message.text}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="h-7 w-7 rounded-full bg-zinc-600 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">U</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl rounded-bl-md px-3 py-2 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-brand-600"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
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
            <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
              <div className="flex gap-1.5">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={idx}
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setIsOpen(false);
                        router.push(action.href);
                      }}
                      className="flex items-center gap-1.5 whitespace-nowrap text-xs h-8 px-2"
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 text-xs text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  size="sm"
                  className="h-9 w-9 rounded-full p-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
