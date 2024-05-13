import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

export const storage = createStorage({
  driver: memoryDriver(),
});
