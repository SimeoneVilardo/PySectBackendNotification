import {Controller} from "@tsed/di";
import {Req, Res} from "@tsed/common";
import {Get} from "@tsed/schema";

@Controller("/notification")
export class NotificationController {
  @Get("/health")
  getHealth() {
    return {"status": "OK"};
  }

  @Get("/challenge-submission-update")
  async getChallengeSubmissionUpdate(@Req() req: Req, @Res() res: Res) {
    try {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      /*
      const subscriber = await queueHelper.subscribe(req.user, (message) => {
        try {
          res.write(message);
        }
        catch (e) {
          console.error(e);
        }
      });
      */

      /*
      req.on('close', async function () {
        try {
          await queueHelper.unsubscribe(subscriber);
        }
        catch (e) {
          console.error(e);
        }
      });
      */
    }
    catch (e) {
      console.error(e);
    }
  }
}
