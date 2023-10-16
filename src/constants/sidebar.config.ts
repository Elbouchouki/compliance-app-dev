import { Icons } from "@/components/icons";
import { SidebarItem } from "@/types";
export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Home",
    icon: Icons.home,
    path: "/",
    key: "home",
  },
  {
    key: "riskManagement",
    title: "Risk Management",
    icon: Icons.riskAssessment,
    children: [
      {
        key: "riskManagementOverview",
        title: "Overview",
        icon: Icons.overview,
        path: "/risk-management",
      },
      {
        key: "riskManagementKPI",
        title: "Risk Management KPI",
        icon: Icons.riskManagementKPI,
        path: "/risk-management-kpi",
      },
      {
        key: "riskAssessment",
        title: "Risk Assessment",
        icon: Icons.riskAssessment,
        path: "/risk-assessment",
      },
      {
        key: "riskRegister",
        title: "Risk Register",
        icon: Icons.riskRegister,
        path: "/risk-register",
      },
    ],
  },
  {
    key: "compliance",
    title: "Compliance",
    icon: Icons.gapAssessment,
    children: [
      {
        key: "complianceOverview",
        title: "Overview",
        icon: Icons.overview,
        path: "/compliance",
      },
      {
        key: "gapAssessment",
        title: "Gap Assessment",
        icon: Icons.gapAssessment,
        path: "/gap-assessment",
      },
      // {
      //   key: "controls",
      //   title: "Controls",
      //   icon: Icons.controls,
      //   path: "/controls",
      // },
      {
        key: "policies",
        title: "Policies",
        icon: Icons.policies,
        path: "/policies",
      },
      {
        key: "evidence",
        title: "Evidence",
        icon: Icons.evidence,
        path: "/evidence",
      },
      {
        key: "frameworks",
        title: "Frameworks",
        icon: Icons.frameworks,
        path: "/frameworks",
      },
      {
        key: "tags",
        title: "Tags",
        icon: Icons.tags,
        path: "/tags",
      },
      {
        key: "labels",
        title: "Labels",
        icon: Icons.labels,
        path: "/labels",
      },
    ],
  },
  // {
  //   key: "reports",
  //   title: "Reports",
  //   icon: Icons.reports,
  //   path: "/reports",
  // },
  {
    key: "tenants",
    title: "Tenants",
    icon: Icons.tenants,
    path: "/tenants",
  },
  {
    key: "users",
    title: "Users",
    icon: Icons.tenantUsers,
    path: "/tenant-users",
  },
  {
    key: "help",
    title: "Help",
    icon: Icons.help,
    path: "/help",
  },
  {
    key: "knowledgeBase",
    title: "Knowledge Base",
    icon: Icons.knowledgeBase,
    path: "/knowledge-base",
  },
  // {
  //   key: "questionnaires",
  //   title: "Questionnaires",
  //   icon: Icons.questionnaires,
  //   path: "/questionnaires",
  // },
  {
    key: "fqa",
    title: "FQA",
    icon: Icons.fqa,
    path: "/fqa",
  }
]
