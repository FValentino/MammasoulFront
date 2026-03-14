import { Banner } from "@/backend/entities/Banner";
import { BannerDTO } from "@/types/banner.type";

export const mapBannerToDTO = (banner: Banner): BannerDTO => {
  return {
    id: banner.id,
    imageUrl: banner.imageUrl,
    linkUrl: banner.linkUrl ?? null,
    isActive: banner.isActive ?? true,
    order: Number(banner.order) || 0,
    device: banner.device ?? "desktop",
  };
};

export const mapBannersToDTO = (banners: Banner[]): BannerDTO[] => {
  return banners.map(mapBannerToDTO);
};