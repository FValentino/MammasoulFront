import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "@/backend/entities/User"
import { Category } from "@/backend/entities/Category"
import { Product } from "@/backend/entities/Product"
import { ProductImage } from "@/backend/entities/ProductImage"
import { Purchase } from "@/backend/entities/Purchase"
import { PurchaseDetail } from "@/backend/entities/PurchaseDetail"
import { Visitor } from "@/backend/entities/Visitor"
import { Banner } from "@/backend/entities/Banner"

const globalForDb = global as unknown as { 
  AppDataSource: DataSource | undefined 
};

export const AppDataSource = globalForDb.AppDataSource ?? new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false, 
  logging: process.env.NODE_ENV === "development",
  entities: [
    User, 
    Category, 
    Product, 
    ProductImage, 
    Purchase, 
    PurchaseDetail, 
    Visitor,
    Banner
  ],
  migrations: ["src/migrations/*.ts"],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})


if (process.env.NODE_ENV !== "production") globalForDb.AppDataSource = AppDataSource;

export const getDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("💾 Database initialized");
    } catch (error) {
      console.error("❌ Error during Database initialization:", error);
      throw error;
    }
  }
  return AppDataSource;
};