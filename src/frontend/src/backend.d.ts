import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProfileFilter {
    city?: string;
    minAge?: bigint;
    maxAge?: bigint;
    religion?: Religion;
}
export interface Profile {
    age: bigint;
    aboutMe: string;
    caste: Caste;
    city: string;
    name: string;
    education: Education;
    profession: Profession;
    photoUrl?: string;
    isProfileComplete: boolean;
    state: string;
    motherTongue: string;
    gender: Gender;
    religion: Religion;
}
export enum Caste {
    sc = "sc",
    st = "st",
    obc = "obc",
    other = "other",
    general = "general"
}
export enum Education {
    phd = "phd",
    highSchool = "highSchool",
    other = "other",
    bachelor = "bachelor",
    master = "master"
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum Profession {
    doctor = "doctor",
    other = "other",
    teacher = "teacher",
    engineer = "engineer",
    software = "software",
    business = "business",
    artist = "artist",
    government = "government"
}
export enum Religion {
    hindu = "hindu",
    other = "other",
    muslim = "muslim",
    sikh = "sikh",
    christian = "christian"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    browseProfiles(filter: ProfileFilter | null): Promise<Array<Profile>>;
    createOrUpdateProfile(profile: Profile): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getOwnProfile(): Promise<Profile | null>;
    getProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isProfileComplete(): Promise<boolean>;
    uploadPhoto(fileName: string): Promise<string>;
}
