import * as TeleSignSDK from 'telesignsdk';
import { config } from './config';

const rest_endpoint = 'https://rest-api.telesign.com';
const timeout = 10 * 1000; // 10 secs

const client = new TeleSignSDK(
    config.app.telesignCustomerId,
    config.app.telesignApiKey,
    rest_endpoint,
    timeout, // optional
    // userAgent
);

export function sendSMS(to: string, message: string) {
    console.info(`Sending SMS to [${to}] [${message}]`);
    return new Promise((resolve, reject) => {
        client.sms.message((err: any) => {
            if (err) {
                console.info(`Failed to send SMS to [${to}]`);
                reject(err);
            } else {
                console.info(`Sent SMS to [${to}]`);
                resolve();
            }
        }, to, message, 'ARN');
    });
}
