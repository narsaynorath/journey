import { User } from "./User";
import { createSchema } from "@keystone-next/keystone/schema";

export const lists = createSchema({
  User,
});
