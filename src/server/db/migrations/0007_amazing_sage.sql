ALTER TABLE `likes` ADD CONSTRAINT `likes_yearbook_id_yearbook_id_fk` FOREIGN KEY (`yearbook_id`) REFERENCES `yearbook`(`id`) ON DELETE no action ON UPDATE no action;