import axios from 'axios';
import OpenAI from 'openai';

// Initialize OpenAI client with environment variable
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes, in production use server-side API calls
});

// Creative Analysis
export const analyzeCreative = async (assetData: any) => {
  try {
    // Use OpenAI to analyze the creative
    const analysisPrompt = `Analyze this ${assetData.type} ad creative for ${assetData.platform}:
    
    ${assetData.type === 'copy' ? assetData.content : `Image URL: ${assetData.url}`}
    
    Campaign: ${assetData.campaign}
    Platform: ${assetData.platform}
    
    Provide a detailed analysis including:
    1. Overall effectiveness score (0-10)
    2. Scores for:
       - Relevance
       - Engagement potential
       - Message clarity
       - Brand consistency
    3. Specific strengths
    4. Areas for improvement
    5. Suggested A/B test variations
    
    Format as JSON with these fields:
    {
      "overallScore": number,
      "scores": {
        "relevance": number,
        "engagement": number,
        "clarity": number,
        "brandConsistency": number
      },
      "feedback": string[],
      "improvements": string[],
      "abTestIdeas": string[],
      "status": "excellent" | "active" | "needs_improvement"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert marketing creative analyst specializing in digital advertising. Provide detailed, actionable analysis of ad creatives."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    return {
      ...analysis,
      dateAnalyzed: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

// Ad Copy Generation
export const generateAdCopy = async (params: {
  platform: string;
  campaign: string;
  product: string;
  targetAudience: string;
  tone: string;
  objective: string;
  keyFeatures: string[];
  constraints?: {
    maxLength?: number;
    mustInclude?: string[];
    callToAction?: string;
  };
}) => {
  try {
    const prompt = `Generate ad copy variations for:
    Platform: ${params.platform}
    Campaign: ${params.campaign}
    Product: ${params.product}
    Target Audience: ${params.targetAudience}
    Tone: ${params.tone}
    Objective: ${params.objective}
    Key Features: ${params.keyFeatures.join(', ')}
    ${params.constraints ? `Constraints: ${JSON.stringify(params.constraints)}` : ''}
    
    Create 3 unique ad copy variations optimized for the platform.
    Include for each:
    - Headline
    - Main copy
    - Call to action
    - Predicted performance score
    - Reasoning for the approach
    
    Format as JSON array with these fields:
    {
      "variations": [
        {
          "headline": string,
          "mainCopy": string,
          "callToAction": string,
          "predictedScore": number,
          "reasoning": string
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter specializing in digital advertising. Create compelling, platform-optimized ad copy that drives engagement and conversions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

// Hook Generation
export const generateHooks = async (params: {
  platform: string;
  product: string;
  targetAudience: string;
  painPoints: string[];
  uniqueSellingPoints: string[];
  competitiveAdvantages: string[];
}) => {
  try {
    const prompt = `Generate attention-grabbing hooks for:
    Platform: ${params.platform}
    Product: ${params.product}
    Target Audience: ${params.targetAudience}
    Pain Points: ${params.painPoints.join(', ')}
    Unique Selling Points: ${params.uniqueSellingPoints.join(', ')}
    Competitive Advantages: ${params.competitiveAdvantages.join(', ')}
    
    Create 5 powerful hooks that immediately capture attention and drive interest.
    For each hook, provide:
    - The hook text
    - Why it works
    - Best use case
    - Predicted engagement score
    
    Format as JSON array with these fields:
    {
      "hooks": [
        {
          "text": string,
          "reasoning": string,
          "useCase": string,
          "predictedEngagement": number
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in creating viral hooks and attention-grabbing headlines for digital advertising. Create hooks that stop the scroll and drive engagement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

// Creative Optimization Suggestions
export const getCreativeOptimizations = async (assetData: any, performanceData: any) => {
  try {
    const prompt = `Analyze this creative and its performance data to suggest optimizations:
    
    Creative Type: ${assetData.type}
    ${assetData.type === 'copy' ? `Content: ${assetData.content}` : `Image URL: ${assetData.url}`}
    
    Performance Data:
    ${JSON.stringify(performanceData, null, 2)}
    
    Provide:
    1. Specific optimization suggestions
    2. A/B test recommendations
    3. Performance improvement predictions
    4. Platform-specific optimizations
    
    Format as JSON with these fields:
    {
      "optimizations": [
        {
          "suggestion": string,
          "reasoning": string,
          "expectedImprovement": string,
          "implementation": string,
          "priority": "high" | "medium" | "low"
        }
      ],
      "abTests": [
        {
          "variant": string,
          "hypothesis": string,
          "metrics": string[]
        }
      ],
      "platformSpecific": {
        "bestPractices": string[],
        "warnings": string[]
      }
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in digital advertising creative optimization. Provide data-driven suggestions to improve creative performance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

// Campaign Recommendations
export const generateCampaignRecommendations = async (campaignData: any) => {
  try {
    const campaignSummary = `Campaign: ${campaignData.name}
Platform: ${campaignData.platform}
Current ROAS: ${campaignData.roas}
Current CTR: ${campaignData.ctr}%
Current CPA: $${campaignData.cpa}
Current Budget: $${campaignData.budget}/day
Current Spend: $${campaignData.spend}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert marketing AI assistant that specializes in analyzing ad campaign data and providing actionable recommendations."
        },
        {
          role: "user",
          content: `Analyze this campaign data and provide 3 specific, actionable recommendations to improve performance:
          
          ${campaignSummary}
          
          Format each recommendation as a JSON object with these fields:
          - title: A concise title for the recommendation
          - description: A detailed explanation with specific actions
          - impact: Either "high", "medium", or "low" based on potential impact
          - type: One of "budget", "bidding", "targeting", "creative", "schedule", or "optimization"
          
          Return only the JSON array with 3 recommendations.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (content) {
      const parsedContent = JSON.parse(content);
      if (parsedContent.recommendations && Array.isArray(parsedContent.recommendations)) {
        return parsedContent.recommendations;
      }
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

// AI Insights Generation
export const generateAIInsights = async (campaignData: any[]) => {
  try {
    const campaignSummary = campaignData.map(campaign => 
      `Campaign: ${campaign.name}, ROAS: ${campaign.roas}, CTR: ${campaign.ctr}%, CPA: $${campaign.cpa}, Budget: $${campaign.budget}/day`
    ).join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert marketing AI assistant that specializes in analyzing ad campaign data and providing actionable insights."
        },
        {
          role: "user",
          content: `Analyze this campaign data and provide 3 high-level strategic insights about the overall marketing performance:
          
          ${campaignSummary}
          
          Format each insight as a JSON object with these fields:
          - title: A concise title for the insight
          - description: A detailed explanation with specific observations
          - actionItem: A specific action that should be taken based on this insight
          
          Return only the JSON array with 3 insights.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (content) {
      const parsedContent = JSON.parse(content);
      if (parsedContent.insights && Array.isArray(parsedContent.insights)) {
        return parsedContent.insights;
      }
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

export default {
  analyzeCreative,
  generateAdCopy,
  generateHooks,
  getCreativeOptimizations,
  generateCampaignRecommendations,
  generateAIInsights
};