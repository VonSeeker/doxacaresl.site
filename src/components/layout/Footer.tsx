'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Phone } from 'lucide-react';

const importantLinks = [
    { name: 'WHO Sierra Leone', url: 'https://www.who.int/countries/sle' },
    { name: 'Sierra Leone Ministry of Health', url: 'https://mohs.gov.sl' },
    { name: 'National Malaria Control Program', url: 'https://www.nmcp.gov.sl' },
    { name: 'UNICEF Child Health', url: 'https://www.unicef.org/sierraleone/health' }
]

export function Footer() {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <footer className="bg-green-800 text-white">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <h3 className="font-bold mb-3">{t.footer.title}</h3>
                        <p className="text-sm">{t.footer.description}</p>
                        <div className="mt-3">
                            <p className="text-sm flex items-center"><Phone className="mr-2 h-4 w-4"/> {t.footer.emergency}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">{t.footer.linksTitle}</h3>
                        <ul className="space-y-2 text-sm">
                            {importantLinks.map(link => (
                                <li key={link.name}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">{t.footer.disclaimerTitle}</h3>
                        <p className="text-xs">{t.footer.disclaimerText}</p>
                    </div>
                </div>
                <div className="border-t border-green-700 mt-6 pt-4 text-center text-sm">
                    <p>{t.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
