import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function updateBookInventory({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);

  logger.info("Updating book inventory levels to 1000...");

  // Get the stock location (European Warehouse)
  const stockLocations = await stockLocationModuleService.listStockLocations({
    name: "European Warehouse"
  });

  if (!stockLocations.length) {
    logger.error("European Warehouse stock location not found. Please run the main seed script first.");
    return;
  }

  const stockLocation = stockLocations[0];

  // Get all inventory items
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  });

  if (!inventoryItems || inventoryItems.length === 0) {
    logger.error("No inventory items found. Please run the seed script first.");
    return;
  }

  logger.info(`Found ${inventoryItems.length} inventory items total`);

  // Filter inventory items for books by SKU patterns
  const bookSkuPatterns = [
    "GATSBY-", "1984-", "SAPIENS-", "EDUCATED-", 
    "LEAN-", "THINK-", "ALCHEMIST-", "WAYS-"
  ];

  const bookInventoryItems = inventoryItems.filter(item => 
    item.sku && bookSkuPatterns.some(pattern => item.sku!.includes(pattern))
  );

  logger.info(`Found ${bookInventoryItems.length} book-related inventory items`);

  if (bookInventoryItems.length === 0) {
    logger.error("No book inventory items found. Please check if book products have been created properly.");
    return;
  }

  // Create inventory levels for book items
  const inventoryLevels = bookInventoryItems.map(item => ({
    inventory_item_id: item.id,
    location_id: stockLocation.id,
    stocked_quantity: 1000
  }));

  logger.info(`Creating inventory levels for ${inventoryLevels.length} items...`);

  // Create inventory levels using the workflow
  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels
    },
  });

  logger.info("Successfully created all book inventory levels with 1000 units!");
  logger.info("Book inventory update completed.");
}