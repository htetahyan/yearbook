CREATE TABLE `likes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`author_id` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`yearbook_id` bigint NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `like`;--> statement-breakpoint
CREATE INDEX `name_idx` ON `likes` (`author_id`);--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;