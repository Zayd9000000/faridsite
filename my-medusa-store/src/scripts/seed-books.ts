import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedBookData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);

  logger.info("Seeding book data...");

  // Get default sales channel
  const defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    logger.error("Default Sales Channel not found. Please run the main seed script first.");
    return;
  }

  // Get shipping profile
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default"
  });
  
  if (!shippingProfiles.length) {
    logger.error("Default shipping profile not found. Please run the main seed script first.");
    return;
  }

  const shippingProfile = shippingProfiles[0];

  // Check if book categories already exist
  const existingCategories = await productModuleService.listProductCategories({
    name: ["Fiction", "Non-Fiction", "Science & Technology", "Literature & Poetry", "Business & Economics", "Art & Design"]
  });

  let categoryResult;
  if (existingCategories.length === 0) {
    logger.info("Creating book categories...");
    const { result } = await createProductCategoriesWorkflow(container).run({
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
    categoryResult = result;
  } else {
    logger.info("Book categories already exist, using existing categories.");
    categoryResult = existingCategories;
  }

  // Check if book products already exist
  const existingBooks = await productModuleService.listProducts({
    handle: ["great-gatsby", "1984-orwell", "sapiens", "educated", "lean-startup", "thinking-fast-slow", "alchemist", "ways-of-seeing"]
  });

  if (existingBooks.length > 0) {
    logger.info(`Found ${existingBooks.length} existing book products. Skipping product creation.`);
    logger.info("Book seeding completed.");
    return;
  }

  logger.info("Creating book products...");

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
                  amount: 2000,
                  currency_code: "gbp",
                },
                {
                  amount: 2500,
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
                  amount: 1200,
                  currency_code: "gbp",
                },
                {
                  amount: 1500,
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
                  amount: 800,
                  currency_code: "gbp",
                },
                {
                  amount: 1000,
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
                  amount: 2200,
                  currency_code: "gbp",
                },
                {
                  amount: 2800,
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
                  amount: 1400,
                  currency_code: "gbp",
                },
                {
                  amount: 1800,
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
                  amount: 900,
                  currency_code: "gbp",
                },
                {
                  amount: 1200,
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
                  amount: 2500,
                  currency_code: "gbp",
                },
                {
                  amount: 3000,
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
                  amount: 1600,
                  currency_code: "gbp",
                },
                {
                  amount: 2000,
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
                  amount: 1200,
                  currency_code: "gbp",
                },
                {
                  amount: 1500,
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
                  amount: 1800,
                  currency_code: "gbp",
                },
                {
                  amount: 2200,
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
                  amount: 2200,
                  currency_code: "gbp",
                },
                {
                  amount: 2700,
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
                  amount: 1400,
                  currency_code: "gbp",
                },
                {
                  amount: 1700,
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
                  amount: 1000,
                  currency_code: "gbp",
                },
                {
                  amount: 1300,
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
                  amount: 2400,
                  currency_code: "gbp",
                },
                {
                  amount: 2900,
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
                  amount: 1500,
                  currency_code: "gbp",
                },
                {
                  amount: 1900,
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
                  amount: 1100,
                  currency_code: "gbp",
                },
                {
                  amount: 1400,
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
                  amount: 2600,
                  currency_code: "gbp",
                },
                {
                  amount: 3200,
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
                  amount: 1700,
                  currency_code: "gbp",
                },
                {
                  amount: 2100,
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
                  amount: 1300,
                  currency_code: "gbp",
                },
                {
                  amount: 1600,
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
                  amount: 1800,
                  currency_code: "gbp",
                },
                {
                  amount: 2200,
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
                  amount: 1000,
                  currency_code: "gbp",
                },
                {
                  amount: 1300,
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
                  amount: 700,
                  currency_code: "gbp",
                },
                {
                  amount: 900,
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
                  amount: 1200,
                  currency_code: "gbp",
                },
                {
                  amount: 1500,
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
                  amount: 800,
                  currency_code: "gbp",
                },
                {
                  amount: 1000,
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

  logger.info("Finished seeding book products.");
  logger.info("Book seeding completed successfully!");
}