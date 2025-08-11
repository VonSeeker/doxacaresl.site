
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookText, Bot, FileText, HeartPulse, Hospital, Printer, Users, Wrench } from 'lucide-react';
import { translations } from '@/lib/translations';

export default function SummaryPage() {
    const handlePrint = () => {
        window.print();
    };

    const features = [
        {
            icon: <Bot className="h-6 w-6 text-primary" />,
            title: "AI Health Check & Chat",
            description: "Users can describe symptoms in English or Krio to get instant, AI-driven information on possible conditions, treatments, and prevention. A friendly chat interface provides a conversational experience."
        },
        {
            icon: <Hospital className="h-6 w-6 text-primary" />,
            title: "Find Clinics",
            description: "A comprehensive, searchable directory of hospitals and clinics across Sierra Leone, helping users find the nearest healthcare facility."
        },
        {
            icon: <BookText className="h-6 w-6 text-primary" />,
            title: "Health Resources & Statistics",
            description: "Access to localized health news, reports from global and local health organizations, and up-to-date health statistics for Sierra Leone, powered by AI."
        },
        {
            icon: <HeartPulse className="h-6 w-6 text-primary" />,
            title: "Bilingual Support (English & Krio)",
            description: "The entire application is available in both English and Krio, ensuring accessibility for a wider audience."
        }
    ];

    const tech = ["Next.js", "React", "TypeScript", "Tailwind CSS", "ShadCN UI", "Google's Gemini (Genkit)"];

    return (
        <div className="bg-background text-foreground font-body print:bg-white">
            <div className="container mx-auto max-w-4xl px-4 py-8">

                <div className="flex justify-between items-center mb-6 print:hidden">
                    <h1 className="text-3xl font-bold text-primary font-headline">Project Summary for Investors</h1>
                    <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print Summary</Button>
                </div>

                <Card className="mb-6 print:shadow-none print:border-none">
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl font-bold font-headline">
                            <FileText className="mr-3 h-7 w-7 text-primary" />
                            DoxaCare: AI Healthcare Assistant for Sierra Leone
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">
                            An executive summary for potential sponsors and investors.
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2 flex items-center"><Users className="mr-2 h-5 w-5 text-primary" />Mission & Vision</h2>
                        <p className="text-gray-700">
                            Our mission is to bridge the healthcare information gap in Sierra Leone by providing a free, reliable, and culturally-sensitive digital health assistant. DoxaCare empowers individuals with accessible knowledge about symptoms, local clinics, and prevalent health issues, fostering proactive health management and improving outcomes.
                        </p>
                    </section>
                    
                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center"><HeartPulse className="mr-2 h-5 w-5 text-primary" />Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map(feature => (
                                <div key={feature.title} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2 flex items-center"><Wrench className="mr-2 h-5 w-5 text-primary" />Technology Stack</h2>
                        <p className="text-gray-700 mb-4">
                            DoxaCare is built on a modern, scalable, and AI-first technology stack to ensure a high-quality user experience and robust performance.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tech.map(t => (
                                <span key={t} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">{t}</span>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    <section>
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Investment Opportunity</h2>
                        <p className="text-gray-700">
                            Investing in DoxaCare is an opportunity to support a project with significant social impact, leveraging cutting-edge AI to solve real-world healthcare challenges in West Africa. Sponsorship will contribute to expanding our features, reaching more communities, and ultimately, saving lives.
                        </p>
                    </section>
                </div>
                 <div className="mt-8 text-center text-xs text-gray-500 print:hidden">
                    <p>DoxaCare Project | {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
}
