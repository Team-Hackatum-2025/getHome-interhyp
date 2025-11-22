// lib/jobAnalysis.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface JobMetrics {
  estimatedSalary: number;
  stressLevel: number;
}

export async function calculateJobMetrics(jobTitle: string): Promise<JobMetrics> {
  
  // Load API Key from environment variables
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing! Please provide it in env.local ");
  }


  const genAI = new GoogleGenerativeAI(apiKey);

  // Define agent
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `
      You are an HR expert for the German market. 
      Estimate the annual salary in EUR (estimatedSalary) and stress level (stressLevel 1-100). 
      IMPORTANT: Return only integer numbers. No decimals, no currency symbols, no units (e.g. return 50000, not 50000 EUR).
      Respond ONLY with a JSON object. No Markdown formatting.`,
    generationConfig: { responseMimeType: "application/json" } 
  });

  const prompt = `Analyse this job title: "${jobTitle}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const data = JSON.parse(text);

    return {
      estimatedSalary: Math.round(Number(data.estimatedSalary) || 0),
      stressLevel: Math.round(Number(data.stressLevel) || 0),
    };
  } catch (error) {
    console.error("Error from Gemini API:", error);
    
    return { estimatedSalary: 0, stressLevel: 0 };
  }
}