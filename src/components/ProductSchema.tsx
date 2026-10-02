import React from "react";
import { Product } from "../types";

const ORIGIN = "https://www.ascendlabz.org";

export const ProductSchema: React.FC<{ product: Product }> = ({ product }) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    description: product.description[0],
    image: [ORIGIN + product.image],
    brand: { "@type": "Brand", name: "AscendLabz" },
    offers: product.variants.map(v => ({
      "@type": "Offer",
      name: `${product.name} ${v.size}`,
      url: `${ORIGIN}/products/${product.id}`,
      priceCurrency: "USD",
      price: v.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "AscendLabz" },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
