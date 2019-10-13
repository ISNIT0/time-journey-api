import { config } from './config';
import { SMSimple } from 'smsimple';

const smSimple = new SMSimple({
    telesign: {
        customerId: config.app.telesignCustomerId,
        apiKey: config.app.telesignApiKey,
    },
});

export function sendSMS(to: string, message: string) {
    console.info(`Sending SMS to [${to}] [${message}]`);
    return smSimple.telesign(to, message);
}
