DROP INDEX `unique_idx` ON `likes`;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `unique_idx` UNIQUE(`author_id`,`yearbook_id`);