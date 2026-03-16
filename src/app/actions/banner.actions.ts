'use server'

import { BannerService } from "@/backend/services/banner.service"
import { BannerDTO } from "@/types/banner.type"

export async function getBanners(): Promise<BannerDTO[]> {
  return await BannerService.getAll();
}
