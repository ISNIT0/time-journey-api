import * as asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { Story } from 'src/models/Story.model';
import { MessageQueue } from 'src/models/MessageQueue.model';
import { StoryMessage } from 'src/models/StoryMessage.model';
const router = Router();

router.get('/',
    asyncHandler(async (req, res, next) => {
        const stories = await Story.find();
        res.render('home', {
            stories,
        });
    }),
);

router.post('/subscribe/:storyId',
    asyncHandler(async (req, res, next) => {
        const { phoneNumber } = req.body;
        const story = await Story.findOneOrFail(req.params.storyId, { relations: ['messages'] });

        await Promise.all(
            story.messages.map((message) => {
                const mqMessage = new MessageQueue();

                mqMessage.toPhone = phoneNumber;
                mqMessage.body = message.body;
                mqMessage.sent = false;
                mqMessage.sendAt = message.absoluteDate;

                return mqMessage.save();
            }),
        );

        res.send({ ok: true });
    }),
);

router.get('/story/:storyId',
    asyncHandler(async (req, res, next) => {
        const story = await Story.findOneOrFail(req.params.storyId, { relations: ['messages'] });
        res.send(story);
    }),
);

router.post('/story/:storyId',
    asyncHandler(async (req, res, next) => {
        let story: Story;
        if (req.params.storyId !== 'new') {
            await Story.findOneOrFail(req.params.storyId, { relations: ['messages'] });
        } else {
            story = new Story();
        }

        Object.assign(story, req.body.story);

        const savedStory = await story.save();

        await Promise.all(
            req.body.messages.map(async (m: any) => {
                let message: any;
                if (m.id) {
                    message = await StoryMessage.findOne(m.id);
                } else {
                    message = new StoryMessage();
                }
                message.absoluteDate = new Date(m.absoluteDate);
                message.body = m.body;
                message.story = savedStory;
                await message.save();
            }),
        );

        res.send(savedStory);
    }),
);

export {
    router,
};
