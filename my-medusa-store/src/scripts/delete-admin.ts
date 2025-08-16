import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

export default async function deleteAdmin({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const userModuleService = container.resolve(Modules.USER);
  const authModuleService = container.resolve(Modules.AUTH);

  const email = "zaydmcajee@gmail.com";
  
  logger.info("Deleting admin user and auth identities...");
  
  try {
    // Find and delete auth identities
    const authIdentities = await authModuleService.listAuthIdentities({});
    for (const identity of authIdentities) {
      logger.info(`Deleting auth identity: ${identity.id}`);
      await authModuleService.deleteAuthIdentities(identity.id);
    }
    
    // Find and delete user
    const users = await userModuleService.listUsers({
      email: email
    });
    
    if (users.length > 0) {
      logger.info(`Deleting user: ${users[0].id}`);
      await userModuleService.deleteUsers(users[0].id);
      logger.info("User deleted successfully");
    }
    
    logger.info("Cleanup complete!");
    
  } catch (error) {
    logger.error("Delete error:", error);
  }
}