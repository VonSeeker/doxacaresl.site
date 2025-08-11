
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, LineChart, Newspaper, Globe, BookHeart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';

export function HealthBlogTab() {
  const { language } = useAppContext();
  const t = translations[language].resourcesTab;

  const statColors = ['bg-blue-50 text-blue-800', 'bg-green-50 text-green-800', 'bg-yellow-50 text-yellow-800'];

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary p-3">
        <CardTitle className="flex items-center font-bold text-primary-foreground">
          <BookText className="mr-2 h-5 w-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div>
            <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              {t.internationalTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {t.internationalReports.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-3 transition-shadow hover:shadow-md"
                >
                  <h4 className="font-medium text-blue-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
              <BookHeart className="mr-2 h-5 w-5 text-primary" />
              {t.localTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {t.localReports.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-3 transition-shadow hover:shadow-md"
                >
                  <h4 className="font-medium text-blue-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        
        <div>
          <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
            <LineChart className="mr-2 h-5 w-5 text-primary" />
            {t.statsTitle}
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className={`rounded-lg p-3 ${statColors[0]}`}>
                <h4 className="font-medium">{t.topDiseasesTitle}</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {t.topDiseases.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={`rounded-lg p-3 ${statColors[1]}`}>
                <h4 className="font-medium">{t.maternalHealthTitle}</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {t.maternalHealth.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={`rounded-lg p-3 ${statColors[2]}`}>
                <h4 className="font-medium">{t.childHealthTitle}</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {t.childHealth.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 flex items-center border-b pb-2 text-lg font-semibold text-gray-800">
            <Newspaper className="mr-2 h-5 w-5 text-primary" />
            {t.newsTitle}
          </h3>
          <div className="space-y-3">
            {t.news.map((news) => (
              <a
                key={news.title}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b pb-3 last:border-b-0 last:pb-0"
              >
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-sm text-gray-600">{news.description}</p>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
