export type ServiceType = "cremation" | "burial" | "direct_cremation";

export interface PriceItem {
  service: string;
  type: ServiceType;
  price: number;
  includes: string[];
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FuneralDirector {
  id: string;
  name: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  assured: boolean;
  description: string;
  prices: PriceItem[];
  reviews: Review[];
}

export const funeralDirectors: FuneralDirector[] = [
  {
    id: "fd_001",
    name: "Smith & Sons Funerals",
    address: "47 Buckingham Gate, Westminster",
    postcode: "SW1E 6BS",
    city: "London",
    phone: "020 7946 0958",
    website: "www.smithandsons.co.uk",
    latitude: 51.4994,
    longitude: -0.1358,
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    assured: true,
    description:
      "A family-run funeral home serving Westminster and surrounding areas for over 60 years. Known for compassionate, dignified care at every step.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 3100, includes: ["Coffin", "Transport", "Cremation fee", "Order of service"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 895, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 4950, includes: ["Coffin", "Transport", "Burial plot", "Gravestone"] },
    ],
    reviews: [
      { name: "Margaret T.", rating: 5, text: "Smith & Sons made an incredibly difficult time bearable. Compassionate, professional and completely transparent about costs.", date: "March 2026", verified: true },
      { name: "David & Carol R.", rating: 5, text: "They looked after my father with real dignity. The team guided us every step of the way without any pressure.", date: "February 2026", verified: true },
      { name: "James H.", rating: 5, text: "Outstanding service. Clear pricing, no surprises. Highly recommend to any family in Westminster.", date: "January 2026", verified: true },
    ],
  },
  {
    id: "fd_002",
    name: "Greenhill Funeral Services",
    address: "12 Camden High Street, Camden",
    postcode: "NW1 0JH",
    city: "London",
    phone: "020 7946 1234",
    website: "www.greenhillfunerals.co.uk",
    latitude: 51.5394,
    longitude: -0.1426,
    rating: 4.7,
    reviewCount: 24,
    verified: true,
    assured: false,
    description:
      "Independent funeral directors in the heart of Camden, providing respectful and affordable funeral arrangements for London families since 1988.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2850, includes: ["Coffin", "Transport", "Cremation fee"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 795, includes: ["Cremation only", "Ashes returned in casket"] },
      { service: "Traditional Burial", type: "burial", price: 5200, includes: ["Coffin", "Transport", "Burial plot preparation"] },
    ],
    reviews: [
      { name: "Priya S.", rating: 5, text: "Greenhill were wonderful – respectful of our Hindu traditions and very clear about pricing from the start.", date: "March 2026", verified: true },
      { name: "Thomas L.", rating: 4, text: "Good service, straightforward pricing. The staff were kind and professional throughout.", date: "January 2026", verified: true },
    ],
  },
  {
    id: "fd_003",
    name: "Anderson & Holt",
    address: "98 Brixton Road, Lambeth",
    postcode: "SW9 6BE",
    city: "London",
    phone: "020 7946 5555",
    website: "www.andersonandholt.co.uk",
    latitude: 51.4625,
    longitude: -0.1144,
    rating: 4.6,
    reviewCount: 18,
    verified: true,
    assured: false,
    description:
      "Brixton-based independent funeral directors with decades of experience serving South London's diverse communities with sensitivity and respect.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2700, includes: ["Coffin", "Transport", "Cremation fee", "1 limousine"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 750, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 4800, includes: ["Coffin", "Transport", "Burial arrangement"] },
    ],
    reviews: [
      { name: "Yvette M.", rating: 5, text: "They were so understanding and helped us through everything. Prices were honest and very competitive.", date: "February 2026", verified: true },
      { name: "Anonymous", rating: 4, text: "Professional and caring. Good value for a dignified service.", date: "December 2025", verified: true },
    ],
  },
  {
    id: "fd_004",
    name: "Patel Family Funerals",
    address: "204 Ealing Road, Wembley",
    postcode: "HA0 4QB",
    city: "London",
    phone: "020 7946 7890",
    website: "www.patelfamilyfunerals.co.uk",
    latitude: 51.5566,
    longitude: -0.2999,
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    assured: true,
    description:
      "Specialist multi-faith funeral directors in Wembley, with deep experience in Hindu, Muslim, Sikh and Christian funeral traditions across London.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2600, includes: ["Coffin", "Transport", "Cremation fee", "Multi-faith ceremony support"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 720, includes: ["Cremation only", "Ashes returned in urn"] },
      { service: "Traditional Burial", type: "burial", price: 4500, includes: ["Coffin", "Transport", "Burial in designated plot"] },
    ],
    reviews: [
      { name: "Harinder K.", rating: 5, text: "They understood our Sikh customs perfectly. Respectful, efficient and great value.", date: "March 2026", verified: true },
      { name: "Fatima A.", rating: 5, text: "Patel Family handled our mother's Islamic funeral beautifully. Cannot thank them enough.", date: "January 2026", verified: true },
      { name: "Sunita P.", rating: 5, text: "Outstanding. They made a harrowing time much more manageable.", date: "November 2025", verified: true },
    ],
  },
  {
    id: "fd_005",
    name: "Northern Dignity Funerals",
    address: "55 Deansgate, Manchester City Centre",
    postcode: "M3 2EN",
    city: "Manchester",
    phone: "0161 946 1122",
    website: "www.northerndignity.co.uk",
    latitude: 53.4808,
    longitude: -2.2426,
    rating: 4.8,
    reviewCount: 56,
    verified: true,
    assured: true,
    description:
      "Manchester's most trusted independent funeral directors, offering dignified and affordable services for over 40 years with full price transparency.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2400, includes: ["Coffin", "Transport", "Cremation fee", "Order of service"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 650, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 3900, includes: ["Coffin", "Transport", "Burial arrangement", "Memorial card"] },
    ],
    reviews: [
      { name: "Sarah J.", rating: 5, text: "Northern Dignity were there for us every step of the way. Prices were exactly as quoted – no surprises.", date: "March 2026", verified: true },
      { name: "Kevin O.", rating: 5, text: "Wonderful service. They treated mum with real dignity. Would highly recommend.", date: "February 2026", verified: true },
    ],
  },
  {
    id: "fd_006",
    name: "Moss Side Funeral Care",
    address: "78 Princess Road, Moss Side",
    postcode: "M14 4RH",
    city: "Manchester",
    phone: "0161 946 4444",
    website: "www.mossidefuneralcare.co.uk",
    latitude: 53.4592,
    longitude: -2.2295,
    rating: 4.5,
    reviewCount: 19,
    verified: true,
    assured: false,
    description:
      "Community-focused funeral directors serving South Manchester. Committed to affordable, dignified funerals without compromise.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2100, includes: ["Coffin", "Transport", "Cremation fee"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 595, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 3600, includes: ["Coffin", "Transport", "Burial plot"] },
    ],
    reviews: [
      { name: "Denise W.", rating: 5, text: "Very affordable and very professional. They never made us feel we were compromising on quality.", date: "January 2026", verified: true },
      { name: "Anonymous", rating: 4, text: "Good service, timely and compassionate. Fair pricing.", date: "October 2025", verified: true },
    ],
  },
  {
    id: "fd_007",
    name: "Midlands Memorial Services",
    address: "32 Broad Street, Birmingham City Centre",
    postcode: "B1 2HF",
    city: "Birmingham",
    phone: "0121 946 3300",
    website: "www.midlandsmemorial.co.uk",
    latitude: 52.4789,
    longitude: -1.9024,
    rating: 4.7,
    reviewCount: 38,
    verified: true,
    assured: true,
    description:
      "Birmingham's premier independent funeral directors, serving all communities with discretion, care, and clear upfront pricing since 1975.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2550, includes: ["Coffin", "Transport", "Cremation fee", "1 limousine"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 680, includes: ["Cremation only", "Ashes in ceramic urn"] },
      { service: "Traditional Burial", type: "burial", price: 4200, includes: ["Coffin", "Transport", "Burial plot", "Grave preparation"] },
    ],
    reviews: [
      { name: "Rachel D.", rating: 5, text: "Midlands Memorial looked after us brilliantly. They were gentle, respectful and incredibly clear about all costs.", date: "March 2026", verified: true },
      { name: "Olumide A.", rating: 5, text: "They arranged my grandmother's Nigerian repatriation beautifully. Very experienced team.", date: "February 2026", verified: true },
    ],
  },
  {
    id: "fd_008",
    name: "Heartland Funerals",
    address: "15 Soho Road, Handsworth",
    postcode: "B21 9SB",
    city: "Birmingham",
    phone: "0121 946 8800",
    website: "www.heartlandfunerals.co.uk",
    latitude: 52.5071,
    longitude: -1.9336,
    rating: 4.6,
    reviewCount: 27,
    verified: true,
    assured: false,
    description:
      "Community-rooted funeral directors in Handsworth, with particular expertise in Caribbean, South Asian and African funeral traditions.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2350, includes: ["Coffin", "Transport", "Cremation fee"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 620, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 3950, includes: ["Coffin", "Transport", "Burial arrangement"] },
    ],
    reviews: [
      { name: "Beverley C.", rating: 5, text: "They honoured my father's Jamaican heritage beautifully. Truly compassionate team.", date: "January 2026", verified: true },
      { name: "Anonymous", rating: 4, text: "Very professional and kind. Prices were completely transparent from start to finish.", date: "November 2025", verified: true },
    ],
  },
  {
    id: "fd_009",
    name: "Grace & Powell Funeral Directors",
    address: "201 Edgware Road, Marylebone",
    postcode: "W2 1ES",
    city: "London",
    phone: "020 7946 2222",
    website: "www.graceandpowell.co.uk",
    latitude: 51.5208,
    longitude: -0.1677,
    rating: 4.9,
    reviewCount: 47,
    verified: true,
    assured: true,
    description:
      "Award-winning funeral directors on Edgware Road, known for exceptional personalised services and meticulous attention to every family's wishes.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 3400, includes: ["Bespoke coffin", "Transport", "Cremation fee", "Ceremony coordination"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 950, includes: ["Cremation only", "Handcrafted urn", "Death certificate support"] },
      { service: "Traditional Burial", type: "burial", price: 5800, includes: ["Premium coffin", "Transport", "Burial plot", "Headstone allowance"] },
    ],
    reviews: [
      { name: "Constance F.", rating: 5, text: "Grace & Powell went far beyond what we expected. Every detail was perfect. Worth every penny.", date: "March 2026", verified: true },
      { name: "Benjamin S.", rating: 5, text: "Extraordinary service. They made my wife's funeral exactly as she would have wanted. Thank you.", date: "February 2026", verified: true },
    ],
  },
  {
    id: "fd_010",
    name: "Stockport Funeral Home",
    address: "67 Wellington Road North, Stockport",
    postcode: "SK4 1HJ",
    city: "Manchester",
    phone: "0161 946 9900",
    website: "www.stockportfuneralhome.co.uk",
    latitude: 53.4106,
    longitude: -2.1575,
    rating: 4.5,
    reviewCount: 22,
    verified: true,
    assured: false,
    description:
      "A trusted local funeral home serving Stockport and the Greater Manchester area. Straightforward, caring and affordable.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 2200, includes: ["Coffin", "Transport", "Cremation fee"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 630, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 3750, includes: ["Coffin", "Transport", "Burial preparation"] },
    ],
    reviews: [
      { name: "Janet M.", rating: 5, text: "Stockport Funeral Home were just brilliant. Calm, kind and extremely fair on price.", date: "February 2026", verified: true },
      { name: "Anonymous", rating: 4, text: "Solid, reliable service with honest pricing. Would recommend.", date: "December 2025", verified: true },
    ],
  },
];

export function getAveragePrice(fd: FuneralDirector): number {
  if (!fd.prices.length) return 0;
  return Math.round(fd.prices.reduce((sum, p) => sum + p.price, 0) / fd.prices.length);
}

export function getLowestPrice(fd: FuneralDirector): number {
  return Math.min(...fd.prices.map((p) => p.price));
}

export function filterByServiceType(fds: FuneralDirector[], type: ServiceType | "all"): FuneralDirector[] {
  if (type === "all") return fds;
  return fds.filter((fd) => fd.prices.some((p) => p.type === type));
}

export function sortDirectors(
  fds: FuneralDirector[],
  sortBy: "price" | "rating" | "name",
  serviceType: ServiceType | "all" = "all"
): FuneralDirector[] {
  return [...fds].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = serviceType === "all" ? getLowestPrice(a) : (a.prices.find((p) => p.type === serviceType)?.price ?? 9999999);
      const priceB = serviceType === "all" ? getLowestPrice(b) : (b.prices.find((p) => p.type === serviceType)?.price ?? 9999999);
      return priceA - priceB;
    }
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });
}
