/** pages/api/uploadthing.ts */
import { createNextPageApiHandler } from "uploadthing/server";
import { uploadRouter } from "~/server/uploadthing";
 
const handler = createNextPageApiHandler({
  router: uploadRouter,
});
 
export default handler;