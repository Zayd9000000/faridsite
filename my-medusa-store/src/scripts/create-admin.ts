import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

export default async function createAdmin({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const userModuleService = container.resolve(Modules.USER);

  logger.info("Creating admin user...");

  try {
    // Check if admin user already exists
    const existingUsers = await userModuleService.listUsers({
      email: "zaydmcajee@gmail.com"
    });

    if (existingUsers.length > 0) {
      logger.info("Admin user already exists");
      return;
    }

    // Create new admin user
    const adminUser = await userModuleService.createUsers({
      email: "zaydmcajee@gmail.com",
      first_name: "Admin",
      last_name: "User"
    });

    logger.info("Admin user created successfully");
    logger.info("You can now login with:");
    logger.info("Email: zaydmcajee@gmail.com");
    logger.info("Password: (you'll need to set this via the admin interface)");

  } catch (error) {
    logger.error("Failed to create admin user:", error);
  }
} 