'use client'

import { useStore } from "@/hooks/use-store";
import { Button } from "../ui/button";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { FileSpreadsheet } from "lucide-react";
import { Risk } from "@/types";
import * as XLSX from "xlsx";
import { CATEGORY, RISK_STATUS, SUBCATEGORY, XLSX_LABELS } from "@/mock";

export default function ExportToExcelButton(risks: { data: Risk[] }) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const data = risks.data;

  const categories = new Map<string, string>();
  const subcategories = new Map<string, string>();
  const riskStatus = new Map<string, string>();

  CATEGORY(langStore?.lang).forEach(c => {
    categories.set(c.id, c.value);
  });
  SUBCATEGORY(langStore?.lang).forEach(c => {
    subcategories.set(c.id, c.value);
  });
  RISK_STATUS(langStore?.lang).forEach(s => {
    riskStatus.set(s.id, s.value);
  });

  const sheetRows = langStore?.lang === "en" ? data.map(r => ({
    "Id": r.id,
    "Risk Name": r.riskName,
    "Create Date": (new Date(r.dateRaised as string)).toUTCString(),
    "Consequences": r.consequences,
    "Owner": r.owner,
    "Impact": r.impact,
    "Affected Asset": r.affectedAsset,
    "Likelihood": r.likelihood,
    "Description": r.description,
    "Category": categories.get(r.categoryId),
    "Subcategory": subcategories.get(r.subCategoryId),
    "Risk Status": riskStatus.get(r.riskStatusId),
    "Inherent Risk Score": r.impact * r.likelihood,
    "Residual Risk Score": r.impact * r.likelihood * 4,
  })) : data.map(r => ({
    "Id": r.id,
    "اسم المخاطرة": r.riskName,
    "تاريخ الانشاء": (new Date(r.dateRaised as string)).toUTCString(),
    "العواقب": r.consequences,
    "المالك": r.owner,
    "التأثير": r.impact,
    "الاصول المتضررة": r.affectedAsset,
    "احتمالية الحدوث": r.likelihood,
    "الوصف": r.description,
    "فئة": categories.get(r.categoryId),
    "التصنيف فرعي": subcategories.get(r.subCategoryId),
    "حالة المخاطرة": riskStatus.get(r.riskStatusId),
    "درجة المخاطرة الكامنة": r.impact * r.likelihood,
    "درجة المخاطرة المتبقية": r.impact * r.likelihood * 4,
  }));

  const jsonTosheet = (data: any) => {
    return XLSX.utils.json_to_sheet(data, { header: XLSX_LABELS(langStore?.lang).map(l => l.label) })
  }

  const handleExportClick = () => {
    const ws = jsonTosheet(sheetRows)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    if (langStore?.lang === "ar") {
      wb.Sheets['Sheet1']['!mso-direction-rotation'] = 90; // 90 degrees for RTL
    }
    XLSX.writeFile(wb, 'data.xlsx');
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleExportClick}
      className="flex flex-row gap-2"
    >
      <FileSpreadsheet size={20} />
      <p>
        {dict?.exportToExcel || "Export Data"}
      </p>
    </Button>
  )
}