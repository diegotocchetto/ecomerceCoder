import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename= fileURLToPath(import.meta.url);
import { connect } from "mongoose";

export async function connectMongo() {
    try {
      await connect(
        "mongodb+srv://diegotocchetto:Gd57QCtu8yQIW4Sh@backend.jwxstie.mongodb.net/backend?retryWrites=true&w=majority"
      );
      console.log("pluged to mongoCloud!");
    } catch (e) {
      console.log(e);
      throw "can not connect to the db";
    }
  }
  

export const __dirname=dirname(__filename);

















export default __dirname;
