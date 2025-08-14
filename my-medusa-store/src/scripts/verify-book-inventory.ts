import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

export default async function verifyBookInventory({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Verifying book inventory levels...");

  // Get all inventory levels with their items
  const { data: inventoryLevels } = await query.graph({
    entity: "inventory_level",
    fields: [
      "id",
      "stocked_quantity",
      "location_id",
      "inventory_item.id",
      "inventory_item.sku",
    ],
  });

  if (!inventoryLevels || inventoryLevels.length === 0) {
    logger.error("No inventory levels found.");
    return;
  }

  logger.info(`Found ${inventoryLevels.length} inventory levels total`);

  // Filter for book inventory items
  const bookSkuPatterns = [
    "GATSBY-", "1984-", "SAPIENS-", "EDUCATED-", 
    "LEAN-", "THINK-", "ALCHEMIST-", "WAYS-"
  ];

  const bookInventoryLevels = inventoryLevels.filter(level => 
    level.inventory_item?.sku && bookSkuPatterns.some(pattern => 
      level.inventory_item.sku.includes(pattern)
    )
  );

  logger.info(`Found ${bookInventoryLevels.length} book inventory levels`);

  if (bookInventoryLevels.length === 0) {
    logger.error("No book inventory levels found.");
    return;
  }

  // Display inventory levels
  logger.info("Book inventory levels:");
  for (const level of bookInventoryLevels) {
    const sku = level.inventory_item?.sku || "Unknown SKU";
    const quantity = level.stocked_quantity;
    logger.info(`  - ${sku}: ${quantity} units`);
    
    if (quantity !== 1000) {
      logger.warn(`    WARNING: Expected 1000 units but found ${quantity}`);
    }
  }

  // Summary
  const correctLevels = bookInventoryLevels.filter(level => level.stocked_quantity === 1000);
  const incorrectLevels = bookInventoryLevels.filter(level => level.stocked_quantity !== 1000);

  logger.info(`\nSummary:`);
  logger.info(`  - Total book variants: ${bookInventoryLevels.length}`);
  logger.info(`  - Correctly set to 1000 units: ${correctLevels.length}`);
  logger.info(`  - Incorrectly set: ${incorrectLevels.length}`);

  if (incorrectLevels.length === 0) {
    logger.info("✅ All book inventory levels are correctly set to 1000 units!");
  } else {
    logger.warn("⚠️  Some inventory levels are not set to 1000 units.");
  }

  logger.info("Book inventory verification completed.");
}