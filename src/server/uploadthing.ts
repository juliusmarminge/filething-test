import { createFilething, type FileRouter } from "uploadthing/server";
import { getServerAuthSession } from "./auth";

const f = createFilething<"pages">();

export const uploadRouter = {
  withMdwr: f
    .fileTypes(["image"])
    .maxSize("16MB")
    .middleware(async (req, res) => {
      const sesh = await getServerAuthSession({ req, res });

      return {
        user: sesh?.user,
        otherProperty: "hello" as const,
      };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("uploaded with the following metadata:", metadata);

      metadata.user;
      //        ^?

      console.log(metadata.user?.name, "successfully uploaded file:", file);
      file;
      // ^?
    }),

  withoutMdwr: f
    .middleware(() => {
      return { testMetadata: "lol" };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("uploaded with the following metadata:", metadata);
      metadata;
      // ^?

      console.log("files successfully uploaded:", file);
      file;
      // ^?
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
