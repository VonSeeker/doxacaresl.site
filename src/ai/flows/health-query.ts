'use server';
/**
 * @fileOverview A health query AI agent.
 *
 * - healthQuery - A function that handles the health query process.
 * - HealthQueryInput - The input type for the healthQuery function.
 * - HealthQueryOutput - The return type for the healthQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthQueryInputSchema = z.object({
  query: z.string().describe('The health-related question from the user.'),
});
export type HealthQueryInput = z.infer<typeof HealthQueryInputSchema>;

const HealthQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the health-related question.'),
});
export type HealthQueryOutput = z.infer<typeof HealthQueryOutputSchema>;

export async function healthQuery(input: HealthQueryInput): Promise<HealthQueryOutput> {
  return healthQueryFlow(input);
}

const healthQueryPrompt = ai.definePrompt({
  name: 'healthQueryPrompt',
  input: {schema: HealthQueryInputSchema},
  output: {schema: HealthQueryOutputSchema},
  prompt: `You are a helpful AI assistant providing information related to healthcare in Sierra Leone. Use your knowledge to answer the user's question.

Question: {{{query}}}`,
});

const healthQueryFlow = ai.defineFlow(
  {
    name: 'healthQueryFlow',
    inputSchema: HealthQueryInputSchema,
    outputSchema: HealthQueryOutputSchema,
  },
  async input => {
    const {output} = await healthQueryPrompt(input);
    return output!;
  }
);
