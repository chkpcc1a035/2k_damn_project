import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Define a type for your product data structure to ensure type safety
type ProductData = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_description: string;
  product_tag: string | null;
  product_features: string[];
  product_price: number;
  product_quantity: number;
  product_createdAt: string;
};

export async function main() {
  const data: ProductData[] = [
    {
      product_id: "2001",
      product_image: "https://i.imgur.com/ZL52Q2D.png",
      product_name: "Audi A4",
      product_description: "Luxury Sedan with Quattro",
      product_tag: "New",
      product_features: [
        "5 passengers",
        "200 km/h top speed",
        "Quattro all-wheel drive",
      ],
      product_price: 25000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T09:15:00Z",
    },
    {
      product_id: "2002",
      product_image:
        "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png",
      product_name: "BMW X5",
      product_description: "Premium SUV with xDrive",
      product_tag: "Hot",
      product_features: [
        "5 passengers",
        "250 km/h top speed",
        "xDrive all-wheel drive",
        "Panoramic sunroof",
      ],
      product_price: 35000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T09:30:00Z",
    },
    {
      product_id: "2003",
      product_image:
        "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
      product_name: "Mercedes-Benz C-Class",
      product_description: "Elegant Sedan with AMG Package",
      product_tag: null,
      product_features: [
        "5 passengers",
        "230 km/h top speed",
        "AMG performance package",
        "Leather interior",
      ],
      product_price: 30000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T09:45:00Z",
    },
    {
      product_id: "2004",
      product_image:
        "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grT37G9MpVr6WVAmsOCLQK_A5hfFf4goEVqIvxKpBgMQASfEuABCcnA5gEmbcJRKwH8ZnsmBkYWCuAjEgGEBDUMCASCLO7uIY4evoEAwDGbomn2QAAAA?wid=850",
      product_name: "Lexus RX",
      product_description: "Luxurious SUV with Hybrid Technology",
      product_tag: null,
      product_features: [
        "5 passengers",
        "220 km/h top speed",
        "Hybrid technology",
        "Premium audio system",
        "Heated seats",
      ],
      product_price: 32000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T10:00:00Z",
    },
    {
      product_id: "2005",
      product_image:
        "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grj5eHtccF31_KMRG3N0rmlvLsX25VzsAK1MUkCSSYNwAJvmlAguMxA5gEmQcSZGgC8ZksmRkYWCuAjEgGEBDUMCASCLO7uIY4evoEAwBqwxYY2QAAAA?wid=850",
      product_name: "Toyota Camry",
      product_description: "Reliable Sedan with Hybrid Option",
      product_tag: null,
      product_features: [
        "5 passengers",
        "200 km/h top speed",
        "Hybrid option",
        "Toyota Safety Sense",
      ],
      product_price: 28000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T10:15:00Z",
    },
    {
      product_id: "2006",
      product_image:
        "https://bloximages.newyork1.vip.townnews.com/richmond.com/content/tncms/assets/v3/classifieds/5/3f/53f6d8a1-c912-5f81-bec3-3255e8e37ec3/5e632ca3c2608.image.png",
      product_name: "Ford Mustang",
      product_description: "Iconic Muscle Car with V8 Engine",
      product_tag: null,
      product_features: [
        "4 passengers",
        "280 km/h top speed",
        "V8 engine",
        "Convertible option",
      ],
      product_price: 40000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T10:30:00Z",
    },
    {
      product_id: "2007",
      product_image:
        "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
      product_name: "Chevrolet Tahoe",
      product_description: "Spacious SUV with Tow Package",
      product_tag: null,
      product_features: [
        "8 passengers",
        "210 km/h top speed",
        "Tow package",
        "Infotainment system",
      ],
      product_price: 38000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T10:45:00Z",
    },
    {
      product_id: "2008",
      product_image:
        "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/eqb-suv/all-vehicles/2022-EQB-AMGLINE-SUV-AVP-DR.png",
      product_name: "Nissan Altima",
      product_description: "Efficient Sedan with Intelligent Mobility",
      product_tag: null,
      product_features: [
        "5 passengers",
        "190 km/h top speed",
        "Intelligent Mobility features",
        "Apple CarPlay",
      ],
      product_price: 26000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T11:00:00Z",
    },
    {
      product_id: "2009",
      product_image:
        "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
      product_name: "Honda CR-V",
      product_description: "Versatile SUV with Honda Sensing",
      product_tag: null,
      product_features: [
        "5 passengers",
        "200 km/h top speed",
        "Honda Sensing suite",
        "All-wheel drive",
      ],
      product_price: 30000,
      product_quantity: 0,
      product_createdAt: "2024-04-20T11:15:00Z",
    },
    {
      product_id: "2010",
      product_image:
        "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg",
      product_name: "Subaru Outback",
      product_description: "Capable Crossover with Symmetrical All-Wheel Drive",
      product_tag: null,
      product_features: [
        "5 passengers",
        "210 km/h top speed",
        "Symmetrical all-wheel drive",
        "X-Mode traction control",
      ],
      product_price: 32000,
      product_quantity: 100,
      product_createdAt: "2024-04-20T11:30:00Z",
    },
  ];
  const result = await prisma.product.createMany({
    data: data.map((item) => ({
      id: item.product_id,
      image: item.product_image,
      name: item.product_name,
      description: item.product_description,
      features: item.product_features.join(", "), // Join array into a single string
      price: item.product_price,
      quantity: item.product_quantity,
      createdAt: new Date(item.product_createdAt),
    })),
  });

  console.log(`Inserted ${result.count} products.`);
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
