'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { quickChatActions } from '@/lib/data';
import { Bell, Globe, type LucideIcon } from 'lucide-react';
import * as React from 'react';

type HomeTabProps = {
  setActiveTab: (tab: string) => void;
};

export function HomeTab({ setActiveTab }: HomeTabProps) {
  const { language } = useAppContext();
  const t = translations[language];

  const [chatKey, setChatKey] = React.useState(Date.now());
  const [initialMessage, setInitialMessage] = React.useState('');

  const handleQuickChat = (action: string) => {
    setInitialMessage(action);
    setChatKey(Date.now()); // Re-mount the chat interface with new initial message
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="border-b border-green-200 bg-green-100 p-4">
          <CardTitle className="text-lg font-bold text-green-800">{t.home.welcomeTitle}</CardTitle>
          <p className="mt-1 text-sm text-gray-700">{t.home.welcomeText}</p>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="mb-2 flex items-center font-bold text-yellow-800">
                <Bell className="mr-2 h-5 w-5 text-yellow-600" />
                {t.home.healthAlertsTitle}
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                {t.home.healthAlertsText.map((alert, i) => <p key={i}>• {alert}</p>)}
              </div>
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 flex items-center font-bold text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                {t.home.quickChatsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickChatActions.map((action) => {
                  const Icon = action.icon as LucideIcon;
                  return (
                    <Button key={action.id} className={`${action.color} justify-start`} onClick={() => handleQuickChat(t.home.quickChats[action.id as keyof typeof t.home.quickChats])}>
                      <Icon className="mr-1.5 h-4 w-4" />
                      <span>{t.home.quickChats[action.id as keyof typeof t.home.quickChats]}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ChatInterface key={chatKey} initialMessage={initialMessage} />

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-green-600 p-3">
          <CardTitle className="flex items-center font-bold text-white">
            <Globe className="mr-2 h-5 w-5" />
            {t.home.culturalTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Image
              src="https://placehold.co/192x192.png"
              alt="Lumley Beach in Freetown, Sierra Leone"
              width={192}
              height={192}
              data-ai-hint="Sierra Leone beach"
              className="h-32 w-32 rounded-lg object-cover shadow md:h-48 md:w-48"
            />
            <div>
              <h3 className="mb-2 font-semibold text-green-800">{t.home.localTipTitle}</h3>
              <div className="text-gray-700 space-y-1">
                {t.home.culturalTipText.map((tip, i) => <p key={i}>• {tip}</p>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
