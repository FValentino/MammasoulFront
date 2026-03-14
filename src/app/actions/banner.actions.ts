'use server'

import { getDatabase } from "@/lib/data-source";
import { Banner } from "@/backend/entities/Banner";

export interface BannerDTO {
  id: number;
  imageUrl: string;
  linkUrl: string | null;
  isActive: boolean;
  order: number;
  device: string;
}

export async function getBanners(device?: string): Promise<BannerDTO[]> {
  const dataSource = await getDatabase();
  const bannerRepo = dataSource.getRepository(Banner);

  const where = device ? { isActive: true, device } : { isActive: true };

  const banners = await bannerRepo.find({
    where,
    order: { order: "ASC" },
  });

  return banners.map((banner) => ({
    id: banner.id,
    imageUrl: banner.imageUrl,
    linkUrl: banner.linkUrl ?? null,
    isActive: banner.isActive ?? true,
    order: Number(banner.order) || 0,
    device: banner.device ?? "desktop",
  }));
}
