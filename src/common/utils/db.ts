import mongoose from 'mongoose';
import constant from '../constant';

export default async function connectDB() {
  try {
    const mongoURL: string = process.env.NEXT_PUBLIC_MONGODB_URI!;
    const connect = await mongoose.connect(mongoURL);
    if (connect) console.log('Connected to MongoDB');
    else console.error('Error while connect', connect);
  } catch (error) {
    console.error('Error while connect', error);
    setTimeout(connectDB, constant.timeOutDB);
  }
}
