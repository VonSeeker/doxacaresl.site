
'use client';

import * as React from 'react';
import { ClipboardList, BookText, Hospital } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HealthTopicsTab } from '@/components/tabs/HealthTopicsTab';
import { HealthBlogTab } from '@/components/tabs/HealthBlogTab';
import { FindClinicsTab } from '@/components/tabs/FindClinicsTab';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TabsPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'symptoms';
  const [activeTab, setActiveTab] = React.useState(initialTab);

  const TABS = [
    { value: 'symptoms', label: t.tabs.healthCheck, icon: <ClipboardList className="mr-2 h-5 w-5" /> },
    { value: 'blog', label: t.tabs.blog, icon: <BookText className="mr-2 h-5 w-5" /> },
    { value: 'clinics', label: t.tabs.clinics, icon: <Hospital className="mr-2 h-5 w-5" /> },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/?tab=${value}`, { scroll: false });
  };

  return (
    <div className="flex flex-1 flex-col">
      <Tabs defaultValue={initialTab} value={activeTab} onValueChange={handleTabChange} className="flex flex-1 flex-col">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <TabsList className="h-auto w-full justify-start overflow-x-auto bg-transparent p-0">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-shrink-0 whitespace-nowrap rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-gray-600 data-[state=active]:border-primary data-[state=active]:bg-green-50 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className="flex-grow bg-background">
          <div className="container mx-auto px-4 py-6">
            <TabsContent value="symptoms">
              <HealthTopicsTab />
            </TabsContent>
            <TabsContent value="blog">
              <HealthBlogTab />
            </TabsContent>
            <TabsContent value="clinics">
              <FindClinicsTab />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
