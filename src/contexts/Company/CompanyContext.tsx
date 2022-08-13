import { createContext } from "react";
import { CompanyType } from "../../types/Company/CompanyType";

export type CompanyContextProps = {
  company: CompanyType;
  selectedCompanyId: string;
  setSelectedCompanyId: (companyId: string | null) => void;
  setCompany: (company: CompanyType | null) => void;
}

export const CompanyContext = createContext<CompanyContextProps>(null!);