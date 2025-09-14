type City = "Chandigarh" | "Mohali" | "Zirakpur" | "Panchkula" | "Other"
type PropertyType = "Apartment" | "Villa" | "Plot" | "Office" | "Retail"
type BHKType = "1" | "2" | "3" | "4" | "Studio"
type PurposeType = "Buy" | "Rent"
type TimelineType = "0-3m" | "3-6m" | ">6m" | "Exploring"
type SourceType = "Website" | "Referral" | "Walk-in" | "Call" | "Other"


type FormDataType = {
    fullname: string;
    email: string;
    phone: number;
    city: City;
    property: PropertyType
    bhk: BHKType;
    purpose: PurposeType;
    budgetMin: number;
    budgetMax: number;
    timeline: TimelineType;
    source: SourceType;
    notes: string;
    tags: string[];
}