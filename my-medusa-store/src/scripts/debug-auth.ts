import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

export default async function debugAuth({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const userModuleService = container.resolve(Modules.USER);
  const authModuleService = container.resolve(Modules.AUTH);

  const email = "zaydmcajee@gmail.com";
  
  logger.info("=== DEBUGGING AUTH SETUP ===");
  
  try {
    // Check if user exists
    const users = await userModuleService.listUsers({
      email: email
    });
    
    if (users.length > 0) {
      logger.info(`User found: ${users[0].id} - ${users[0].email}`);
      
      // Check auth identities
      try {
        const identities = await authModuleService.listAuthIdentities({
          app_metadata: {
            user_id: users[0].id
          }
        });
        
        logger.info(`Found ${identities.length} auth identities for user`);
        
        for (const identity of identities) {
          logger.info(`Auth Identity ID: ${identity.id}`);
          logger.info(`Provider Identities: ${JSON.stringify(identity.provider_identities?.map(p => ({
            provider: p.provider,
            entity_id: p.entity_id,
            has_password: !!p.provider_metadata?.password
          })), null, 2)}`);
          logger.info(`App Metadata: ${JSON.stringify(identity.app_metadata, null, 2)}`);
        }
        
        // Also try to find by email directly
        const emailIdentities = await authModuleService.listAuthIdentities({
          provider_identities: {
            provider: "emailpass",
            entity_id: email
          }
        });
        
        logger.info(`\nFound ${emailIdentities.length} auth identities by email`);
        for (const identity of emailIdentities) {
          logger.info(`Email Auth Identity: ${identity.id}`);
          logger.info(`Has password hash: ${!!identity.provider_identities?.[0]?.provider_metadata?.password}`);
        }
        
      } catch (error) {
        logger.error("Error checking auth identities:", error.message);
      }
    } else {
      logger.warn(`No user found with email: ${email}`);
    }
    
    // List ALL auth identities to see what's there
    const allIdentities = await authModuleService.listAuthIdentities({});
    logger.info(`\n=== ALL AUTH IDENTITIES (${allIdentities.length} total) ===`);
    for (const identity of allIdentities) {
      logger.info(`ID: ${identity.id}`);
      logger.info(`Providers: ${identity.provider_identities?.map(p => `${p.provider}:${p.entity_id}`).join(", ")}`);
      logger.info(`App Metadata: ${JSON.stringify(identity.app_metadata, null, 2)}`);
      logger.info("---");
    }
    
  } catch (error) {
    logger.error("Debug error:", error);
  }
}