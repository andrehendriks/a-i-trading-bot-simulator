
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, StockDataPoint } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        recommendation: {
            type: Type.STRING,
            description: "The trading recommendation. Must be one of: 'BUY', 'SELL', or 'HOLD'.",
            enum: ['BUY', 'SELL', 'HOLD'],
        },
        confidence: {
            type: Type.NUMBER,
            description: "A confidence score for the recommendation, from 0.0 to 1.0.",
        },
        rationale: {
            type: Type.STRING,
            description: "A concise, 2-3 sentence explanation for the trading recommendation based on the provided data.",
        },
    },
    required: ["recommendation", "confidence", "rationale"],
};

export const getTradingRecommendation = async (
    stockName: string,
    priceHistory: StockDataPoint[],
    newsHeadlines: string[]
): Promise<AIAnalysis> => {
    const latestPrice = priceHistory[priceHistory.length - 1].price.toFixed(2);
    const priceDataSummary = `The price over the last ${priceHistory.length} periods moved from ${priceHistory[0].price.toFixed(2)} to ${latestPrice}.`;
    const newsSummary = newsHeadlines.join('\n');

    const prompt = `
        You are an expert financial analyst providing a trading recommendation for a retail investor.
        Analyze the following information for ${stockName} and provide a trading signal (BUY, SELL, or HOLD).

        Current Situation:
        - Stock: ${stockName}
        - Latest Price: $${latestPrice}
        - Recent Price Trend: ${priceDataSummary}
        - Recent News Headlines:
          ${newsSummary}

        Based *only* on the information provided, generate a trading recommendation. Provide a confidence score between 0.0 and 1.0 and a brief rationale for your decision.
        Do not use any external knowledge. Your analysis must be grounded in the data I have given you.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        // Validate the response structure
        if (
            !parsedResponse.recommendation ||
            !['BUY', 'SELL', 'HOLD'].includes(parsedResponse.recommendation) ||
            typeof parsedResponse.confidence !== 'number' ||
            typeof parsedResponse.rationale !== 'string'
        ) {
            throw new Error("Invalid response structure from Gemini API");
        }
        
        return parsedResponse as AIAnalysis;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get a valid trading recommendation from the AI.");
    }
};
