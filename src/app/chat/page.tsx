"use client";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Send, 
  RefreshCw, 
  Phone, 
  Wifi, 
  History, 
  HelpCircle,
  Sparkles,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your Lidapay AI assistant. I can help you with:\n\n" +
            "• Buying airtime & data bundles\n" +
            "• Checking your transaction history\n" +
            "• Understanding your spending\n" +
            "• Answering questions about services\n\n" +
            "How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    { icon: <Phone className="h-4 w-4" />, label: "Buy Airtime", href: "/airtime" },
    { icon: <Wifi className="h-4 w-4" />, label: "Buy Data", href: "/data" },
    { icon: <History className="h-4 w-4" />, label: "History", href: "/transactions" },
    { icon: <HelpCircle className="h-4 w-4" />, label: "Help", href: "/settings/help" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('airtime') || lowercaseInput.includes('recharge')) {
      return "I can help you buy airtime! To get started:\n\n" +
             "1. Click 'Buy Airtime' below, or\n" +
             "2. Go to Airtime in the navigation\n\n" +
             "You can top up your own number or send to friends and family across 150+ countries.";
    }
    
    if (lowercaseInput.includes('data') || lowercaseInput.includes('internet') || lowercaseInput.includes('bundle')) {
      return "Looking to buy data bundles? Here's how:\n\n" +
             "1. Click 'Buy Data' below, or\n" +
             "2. Go to Data in the navigation\n\n" +
             "We support data bundles for all major networks. Just enter the phone number and select your preferred bundle.";
    }
    
    if (lowercaseInput.includes('balance') || lowercaseInput.includes('wallet')) {
      return "To check your wallet balance:\n\n" +
             "• Your balance is shown on the Dashboard\n" +
             "• Go to Settings → Wallet for details\n\n" +
             "Need to add funds? You can top up via mobile money or card.";
    }
    
    if (lowercaseInput.includes('transaction') || lowercaseInput.includes('history')) {
      return "To view your transaction history:\n\n" +
             "1. Click 'History' in the navigation, or\n" +
             "2. Go to Transactions page\n\n" +
             "You can filter by date, type, or status.";
    }
    
    if (lowercaseInput.includes('help') || lowercaseInput.includes('support')) {
      return "I'm here to help! Here are some things I can assist with:\n\n" +
             "• Buying airtime & data\n" +
             "• Checking transactions\n" +
             "• Understanding fees\n" +
             "• Account settings\n\n" +
             "For urgent issues, visit Settings → Help Center.";
    }
    
    if (lowercaseInput.includes('fee') || lowercaseInput.includes('charge') || lowercaseInput.includes('cost')) {
      return "Lidapay offers transparent pricing:\n\n" +
             "• No hidden fees on transactions\n" +
             "• Competitive exchange rates\n" +
             "• What you see is what you pay\n\n" +
             "The exact fee is shown before you confirm any transaction.";
    }
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      return "Hello! Great to hear from you. What can I help you with today?\n\n" +
             "Feel free to ask about airtime, data bundles, transactions, or anything else!";
    }
    
    if (lowercaseInput.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?\n\n" +
             "I'm always here to assist with your Lidapay needs.";
    }

    return "I understand you're asking about \"" + input + "\". While I'm still learning, here's what I can help with:\n\n" +
           "• Airtime & Data purchases\n" +
           "• Transaction history\n" +
           "• Wallet & balance inquiries\n" +
           "• General support\n\n" +
           "Could you rephrase your question, or try one of the quick actions below?";
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

  const clearChat = () => {
    setMessages([{
      text: "Chat cleared. How can I help you?",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="flex flex-col h-[calc(100vh-12rem)] max-h-[700px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Lidapay AI
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950">
          <AnimatePresence>
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!message.isUser && (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      message.isUser
                        ? "bg-brand-600 text-white rounded-br-md"
                        : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-bl-md border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                  {message.isUser && (
                    <div className="h-8 w-8 rounded-full bg-zinc-600 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0">
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
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl rounded-bl-md px-4 py-2.5 border border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-brand-600"
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
          <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
            <div className="flex gap-2">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(action.href)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-b-xl">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                size="sm"
                className="h-11 w-11 rounded-full p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

