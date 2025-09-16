type City = "Chandigarh" | "Mohali" | "Zirakpur" | "Panchkula" | "Other"
type PropertyType = "Apartment" | "Villa" | "Plot" | "Office" | "Retail"
type BHKType = "1" | "2" | "3" | "4" | "Studio" | null
type PurposeType = "Buy" | "Rent"
type TimelineType = "0-3m" | "3-6m" | ">6m" | "Exploring" | null
type SourceType = "Website" | "Referral" | "Walk-in" | "Call" | "Other" | null
type StatusType = 'New' | 'Qualified' | 'Contacted' | 'Visited' | 'Negotiation' | 'Converted' | 'Dropped' | null


type FormDataType = {
    fullname: string;
    email: string;
    phone: string;
    city: City;
    property: PropertyType
    bhk: BHKType;
    purpose: PurposeType;
    budgetMin: number | null;
    budgetMax: number | null;
    timeline: TimelineType;
    source: SourceType;
    notes: string;
    tags: string | null;
    status?: StatusType;
}

type BuyerType = {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    city: City;
    property: PropertyType | null
    bhk: BHKType;
    purpose: PurposeType;
    budgetMin: number | null;
    budgetMax: number | null;
    timeline: TimelineType;
    source: SourceType;
    notes: string | null;
    tags: string[] | null;
    status?: StatusType;
    updatedAt?: string | Date;
}

type CsvType = {
    fullname: string;
    email: string;
    phone: string;
    city: City;
    property: PropertyType
    bhk: BHKType;
    purpose: PurposeType;
    budgetMin: number | null;
    budgetMax: number | null;
    timeline: TimelineType;
    source: SourceType;
    notes: string;
    tags: string | null;
    status?: StatusType;
}

type ErrorState<T> = Partial<Record<keyof T, string>>