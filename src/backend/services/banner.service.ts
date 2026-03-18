import { BannerRepository } from "@/backend/repositories/banner.repository";
import { BannerDTO } from "@/types/banner.type";

export class BannerService {
  static async getAll(): Promise<BannerDTO[]> {
    const banners = await BannerRepository.findActive();
    return banners ?? [];
  }
}
