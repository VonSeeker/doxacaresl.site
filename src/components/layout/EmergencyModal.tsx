
'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Phone, Hospital, User, TriangleAlert } from 'lucide-react';

export function EmergencyModal() {
  const { language, isEmergencyModalOpen, setEmergencyModalOpen } = useAppContext();
  const t = translations[language].emergencyModal;

  return (
    <AlertDialog open={isEmergencyModalOpen} onOpenChange={setEmergencyModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-xl font-bold text-red-600">
            <TriangleAlert className="mr-2 h-6 w-6" />
            {t.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            <div>{t.description}</div>
            <ul className="space-y-2 my-4">
              <li className="flex items-start">
                <Phone className="mr-2 mt-1 h-4 w-4 shrink-0 text-red-500" />
                <span>{t.callServices.label} <strong>{t.callServices.number}</strong></span>
              </li>
              <li className="flex items-start">
                <Hospital className="mr-2 mt-1 h-4 w-4 shrink-0 text-red-500" />
                <span>{t.goToHospital}</span>
              </li>
              <li className="flex items-start">
                <User className="mr-2 mt-1 h-4 w-4 shrink-0 text-red-500" />
                <span>{t.alertSomeone}</span>
              </li>
            </ul>
            <div className="rounded border border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-800">{t.immediateHelpTitle}</p>
              <ul className="mt-1 list-disc list-inside pl-2 text-sm text-red-700">
                {t.immediateHelpItems.map(symptom => <li key={symptom}>{symptom}</li>)}
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
