import { getDatabase } from "@/lib/data-source";
import { Banner } from "@/backend/entities/Banner";
import { BannerDTO } from "@/types/banner.type";
import { mapBannerToDTO } from "../mappers/banner.mapper";

export class BannerRepository {
  private static async getRepo() {
    const db = await getDatabase();
    return db.getRepository(Banner);
  }

  static async findActive(): Promise<BannerDTO[]> {
    const repo = await this.getRepo();

    const banners = await repo.find({
      where: {isActive: true},
      order: { order: "ASC" },
    });

    return banners.map((banner) => mapBannerToDTO(banner));
  }
}
