import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banners')
export class Banner {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({name: "image_url", })
	imageUrl!: string;

	@Column({ name: "link_url", nullable: true })
	linkUrl!: string; 

	@Column({  name: "is_active", default: true })
	isActive!: boolean;

	@Column({ default: 0 })
	order!: number;

	@Column({ default: "desktop", nullable: true })
	device!: string;
}

