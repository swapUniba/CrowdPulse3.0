import {ITweetRoute} from "./ITweetRoute";
import {Request, Response} from "express";

export class TweetGetTextRoute extends ITweetRoute {

    private static TWEET_PATH = "/getUsers";

    tweetPath(): string {
        return TweetGetTextRoute.TWEET_PATH;
    }

    perform(req: Request, res: Response): void {
        //TODO: implement...
        res.send('Route: ' + TweetGetTextRoute.TWEET_PATH);
    }
}