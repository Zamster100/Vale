export type ServiceType = "cremation" | "burial" | "direct_cremation";
export type PhotoCategory = "chapel" | "reception" | "vehicles" | "exterior" | "team";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DayHours {
  open: boolean;
  from?: string; // "HH:MM" 24h
  to?: string;   // "HH:MM" 24h
}

export interface OpeningHours {
  schedule: Record<DayKey, DayHours>;
  availability24hr?: boolean;
  oohPhone?: string;
  oohResponseHours?: number; // 1, 2, 4, 8, 24
}

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
  quoteRequestId?: string | null;
  status?: "booked" | "pending";
  communicationRating?: number;
  dignityRating?: number;
  valueRating?: number;
  facilitiesRating?: number;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  category: PhotoCategory;
  caption?: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  yearsExp?: number;
  order: number;
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
  gallery?: GalleryPhoto[];
  team?: TeamMember[];
  nafdVerified?: boolean;
  saifVerified?: boolean;
  bifdVerified?: boolean;
  iccmVerified?: boolean;
  verifiedAt?: string;
  hours?: OpeningHours;
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
    nafdVerified: true,
    saifVerified: true,
    bifdVerified: true,
    verifiedAt: "2025-09-01T00:00:00.000Z",
    hours: {
      schedule: {
        mon: { open: true, from: "09:00", to: "17:00" },
        tue: { open: true, from: "09:00", to: "17:00" },
        wed: { open: true, from: "09:00", to: "17:00" },
        thu: { open: true, from: "09:00", to: "17:00" },
        fri: { open: true, from: "09:00", to: "17:00" },
        sat: { open: true, from: "10:00", to: "14:00" },
        sun: { open: false },
      },
      oohPhone: "020 7946 0958",
      oohResponseHours: 2,
    },
    description:
      "A family-run funeral home serving Westminster and surrounding areas for over 60 years. Known for compassionate, dignified care at every step.",
    prices: [
      { service: "Simple Attended Funeral", type: "cremation", price: 3100, includes: ["Coffin", "Transport", "Cremation fee", "Order of service"] },
      { service: "Direct Cremation", type: "direct_cremation", price: 895, includes: ["Cremation only", "Ashes returned"] },
      { service: "Traditional Burial", type: "burial", price: 4950, includes: ["Coffin", "Transport", "Burial plot", "Gravestone"] },
    ],
    reviews: [
      { name: "Margaret T.", rating: 5, text: "Smith & Sons made an incredibly difficult time bearable. Compassionate, professional and completely transparent about costs.", date: "March 2026", verified: true, quoteRequestId: "qr_2601_001", status: "booked", communicationRating: 5, dignityRating: 5, valueRating: 4, facilitiesRating: 5 },
      { name: "David & Carol R.", rating: 5, text: "They looked after my father with real dignity. The team guided us every step of the way without any pressure.", date: "February 2026", verified: true, quoteRequestId: "qr_2602_001", status: "booked", communicationRating: 5, dignityRating: 5, valueRating: 5, facilitiesRating: 5 },
      { name: "James H.", rating: 5, text: "Outstanding service. Clear pricing, no surprises. Highly recommend to any family in Westminster.", date: "January 2026", verified: true, communicationRating: 5, dignityRating: 5, valueRating: 5, facilitiesRating: 4 },
    ],
    gallery: [
      { id: "g1", url: "https://picsum.photos/seed/vale-chapel-a/800/600", category: "chapel", caption: "Our main chapel — seating up to 80 guests", order: 1 },
      { id: "g2", url: "https://picsum.photos/seed/vale-chapel-b/800/600", category: "chapel", caption: "Our intimate chapel for smaller services", order: 2 },
      { id: "g3", url: "https://picsum.photos/seed/vale-chapel-c/800/600", category: "chapel", caption: "Altar and floral arrangements", order: 3 },
      { id: "g4", url: "https://picsum.photos/seed/vale-reception-a/800/600", category: "reception", caption: "Quiet reception and waiting area", order: 4 },
      { id: "g5", url: "https://picsum.photos/seed/vale-reception-b/800/600", category: "reception", caption: "Private family consultation room", order: 5 },
      { id: "g6", url: "https://picsum.photos/seed/vale-hearse-a/800/600", category: "vehicles", caption: "Our Jaguar XJ hearse", order: 6 },
      { id: "g7", url: "https://picsum.photos/seed/vale-limo-a/800/600", category: "vehicles", caption: "Family limousine — seats up to 6", order: 7 },
      { id: "g8", url: "https://picsum.photos/seed/vale-exterior-a/800/600", category: "exterior", caption: "47 Buckingham Gate, Westminster", order: 8 },
      { id: "g9", url: "https://picsum.photos/seed/vale-teamphoto-a/800/600", category: "team", caption: "The Smith & Sons team", order: 9 },
    ],
    team: [
      {
        id: "t1",
        name: "Charles Smith",
        title: "Senior Funeral Director",
        bio: "Charles has led Smith & Sons for over three decades, continuing the family tradition his grandfather began in 1964. He is known for his calm presence and deep knowledge of Westminster's communities.",
        photoUrl: "https://picsum.photos/seed/vale-charles-smith/200/200",
        yearsExp: 32,
        order: 1,
      },
      {
        id: "t2",
        name: "Elizabeth Smith",
        title: "Arrangement Manager",
        bio: "Elizabeth manages all family arrangements with warmth and precision. She has a particular passion for creating bespoke ceremonies that truly reflect the person being remembered.",
        photoUrl: "https://picsum.photos/seed/vale-elizabeth-smith/200/200",
        yearsExp: 22,
        order: 2,
      },
      {
        id: "t3",
        name: "James Morrison",
        title: "Funeral Director",
        bio: "James joined Smith & Sons after training at the British Institute of Embalmers. He prides himself on meticulous attention to detail and supporting families at every step of the process.",
        photoUrl: "https://picsum.photos/seed/vale-james-morrison/200/200",
        yearsExp: 14,
        order: 3,
      },
      {
        id: "t4",
        name: "Sarah Williams",
        title: "Family Liaison",
        bio: "Sarah is the first point of contact for many families. Her background in bereavement counselling means she can offer emotional support as well as practical guidance throughout the funeral planning process.",
        photoUrl: "https://picsum.photos/seed/vale-sarah-williams/200/200",
        yearsExp: 7,
        order: 4,
      },
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
    nafdVerified: true,
    saifVerified: true,
    verifiedAt: "2025-10-01T00:00:00.000Z",
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
    nafdVerified: true,
    saifVerified: true,
    iccmVerified: true,
    verifiedAt: "2025-08-01T00:00:00.000Z",
    hours: {
      schedule: {
        mon: { open: true, from: "00:00", to: "23:59" },
        tue: { open: true, from: "00:00", to: "23:59" },
        wed: { open: true, from: "00:00", to: "23:59" },
        thu: { open: true, from: "00:00", to: "23:59" },
        fri: { open: true, from: "00:00", to: "23:59" },
        sat: { open: true, from: "00:00", to: "23:59" },
        sun: { open: true, from: "00:00", to: "23:59" },
      },
      availability24hr: true,
      oohPhone: "0161 946 1122",
      oohResponseHours: 1,
    },
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
    nafdVerified: true,
    bifdVerified: true,
    verifiedAt: "2025-11-01T00:00:00.000Z",
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
    nafdVerified: true,
    saifVerified: true,
    bifdVerified: true,
    iccmVerified: true,
    verifiedAt: "2025-07-01T00:00:00.000Z",
    hours: {
      schedule: {
        mon: { open: true, from: "09:00", to: "17:30" },
        tue: { open: true, from: "09:00", to: "17:30" },
        wed: { open: true, from: "09:00", to: "17:30" },
        thu: { open: true, from: "09:00", to: "17:30" },
        fri: { open: true, from: "09:00", to: "17:30" },
        sat: { open: true, from: "10:00", to: "15:00" },
        sun: { open: false },
      },
      oohPhone: "020 7946 2222",
      oohResponseHours: 2,
    },
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
