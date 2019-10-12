import { MessageQueue } from './models/MessageQueue.model';
import { sendSMS } from './sendSMS';

const THIRTY_SECONDS = 1000 * 30;

export async function startMessageQueueHandler() {
    const messages = await MessageQueue.find({ sent: false });
    const filteredMessages = messages.filter((m) => m.sendAt < new Date()); // TODO: filter in query

    await Promise.all(
        filteredMessages.map(async (message) => {
            await sendSMS(message.toPhone, message.body);
            message.sent = true;
            await message.save();
        }),
    );

    setTimeout(startMessageQueueHandler, THIRTY_SECONDS);
}
