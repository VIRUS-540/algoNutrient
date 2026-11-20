import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment variables.");
      return NextResponse.json(
        { error: "API key not configured on the server." },
        { status: 500 }
      );
    }

    const { message, history, userProfile } = await req.json();

    const systemInstruction = `
You are the algoNutrient Precision Nutrition & Health AI Assistant.
Your role is to provide clear, practical, and personalized answers, feedback, meal recommendations, and solutions strictly grounded in the user's biological profile below.

USER BIOLOGICAL PROFILE:
- Name: ${userProfile?.firstName || "User"} ${userProfile?.lastName || ""}
- Age: ${userProfile?.age || "Not specified"} years
- Weight: ${userProfile?.weight || "Not specified"} kg
- Blood Group: ${userProfile?.bloodGroup || "Not specified"}
- Genotype: ${userProfile?.genotype || "Not specified"}
- Primary Fitness Goal: ${userProfile?.fitnessGoal || "General wellness"}
- Allergies & Intolerances: ${userProfile?.allergies || "None"}
- Other Health Conditions: ${userProfile?.healthConditions || "None"}

RULES:
1. NEVER recommend foods that conflict with the user's stated allergies (${userProfile?.allergies || "None"}).
2. Factor in their genotype (${userProfile?.genotype}) and health conditions when suggesting workouts, hydration, or supplements.
3. Keep responses concise, structured with bullet points where helpful, and actionable.
4. Include a brief reminder to consult a doctor for clinical medical diagnoses.
`;

    const formattedContents = [
      ...(history || []).map((msg: { role: "user" | "model"; text: string }) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("algoNutrient AI Error Detail:", error);
    return NextResponse.json(
      { error: error?.message || "Unable to generate a response right now." },
      { status: 500 }
    );
  }
}