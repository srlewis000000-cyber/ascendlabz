// Store copy for the informational pages and policies. Rendered by
// components/InfoPages.tsx. Blocks are either paragraphs, headings, Q&A pairs
// or bullet lists so the pages can be edited here without touching JSX.

export const CONTACT = {
  email: "ascendlabz@gmail.com",
  phone: "(720) 781-9031",
  phoneHref: "tel:+17207819031",
  address: "775 W Lake St Unit 2404, Fort Collins, CO 80521, United States",
};

export type Block =
  | { p: string }
  | { h: string }
  | { q: string; a: string }
  | { ul: string[] };

export interface InfoPage {
  title: string;
  updated?: string;
  blocks: Block[];
}

export const PAGES: Record<string, InfoPage> = {
  "about-us-faq": {
    title: "About Us & FAQ",
    blocks: [
      { h: "About AscendLabz" },
      { p: "AscendLabz supplies research-grade peptides and compounds manufactured to exacting purity standards for laboratory and analytical use. Every batch is independently tested — see our full Quality & Testing process. We are based in Fort Collins, Colorado, and ship orders within 24 hours of purchase." },
      { p: "All products sold by AscendLabz are intended strictly for laboratory research use by qualified individuals 21 years of age or older. Nothing on this site is intended for human consumption, and no claims are made regarding therapeutic or medical use." },
      { h: "Frequently Asked Questions" },
      { q: "Are your products third-party tested?", a: "Yes. Every product batch is tested by an independent laboratory — see our Quality & Testing page for the full process and how to verify a COA." },
      { q: "How quickly do orders ship?", a: "Orders are typically processed and shipped within 24 hours. You will receive a tracking number by email once your order ships. Orders over $150 qualify for free shipping." },
      { q: "Do you offer any discounts?", a: "Buy 2, Get 1 Free is applied automatically at checkout — add any three vials to your cart and the lowest-priced one is free, no code needed." },
      { q: "How should peptides be stored?", a: "Lyophilized peptides should be stored in a cool, dry place, away from direct light, and refrigerated or frozen once reconstituted, per standard laboratory handling practices." },
      { q: "What if my order arrives damaged or incorrect?", a: "Contact us at ascendlabz@gmail.com within 7 days of delivery with photos of the item and packaging, and we will make it right." },
      { q: "Do you ship internationally?", a: "We ship to many international destinations. Customers are responsible for any customs duties, taxes, or import restrictions in their own country." },
      { q: "Who can purchase from AscendLabz?", a: "Our products are sold strictly for laboratory research use by individuals 21 years of age or older who are legally permitted to purchase and handle research chemicals in their jurisdiction. Products are not for human or veterinary use." },
      { q: "How can I reach you?", a: "Email ascendlabz@gmail.com or call (720) 781-9031. We typically respond within 1-2 business days." },
      { q: "How do I know which compound is right for my research?", a: "Each product page lists the research context and mechanism of action for that compound. If you're comparing multiple compounds for a specific study, email us at ascendlabz@gmail.com with your research goal and we're happy to point you to the relevant literature." },
    ],
  },

  "quality-testing": {
    title: "Quality & Testing",
    blocks: [
      { p: "Every compound we carry goes through the same verification pipeline before it's listed for sale. This page explains that process in plain terms." },
      { h: "Raw Material Verification" },
      { p: "Source materials are checked against supplier certificates before synthesis begins." },
      { h: "Synthesis & Manufacturing" },
      { p: "Peptides are synthesized to the target sequence under controlled lab conditions." },
      { h: "Purification" },
      { p: "Each batch is purified to remove synthesis byproducts and residual solvents." },
      { h: "HPLC/MS Testing" },
      { p: "Every batch is sent to Janoshik Analytical, an independent third-party testing laboratory, for testing via high-performance liquid chromatography and mass spectrometry (HPLC/MS). Results consistently confirm purity above 99%." },
      { h: "Certificate of Analysis" },
      { p: "A Certificate of Analysis (COA) is generated per batch and made available for each product. Each COA can be independently verified using the unique key printed on the report at janoshik.com/verify." },
      { h: "Storage & Handling" },
      { p: "Lyophilized product is packaged and stored to preserve stability prior to shipment. Once reconstituted, products should be refrigerated and used according to your lab's protocol." },
      { p: "All results reflect research-use material only. AscendLabz does not manufacture, prescribe, or represent any product as approved for human use. Products are not evaluated by the FDA." },
    ],
  },

  "research-use-policy": {
    title: "Research Use Policy",
    blocks: [
      { p: "AscendLabz sells research compounds exclusively for laboratory and in-vitro research use. This policy explains who may purchase, what \"research use only\" means, and what is prohibited." },
      { h: "Who Can Purchase" },
      { p: "Products are restricted to individuals who affirm they are 21 years of age or older and are purchasing in a professional, academic, or qualified-research capacity." },
      { h: "What \"Research Use Only\" Means" },
      { p: "Products are not drugs, dietary supplements, or cosmetics. They are not evaluated by the FDA and are not manufactured, tested, or labeled for human or veterinary consumption, injection, or any in-vivo application. Products should only be used within appropriate laboratory or research environments." },
      { h: "Prohibited Uses" },
      { p: "Purchasing products for personal human or animal use, resale as a consumer product, or any use inconsistent with laboratory research is prohibited and violates these terms. AscendLabz does not represent any product as a drug, treatment, cure, or therapy." },
      { h: "Your Responsibility" },
      { p: "By purchasing, you affirm you understand and agree to these terms and that you are responsible for complying with applicable laws and regulations in your jurisdiction. Use of any product outside a research setting is at your own risk and outside AscendLabz's intended use." },
    ],
  },
};

export const POLICIES: Record<string, InfoPage> = {
  "shipping-policy": {
    title: "Shipping Policy",
    blocks: [
      { h: "Order processing" },
      { p: "Orders are typically processed and shipped within 24 hours of purchase, excluding weekends and holidays. You will receive a confirmation email with tracking information once your order has shipped." },
      { h: "Shipping rates and delivery times" },
      { p: "Shipping options and costs are shown at checkout: Standard (5-7 business days), Express (2-3 business days) and Overnight. Standard shipping is free on orders over $150. Delivery times are estimates only and are not guaranteed by AscendLabz." },
      { h: "Eligibility" },
      { p: "All products are sold strictly for laboratory research use by individuals 21 years of age or older. By placing an order, you confirm that you meet this requirement and that you are purchasing for lawful research purposes only." },
      { h: "Lost, delayed, or damaged shipments" },
      { p: "AscendLabz is not responsible for delays caused by the shipping carrier, customs, or circumstances beyond our control. If your order arrives damaged or does not arrive, please contact us at ascendlabz@gmail.com so we can assist you." },
      { h: "International shipping" },
      { p: "If we ship to your country, you are responsible for any customs duties, taxes, or import fees charged by your country. Please check your local regulations regarding research chemicals before ordering, as it is your responsibility to ensure these products may be lawfully imported into your jurisdiction." },
    ],
  },

  "refund-policy": {
    title: "Refund Policy",
    blocks: [
      { p: "Because our products are laboratory research chemicals intended for research use only, we cannot accept returns once an order has shipped, except for items that arrive damaged, defective, or incorrect." },
      { h: "Damaged, defective, or incorrect items" },
      { p: "Please inspect your order when it arrives. If anything is damaged, defective, or not what you ordered, email ascendlabz@gmail.com within 7 days of delivery with your order number and photos of the item and packaging. We'll review it and send a replacement or refund." },
      { h: "Returns" },
      { p: "If we approve a return, we'll email you a prepaid return label and instructions. Packages sent back without an approved return request can't be accepted. Approved returns go to: 775 W Lake St Unit 2404, Fort Collins, CO 80521, United States." },
      { h: "Non-returnable items" },
      { p: "Opened or used items, bundled or custom orders, and sale items can't be returned. If you're not sure whether an item qualifies, contact us before sending anything back." },
      { h: "Refunds" },
      { p: "Approved refunds go back to your original payment method (PayPal, Venmo or card through PayPal). Bitcoin payments are refunded in BTC to an address you provide, at the USD value of the order. Your bank or card issuer may take a few business days to post the refund." },
      { p: "Questions about a return? Email ascendlabz@gmail.com." },
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    updated: "October 2, 2026",
    blocks: [
      { p: "This policy explains what personal information AscendLabz (\"we\", \"us\") collects when you visit ascendlabz.org or place an order, how we use it, and the choices you have." },
      { h: "Information we collect" },
      { ul: [
        "Order details you give us at checkout: name, email, phone number, shipping address, the items you buy and the order total.",
        "Payment confirmation from our payment processors. Card and bank details are entered directly with PayPal and never reach our servers.",
        "Messages you send through the contact form or by email, and your email address if you sign up for restock alerts or discounts.",
        "Basic usage data such as pages viewed, device type and approximate location, collected through Vercel Analytics and Google Analytics.",
        "Data stored in your own browser (localStorage) to remember your cart, recently viewed products and that you passed the researcher verification.",
      ] },
      { h: "How we use it" },
      { ul: [
        "To process, ship and support your orders, including order confirmation and shipping emails.",
        "To answer your questions and handle returns.",
        "To send restock alerts or offers you signed up for. You can unsubscribe at any time.",
        "To understand how the site is used and improve it, and to detect fraud and keep the site secure.",
        "To meet legal, tax and accounting obligations.",
      ] },
      { h: "Who we share it with" },
      { p: "We don't sell your personal information. We share it only with service providers that help run the store, and only as needed for them to do so:" },
      { ul: [
        "Vercel (website hosting and analytics)",
        "Google Firebase (order records)",
        "PayPal and Venmo (payment processing)",
        "EmailJS (order and contact emails)",
        "Google Analytics (site analytics)",
        "Shipping carriers (delivery of your order)",
      ] },
      { p: "We may also disclose information if required by law, to protect our rights, or as part of a sale or transfer of the business." },
      { h: "How long we keep it" },
      { p: "We keep order records for as long as needed to fulfill orders and meet legal and tax obligations, and other information only as long as it's useful for the purposes above." },
      { h: "Your choices and rights" },
      { p: "Depending on where you live, you may have the right to access, correct, delete or get a copy of your personal information, or to opt out of certain uses. To make a request, email ascendlabz@gmail.com. We won't discriminate against you for exercising these rights. You can clear the data stored in your browser at any time through your browser settings." },
      { h: "Children" },
      { p: "Our site and products are only for adults 21 and older. We don't knowingly collect information from anyone under 21." },
      { h: "Security" },
      { p: "We use reputable providers and encrypted connections to protect your information, but no method of transmission or storage is completely secure." },
      { h: "Changes and contact" },
      { p: "We may update this policy and will change the date above when we do. Questions? Email ascendlabz@gmail.com or write to AscendLabz, 775 W Lake St Unit 2404, Fort Collins, CO 80521, United States." },
    ],
  },

  "terms-of-service": {
    title: "Terms of Service",
    updated: "October 2, 2026",
    blocks: [
      { p: "These terms govern your use of ascendlabz.org and any purchase you make from AscendLabz (\"we\", \"us\"). By using the site or placing an order, you agree to them, along with our Privacy Policy, Research Use Policy, Shipping Policy and Refund Policy." },
      { h: "1. Research use only and eligibility" },
      { p: "All products are sold strictly for laboratory, analytical and in-vitro research by qualified individuals and institutions. They are not drugs, dietary supplements, cosmetics or food, are not intended to diagnose, treat, cure or prevent any disease, and are not for human or animal use of any kind. By purchasing, you confirm that you are at least 21 years old, that you are buying for lawful research purposes only, and that you may legally buy and handle these materials where you live. We may refuse or cancel any order we believe violates these terms." },
      { h: "2. Orders and pricing" },
      { p: "Placing an order is an offer to buy. We may accept or decline it, limit quantities, or cancel it, including when an item is out of stock or a price was listed in error. If we cancel an order you've paid for, we'll refund you. Prices are in US dollars and may change without notice. Promotions such as Buy 2, Get 1 Free apply as described on the site at the time of your order." },
      { h: "3. Payment" },
      { p: "We accept PayPal, Venmo, cards processed through PayPal, and Bitcoin. Bitcoin orders ship once payment is confirmed on the blockchain and verified by us." },
      { h: "4. Shipping, risk and returns" },
      { p: "Shipping is covered by our Shipping Policy and returns by our Refund Policy. Responsibility for the products passes to you when they're delivered to the address you provide." },
      { h: "5. Your responsibilities" },
      { p: "You're responsible for storing, handling and using products safely and lawfully, and for complying with all laws that apply to you, including import rules. You agree not to resell products as consumer goods or use them in any way that conflicts with our Research Use Policy." },
      { h: "6. Site content" },
      { p: "Product information is provided for research reference only and isn't medical advice. We try to keep it accurate but don't guarantee it's complete or error-free. The AscendLabz name, logo and site content belong to us and may not be copied without permission." },
      { h: "7. Disclaimer of warranties" },
      { p: "Except as stated in our Refund Policy, the site and products are provided \"as is\" without warranties of any kind, express or implied, including fitness for a particular purpose, to the fullest extent allowed by law." },
      { h: "8. Limitation of liability" },
      { p: "To the fullest extent allowed by law, AscendLabz is not liable for any indirect, incidental, special or consequential damages, or for any damages arising from the use or misuse of any product. Our total liability for any claim is limited to the amount you paid for the order involved." },
      { h: "9. Indemnification" },
      { p: "You agree to indemnify and hold AscendLabz harmless from any claims, losses or expenses arising from your breach of these terms or your use or misuse of any product." },
      { h: "10. Governing law" },
      { p: "These terms are governed by the laws of the State of Colorado, without regard to its conflict-of-law rules. Any dispute will be handled in the state or federal courts located in Larimer County, Colorado." },
      { h: "11. Changes and contact" },
      { p: "We may update these terms and will change the date above when we do. Questions? Email ascendlabz@gmail.com or call (720) 781-9031." },
    ],
  },
};
