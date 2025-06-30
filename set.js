const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEpzSWpDeis0aHVaaUZSQWhYY3JaNjN2ai9jR0t4eXZWellUcjcxRU9Fdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWt0TU4yaFBrNktWd2lEOXJFUWUrWDNkUjdJbTNYWEw1eVNUR1BKemVBMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTzh0b20rdlIwNUJVS3RZSjBNZFdPRm9LaW4yV1FDbUViMWoxT2dTbzJZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpWGtWbERBMWd6cGlnSXVNSW03Z0tGWkd3aDJ4ZTROVHVLZ3poNmxEK2dvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9IY2tJTmNqWUVpMzJ6RE9IUU42YTAyVGNEa2p4QnJVVE5KL1IrL1g1M2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVmUnpuR3d0OEt0TTdkV2NkQVgrajkyZkpMY1FQeWJOdHVGZ2h3cEFpUm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ05BVGxobERYVXlIUGJPR0R0MlVCVmVVTEZtQmVUQUtkczJ5ZklvZ3VXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU1oL0k1T3hlNUMwL1kzdFlXTmIyMTkwZXkvU2E0RmpEOC9jRnlsMUVHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhhaktZOUlBQzU5RTl4U0tEbFdvd3hEZlJleGYyeWR1M0tEMlhuNURrays2ZkdKUksrSlNhVXdKcUVhR3QvYXhvcVljQUNRdnFKcWg3RG5RWExuaUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiJWaDlUVHdWWUx2c1AzeG9ucW96ejRCUHBLa0R0NjNITUtsZ0RLNEVHQ1QwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTMyNDY0NjUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkUyQjU0MDgxNzMwMzA3REZGNjhBMTU4MTczM0JCQ0EwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzMDU5ODJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTMyNDY0NjUzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAzOTQ0Qjk3REIxNjFFM0JGRjBCMzdFMjgxQzFBMTQ2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzMDU5ODV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkRONExHVEQ2IiwibWUiOnsiaWQiOiI1MDkzMjQ2NDY1Mzo0MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI4ODg0MjkyNjEyMjUzOjQxQGxpZCIsIm5hbWUiOiLwnZCL8J2QlPCdkILwnZCI8J2Qi/CdkIXwnZCE8J2QkSBNT1JOSU5HU1RBUiDwn6m44pqU77iPIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQaWEyd1VRNloyTHd3WVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ2eUpVdWRRRk02eTg1Mk52LzRJejdDeTRodnV3bzlhL202QURweHRYbUJBPSIsImFjY291bnRTaWduYXR1cmUiOiJobTZZK1U5bi9lVFJMMjc3N284N2phN3FsR0V1Y05NWDdpRjhTaXp5Y2JxWnRUTGF6cEpqdUdlZkhDQXkyRHpYNElNaWZSWmFBRzBWTFZCYy8vVGRBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWGxnYUV4Y1B6Mnc3Q29HTDQ0VDRBazZ6VFMxVy9FRlc5U2J5aHMvL245ZnZUVVIyb2NhbFZlNVVNaHVpcXNMRzA1YUVNY3Z4N1dJbnd6ZHFLZVZhQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzMjQ2NDY1Mzo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiOGlWTG5VQlRPc3ZPZGpiLytDTSt3c3VJYjdzS1BXdjV1Z0E2Y2JWNWdRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTEzMDU5NzQsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTE5MIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Lucifer md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " LUCIFER MORNINGSTAR",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCIFER MORNINGSTAR',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

