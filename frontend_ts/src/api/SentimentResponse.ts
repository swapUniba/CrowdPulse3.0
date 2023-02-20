export type SentimentResponse = {
    algorithm: string,    // sent-it or feel-it
    processed: number,    // Number of processed documents.
    notProcessed: number, // Number of not processed documents.
    data: {
        positive: number, // Number of positive sentiments
        neutral: number,  // Number of neutral sentiments
        negative: number, // Number of negative sentiments
    },
    emotion: {           // Only for feel-it
        joy: number,     // Number of joy emotions
        sadness: number, // Number of sadness emotions
        anger: number,   // Number of anger emotions
        fear: number,    // Number of fear emotions
    },
    percentages: {
        positive: number, // A value [0-100] of positive sentiments
        neutral: number,  // A value [0-100] of neutral sentiments
        negative: number, // A value [0-100] of negative sentiments
    }
}