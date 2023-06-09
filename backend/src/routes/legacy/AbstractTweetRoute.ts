import {IRoute} from '../IRoute';
import {Request, Response} from 'express';
import {getMongoConnection, getAdminConnection} from '../../database/database';
import {Connection} from 'mongoose';

export abstract class AbstractTweetRoute implements IRoute {

    public static selectedDatabase: Connection = undefined;

    async handleRequest(req: Request, res: Response): Promise<void> {
        let method = this.getMethod().toLowerCase();

        if (method === "get") {
            console.log(`Performing [${req.method}] '${req.url}' by '${req.ip}'`);
        } else {
            console.log(`Performing [${req.method}] '${req.url}' by '${req.ip}' with request body: ` + JSON.stringify(req.body));
        }
        
        let result = this.checkIntegrity(req, res);

        if (result) {
            return await this.performTweetRequest(req, res).then(result => {return result});
        }
    }

    abstract performTweetRequest(req: Request, res: Response): Promise<void>;

    abstract tweetPath(): string;

    getMethod(): string {
        return "get";
    }

    getPath(): string {
        return '/tweet' + this.tweetPath();
    }

    protected checkIntegrity(req: Request, res: Response): boolean {
        if (AbstractTweetRoute.selectedDatabase) {
            return true;
        }
        res.status(500);
        res.send({error: "No database selected"});
        return false;
    }

    protected getMongoConnection() {
        return getMongoConnection();
    }

    protected getAdminConnection() {
        return getAdminConnection();
    }
}