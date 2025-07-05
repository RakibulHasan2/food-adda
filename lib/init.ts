import { initializeDefaultData } from "./db";

(async () => {
  await initializeDefaultData();
  console.log('✅ Default data initialized.');
})();
