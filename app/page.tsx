"use client";

import { useEffect, useState } from "react";
import { getCleverTap } from "@/lib/clevertap";

export default function Home() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const clevertap = await getCleverTap();
      if (!clevertap) return;

      clevertap.onUserLogin.push({
        Site: {
          Identity: "shrey.nike@clevertap.com",
          Email: "shrey.nike@clevertap.com",
          Name: "Shrey Nike",
          Plan: "Demo Web Inbox",
        },
      });

      clevertap.notifications.push({
        inbox: {
          ctaText: "View",
          selector: "#ctInbox",
        },
      });

      clevertap.inbox?.initializeInbox?.();

      clevertap.inbox?.onInboxDidInitialize?.(() => {
        const count = clevertap.inbox?.getUnreadCount?.() || 0;
        setUnreadCount(count);
      });

      clevertap.inbox?.onInboxMessagesDidUpdate?.(() => {
        const count = clevertap.inbox?.getUnreadCount?.() || 0;
        setUnreadCount(count);
      });
    };

    init();
  }, []);

  const raiseEvent = async () => {
    const clevertap = await getCleverTap();
    clevertap?.event.push("Button Clicked", {
      Page: "NextJS Web Inbox Demo",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/70 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">
          CleverTap Web Inbox
        </h1>

        <div
          id="ctInbox"
          className="relative cursor-pointer text-2xl hover:scale-110 transition-transform duration-200"
        >
          🔔

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </header>

      {/* MAIN CARD */}
      <main className="flex items-center justify-center px-6 py-20">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md border border-white/40">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Demo Actions
          </h2>

          <p className="text-gray-600 mb-8">
            Click the button below to trigger an event and test Web Inbox.
          </p>

          <button
            onClick={raiseEvent}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg"
          >
            🚀 Trigger Event
          </button>

          {unreadCount > 0 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              You have <span className="font-semibold">{unreadCount}</span> unread message{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
