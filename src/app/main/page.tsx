
'use client';

import * as React from 'react';
import { HomeTab } from '@/components/tabs/HomeTab';
import { useRouter } from 'next/navigation';


export default function MainPage() {
  const router = useRouter();

  const handleSetActiveTab = (tab: string) => {
    router.push(`/?tab=${tab}`);
  };

  return (
    <div className="flex-grow bg-background">
      <div className="container mx-auto px-4 py-6">
        <HomeTab setActiveTab={handleSetActiveTab} />
      </div>
    </div>
  );
}
