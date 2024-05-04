CREATE TABLE `comment` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`author_id` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`yearbook_id` bigint NOT NULL,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`url` varchar(256) NOT NULL,
	`size` bigint NOT NULL,
	`yearbook_id` bigint NOT NULL,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `like` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`author_id` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`yearbook_id` bigint NOT NULL,
	CONSTRAINT `like_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`password` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `yearbook` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`caption` varchar(256) NOT NULL,
	`student_id` varchar(256) NOT NULL,
	`author_id` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `yearbook_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `yearbooksToComment` (
	`yearbook_id` bigint NOT NULL,
	`comment_id` bigint NOT NULL,
	CONSTRAINT `yearbooksToComment_yearbook_id_comment_id_pk` PRIMARY KEY(`yearbook_id`,`comment_id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `comment` (`author_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `like` (`author_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `user` (`name`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `yearbook` (`author_id`);--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_yearbook_id_yearbook_id_fk` FOREIGN KEY (`yearbook_id`) REFERENCES `yearbook`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_yearbook_id_yearbook_id_fk` FOREIGN KEY (`yearbook_id`) REFERENCES `yearbook`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `like` ADD CONSTRAINT `like_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `like` ADD CONSTRAINT `like_yearbook_id_yearbook_id_fk` FOREIGN KEY (`yearbook_id`) REFERENCES `yearbook`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `yearbook` ADD CONSTRAINT `yearbook_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `yearbooksToComment` ADD CONSTRAINT `yearbooksToComment_yearbook_id_yearbook_id_fk` FOREIGN KEY (`yearbook_id`) REFERENCES `yearbook`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `yearbooksToComment` ADD CONSTRAINT `yearbooksToComment_comment_id_comment_id_fk` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE no action ON UPDATE no action;