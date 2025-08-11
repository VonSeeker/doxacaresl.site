'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ClipboardList, RefreshCw, Stethoscope, Lightbulb, Heart, Shield, Apple, Info } from 'lucide-react';
import { useFormState } from 'react-dom';
import { symptomCheck } from '@/ai/flows/symptom-check';
import type { SymptomCheckOutput } from '@/ai/flows/symptom-check';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { healthTopics } from '@/lib/data';

export function HealthTopicsTab() {
  const { language } = useAppContext();
  const t = translations[language];
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const symptoms = formData.get('symptoms') as string;
    if (!symptoms) return { conditions: [], advice: '' };
    return await symptomCheck({ symptoms });
  }, null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  };

  const handleTagClick = (symptoms: string) => {
    if (inputRef.current) {
      inputRef.current.value = symptoms;
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.set('symptoms', symptoms);
        startTransition(() => {
          formAction(formData);
        });
      }
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-blue-600 p-3">
        <CardTitle className="flex items-center font-bold text-white">
          <ClipboardList className="mr-2 h-5 w-5" />
          {t.healthTopics.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form ref={formRef} onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="symptomsInput" className="mb-2 block text-gray-700">
            {t.healthTopics.label}
          </label>
          <div className="flex">
            <Input
              ref={inputRef}
              id="symptomsInput"
              name="symptoms"
              className="rounded-r-none border-gray-300 focus:ring-blue-500"
              placeholder={t.healthTopics.placeholder}
            />
            <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? t.healthTopics.loading : t.healthTopics.button}
            </Button>
          </div>
        </form>

        {isPending && <LoadingSkeleton />}
        
        {state && !isPending && <ResultsDisplay results={state} t={t.healthTopics} />}

        <div className="mt-4 rounded-lg bg-gray-100 p-3">
            <h4 className="mb-2 font-medium text-gray-700">{t.healthTopics.commonTopics}</h4>
            <div className="flex flex-wrap gap-2">
                {healthTopics.diseases.map(tag => (
                    <Button key={tag.topic} variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700" onClick={() => handleTagClick(tag.symptoms)}>
                        {tag.topic}
                    </Button>
                ))}
            </div>
        </div>

        <div className="mt-4 rounded-lg bg-gray-100 p-3">
            <h4 className="mb-2 font-medium text-gray-700">{t.healthTopics.commonSymptoms}</h4>
            <div className="flex flex-wrap gap-2">
                {healthTopics.symptoms.map(tag => (
                    <Button key={tag} variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700 rounded-full" onClick={() => handleTagClick(tag)}>
                        {tag}
                    </Button>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

const LoadingSkeleton = () => (
    <div className="space-y-4 pt-4 border-t">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
        </div>
         <Skeleton className="h-8 w-1/3" />
        <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
    </div>
);

const ResultsDisplay = ({ results, t }: { results: SymptomCheckOutput, t: any }) => {
    if (!results.conditions || results.conditions.length === 0) {
        return <p className="pt-4 border-t text-gray-600">{t.noResults}</p>;
    }

    return (
        <div className="space-y-4 border-t pt-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <Stethoscope className="mr-2 h-6 w-6 text-blue-600" />
                {t.resultsTitle}
            </h3>
            
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {results.conditions.map((condition, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                        <AccordionTrigger className="rounded-lg bg-blue-50 px-4 text-blue-800 hover:no-underline hover:bg-blue-100">
                            {condition.name}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 space-y-3">
                            <p className="text-gray-600">{condition.description}</p>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <InfoCard icon={Heart} title="Symptoms" content={condition.symptoms} />
                                <InfoCard icon={Shield} title="Treatment" content={condition.treatment} />
                                <InfoCard icon={Apple} title="Prevention" content={condition.prevention} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <Alert className="bg-yellow-50 border-yellow-200">
                 <Lightbulb className="h-4 w-4 text-yellow-700" />
                <AlertTitle className="text-yellow-800">Recommended Actions</AlertTitle>
                <AlertDescription className="text-yellow-900">
                    {results.advice}
                </AlertDescription>
            </Alert>

            <div className="mt-3 text-xs text-gray-500 flex items-center">
                <Info className="mr-1 h-3 w-3" />
                Note: This is not a diagnosis. Please consult a healthcare provider for proper evaluation.
            </div>
        </div>
    );
};

const InfoCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
    <div className="rounded border bg-white p-3">
        <h6 className="flex items-center text-sm font-medium text-gray-600">
            <Icon className="mr-2 h-4 w-4" />
            {title}
        </h6>
        <p className="whitespace-pre-line pt-2 text-sm text-gray-700">{content}</p>
    </div>
);
