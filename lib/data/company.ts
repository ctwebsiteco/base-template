import { client, isSanityConfigured } from "@/sanity/lib/client";
import { COMPANY_INFO_QUERY } from "@/sanity/lib/queries";
import { companyInfo as localCompanyInfo } from "@/data/companyInfo";
import type { CompanyInfo } from "@/sanity/types";
import { merge } from "ts-deepmerge";

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (isSanityConfigured && client) {
    try {
      const sanityData =
        await client.fetch<Partial<CompanyInfo>>(COMPANY_INFO_QUERY);
      if (sanityData) {
        return merge(localCompanyInfo, sanityData) as CompanyInfo;
      }
    } catch {
      // Sanity fetch failed — fall back to local seed
    }
  }
  return localCompanyInfo;
}
