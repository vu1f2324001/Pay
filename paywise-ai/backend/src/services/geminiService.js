import { GoogleGenAI, Type } from '@google/genai';

export const analyzePaymentFailure = async ({
  transactionId,
    amount,
      paymentMethod,
        errorCode,
          errorMessage,
          }) => {
            if (!process.env.GEMINI_API_KEY) {
                throw new Error('GEMINI_API_KEY is not set in environment variables');
                  }

                    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

                      const prompt = `Analyze this payment gateway transaction failure:
                      - Transaction ID: ${transactionId}
                      - Amount: ₹${amount}
                      - Payment Method: ${paymentMethod}
                      - Gateway Error Code: ${errorCode}
                      - Gateway Error Message: ${errorMessage}

                      Provide a fintech root cause analysis with actionable advice for the customer.`;

                        const response = await ai.models.generateContent({
                            model: 'gemini-2.5-flash',
                                contents: prompt,
                                    config: {
                                          responseMimeType: 'application/json',
                                                responseSchema: {
                                                        type: Type.OBJECT,
                                                                properties: {
                                                                          reason: {
                                                                                      type: Type.STRING,
                                                                                                  description: 'Short technical or operational reason for failure',
                                                                                                            },
                                                                                                                      explanation: {
                                                                                                                                  type: Type.STRING,
                                                                                                                                              description: 'Clear, customer-friendly explanation of what happened',
                                                                                                                                                        },
                                                                                                                                                                  recommendedAction: {
                                                                                                                                                                              type: Type.STRING,
                                                                                                                                                                                          description: 'Specific immediate next step for the user or merchant',
                                                                                                                                                                                                    },
                                                                                                                                                                                                              retry: {
                                                                                                                                                                                                                          type: Type.BOOLEAN,
                                                                                                                                                                                                                                      description: 'Whether it is safe and practical to re-attempt this transaction immediately',
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                          riskLevel: {
                                                                                                                                                                                                                                                                      type: Type.STRING,
                                                                                                                                                                                                                                                                                  enum: ['Low', 'Medium', 'High'],
                                                                                                                                                                                                                                                                                              description: 'Fraud or security risk indicator',
                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                                        required: ['reason', 'explanation', 'recommendedAction', 'retry', 'riskLevel'],
                                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                      const parsed = JSON.parse(response.text);

                                                                                                                                                                                                                                                                                                                                        return {
                                                                                                                                                                                                                                                                                                                                            reason: parsed.reason || 'Transaction Processing Error',
                                                                                                                                                                                                                                                                                                                                                explanation: parsed.explanation || 'An unclassified error prevented settlement.',
                                                                                                                                                                                                                                                                                                                                                    recommendedAction: parsed.recommendedAction || 'Please check with your bank or retry with a different method.',
                                                                                                                                                                                                                                                                                                                                                        retry: typeof parsed.retry === 'boolean' ? parsed.retry : false,
                                                                                                                                                                                                                                                                                                                                                            riskLevel: ['Low', 'Medium', 'High'].includes(parsed.riskLevel) ? parsed.riskLevel : 'Medium',
                                                                                                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                                                                                                              