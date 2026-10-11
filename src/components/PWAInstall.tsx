"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted install");
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismissInstall = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-lg shadow-float border border-[var(--color-hairline)] p-4 z-50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[var(--color-canvas-soft)] rounded-lg">
            <Download className="h-5 w-5 text-[var(--color-link)]" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Install MSME AI</h3>
            <p className="text-sm text-[var(--color-body)]">
              Install for offline field assessments
            </p>
          </div>
        </div>
        <button onClick={dismissInstall} className="p-1 hover:bg-[var(--color-canvas-soft)] rounded">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium hover:bg-[#000]"
        >
          Install
        </button>
        <button
          onClick={dismissInstall}
          className="px-4 py-2 border border-[var(--color-hairline)] rounded-full text-sm hover:bg-[var(--color-canvas-soft)]"
        >
          Later
        </button>
      </div>
    </div>
  );
}
