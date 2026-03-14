import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banners')
export class Banner {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({name: "image_url", })
	imageUrl!: string;

	@Column({ nullable: true })
	linkUrl!: string; 

	@Column({ default: true })
	isActive!: boolean;

	@Column({ default: 0 })
	order!: number;

	@Column({ default: "desktop", nullable: true })
	device!: string;
}

