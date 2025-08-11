'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { ClipboardPlus, RefreshCw, AlertTriangle, Stethoscope, Lightbulb, Info, Loader2 } from 'lucide-react';
import { analyzeHealthTopic, AnalyzeHealthTopicOutput } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export function HealthTopicsTab() {
  const { language } = useAppContext();
  const t = translations[language].healthTopicsTab;
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<AnalyzeHealthTopicOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (topic: string) => {
    if (!topic.trim()) {
      setError('Please enter a health topic or symptom.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResults(null);
    setInputValue(topic);

    try {
        const healthAnalysis = await analyzeHealthTopic(topic);
        setResults(healthAnalysis);
    } catch (e) {
        setError("An unexpected error occurred while analyzing the topic.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleTagClick = (topic: string) => {
    handleSearch(topic);
  }

  const handleReset = () => {
    setInputValue('');
    setResults(null);
    setError(null);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary p-3">
        <CardTitle className="flex justify-between items-center font-bold text-primary-foreground">
          <span className="flex items-center">
            <ClipboardPlus className="mr-2 h-5 w-5" />
            {t.title}
          </span>
          <Button variant="ghost" size="icon" onClick={handleReset} className="text-white hover:bg-white/20">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <label htmlFor="symptomsInput" className="block text-sm font-medium text-gray-700 mb-2">{t.inputLabel}</label>
          <div className="flex">
            <Input
              id="symptomsInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
              placeholder={t.placeholder}
              className="rounded-r-none border-gray-300 focus:ring-primary/50"
              disabled={isLoading}
            />
            <Button onClick={() => handleSearch(inputValue)} className="rounded-l-none" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.button}
            </Button>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3">Analyzing topic...</span>
          </div>
        )}
        
        {results && results.conditions && (
          <div className="border-t pt-4 space-y-4">
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" />
                {t.resultsTitle}
              </h4>
              {results.conditions.length > 0 ? (
                results.conditions.map((cond, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h5 className="font-semibold text-blue-700">{cond.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{cond.description}</p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-sm">
                          <div className="bg-white p-2 rounded border">
                              <h6 className="text-xs font-medium text-gray-500">Symptoms</h6>
                              <ul className="list-disc list-inside mt-1">{cond.symptoms.map((s, i) => <li key={i}>{s}</li>)}</ul>
                          </div>
                          <div className="bg-white p-2 rounded border">
                              <h6 className="text-xs font-medium text-gray-500">Treatment</h6>
                              <ul className="list-disc list-inside mt-1">{cond.treatment.map((s, i) => <li key={i}>{s}</li>)}</ul>
                          </div>
                          <div className="bg-white p-2 rounded border">
                              <h6 className="text-xs font-medium text-gray-500">Prevention</h6>
                              <ul className="list-disc list-inside mt-1">{cond.prevention.map((s, i) => <li key={i}>{s}</li>)}</ul>
                          </div>
                          <div className="bg-red-50 p-2 rounded border border-red-200">
                              <h6 className="text-xs font-medium text-red-700 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />Emergency Signs</h6>
                              <ul className="list-disc list-inside mt-1 text-red-800">{cond.emergency.map((s, i) => <li key={i}>{s}</li>)}</ul>
                          </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-gray-600">No specific conditions found for this topic. Try a different search.</p>
              )}

              {results.advice && (
                <Alert className="bg-yellow-50 border-yellow-200 mt-4">
                    <Lightbulb className="h-4 w-4 text-yellow-700" />
                    <AlertTitle className="text-yellow-800">Recommended Actions</AlertTitle>
                    <AlertDescription className="text-yellow-900">
                        {results.advice}
                    </AlertDescription>
                </Alert>
              )}

              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <Info className="mr-1 h-3 w-3" />
                Note: This is not a diagnosis. Please consult a healthcare provider.
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">{t.commonTopics}</h4>
          <div className="flex flex-wrap gap-2">
            {healthTopics.diseases.map(tag => (
                <Badge key={tag.topic} variant="outline" className="cursor-pointer bg-white border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => handleTagClick(tag.symptoms)}>
                    {tag.topic}
                </Badge>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">{t.commonSymptoms}</h4>
          <div className="flex flex-wrap gap-2">
            {t.symptoms.map(symptom => (
              <Badge key={symptom} variant="outline" className="cursor-pointer bg-white border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => handleTagClick(symptom)}>
                {symptom}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const healthTopics = {
    diseases: [
        { topic: 'Malaria', symptoms: 'fever, chills, headache, muscle pain' },
        { topic: 'Typhoid', symptoms: 'fever, abdominal pain, constipation, diarrhea' },
        { topic: 'Cholera', symptoms: 'watery diarrhea, vomiting, dehydration' },
        { topic: 'Dengue', symptoms: 'high fever, severe headache, eye pain, muscle pain' },
        { topic: 'Pneumonia', symptoms: 'cough, fever, difficulty breathing' },
        { topic: 'Meningitis', symptoms: 'fever, headache, stiff neck, sensitivity to light' },
        { topic: 'Lassa Fever', symptoms: 'fever, skin rash, conjunctivitis, muscle pain' },
        { topic: 'COVID-19', symptoms: 'fever, cough, loss of taste/smell, difficulty breathing' },
    ],
    symptoms: ['Fever', 'Exercise', 'Nutrition', 'Pregnancy', 'Diabetes', 'Mental Health']
};
