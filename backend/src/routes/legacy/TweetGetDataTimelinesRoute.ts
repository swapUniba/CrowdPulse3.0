import {AbstractTweetRoute} from './AbstractTweetRoute';
import {Request, Response} from 'express';
import {createMissingQueryParamResponse} from '../IRoute';
import {AnalyzedTweetSchema} from "../../database/database";

type RequestHandler = {
    db: string;
}

export class TweetGetDataTimelinesRoute extends AbstractTweetRoute {

    private static TWEET_PATH = "/getDataTimelines";

    tweetPath(): string {
        return TweetGetDataTimelinesRoute.TWEET_PATH;
    }

    async performTweetRequest(req: Request, res: Response): Promise<void> {
        const handler = req.query as RequestHandler;

        if (!handler.db) {
            res.status(400);
            res.send(createMissingQueryParamResponse("collection"));
            return;
        }

        try {
            const analyzedTweetModel = AbstractTweetRoute.selectedDatabase.model(handler.db, AnalyzedTweetSchema);

            //TODO: Does not work?
            analyzedTweetModel.aggregate([{
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: 'ISODATE("$created_at")'
                        }
                    }
                }
            }], (error, result) => {

                if (error) {
                    throw error;
                }

                res.send(result);
            }).allowDiskUse(true);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send({error: error.message});
        }
    }
}