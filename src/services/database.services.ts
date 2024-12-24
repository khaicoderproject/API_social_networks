import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import User from '~/models/schemas/user.schema';

dotenv.config();

class database {
  private client: MongoClient;
  private db: Db;

  constructor() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khai.b3ors.mongodb.net/?retryWrites=true&w=majority&appName=Khai`;
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.db = this.client.db(process.env.DB_NAMEDB);  // Lấy tên DB từ biến môi trường
  }

  // Hàm trả về collection người dùng
  get user():Collection<User>{
    return this.db.collection("user");
  }

  // Hàm để kết nối và kiểm tra kết nối đến MongoDB
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      await this.db.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  // Hàm để đóng kết nối MongoDB
  async disconnect(): Promise<void> {
    await this.client.close();
  }
}
const DatabaseService= new database();
export default DatabaseService;
