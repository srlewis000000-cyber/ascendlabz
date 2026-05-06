import React from "react";
import { Product } from "../types";

interface Props { product: Product; }

export const ProductSchema: React.FC<Props> = ({ product }) => {
  if (!product) return null;

  const lowestPrice = Math.min(...product.dosages.map(d => d.prices[1]));
  const url = typeof window !== "undefined"
    ? window.location.origin + "/" + product.id
    : "https://www.ascendlabz.org/" + product.id;

  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "sku": product.id,
    "description": product.description || (product.name + " research peptide — third-party lab verified, 99%+ purity. For laboratory research use only."),
    "image": ["https://www.ascendlabz.org/products/" + product.id + ".png"],
    "brand": { "@type": "Brand", "name": "Ascend Labz" },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "USD",
      "price": lowestPrice.toFixed(2),
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@type": "Organization", "name": "Ascend Labz" }
    }
  };

  if (product.reviewCount && product.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": (product.rating ?? 4.8).toFixed(1),
      "reviewCount": product.reviewCount
    };
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
