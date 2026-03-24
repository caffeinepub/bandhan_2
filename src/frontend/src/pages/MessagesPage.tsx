import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface Message {
  id: string;
  fromName: string;
  toName: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

interface Conversation {
  contactName: string;
  contactInitials: string;
  messages: Message[];
}

const STORAGE_KEY = "bandhan_messages";

const SEED_CONVERSATIONS: Message[] = [
  {
    id: "1",
    fromName: "Priya Sharma",
    toName: "You",
    content:
      "Namaste! I came across your profile and found it quite impressive. Would love to know more about you.",
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    isRead: false,
  },
  {
    id: "2",
    fromName: "You",
    toName: "Priya Sharma",
    content:
      "Namaste Priya! Thank you so much. I'd love to connect too. Tell me about yourself!",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    isRead: true,
  },
  {
    id: "3",
    fromName: "Priya Sharma",
    toName: "You",
    content:
      "I'm a software engineer from Bangalore. I enjoy classical music and cooking. What about you?",
    timestamp: Date.now() - 1000 * 60 * 60 * 1,
    isRead: false,
  },
  {
    id: "4",
    fromName: "Rahul Verma",
    toName: "You",
    content:
      "Hello! Your profile caught my attention. Are you from Delhi originally?",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    isRead: true,
  },
  {
    id: "5",
    fromName: "You",
    toName: "Rahul Verma",
    content:
      "Yes, born and raised in Delhi! Currently working in Mumbai. What about you?",
    timestamp: Date.now() - 1000 * 60 * 60 * 23,
    isRead: true,
  },
  {
    id: "6",
    fromName: "Ananya Patel",
    toName: "You",
    content:
      "Hi! I saw we have many things in common — both from Gujarat, both doctors! Would be great to chat.",
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    isRead: true,
  },
];

function getConversations(messages: Message[]): Conversation[] {
  const map = new Map<string, Message[]>();
  for (const msg of messages) {
    const contact = msg.fromName === "You" ? msg.toName : msg.fromName;
    if (!map.has(contact)) map.set(contact, []);
    map.get(contact)!.push(msg);
  }
  return Array.from(map.entries()).map(([name, msgs]) => ({
    contactName: name,
    contactInitials: name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2),
    messages: msgs.sort((a, b) => a.timestamp - b.timestamp),
  }));
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export default function MessagesPage() {
  const { identity } = useInternetIdentity();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [mobileView, setMobileView] = useState<"inbox" | "chat">("inbox");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages(SEED_CONVERSATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CONVERSATIONS));
    }
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: bottomRef is a stable ref
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedContact, messages]);

  const conversations = getConversations(messages);

  const selectedConversation = conversations.find(
    (c) => c.contactName === selectedContact,
  );

  const unreadCount = (contactName: string) =>
    messages.filter((m) => m.fromName === contactName && !m.isRead).length;

  const handleSelectContact = (name: string) => {
    setSelectedContact(name);
    setMobileView("chat");
    // Mark as read
    const updated = messages.map((m) =>
      m.fromName === name ? { ...m, isRead: true } : m,
    );
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSend = () => {
    if (!inputValue.trim() || !selectedContact) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      fromName: "You",
      toName: selectedContact,
      content: inputValue.trim(),
      timestamp: Date.now(),
      isRead: true,
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setInputValue("");
  };

  if (!identity) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <MessageCircle className="w-16 h-16 text-maroon mx-auto mb-4 opacity-50" />
          <h2 className="font-display text-2xl text-maroon mb-2">
            Login to Access Messages
          </h2>
          <p className="text-muted-foreground mb-6">
            Connect and converse with potential matches.
          </p>
          <Link to="/login">
            <Button
              className="bg-maroon text-white hover:bg-maroon-deep rounded-full px-8"
              data-ocid="messages.primary_button"
            >
              Login to Continue
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" data-ocid="messages.page">
      <div className="container mx-auto px-4 py-6">
        <h1 className="font-display text-3xl text-maroon mb-6">Messages</h1>
        <div
          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
          style={{ height: "70vh" }}
        >
          <div className="flex h-full">
            {/* Inbox sidebar */}
            <div
              className={`w-full md:w-80 border-r border-border flex-shrink-0 flex flex-col ${
                mobileView === "chat" ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="p-4 border-b border-border bg-secondary">
                <h2 className="font-semibold text-maroon">Conversations</h2>
              </div>
              <ScrollArea className="flex-1">
                {conversations.length === 0 ? (
                  <div
                    className="p-6 text-center text-muted-foreground"
                    data-ocid="messages.empty_state"
                  >
                    No conversations yet
                  </div>
                ) : (
                  <div data-ocid="messages.list">
                    {conversations.map((conv, i) => {
                      const lastMsg = conv.messages[conv.messages.length - 1];
                      const unread = unreadCount(conv.contactName);
                      return (
                        <button
                          key={conv.contactName}
                          type="button"
                          className={`w-full text-left px-4 py-3 border-b border-border hover:bg-secondary transition-colors flex items-start gap-3 ${
                            selectedContact === conv.contactName
                              ? "bg-secondary"
                              : ""
                          }`}
                          onClick={() => handleSelectContact(conv.contactName)}
                          data-ocid={`messages.item.${i + 1}`}
                        >
                          <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                            <AvatarFallback className="bg-maroon text-white text-xs font-semibold">
                              {conv.contactInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm text-foreground truncate">
                                {conv.contactName}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                                {formatTime(lastMsg.timestamp)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                              <p className="text-xs text-muted-foreground truncate">
                                {lastMsg.fromName === "You" ? "You: " : ""}
                                {lastMsg.content}
                              </p>
                              {unread > 0 && (
                                <Badge className="ml-2 bg-maroon text-white text-xs px-1.5 py-0.5 rounded-full shrink-0">
                                  {unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Chat area */}
            <div
              className={`flex-1 flex flex-col ${
                mobileView === "inbox" ? "hidden md:flex" : "flex"
              }`}
            >
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b border-border bg-secondary flex items-center gap-3">
                    <button
                      type="button"
                      className="md:hidden text-maroon mr-1"
                      onClick={() => setMobileView("inbox")}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-maroon text-white text-xs font-semibold">
                        {selectedConversation.contactInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {selectedConversation.contactName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active recently
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col gap-3">
                      <AnimatePresence>
                        {selectedConversation.messages.map((msg) => {
                          const isSent = msg.fromName === "You";
                          return (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${
                                isSent ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                                  isSent
                                    ? "bg-maroon text-white rounded-br-sm"
                                    : "bg-secondary text-foreground rounded-bl-sm"
                                }`}
                              >
                                <p>{msg.content}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    isSent
                                      ? "text-white/60"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {formatTime(msg.timestamp)}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                      <div ref={bottomRef} />
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t border-border flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-full border-maroon/30 focus-visible:ring-maroon"
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      data-ocid="messages.input"
                    />
                    <Button
                      onClick={handleSend}
                      className="bg-maroon text-white hover:bg-maroon-deep rounded-full w-10 h-10 p-0 shrink-0"
                      data-ocid="messages.submit_button"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <MessageCircle className="w-14 h-14 text-maroon/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Select a conversation to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
