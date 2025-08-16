import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import { createAdminUserWorkflow } from "@medusajs/medusa/core-flows";

export default async function createAdmin({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const userModuleService = container.resolve(Modules.USER);
  const authModuleService = container.resolve(Modules.AUTH);

  const email = "zaydmcajee@gmail.com";
  const password = "xodious22";

  logger.info("Setting up admin user with authentication...");

  try {
    // Check if admin user already exists
    const existingUsers = await userModuleService.listUsers({
      email: email
    });

    let user;
    if (existingUsers.length > 0) {
      user = existingUsers[0];
      logger.info("Admin user already exists, updating authentication...");
    } else {
      // Create new admin user using the workflow
      const { result } = await createAdminUserWorkflow(container).run({
        input: {
          userData: {
            email: email,
            first_name: "Admin",
            last_name: "User"
          }
        }
      });
      user = result;
      logger.info("Admin user created successfully");
    }

    // Set up authentication for the user
    try {
      // Check if auth identity already exists
      const existingIdentities = await authModuleService.listAuthIdentities({
        app_metadata: {
          user_id: user.id
        }
      });

      if (existingIdentities.length > 0) {
        // Delete existing auth identity to recreate it properly
        logger.info("Removing existing auth identity to recreate it...");
        await authModuleService.deleteAuthIdentities(existingIdentities[0].id);
      }

      // Create authentication identity with password in the correct place
      const authIdentity = await authModuleService.createAuthIdentities({
        provider_identities: [
          {
            provider: "emailpass",
            entity_id: email,
            provider_metadata: {
              password: password  // PASSWORD GOES IN provider_metadata, NOT user_metadata!
            }
          }
        ],
        app_metadata: {
          user_id: user.id
        }
      });
      
      logger.info("Authentication identity created successfully!");
      logger.info(`Auth ID: ${authIdentity.id}`);
      
    } catch (authError) {
      logger.error("Failed to set up authentication:", authError);
      throw authError;
    }

    logger.info("\n========================================");
    logger.info("Admin credentials:");
    logger.info(`Email: ${email}`);
    logger.info(`Password: ${password}`);
    logger.info("========================================\n");

  } catch (error) {
    logger.error("Failed to set up admin user:", error);
  }
} 