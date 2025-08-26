
'use client';

import { useAppContext, Language } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HeartPulse, TriangleAlert, Languages } from 'lucide-react';
import { EmergencyModal } from './EmergencyModal';
import Link from 'next/link';

export function Header() {
  const { language, setLanguage, setEmergencyModalOpen } = useAppContext();
  const t = translations[language];

  const languages: { code: Language, name: string }[] = [
      { code: 'en', name: 'English'},
      { code: 'krio', name: 'Krio'},
      { code: 'mende', name: 'Mende'},
      { code: 'temne', name: 'Temne'}
  ]

  return (
    <>
      <header className="bg-gradient-to-r from-primary to-accent shadow-md print:hidden">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/main" className="flex items-center space-x-2">
            <HeartPulse className="h-7 w-7 text-white" />
            <h1 className="text-xl font-bold text-white md:text-2xl">{t.header.title}</h1>
          </Link>
          <div className="flex items-center space-x-2 md:space-x-4">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white/90 text-sm font-medium text-primary transition hover:bg-white hover:scale-105"
                    >
                        <Languages className="mr-1 h-4 w-4" />
                        <span>{t.header.language}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {languages.map(lang => (
                         <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

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
