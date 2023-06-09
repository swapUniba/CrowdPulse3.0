import {AbstractTweetRoute} from './AbstractTweetRoute';
import {Request, Response} from 'express';
import {createMissingQueryParamResponse} from '../IRoute';
import {AnalyzedTweetSchema} from "../../database/database";

type RequestHandler = {
    db: string;
}

export class TweetGetAnalyzedDataRoute extends AbstractTweetRoute {

    private static TWEET_PATH = "/getAnalyzedData";

    tweetPath(): string {
        return TweetGetAnalyzedDataRoute.TWEET_PATH;
    }

    //TODO: check why TweetGetAnalyzedSentimentDatesRoute has the same behavior
    async performTweetRequest(req: Request, res: Response): Promise<void> {
        const handler = req.query as RequestHandler;

        if (!handler.db) {
            res.status(400);
            res.send(createMissingQueryParamResponse("collection"));
            return;
        }

        try {
            const analyzedTweetModel = AbstractTweetRoute.selectedDatabase.model(handler.db, AnalyzedTweetSchema);

            analyzedTweetModel
                .find({}, {timeout: false})
                .lean()
                .catch(error => {
                    throw error;
                })
                .then(result => {
                    res.send(result);
                });
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send({error: error.message});
        }
    }
}