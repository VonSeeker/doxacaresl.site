'use server';

/**
 * @fileOverview This file defines a Genkit flow for checking symptoms and providing possible conditions.
 *
 * It includes:
 * - symptomCheck - The main function to initiate the symptom check flow.
 * - SymptomCheckInput - The input type for the symptomCheck function, defining the user's symptoms.
 * - SymptomCheckOutput - The output type, providing a list of possible conditions with details.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckInputSchema = z.object({
  symptoms: z.string().describe('The symptoms or health topic described by the user.'),
});
export type SymptomCheckInput = z.infer<typeof SymptomCheckInputSchema>;

const ConditionSchema = z.object({
  name: z.string().describe('The name of the possible condition.'),
  description: z.string().describe('A brief description of the condition.'),
  symptoms: z.array(z.string()).describe('A list of common symptoms associated with the condition.'),
  treatment: z.array(z.string()).describe('A list of recommended treatments for the condition.'),
  prevention: z.array(z.string()).describe('A list of preventative measures for the condition.'),
  emergency: z.array(z.string()).describe('A list of emergency signs that require immediate medical attention.'),
});

const SymptomCheckOutputSchema = z.object({
  conditions: z.array(ConditionSchema).describe('A list of possible conditions based on the symptoms.'),
  advice: z.string().describe('General advice based on the conditions.'),
});

export type SymptomCheckOutput = z.infer<typeof SymptomCheckOutputSchema>;

export async function symptomCheck(input: SymptomCheckInput): Promise<SymptomCheckOutput> {
  return symptomCheckFlow(input);
}

const symptomCheckPrompt = ai.definePrompt({
  name: 'symptomCheckPrompt',
  input: {schema: SymptomCheckInputSchema},
  output: {schema: SymptomCheckOutputSchema},
  prompt: `You are a medical assistant providing possible conditions based on the symptoms provided by the user from Sierra Leone.

  Based on the following symptoms: {{{symptoms}}}, provide a list of possible conditions. For each condition, provide:
  - A description.
  - A list of common symptoms.
  - A list of common treatments.
  - A list of prevention advice.
  - A list of emergency signs to watch for.

  Also, provide general advice based on the identified conditions.
  `,
});

const symptomCheckFlow = ai.defineFlow(
  {
    name: 'symptomCheckFlow',
    inputSchema: SymptomCheckInputSchema,
    outputSchema: SymptomCheckOutputSchema,
  },
  async input => {
    const {output} = await symptomCheckPrompt(input);
    return output!;
  }
);
