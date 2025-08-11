
'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    const { language } = useAppContext();
    const t = translations[language].footer;

    return (
        <footer className="bg-primary text-primary-foreground print:hidden">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <h3 className="font-bold mb-3">{t.title}</h3>
                        <p className="text-sm">{t.description}</p>
                        <div className="mt-3">
                            <p className="text-sm flex items-center"><Phone className="mr-2 h-4 w-4"/> {t.emergency}: 117, 112</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">{t.linksTitle}</h3>
                        <ul className="space-y-2 text-sm">
                            {t.links.map(link => (
                                <li key={link.text}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{link.text}</a>
                                </li>
                            ))}
                             <li>
                                <Link href="/summary" className="hover:underline">Project Summary</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">{t.disclaimerTitle}</h3>
                        <p className="text-xs">{t.disclaimerText}</p>
                    </div>
                </div>
                <div className="border-t border-green-700 mt-6 pt-4 text-center text-sm">
                    <p>{t.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
