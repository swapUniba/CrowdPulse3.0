export type MapResponse = {
    [key: string]: {               // Name of the region or city, such as "Lombardia" or "Milano"
        sentimentPositive: number, // Number of positive sentiments.
        sentimentNeutral:  number, // Number of neutral sentiments.
        sentimentNegative: number, // Number of negative sentiments.
        emotionJoy:     number,    // Number of feel-it joy emotions.
        emotionSadness: number,    // Number of feel-it sadness emotions.
        emotionAnger:   number,    // Number of feel-it anger emotions.
        emotionFear:    number,    // Number of feel-it fear emotions.
        hateSpeechAcceptable:    number, // Number of hate-speech acceptable sentiments.
        hateSpeechInappropriate: number, // Number of hate-speech inappropriate sentiments.
        hateSpeechOffensive:     number, // Number of hate-speech offensive sentiments.
        hateSpeechViolent:       number, // Number of hate-speech violent sentiments.
    }
}