import type { LucideIcon } from "lucide-react";
import { Bug, Baby, Droplets, HeartPulse, Globe, BookHeart, LineChart, Newspaper, Phone, MapPin } from 'lucide-react';

export interface Clinic {
  name: string;
  location: string;
  district: string;
  phone?: string;
  type: string;
  is24Hour: boolean;
}

export const clinics: Clinic[] = [
  // Freetown / Western Area Urban & Rural
  { name: 'Connaught Hospital', location: 'Lightfoot Boston St, Freetown', district: 'western area urban', phone: '+232 25 345678', type: 'Government Hospital', is24Hour: true },
  { name: 'Lumley Government Hospital', location: 'Lumley, Freetown', district: 'western area urban', phone: '+232 76 543210', type: 'Government Hospital', is24Hour: false },
  { name: 'Cottage Hospital (Rokupa)', location: 'Fourah Bay Road, Freetown', district: 'western area urban', phone: '+232 22 221234', type: 'Private Hospital', is24Hour: true },
  { name: 'Choithram Memorial Hospital', location: 'Hill Cot Road, Freetown', district: 'western area urban', phone: '+232 76 112233', type: 'Private Hospital', is24Hour: true },
  { name: '34 Military Hospital', location: 'Wilberforce, Freetown', district: 'western area urban', phone: '+232 77 998877', type: 'Government Hospital', is24Hour: true },
  { name: 'Waterloo Community Health Center', location: 'Waterloo', district: 'western area rural', phone: '+232 77 123123', type: 'Clinic', is24Hour: false },
  
  // Bo District
  { name: 'Bo Government Hospital', location: 'Kissi Town, Bo', district: 'bo', phone: '+232 76 345678', type: 'Government Hospital', is24Hour: true },
  { name: 'Mercy Hospital', location: 'Tikonko Rd, Bo', district: 'bo', phone: '+232 33 567890', type: 'Private Hospital', is24Hour: false },
  { name: 'St. Francis Health Center', location: 'Dambala Rd, Bo', district: 'bo', phone: '+232 76 789012', type: 'Clinic', is24Hour: false },
  
  // Kenema District
  { name: 'Kenema Government Hospital', location: 'Hanga Rd, Kenema', district: 'kenema', phone: '+232 78 123456', type: 'Government Hospital', is24Hour: true },
  { name: 'Holy Spirit Hospital', location: 'Dama Rd, Kenema', district: 'kenema', phone: '+232 78 654321', type: 'Mission Hospital', is24Hour: true },

  // Bombali District / Makeni
  { name: 'Makeni Government Hospital', location: 'Magburaka Rd, Makeni', district: 'bombali', phone: '+232 77 112233', type: 'Government Hospital', is24Hour: true },
  { name: 'Binkolo Community Health Center', location: 'Binkolo, Makeni', district: 'bombali', phone: '+232 77 445566', type: 'Clinic', is24Hour: false },
  { name: 'Holy Spirit Hospital Makeni', location: 'Masuba, Makeni', district: 'bombali', phone: '+232 78 555666', type: 'Mission Hospital', is24Hour: true },

  // Kono District / Koidu
  { name: 'Koidu Government Hospital', location: 'Mines Rd, Koidu', district: 'kono', phone: '+232 77 778899', type: 'Government Hospital', is24Hour: true },
  { name: 'Mines Medical Center (Koidu)', location: 'Koidu Mines Area', district: 'kono', phone: '+232 77 001122', type: 'Company Hospital', is24Hour: true },

  // Port Loko District
  { name: 'Port Loko Government Hospital', location: 'Rokel St, Port Loko', district: 'port loko', phone: '+232 76 334455', type: 'Government Hospital', is24Hour: true },
  { name: 'Lungi Government Hospital', location: 'Lungi Town', district: 'port loko', phone: '+232 76 111222', type: 'Government Hospital', is24Hour: true },
  { name: 'Mercy Community Health Center', location: 'Gbinti Rd, Port Loko', district: 'port loko', phone: '+232 77 667788', type: 'Clinic', is24Hour: false },
  
  // Kambia District
  { name: 'Kambia Government Hospital', location: 'Mange Bureh Rd, Kambia', district: 'kambia', phone: '+232 77 998877', type: 'Government Hospital', is24Hour: false },

  // Kailahun District
  { name: 'Kailahun Government Hospital', location: 'Luawa Rd, Kailahun', district: 'kailahun', phone: '+232 77 665544', type: 'Government Hospital', is24Hour: true },
  { name: 'Segbwema Community Health Center', location: 'Segbwema Town', district: 'kailahun', phone: '+232 76 223344', type: 'Clinic', is24Hour: false },

  // Tonkolili District
  { name: 'Magburaka Government Hospital', location: 'Magburaka Town', district: 'tonkolili', phone: '+232 78 987654', type: 'Government Hospital', is24Hour: true },
  { name: 'Yele Community Hospital', location: 'Yele Town', district: 'tonkolili', phone: '+232 76 543210', type: 'Community Hospital', is24Hour: false },

  // Bonthe District
  { name: 'Bonthe Government Hospital', location: 'Bonthe Sherbro Island', district: 'bonthe', phone: '+232 77 123456', type: 'Government Hospital', is24Hour: false },
  { name: 'Mattru Jong Hospital', location: 'Mattru Jong', district: 'bonthe', phone: '+232 78 654321', type: 'Government Hospital', is24Hour: true },
  
  // Moyamba District
  { name: 'Moyamba Government Hospital', location: 'Moyamba Town', district: 'moyamba', phone: '+232 76 112233', type: 'Government Hospital', is24Hour: true },

  // Pujehun District
  { name: 'Pujehun Government Hospital', location: 'Pujehun Town', district: 'pujehun', phone: '+232 77 112233', type: 'Government Hospital', is24Hour: true },
  
  // Koinadugu District
  { name: 'Kabala Government Hospital', location: 'Kabala Town', district: 'koinadugu', phone: '+232 78 887766', type: 'Government Hospital', is24Hour: true },
];

export const healthTopics = {
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

export const healthResources = [
    { 
        category: 'International Health Reports', 
        icon: Globe,
        items: [
            { title: 'WHO Sierra Leone Country Profile', description: 'Latest health statistics and reports from World Health Organization', url: 'https://www.who.int/countries/sle' },
            { title: 'World Bank Health Data', description: 'Health indicators and development reports for Sierra Leone', url: 'https://data.worldbank.org/country/sierra-leone' }
        ]
    },
    { 
        category: 'Local Health Publications', 
        icon: BookHeart,
        items: [
            { title: 'Ministry of Health Reports', description: 'Official health policies and annual reports from Sierra Leone government', url: 'https://mohs.gov.sl' },
            { title: 'Malaria Control Program', description: 'Latest malaria prevention and treatment guidelines', url: 'https://www.nmcp.gov.sl' }
        ]
    }
];

export const recentHealthNews = [
    { title: 'UNICEF Child Health Initiatives', description: 'Latest updates on nutrition and vaccination programs', url: 'https://www.unicef.org/sierraleone/press-releases' },
    { title: 'WHO Disease Outbreak Updates', description: 'Current outbreak alerts and response efforts', url: 'https://www.afro.who.int/countries/sierra-leone/news' },
    { title: 'Local Health Journalism', description: 'Community health stories and interviews', url: 'https://www.thesierraleonetelegraph.com/category/education-and-health/' }
];
