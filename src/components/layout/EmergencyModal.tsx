'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Phone, Hospital, User, TriangleAlert } from 'lucide-react';

export function EmergencyModal() {
  const { language, isEmergencyModalOpen, setEmergencyModalOpen } = useAppContext();
  const t = translations[language].emergencyModal;

  const actionIcons = [Phone, Hospital, User];

  return (
    <AlertDialog open={isEmergencyModalOpen} onOpenChange={setEmergencyModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-xl font-bold text-red-600">
            <TriangleAlert className="mr-2 h-6 w-6" />
            {t.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            {t.intro}
            <ul className="space-y-2 my-4">
              {t.actions.map((action, index) => {
                const Icon = actionIcons[index];
                return (
                  <li key={index} className="flex items-start">
                    <Icon className="mr-2 mt-1 h-4 w-4 shrink-0 text-red-500" />
                    <span>{action}</span>
                  </li>
                );
              })}
            </ul>
            <div className="rounded border border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{t.warningTitle}</p>
              <ul className="mt-1 list-disc list-inside pl-2 text-sm text-red-700">
                {t.symptoms.map(symptom => <li key={symptom}>{symptom}</li>)}
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
           <Button variant="outline" onClick={() => setEmergencyModalOpen(false)}>Close</Button>
          <AlertDialogAction asChild>
            <a href="tel:117" className="w-full bg-red-600 hover:bg-red-700 sm:w-auto">
              <Phone className="mr-2 h-4 w-4" /> {t.callButton}
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
