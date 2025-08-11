'use server';

import { healthQuery } from '@/ai/flows/health-query';
import { symptomCheck } from '@/ai/flows/symptom-check';

export async function handleUserQuery(previousState: any, formData: FormData) {
  const query = formData.get('query') as string;

  if (!query) {
    return { response: '', error: 'Query is empty.' };
  }
  
  const symptomKeywords = ['symptom', 'fever', 'headache', 'pain', 'cough', 'chills', 'sick', 'feel'];

  const isSymptomQuery = symptomKeywords.some(keyword => query.toLowerCase().includes(keyword));

  try {
    if (isSymptomQuery) {
        const result = await symptomCheck({ symptoms: query });
        let response = `Based on your symptoms, here are some possible conditions:\n\n`;
        result.conditions.forEach(condition => {
            response += `**${condition.name}**\n*${condition.description}*\n\n`;
        });
        response += `**General Advice:**\n${result.advice}\n\n*Disclaimer: This is not a medical diagnosis. Please consult a healthcare professional.*`;
        return { response, error: null };

    } else {
        const result = await healthQuery({ query });
        return { response: result.answer, error: null };
    }
  } catch (error) {
    console.error('Error handling user query:', error);
    return { response: '', error: 'I am having trouble connecting to my knowledge base. Please try again later.' };
  }
}
