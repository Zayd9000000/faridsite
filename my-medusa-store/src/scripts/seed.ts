import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          {
            currency_code: "gbp",
            is_default: true,
          },
          {
            currency_code: "eur",
          },
          {
            currency_code: "usd",
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Seeding region data...");
  const regionModuleService = container.resolve(Modules.REGION);
  let region;
  
  // Check if Europe region already exists
  const existingRegions = await regionModuleService.listRegions({
    name: "Europe"
  });
  
  if (existingRegions.length > 0) {
    region = existingRegions[0];
    logger.info("Europe region already exists, using existing region.");
  } else {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Europe",
            currency_code: "gbp",
            countries,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult[0];
    logger.info("Created new Europe region.");
  }
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system"
    })),
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
  let stockLocation;
  
  // Check if European Warehouse already exists
  const existingStockLocations = await stockLocationModuleService.listStockLocations({
    name: "European Warehouse"
  });
  
  if (existingStockLocations.length > 0) {
    stockLocation = existingStockLocations[0];
    logger.info("European Warehouse already exists, using existing location.");
  } else {
    const { result: stockLocationResult } = await createStockLocationsWorkflow(
      container
    ).run({
      input: {
        locations: [
          {
            name: "European Warehouse",
            address: {
              city: "Copenhagen",
              country_code: "DK",
              address_1: "",
            },
          },
        ],
      },
    });
    stockLocation = stockLocationResult[0];
    logger.info("Created new European Warehouse.");
  }

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default"
  })
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
    await createShippingProfilesWorkflow(container).run({
      input: {
        data: [
          {
            name: "Default Shipping Profile",
            type: "default",
          },
        ],
      },
    });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "European Warehouse delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          {
            country_code: "gb",
            type: "country",
          },
          {
            country_code: "de",
            type: "country",
          },
          {
            country_code: "dk",
            type: "country",
          },
          {
            country_code: "se",
            type: "country",
          },
          {
            country_code: "fr",
            type: "country",
          },
          {
            country_code: "es",
            type: "country",
          },
          {
            country_code: "it",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "gbp",
            amount: 8,
          },
          {
            region_id: region.id,
            amount: 8,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "gbp",
            amount: 8,
          },
          {
            region_id: region.id,
            amount: 8,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
    container
  ).run({
    input: {
      api_keys: [
        {
          title: "Webshop",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });
  const publishableApiKey = publishableApiKeyResult[0];

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Fiction",
          is_active: true,
        },
        {
          name: "Non-Fiction",
          is_active: true,
        },
        {
          name: "Science & Technology",
          is_active: true,
        },
        {
          name: "Literature & Poetry",
          is_active: true,
        },
        {
          name: "Business & Economics",
          is_active: true,
        },
        {
          name: "Art & Design",
          is_active: true,
        },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "The Great Gatsby",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Fiction")!.id,
          ],
          description:
            "F. Scott Fitzgerald's classic American novel set in the Jazz Age. A timeless story of love, wealth, and the American Dream.",
          handle: "great-gatsby",
          weight: 200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "GATSBY-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 20,
                  currency_code: "gbp",
                },
                {
                  amount: 25,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "GATSBY-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 12,
                  currency_code: "gbp",
                },
                {
                  amount: 15,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "GATSBY-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 8,
                  currency_code: "gbp",
                },
                {
                  amount: 10,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "1984",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Fiction")!.id,
          ],
          description:
            "George Orwell's dystopian masterpiece. A haunting vision of a totalitarian future that remains eerily relevant today.",
          handle: "1984-orwell",
          weight: 250,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "1984-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 22,
                  currency_code: "gbp",
                },
                {
                  amount: 28,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "1984-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 14,
                  currency_code: "gbp",
                },
                {
                  amount: 18,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "1984-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 9,
                  currency_code: "gbp",
                },
                {
                  amount: 12,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Sapiens: A Brief History of Humankind",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Non-Fiction")!.id,
          ],
          description:
            "Yuval Noah Harari's groundbreaking narrative of humanity's creation and evolution. A thought-provoking exploration of how we became who we are.",
          handle: "sapiens",
          weight: 350,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book", "Audiobook"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "SAPIENS-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 25,
                  currency_code: "gbp",
                },
                {
                  amount: 30,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "SAPIENS-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 16,
                  currency_code: "gbp",
                },
                {
                  amount: 20,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "SAPIENS-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 12,
                  currency_code: "gbp",
                },
                {
                  amount: 15,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Audiobook",
              sku: "SAPIENS-AB",
              options: {
                Format: "Audiobook",
              },
              prices: [
                {
                  amount: 18,
                  currency_code: "gbp",
                },
                {
                  amount: 22,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Educated: A Memoir",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Non-Fiction")!.id,
          ],
          description:
            "Tara Westover's unforgettable memoir about growing up in a survivalist family and her journey to education. A testament to the transformative power of learning.",
          handle: "educated",
          weight: 280,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "EDUCATED-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 22,
                  currency_code: "gbp",
                },
                {
                  amount: 27,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "EDUCATED-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 14,
                  currency_code: "gbp",
                },
                {
                  amount: 17,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "EDUCATED-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 10,
                  currency_code: "gbp",
                },
                {
                  amount: 13,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "The Lean Startup",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Business & Economics")!.id,
          ],
          description:
            "Eric Ries's revolutionary approach to business that's changing how companies are built and new products are launched. Essential reading for entrepreneurs.",
          handle: "lean-startup",
          weight: 300,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "LEAN-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 24,
                  currency_code: "gbp",
                },
                {
                  amount: 29,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "LEAN-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 15,
                  currency_code: "gbp",
                },
                {
                  amount: 19,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "LEAN-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 11,
                  currency_code: "gbp",
                },
                {
                  amount: 14,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Thinking, Fast and Slow",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Science & Technology")!.id,
          ],
          description:
            "Daniel Kahneman's groundbreaking tour of the mind. Explores the two systems that drive the way we think and make choices.",
          handle: "thinking-fast-slow",
          weight: 450,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "THINK-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 26,
                  currency_code: "gbp",
                },
                {
                  amount: 32,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "THINK-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 17,
                  currency_code: "gbp",
                },
                {
                  amount: 21,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "THINK-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 13,
                  currency_code: "gbp",
                },
                {
                  amount: 16,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "The Alchemist",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Literature & Poetry")!.id,
          ],
          description:
            "Paulo Coelho's enchanting novel about following your dreams. A magical story that has inspired millions of readers worldwide.",
          handle: "alchemist",
          weight: 180,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Hardcover", "Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Hardcover",
              sku: "ALCHEMIST-HC",
              options: {
                Format: "Hardcover",
              },
              prices: [
                {
                  amount: 18,
                  currency_code: "gbp",
                },
                {
                  amount: 22,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "Paperback",
              sku: "ALCHEMIST-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 10,
                  currency_code: "gbp",
                },
                {
                  amount: 13,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "ALCHEMIST-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 7,
                  currency_code: "gbp",
                },
                {
                  amount: 9,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Ways of Seeing",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Art & Design")!.id,
          ],
          description:
            "John Berger's classic examination of how we look at art and the hidden meanings in images. A revolutionary work that changed art criticism forever.",
          handle: "ways-of-seeing",
          weight: 220,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800",
            },
          ],
          options: [
            {
              title: "Format",
              values: ["Paperback", "E-book"],
            },
          ],
          variants: [
            {
              title: "Paperback",
              sku: "WAYS-PB",
              options: {
                Format: "Paperback",
              },
              prices: [
                {
                  amount: 12,
                  currency_code: "gbp",
                },
                {
                  amount: 15,
                  currency_code: "usd",
                },
              ],
            },
            {
              title: "E-book",
              sku: "WAYS-EB",
              options: {
                Format: "E-book",
              },
              prices: [
                {
                  amount: 8,
                  currency_code: "gbp",
                },
                {
                  amount: 10,
                  currency_code: "usd",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  logger.info("Finished seeding inventory levels data.");
}
