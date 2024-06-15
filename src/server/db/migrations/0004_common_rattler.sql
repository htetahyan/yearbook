ALTER TABLE `comment` MODIFY COLUMN `created_at` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `yearbook` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());