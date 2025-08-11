'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { HeartPulse, ArrowRightLeft, TriangleAlert } from 'lucide-react';
import { EmergencyModal } from './EmergencyModal';

export function Header() {
  const { language, toggleLanguage, setEmergencyModalOpen } = useAppContext();
  const t = translations[language];

  return (
    <>
      <header className="bg-gradient-to-r from-green-700 to-yellow-500 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-7 w-7 text-white" />
            <h1 className="text-xl font-bold text-white md:text-2xl">{t.header.title}</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="rounded-full bg-white/90 text-sm font-medium text-green-800 transition hover:bg-white hover:scale-105"
            >
              <span>{t.header.language}</span>
              <ArrowRightLeft className="ml-1 h-4 w-4" />
            </Button>
            <Button
              onClick={() => setEmergencyModalOpen(true)}
              variant="destructive"
              size="sm"
              className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 animate-shake"
            >
              <TriangleAlert className="mr-1 h-4 w-4" />
              {t.header.emergency}
            </Button>
          </div>
        </div>
      </header>
      <EmergencyModal />
    </>
  );
}
