import { getRandomSubArray } from "@/lib/utils";
import {
  AssessmentObjectives,
  AssessmentScope,
  Category,
  Control,
  Evidence,
  FQA,
  Framework,
  KnowledgeBase,
  KnowledgeBaseData,
  Label,
  MaturityLevel,
  ObjectiveTypesObject,
  Policy,
  RiskScopeTypeObject,
  RiskStatus,
  ScopeStatusObject,
  ScopeTypes,
  ScopeTypesObject,
  Select,
  Tag,
  Tenant,
  User,
} from "@/types";
import evidenceJson from "@/data/evidence.json";
import frameworksJson from "@/data/frameworks.json";
import controlCategoryJson from "@/data/controlCategory.json";
import controlJson from "@/data/controls.json";
import AssessmentObjectiveJson from "@/data/assessmentObjective.json";

const UUID = () => Math.random().toString(36).substr(2, 9);

function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}
// export type ObjectiveTypes = "Met" | "Not Met" | "Not Applicable" | "Compensating Control"

export const OBJECTIVE_TYPES_MOCK: ObjectiveTypesObject[] = [
  {
    label: "Met",
    value: "Met",
  },
  {
    label: "Not Met",
    value: "Not Met",
  },
  {
    label: "Not Applicable",
    value: "Not Applicable",
  },
  {
    label: "Compensating Control",
    value: "Compensating Control",
  },
];
export const OBJECTIVE_TYPES_MOCK_AR: ObjectiveTypesObject[] = [
  {
    label: "ملتقى",
    value: "Met",
  },
  {
    label: "غير ملتقى",
    value: "Not Met",
  },
  {
    label: "غير قابل للتطبيق",
    value: "Not Applicable",
  },
  {
    label: "تحكم تعويضي",
    value: "Compensating Control",
  },
];
export const GET_OBJECTIVE_TYPES = (lang: "ar" | "en" | undefined) =>
  lang === "ar" ? OBJECTIVE_TYPES_MOCK_AR : OBJECTIVE_TYPES_MOCK;

export const ROLES: Select[] = [
  {
    label: "Visitor",
    value: "visitor"
  },
  {
    label: "Manager",
    value: "manager",
  }, {
    label: "Auditor",
    value: "auditor",
  }, {
    label: "Risk Manager",
    value: "risk-manager",
  }, {
    label: "Compliance Professional",
    value: "compliance-professional",
  }
]
export const ROLES_AR: Select[] = [
  {
    label: "زائر",
    value: "visitor"
  },
  {
    label: "مدير",
    value: "manager",
  }, {
    label: "مدقق",
    value: "auditor",
  }, {
    label: "مدير المخاطر",
    value: "risk-manager",
  }, {
    label: "مهني الامتثال",
    value: "compliance-professional",
  }
]

export const GET_ROLES = (lang: "ar" | "en" | undefined) => lang === "ar" ? ROLES_AR : ROLES

export const AuthenticatedUserMock: User = {
  firstName: "Ahmed",
  lastName: "Elbouchouki",
  email: "elbouchoukigamer@gmail.com",
  displayName: "Elbouchouki Ahmed",
  avatar: "/avatars/avatar3.png",
  id: UUID(),
  role: "Admin",
  active: true,
  tenant: "tenant-2",
  created_at: new Date(),
  updated_at: new Date(),
};

export const USERS_MOCK: User[] = [
  AuthenticatedUserMock,
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    displayName: "John Doe",
    avatar: "/avatars/avatar2.png",
    id: UUID(),
    role: "Compliance Professional",
    active: true,
    tenant: "tenant-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    firstName: "Bob",
    lastName: "Marly",
    email: "bob.marly@gmail.com",
    displayName: "Bob Marly",
    avatar: "/avatars/avatar1.png",
    id: UUID(),
    role: "Risk Manager",
    active: false,
    tenant: "tenant-2",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const TAG_MOCK: Tag[] = [
  {
    id: UUID(),
    name: "tag 1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 2",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 3",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 4",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 5",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 6",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const EVIDENCE_MOCK: Evidence[] = evidenceJson.map((evidence) => ({
  id: UUID(),
  name: evidence.name,
  reference: evidence.ref,
  description: evidence.description,
  content: evidence.content,
  created_at: new Date(),
  updated_at: new Date(),
}));

export const ASSASSEMENET_OBJECTIVE_MOCK: AssessmentObjectives[] =
  AssessmentObjectiveJson.map((Assessment) => ({
    id: Assessment.id,
    controlId: Assessment.controlId,
    objective: Assessment.objective,
  }));

const additional_info = `
<p>Vendor recommendations are a critical aspect of complying with the PCI DSS framework. When an organization handles credit card data, it often relies on various vendors for technology and services that may interact with or impact the security of this sensitive information. To ensure compliance with PCI DSS, organizations should consider the following vendor-related recommendations:</p>
<span><strong>Vendor Selection:</strong> Choose vendors carefully. Prioritize vendors who understand PCI DSS requirements and can demonstrate compliance with them. Assess their security practices and policies before engaging their services.</span>
<span><strong>Vendor Due Diligence:</strong> Conduct thorough due diligence on potential vendors. This includes assessing their security controls, performing background checks, and reviewing their track record with regard to data breaches or security incidents.</span>
<span><strong>Contractual Obligations:</strong> Include specific PCI DSS compliance requirements in vendor contracts. Clearly define each party's responsibilities for maintaining security controls and compliance.</span>
<span><strong>Regular Assessments:</strong> Implement a process for regularly assessing vendor compliance with PCI DSS. This may involve on-site audits, reviewing their security documentation, and ensuring they adhere to agreed-upon security standards.</span>
<span><strong>Third-Party Validation:</strong> Consider using third-party assessors to verify a vendor's compliance with PCI DSS. This can provide an objective assessment of their security measures.</span>
<span><strong>Incident Response:</strong> Ensure that vendors have robust incident response plans in place. In the event of a data breach or security incident involving credit card data, it's vital that vendors respond swiftly and effectively to mitigate any potential damage.</span>
<span><strong>Data Handling:</strong> Clearly define how vendors should handle credit card data. This includes encryption, secure transmission, and secure storage practices. Ensure that vendors are only given access to the data they need to perform their services.</span>
<span><strong>Security Patching:</strong> Ensure that vendors promptly apply security patches and updates to their systems and software to protect against known vulnerabilities.</span>
<span><strong>Monitoring and Logging:</strong> Collaborate with vendors to establish robust monitoring and logging practices. This helps detect and respond to security threats promptly.</span>
<span><strong>Incident Reporting:</strong> Require vendors to report security incidents or breaches promptly. A clear communication channel should be established to ensure that any issues are addressed swiftly.</span>
<span><strong>Compliance Documentation:</strong> Collect and retain documentation from vendors that demonstrates their ongoing compliance with PCI DSS. This can include attestation of compliance (AoC) reports or other relevant documentation.</span>
<span><strong>Contingency Planning:</strong> Develop contingency plans in case a vendor fails to meet PCI DSS requirements or experiences a security breach. These plans should include steps to mitigate risks and transition to alternative vendors if necessary.</span>
<span><strong>Education and Training:</strong> Educate vendors about the importance of PCI DSS compliance and provide training on security best practices, especially if they handle credit card data.</span>
<p>In summary, effective management of vendor relationships is a crucial element of PCI DSS compliance. By selecting, monitoring, and collaborating with vendors who prioritize security and compliance, organizations can significantly reduce the risk of data breaches and maintain the security of credit card data in accordance with PCI DSS requirements.</p>
`;

export const FRAMWORK_MOCK: Framework[] = frameworksJson.map((framework) => ({
  id: UUID(),
  name: framework.name,
  description:
    framework.name +
    " framework is a set of security controls designed for startups to quickly and effectively set up their environment. The controls are rather opinionated and will suggest specific tooling. The tooling and environment recommendations are not required, but the standard is designed to reduce the amount of decisions that a startup must make. The controls are also roughly in order and it is recommended to start with control 1 (e.g. ssf1) and go down the list. The order is not mandatory but it makes the most sense for dependencies. There are a total of 20 controls in the framework and if all 20 controls are completed, your security risk will be greatly reduced. The SSF framework also works nicely with other large name frameworks such as CSC, NIST, CMMC (in other words, there is nothing in SSF that would be frowned upon in other frameworks). ",
  additional_information: additional_info,
  created_at: new Date(),
  updated_at: new Date(),
  // controls: getRandomSubArray(CONTROLE_MOCK, Math.floor(Math.random() * CONTROLE_MOCK.length)),
}));

// MATURITY LEVELS //
export const MATURITY_LEVELS_MOCK: MaturityLevel[] = [
  {
    id: "Unanswered",
    label: "Unanswered",
    value: "unanswered",
    color: "bg-gray-500 hover:bg-gray-600",
    description: "",
  },
  {
    id: "L0",
    label: "Not Performed",
    value: "notPerformed",
    color: "bg-red-500 hover:bg-red-600",
    description:
      "Practices are non-existent. A reasonable person would conclude the control is not being performed.",
  },
  {
    id: "L1",
    label: "Performed Informally",
    value: "performedInformally",
    color: "bg-yellow-500 hover:bg-yellow-600",
    description:
      "Practices are “ad hoc” where the intent of the control is not met due to a lack of consistency and formality. A reasonable person would conclude the control is not consistently performed in a structured manner. ",
  },
  {
    id: "L2",
    label: "Planned & Tracked",
    value: "plannedAndTracked",
    color: "bg-green-500 hover:bg-green-600",
    description:
      "Practices are “requirements-driven” where the intent of control is met in some circumstances, but not standardized across the entire organization.",
  },
  {
    id: "L3",
    label: "Well Defined",
    value: "wellDefined",
    color: "bg-blue-500 hover:bg-blue-600",
    description:
      "Practices are standardized “enterprise-wide” where the control is well-defined and standardized across the entire organization. ",
  },
  {
    id: "L4",
    label: "Quantitatively Controlled",
    value: "quantitativelyControlled",
    color: "bg-indigo-500 hover:bg-indigo-600",
    description:
      "Practices are “metrics-driven” where the control builds on L3 maturity, but has detailed metrics to enable governance oversight. ",
  },
  {
    id: "L5",
    label: "Continuously Improving",
    value: "continuouslyImproving",
    color: "bg-purple-500 hover:bg-purple-600",
    description:
      "Practices are “world-class” where the control builds on L4 maturity, but is continuously improving through automation (e.g., AI, machine learning, etc.) ",
  },
];
export const MATURITY_LEVELS_MOCK_AR: MaturityLevel[] = [
  {
    id: "Unanswered",
    label: "بدون إجابة",
    value: "unanswered",
    color: "bg-gray-500 hover:bg-gray-600",
    description: "",
  },
  {
    id: "L0",
    label: "غير منجز",
    value: "notPerformed",
    color: "bg-red-500 hover:bg-red-600",
    description:
      "الممارسات غير موجودة. سيستنتج الشخص العاقل أن الرقابة لا تتم بالفعل",
  },
  {
    id: "L1",
    label: "تنفيذ عشوائي",
    value: "performedInformally",
    color: "bg-yellow-500 hover:bg-yellow-600",
    description:
      "الممارسات هي 'عشوائية' حيث لا يتم تحقيق نية الرقابة بسبب عدم وجود الاستمرارية والصياغة. سيستنتج الشخص العاقل أن الرقابة لا تُنفَّذ بانتظام بطريقة منهجية",
  },
  {
    id: "L2",
    label: "مخططة ومتتبعة",
    value: "plannedAndTracked",
    color: "bg-green-500 hover:bg-green-600",
    description:
      "الممارسات هي 'مدفوعة بالمتطلبات' حيث يتم تحقيق نية الرقابة في بعض الحالات، ولكنها ليست موحدة عبر المؤسسة بأكملها",
  },
  {
    id: "L3",
    label: "محددة بشكل جيد",
    value: "wellDefined",
    color: "bg-blue-500 hover:bg-blue-600",
    description:
      "الممارسات موحدة على مستوى المؤسسة حيث يتم تحديد الرقابة جيدًا وتوحيدها عبر المؤسسة بأكملها",
  },
  {
    id: "L4",
    label: "تحكم بشكل كمي",
    value: "quantitativelyControlled",
    color: "bg-indigo-500 hover:bg-indigo-600",
    description:
      "الممارسات مدفوعة بالمقاييس حيث تعتمد الرقابة على نضوج المستوى L3، ولكنها تحتوي على مقاييس مفصلة لتمكين الرقابة والإشراف",
  },
  {
    id: "L5",
    label: "تحسين مستمر",
    value: "continuouslyImproving",
    color: "bg-purple-500 hover:bg-purple-600",
    description:
      "الممارسات على مستوى 'عالمي' حيث تعتمد الرقابة على نضوج المستوى L4، ولكنها تتطور باستمرار من خلال التلقائية (مثل الذكاء الاصطناعي وتعلم الآلة وغيرها)",
  },
];
export const GET_MATURITY_LEVELS = (lang: "ar" | "en" | undefined) =>
  lang === "ar" ? MATURITY_LEVELS_MOCK_AR : MATURITY_LEVELS_MOCK;
// --------------- //
const RISK_STATUS_EN: RiskStatus[] = [
  {
    id: "rs1",
    value: "Avoidance"
  },
  {
    id: "rs2",
    value: "Mitigation"
  },
  {
    id: "rs3",
    value: "Transfer"
  },
  {
    id: "rs4",
    value: "Acceptance"
  },
  {
    id: "rs5",
    value: "Triggered"
  },
  {
    id: "rs6",
    value: "Closed"
  },
  {
    id: "rs7",
    value: "Other"
  },
];

const RISK_STATUS_AR: RiskStatus[] = [
  {
    id: "rs1",
    value: "تجنب"
  },
  {
    id: "rs2",
    value: "تخفيف"
  },
  {
    id: "rs3",
    value: "تحويل"
  },
  {
    id: "rs4",
    value: "قبول"
  },
  {
    id: "rs5",
    value: "أثار"
  },
  {
    id: "rs6",
    value: "مغلق"
  },
  {
    id: "rs7",
    value: "آخر"
  },
];

export const RISK_STATUS = (lang: 'ar' | 'en' | undefined) => lang === 'ar' ? RISK_STATUS_AR : RISK_STATUS_EN;

const EN_CATEGORY: Category[] = [
  {
    id: "c1",
    value: "Business & Strategic",
    subCategory: [{
      id: "s1",
      value: "Commercial",
    }, {
      id: "s2",
      value: "Reputation",
    }, {
      id: "s3",
      value: "Stakeholder",
    }, {
      id: "s4",
      value: "Technology & Obsolescence",
    }, {
      id: "s5",
      value: "Lawsuit",
    }, {
      id: "s6",
      value: "Product Recall",
    }, {
      id: "s7",
      value: "Negative Publicity",
    }]
  },
  {
    id: "c2",
    value: "Environmental & Tornadoes",
    subCategory: [{
      id: "s8",
      value: "Hurricanes & Tornadoes",
    }, {
      id: "s9",
      value: "High Winds",
    }, {
      id: "s10",
      value: "Plate Tectonics",
    }, {
      id: "s11",
      value: "Earthquake",
    }, {
      id: "s12",
      value: "Building Strength",
    }, {
      id: "s13",
      value: "Asteroids",
    }, {
      id: "s14",
      value: "Volcanoes",
    }, {
      id: "s15",
      value: "Radioactive Decay",
    }, {
      id: "s16",
      value: "Radiation",
    }, {
      id: "s17",
      value: "Asbestos",
    }, {
      id: "s18",
      value: "Ground Water",
    }, {
      id: "s19",
      value: "Sea Level",
    }, {
      id: "s20",
      value: "Coastal Erosion",
    }]
  },
  {
    id: "c3",
    value: "Project",
    subCategory: [{
      id: "s21",
      value: "Scope Risks",
    }, {
      id: "s22",
      value: "Schedule Risks",
    }, {
      id: "s23",
      value: "Resource Risks",
    }, {
      id: "s24",
      value: "Stakeholder Risks",
    }]
  },
  {
    id: "c4",
    value: "Compliance",
    subCategory: [{
      id: "s25",
      value: "Legal"
    }, {
      id: "s26",
      value: "Regulatory"
    }, {
      id: "s27",
      value: "Environmental"
    }, {
      id: "s28",
      value: "Ethical"
    }, {
      id: "s29",
      value: "Workplace Health & Safety"
    }, {
      id: "s30",
      value: "Corrupt Practice"
    }, {
      id: "s31",
      value: "Social Responsibility"
    }, {
      id: "s32",
      value: "Quality"
    }, {
      id: "s33",
      value: "Process"
    }]
  },
  {
    id: "c5",
    value: "Financial",
    subCategory: [{
      id: "s34",
      value: "Budget"
    }, {
      id: "s35",
      value: "Cost"
    }, {
      id: "s36",
      value: "Funding"
    }, {
      id: "s37",
      value: "Economic"
    }, {
      id: "s38",
      value: "Credit"
    }, {
      id: "s39",
      value: "Insurance"
    }, {
      id: "s40",
      value: "Pension"
    }, {
      id: "s41",
      value: "Market"
    }]
  },
  {
    id: "c6",
    value: "Operational & Infrastructure",
    subCategory: [{
      id: "s42",
      value: "People"
    }, {
      id: "s43",
      value: "Systems & Equipment"
    }, {
      id: "s44",
      value: "Legal & Compliance"
    }, {
      id: "s45",
      value: "Security"
    }, {
      id: "s46",
      value: "Project"
    }, {
      id: "s47",
      value: "External Events"
    }, {
      id: "s48",
      value: "Business Processes"
    }]
  }, {
    id: "c7",
    value: "External",
    subCategory: [{
      id: "s49",
      value: "Political"
    },
    {
      id: "s50",
      value: "Natural Disaster"
    },
    {
      id: "s51",
      value: "Market"
    },
    {
      id: "s52",
      value: "Technological"
    }]
  }
]

const AR_CATEGORY: Category[] = [
  {
    id: "c1",
    value: "الأعمال والاستراتيجية",
    subCategory: [{
      id: "s1",
      value: "تجاري",
    }, {
      id: "s2",
      value: "سمعة",
    }, {
      id: "s3",
      value: "أصحاب المصلحة",
    }, {
      id: "s4",
      value: "التكنولوجيا والتقادم",
    }, {
      id: "s5",
      value: "دعوى قضائية",
    }, {
      id: "s6",
      value: "سحب السلع",
    }, {
      id: "s7",
      value: "سلبية العامة",
    }]
  },
  {
    id: "c2",
    value: "البيئية والأعاصير",
    subCategory: [{
      id: "s8",
      value: "الزوابع و الاعاصير",
    }, {
      id: "s9",
      value: "الرياح العاتية",
    }, {
      id: "s10",
      value: "الصفائح التكتونية",
    }, {
      id: "s11",
      value: "هزة أرضية",
    }, {
      id: "s12",
      value: "ضعف البناء",
    }, {
      id: "s13",
      value: "الكويكبات",
    }, {
      id: "s14",
      value: "البراكين",
    }, {
      id: "s15",
      value: "الاضمحلال الإشعاعي",
    }, {
      id: "s16",
      value: "إشعاع",
    }, {
      id: "s17",
      value: "الحرير الصخري",
    }, {
      id: "s18",
      value: "المياه الجوفية",
    }, {
      id: "s19",
      value: "مستوى سطح البحر",
    }, {
      id: "s20",
      value: "تآكل الساحل",
    }]
  },
  {
    id: "c3",
    value: "مشروع",
    subCategory: [{
      id: "s21",
      value: "مخاطر النطاق",
    }, {
      id: "s22",
      value: "مخاطر الجدول الزمني",
    }, {
      id: "s23",
      value: "مخاطر الموارد",
    }, {
      id: "s24",
      value: "مخاطر أصحاب المصلحة",
    }]
  },
  {
    id: "c4",
    value: "امتثال",
    subCategory: [{
      id: "s25",
      value: "قانوني"
    }, {
      id: "s26",
      value: "تنظيمية"
    }, {
      id: "s27",
      value: "البيئية"
    }, {
      id: "s28",
      value: "أخلاقية"
    }, {
      id: "s29",
      value: "الصحة والسلامة في مكان العمل"
    }, {
      id: "s30",
      value: "الممارسة الفاسدة"
    }, {
      id: "s31",
      value: "مسؤولية اجتماعية"
    }, {
      id: "s32",
      value: "جودة"
    }, {
      id: "s33",
      value: "عملية"
    }]
  },
  {
    id: "c5",
    value: "مالي",
    subCategory: [{
      id: "s34",
      value: "ميزانية"
    }, {
      id: "s35",
      value: "تكلفة"
    }, {
      id: "s36",
      value: "التمويل"
    }, {
      id: "s37",
      value: "اقتصادي"
    }, {
      id: "s38",
      value: "ائتمان"
    }, {
      id: "s39",
      value: "تأمين"
    }, {
      id: "s40",
      value: "مَعاش"
    }, {
      id: "s41",
      value: "سوق"
    }]
  },
  {
    id: "c6",
    value: "التشغيلية والبنية التحتية",
    subCategory: [{
      id: "s42",
      value: "الناس"
    }, {
      id: "s43",
      value: "الأنظمة والمعدات"
    }, {
      id: "s44",
      value: "الامتثال القانوني"
    }, {
      id: "s45",
      value: "حماية"
    }, {
      id: "s46",
      value: "مشروع"
    }, {
      id: "s47",
      value: "الأحداث الخارجية"
    }, {
      id: "s48",
      value: "العمليات التجارية"
    }]
  },
  {
    id: "c7",
    value: "خارجي",
    subCategory: [{
      id: "s49",
      value: "سياسي"
    },
    {
      id: "s50",
      value: "كارثة طبيعية"
    },
    {
      id: "s51",
      value: "سوق"
    },
    {
      id: "s52",
      value: "التكنولوجية"
    }]
  }
]

export const CATEGORY = (lang: "ar" | "en" | undefined) => lang === "ar" ? AR_CATEGORY : EN_CATEGORY

const SUBC_EN: Category[] = [
  {
    id: "s1",
    value: "Commercial",
  }, {
    id: "s2",
    value: "Reputation",
  }, {
    id: "s3",
    value: "Stakeholder",
  }, {
    id: "s4",
    value: "Technology & Obsolescence",
  }, {
    id: "s5",
    value: "Lawsuit",
  }, {
    id: "s6",
    value: "Product Recall",
  }, {
    id: "s7",
    value: "Negative Publicity",
  },
  {
    id: "s8",
    value: "Hurricanes & Tornadoes",
  }, {
    id: "s9",
    value: "High Winds",
  }, {
    id: "s10",
    value: "Plate Tectonics",
  }, {
    id: "s11",
    value: "Earthquake",
  }, {
    id: "s12",
    value: "Building Strength",
  }, {
    id: "s13",
    value: "Asteroids",
  }, {
    id: "s14",
    value: "Volcanoes",
  }, {
    id: "s15",
    value: "Radioactive Decay",
  }, {
    id: "s16",
    value: "Radiation",
  }, {
    id: "s17",
    value: "Asbestos",
  }, {
    id: "s18",
    value: "Ground Water",
  }, {
    id: "s19",
    value: "Sea Level",
  }, {
    id: "s20",
    value: "Coastal Erosion",
  },
  {
    id: "s21",
    value: "Scope Risks",
  }, {
    id: "s22",
    value: "Schedule Risks",
  }, {
    id: "s23",
    value: "Resource Risks",
  }, {
    id: "s24",
    value: "Stakeholder Risks",
  },
  {
    id: "s25",
    value: "Legal"
  }, {
    id: "s26",
    value: "Regulatory"
  }, {
    id: "s27",
    value: "Environmental"
  }, {
    id: "s28",
    value: "Ethical"
  }, {
    id: "s29",
    value: "Workplace Health & Safety"
  }, {
    id: "s30",
    value: "Corrupt Practice"
  }, {
    id: "s31",
    value: "Social Responsibility"
  }, {
    id: "s32",
    value: "Quality"
  }, {
    id: "s33",
    value: "Process"
  },
  {
    id: "s34",
    value: "Budget"
  }, {
    id: "s35",
    value: "Cost"
  }, {
    id: "s36",
    value: "Funding"
  }, {
    id: "s37",
    value: "Economic"
  }, {
    id: "s38",
    value: "Credit"
  }, {
    id: "s39",
    value: "Insurance"
  }, {
    id: "s40",
    value: "Pension"
  }, {
    id: "s41",
    value: "Market"
  },
  {
    id: "s42",
    value: "People"
  }, {
    id: "s43",
    value: "Systems & Equipment"
  }, {
    id: "s44",
    value: "Legal & Compliance"
  }, {
    id: "s45",
    value: "Security"
  }, {
    id: "s46",
    value: "Project"
  }, {
    id: "s47",
    value: "External Events"
  }, {
    id: "s48",
    value: "Business Processes"
  },
  {
    id: "s49",
    value: "Political"
  },
  {
    id: "s50",
    value: "Natural Disaster"
  },
  {
    id: "s51",
    value: "Market"
  },
  {
    id: "s52",
    value: "Technological"
  }
];

const SUBC_AR: Category[] = [
  {
    id: "s1",
    value: "تجاري",
  }, {
    id: "s2",
    value: "سمعة",
  }, {
    id: "s3",
    value: "أصحاب المصلحة",
  }, {
    id: "s4",
    value: "التكنولوجيا والتقادم",
  }, {
    id: "s5",
    value: "دعوى قضائية",
  }, {
    id: "s6",
    value: "سحب السلع",
  }, {
    id: "s7",
    value: "سلبية العامة",
  },
  {
    id: "s8",
    value: "الزوابع و الاعاصير",
  }, {
    id: "s9",
    value: "الرياح العاتية",
  }, {
    id: "s10",
    value: "الصفائح التكتونية",
  }, {
    id: "s11",
    value: "هزة أرضية",
  }, {
    id: "s12",
    value: "ضعف البناء",
  }, {
    id: "s13",
    value: "الكويكبات",
  }, {
    id: "s14",
    value: "البراكين",
  }, {
    id: "s15",
    value: "الاضمحلال الإشعاعي",
  }, {
    id: "s16",
    value: "إشعاع",
  }, {
    id: "s17",
    value: "الحرير الصخري",
  }, {
    id: "s18",
    value: "المياه الجوفية",
  }, {
    id: "s19",
    value: "مستوى سطح البحر",
  }, {
    id: "s20",
    value: "تآكل الساحل",
  },
  {
    id: "s21",
    value: "مخاطر النطاق",
  }, {
    id: "s22",
    value: "مخاطر الجدول الزمني",
  }, {
    id: "s23",
    value: "مخاطر الموارد",
  }, {
    id: "s24",
    value: "مخاطر أصحاب المصلحة",
  },
  {
    id: "s25",
    value: "قانوني"
  }, {
    id: "s26",
    value: "تنظيمية"
  }, {
    id: "s27",
    value: "البيئية"
  }, {
    id: "s28",
    value: "أخلاقية"
  }, {
    id: "s29",
    value: "الصحة والسلامة في مكان العمل"
  }, {
    id: "s30",
    value: "الممارسة الفاسدة"
  }, {
    id: "s31",
    value: "مسؤولية اجتماعية"
  }, {
    id: "s32",
    value: "جودة"
  }, {
    id: "s33",
    value: "عملية"
  },
  {
    id: "s34",
    value: "ميزانية"
  }, {
    id: "s35",
    value: "تكلفة"
  }, {
    id: "s36",
    value: "التمويل"
  }, {
    id: "s37",
    value: "اقتصادي"
  }, {
    id: "s38",
    value: "ائتمان"
  }, {
    id: "s39",
    value: "تأمين"
  }, {
    id: "s40",
    value: "مَعاش"
  }, {
    id: "s41",
    value: "سوق"
  },
  {
    id: "s42",
    value: "الناس"
  }, {
    id: "s43",
    value: "الأنظمة والمعدات"
  }, {
    id: "s44",
    value: "الامتثال القانوني"
  }, {
    id: "s45",
    value: "حماية"
  }, {
    id: "s46",
    value: "مشروع"
  }, {
    id: "s47",
    value: "الأحداث الخارجية"
  }, {
    id: "s48",
    value: "العمليات التجارية"
  },
  {
    id: "s49",
    value: "سياسي"
  },
  {
    id: "s50",
    value: "كارثة طبيعية"
  },
  {
    id: "s51",
    value: "سوق"
  },
  {
    id: "s52",
    value: "التكنولوجية"
  }
]

export const SUBCATEGORY = (lang: "ar" | "en" | undefined) => lang === "ar" ? SUBC_AR : SUBC_EN

export const IMPACT = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
]



export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']

export const GET_MONTHS = (lang: "ar" | "en" | undefined) => lang === "ar" ? MONTHS_AR : MONTHS


export const SEVERITY_LEVEL: Select[] = [
  {
    label: "Critical",
    value: "critical"
  },
  {
    label: "High",
    value: "high"

  },
  {
    label: "Meduim",
    value: "meduim"

  },
  {
    label: "Low",
    value: "low"
  },
]
export const SEVERITY_LEVEL_AR: Select[] = [
  {
    label: "حرج",
    value: "critical"
  },
  {
    label: "عالي",
    value: "high"

  },
  {
    label: "متوسط",
    value: "meduim"

  },
  {
    label: "منخفض",
    value: "low"
  },
]


export const GET_SEVERITY_LEVEL = (lang: "ar" | "en" | undefined) => lang === "ar" ? SEVERITY_LEVEL_AR : SEVERITY_LEVEL




export const COMPLIANCE_AUDIT_FINDING = [
  "Non Compliance",
  "Internal control system",
  "Procedural or Documentation Issues",
  "Operational inefficiencies",
  "Lack of Training of Awareness",
  "Data Integrity or Security Issues",
  "Vendor or Third-Party Risks",
  "Financial Irregularities",
  "Recommandations for Improvement"
]
export const COMPLIANCE_AUDIT_FINDING_AR = [
  "عدم الامتثال",
  "نظام الرقابة الداخلي",
  "قضايا إجرائية أو توثيق",
  "عجز تشغيلي",
  "نقص التدريب أو الوعي",
  "قضايا نزاهة البيانات أو الأمان",
  "مخاطر البائع أو الجهة الثالثة",
  "تجاوزات مالية",
  "توصيات للتحسين"
]


export const GET_COMPLIANCE_AUDIT_FINDING = (lang: "ar" | "en" | undefined) => lang === "ar" ? COMPLIANCE_AUDIT_FINDING_AR : COMPLIANCE_AUDIT_FINDING
export const CONTROLE_MOCK: Control[] = controlJson.map((control) => {
  const m =
    MATURITY_LEVELS_MOCK[
    Math.floor(Math.random() * MATURITY_LEVELS_MOCK.length)
    ];
  return {
    id: control.id,
    name: control.name,
    description: control.description,
    methods: control.methods,
    question: control.question,
    category: control.category,
    targetMaturity:
      MATURITY_LEVELS_MOCK[
      Math.floor(Math.random() * MATURITY_LEVELS_MOCK.length)
      ],
    maturityFilter: m.value,
    maturity: {
      id: "Unanswered",
      label: "Unanswered",
      value: "unanswered",
      description: "",
    },
    framework:
      FRAMWORK_MOCK[Math.floor(Math.random() * FRAMWORK_MOCK.length)].id,
    Assessments: ASSASSEMENET_OBJECTIVE_MOCK.filter(
      (Assessment) => Assessment.controlId === control.id
    ),
    updatedAt: generateRandomDate(
      new Date(new Date().setDate(new Date().getDate() - 10)),
      new Date()
    ),
    group: control.group,
    weight: control.weight,
  };
});

// TODO: Randomized values to be changed to real (no solution found for the moment)
FRAMWORK_MOCK.forEach((framework) => {
  framework.controls = CONTROLE_MOCK.filter(
    (control) => control.framework === framework.id
  );
});

export const POLICIES_MOCK: Policy[] = [
  {
    id: UUID(),
    name: "Media",
    description: "Content for the media policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "Confidentiality",
    description: "Content for the confidentiality policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "Incident",
    description: "Content for the confidentiality policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
export const LABELS_MOCK: Label[] = [
  {
    id: UUID(),
    key: "policy_label_security_email",
    value: "Policy - Security - Email",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    key: "policy_label_confidentiality",
    value: "Policy - Confidentiality",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    key: "policy_label_security",
    value: "Policy - Security",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
export const TENANTS_MOCK: Tenant[] = [
  {
    reference: "REF-0001",
    id: "tenant-1",
    name: "Tenant 1",
    contact_email: "ebouchoukigamer@gmail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    reference: "tenant-2",
    id: "tenant-2",
    name: "Tenant 2",
    contact_email: "ebouchoukigamer@gmail.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
export const QUESTIONNAIRES_MOCK: any = [
  {
    name: "Network Security Assessment",
    vendor: "ABC Security Solutions",
    description: "Assess the security of your network infrastructure.",
    questions: [
      { value: "Do you have a firewall in place?" },
      {
        value:
          "Are your network devices regularly updated with security patches?",
      },
      { value: "Do you perform regular vulnerability assessments?" },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    id: Math.random().toString(36).substr(2, 9),
  },
  {
    name: "Employee Security Training",
    vendor: "XYZ Cybersecurity",
    description:
      "Train your employees to recognize and respond to security threats.",
    questions: [
      { value: "Do employees receive regular cybersecurity training?" },
      { value: "Is there a clear incident response plan in place?" },
      { value: "Are phishing awareness campaigns conducted regularly?" },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    id: Math.random().toString(36).substr(2, 9),
  },
  {
    name: "Penetration Testing",
    vendor: "SecureTech PenTest",
    description: "Identify vulnerabilities through controlled testing.",
    questions: [
      { value: "Have you conducted a penetration test in the last 6 months?" },
      {
        value:
          "Do you remediate vulnerabilities identified during penetration testing?",
      },
      { value: "Is penetration testing performed by an external party?" },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    id: Math.random().toString(36).substr(2, 9),
  },
];
export const FQA_MOCK: FQA[] = [
  {
    question: "What is the primary purpose of the compliance app?",
    answer:
      "The compliance app is a powerful SaaS solution designed to help organizations effectively manage and maintain compliance with various industry regulations and internal policies. It enables users to create and manage compliance frameworks, oversee multiple tenants or subsidiaries, and track compliance progress across various projects.",
    id: UUID(),
  },
  {
    question: "How do I get started with the compliance app?",
    answer:
      "To begin using the compliance app, first sign up for an account on our website. After registration, you can access the app via the web portal or download our mobile app. Once logged in, you can create frameworks, add tenants, and start managing compliance projects.",
    id: UUID(),
  },
  {
    question: "How often should I use the compliance app?",
    answer:
      "The frequency of app usage depends on your organization's specific needs and compliance requirements. Typically, users engage with the app regularly to monitor compliance progress, update frameworks, and manage projects effectively. We recommend ongoing use to stay aligned with changing compliance standards.",
    id: UUID(),
  },
  {
    question: "Is the compliance app available on both iOS and Android?",
    answer:
      "Yes, the compliance app is accessible via web browsers and is also available for download on both iOS and Android platforms. This multi-platform accessibility ensures flexibility and convenience for users.",
    id: UUID(),
  },
  {
    question: "Can I customize the compliance framework in the app?",
    answer:
      "Absolutely. The compliance app offers a high degree of customization. You can create, modify, and adapt compliance frameworks to meet the specific needs of your industry and organization. Tailoring frameworks allows you to address unique compliance requirements effectively.",
    id: UUID(),
  },
  {
    question: "What types of compliance regulations does the app cover?",
    answer:
      "Our compliance app covers a comprehensive range of compliance regulations, including industry-specific standards, regional requirements, and international regulations. You can select and implement the frameworks that best suit your organization's compliance needs.",
    id: UUID(),
  },
  {
    question: "Is my data secure when using the compliance app?",
    answer:
      "Data security is our top priority. The compliance app employs robust encryption protocols and adheres to industry best practices to ensure the confidentiality and integrity of your data. We regularly update our security measures to protect against emerging threats.",
    id: UUID(),
  },
  {
    question:
      "How can I receive updates and notifications about compliance changes?",
    answer:
      "Stay informed with ease. The compliance app provides in-app notifications and also offers the option to subscribe to email alerts. These notifications will keep you up-to-date on compliance changes, ensuring that you can adapt your strategies promptly.",
    id: UUID(),
  },
  {
    question:
      "Is there a dedicated support team available if I have questions or issues?",
    answer:
      "Absolutely. We have a dedicated support team available around the clock to assist you with any questions or issues you may encounter while using the app. You can reach out via email, phone, or our live chat support for immediate assistance.",
    id: UUID(),
  },
  {
    question: "Can I export compliance reports from the app?",
    answer:
      "Yes, the compliance app provides robust reporting capabilities. You can generate comprehensive compliance reports and export them in various formats, such as PDF or CSV. These reports are invaluable for audits, presentations, and internal documentation.",
    id: UUID(),
  },
];
export const ASSESSMENTS_SCOPE_STATUS: ScopeStatusObject[] = [
  {
    label: "Planned",
    value: "planned",
  },
  {
    label: "In Progress",
    value: "in-progress",
  },
  {
    label: "Completed",
    value: "completed",
  },
];
export const ASSESSMENTS_SCOPE_STATUS_AR: ScopeStatusObject[] = [
  {
    label: "مخطط",
    value: "planned",
  },
  {
    label: "قيد التنفيذ",
    value: "in-progress",
  },
  {
    label: "مكتمل",
    value: "completed",
  },
];
export const GET_ASSESSMENTS_SCOPE_STATUS = (lang: "ar" | "en" | undefined) =>
  lang === "ar" ? ASSESSMENTS_SCOPE_STATUS_AR : ASSESSMENTS_SCOPE_STATUS;

export const ASSESSMENTS_SCOPE_TYPES: ScopeTypesObject[] = [
  {
    label: "Internal",
    value: "internal",
  },
  {
    label: "External",
    value: "external",
  },
  {
    label: "Both",
    value: "both",
  },
];
export const ASSESSMENTS_SCOPE_TYPES_AR: ScopeTypesObject[] = [
  {
    label: "داخلي",
    value: "internal",
  },
  {
    label: "خارجي",
    value: "external",
  },
  {
    label: "كلاهما",
    value: "both",
  },
];
export const GET_ASSESSMENTS_SCOPE_TYPES = (lang: "ar" | "en" | undefined) =>
  lang === "ar" ? ASSESSMENTS_SCOPE_TYPES_AR : ASSESSMENTS_SCOPE_TYPES;


export const RISK_ASSESSMENTS_SCOPE_TYPES: RiskScopeTypeObject[] = [
  {
    label: "Entreprise-wide",
    value: "entreprise-wide"
  }, {
    label: "Operational",
    value: "operational"
  }, {
    label: "Information Security",
    value: "information-security"
  }, {
    label: "Financial",
    value: "financial"
  }, {
    label: "Compliance",
    value: "compliance"
  }, {
    label: "Project",
    value: "project"
  }, {
    label: "Hazard",
    value: "hazard"
  }
]

export const RISK_ASSESSMENT_SCOPE_TYPES_AR: RiskScopeTypeObject[] = [
  {
    label: "على مستوى المؤسسة",
    value: "entreprise-wide"
  }, {
    label: "تشغيلي",
    value: "operational"
  }, {
    label: "أمن المعلومات",
    value: "information-security"
  }, {
    label: "مالي",
    value: "financial"
  }, {
    label: "امتثال",
    value: "compliance"
  }, {
    label: "مشروع",
    value: "project"
  }, {
    label: "خطر",
    value: "hazard"
  }
]

export const GET_RISK_ASSESSMENTS_SCOPE_TYPES = (lang: "ar" | "en" | undefined) => lang === "ar" ? RISK_ASSESSMENT_SCOPE_TYPES_AR : RISK_ASSESSMENTS_SCOPE_TYPES


export const ASSESSMENTS_SCOPE_MOCK: AssessmentScope[] = [
  {
    id: UUID(),
    name: "Scope 1",
    description: "Scope 1 description",
    reportingFrom: new Date(),
    reportingTo: new Date(),
    status: "planned",
    type: "internal",
    controls: getRandomSubArray(FRAMWORK_MOCK, 2).flatMap(
      (framework) => framework.controls
    ),
  },
  {
    id: UUID(),
    name: "Scope 2",
    description: "Scope 2 description",
    reportingFrom: new Date(),
    reportingTo: new Date(),
    status: "in-progress",
    type: "external",
    controls: getRandomSubArray(FRAMWORK_MOCK, 2).flatMap(
      (framework) => framework.controls
    ),
  },
];

const XLSX_LABELS_EN = [
  {
    label: "Id",
    key: "id"
  },
  {
    label: "Risk Name",
    key: "riskName"
  },
  {
    label: "Description",
    key: "description"
  },
  {
    label: "Owner",
    key: "owner"
  },
  {
    label: "Create Date",
    key: "dateRaised"
  },
  {
    label: "Consequences",
    key: "consequences"
  },
  {
    label: "Affected Asset",
    key: "affectedAsset"
  },
  {
    label: "Impact",
    key: "impact"
  },
  {
    label: "Likelihood",
    key: "likelihood"
  },
  {
    label: "Inherent Risk Score",
    key: "priority"
  },
  {
    label: "Residual Risk Score",
    key: "residualRiskScore"
  },
  {
    label: "Category",
    key: "category"
  },
  {
    label: "Subcategory",
    key: "subCategory"
  },
  // {
  //   label: "Tags",
  //   key: "tag"
  // },
  {
    label: "Risk Status",
    key: "riskStatus"
  },
]

const XLSX_LABELS_AR = [
  {
    "label": "Id",
    "key": "id"
  },
  {
    "label": "اسم المخاطرة",
    "key": "riskName"
  },
  {
    "label": "الوصف",
    "key": "description"
  },
  {
    "label": "المالك",
    "key": "owner"
  },
  {
    "label": "تاريخ الانشاء",
    "key": "dateRaised"
  },
  {
    "label": "العواقب",
    "key": "consequences"
  },
  {
    "label": "الاصول المتضررة",
    "key": "affectedAsset"
  },
  {
    "label": "التأثير",
    "key": "impact"
  },
  {
    "label": "احتمالية الحدوث",
    "key": "likelihood"
  },
  {
    "label": "درجة المخاطرة الكامنة",
    "key": "priority"
  },
  {
    "label": "درجة المخاطرة المتبقية",
    "key": "residualRiskScore"
  },
  {
    "label": "فئة",
    "key": "category"
  },
  {
    "label": "التصنيف فرعي",
    "key": "subCategory"
  },
  // {
  //   "label": "الشعار",
  //   "key": "tag"
  // },
  {
    "label": "حالة المخاطرة",
    "key": "riskStatus"
  }
]

export const XLSX_LABELS = (lang: 'ar' | 'en' | undefined) => lang === "ar" ? XLSX_LABELS_AR : XLSX_LABELS_EN;

const knowledgeDataExample: KnowledgeBaseData[] = [
  {
    title: "Introduction to GRC Software",
    content:
      "GRC software helps organizations manage their governance, risk, and compliance processes efficiently. It integrates various functions to ensure that an organization's activities are aligned with its goals and meet regulatory requirements.",
  },
  {
    title: "Key Features of GRC Software",
    content:
      "GRC software typically includes features like policy management, risk assessment, compliance tracking, audit management, and reporting. These features help organizations streamline their GRC processes.",
  },
  {
    title: "Benefits of Implementing GRC Software",
    content:
      "Implementing GRC software can lead to improved risk management, better compliance with regulations, enhanced decision-making, increased transparency, and reduced operational inefficiencies.",
  },
  {
    title: "Common Challenges in GRC",
    content:
      "Organizations often face challenges in GRC, such as siloed data, complex regulations, and manual processes. GRC software aims to address these challenges by providing automation and centralization.",
  },
  {
    title: "Selecting the Right GRC Software",
    content:
      "When choosing GRC software, consider factors like your organization's specific needs, scalability, user-friendliness, integration capabilities, and vendor support.",
  },
  {
    title: "Implementing GRC Software Successfully",
    content:
      "A successful implementation of GRC software involves defining clear objectives, involving key stakeholders, training users, and continuously monitoring and improving your GRC processes.",
  },
  {
    title: "GRC Best Practices",
    content:
      "Adopting best practices in GRC includes establishing a risk-aware culture, regularly updating policies and procedures, conducting risk assessments, and staying updated with regulatory changes.",
  },
  {
    title: "GRC Software Vendors Comparison",
    content:
      "Compare popular GRC software vendors like RSA Archer, MetricStream, and ServiceNow GRC to find the one that aligns best with your organization's requirements.",
  },
  {
    title: "Case Studies",
    content:
      "Explore case studies of organizations that successfully implemented GRC software to manage their compliance, risk, and governance effectively.",
  },
];

const knowledgeDataExample_AR: KnowledgeBaseData[] = [
  {
    title: "مقدمة في برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "تساعد برامج GRC المؤسسات في إدارة عمليات الحوكمة والمخاطر والامتثال بكفاءة. إنها تدمج وظائف متعددة لضمان أن نشاطات المؤسسة متماشية مع أهدافها وتلبي متطلبات التنظيم.",
  },
  {
    title: "الميزات الرئيسية لبرامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "تتضمن برامج GRC عادة ميزات مثل إدارة السياسات وتقييم المخاطر وتتبع الامتثال وإدارة التدقيق وإعداد التقارير. تساعد هذه الميزات المؤسسات في تبسيط عمليات GRC الخاصة بها.",
  },
  {
    title: "فوائد تنفيذ برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "يمكن أن يؤدي تنفيذ برامج GRC إلى تحسين إدارة المخاطر، والامتثال الأفضل للتنظيمات، وتعزيز عمليات اتخاذ القرار، وزيادة الشفافية، وتقليل عدم الكفاءة في التشغيل.",
  },
  {
    title: "التحديات الشائعة في مجال إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "غالبًا ما تواجه المؤسسات تحديات في مجال GRC، مثل البيانات المعزولة، والتنظيمات المعقدة، والعمليات اليدوية. تهدف برامج GRC إلى معالجة هذه التحديات من خلال توفير الأتمتة والتركيز المركزي.",
  },
  {
    title: "اختيار برامج إدارة المخاطر والامتثال والحوكمة (GRC) المناسبة",
    content:
      "عند اختيار برامج GRC، يجب أن تنظر في عوامل مثل احتياجات المؤسسة الخاصة بك، وقابلية التوسع، وسهولة الاستخدام، وقدرات التكامل، ودعم البائع.",
  },
  {
    title: "تنفيذ برامج إدارة المخاطر والامتثال والحوكمة (GRC) بنجاح",
    content:
      "يتضمن تنفيذ ناجح لبرامج GRC تحديد أهداف واضحة، وضم معنيين رئيسيين، وتدريب المستخدمين، ومراقبة وتحسين عمليات GRC الخاصة بك بشكل مستمر.",
  },
  {
    title: "أفضل الممارسات في مجال إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "تتضمن اعتماد أفضل الممارسات في مجال GRC إنشاء ثقافة توعية بالمخاطر، وتحديث السياسات والإجراءات بانتظام، وإجراء تقييمات للمخاطر، والبقاء على اطلاع دائم على التغييرات التنظيمية.",
  },
  {
    title: "مقارنة بين بائعي برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content:
      "قارن بين بائعي برامج GRC الشهيرين مثل RSA Archer وMetricStream وServiceNow GRC للعثور على البائع الذي يتوافق بشكل أفضل مع متطلبات مؤسستك.",
  },
  {
    title: "دراسات الحالة",
    content:
      "استكشف دراسات الحالة للمؤسسات التي نفذت بنجاح برامج GRC لإدارة الامتثال والمخاطر والحوكمة بفعالية.",
  },
];

export const KNOWLEDGE_BASE_MOCK: KnowledgeBase[] = [
  {
    title: "Account and Billing",
    description: "This category handles all customer inquiries related to account creation.",
    image: "/knowledge/1.png",
    id: "account_and_billing",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
  {
    title: "Technical Support",
    description: "Technical support assists customers with any technical issues they encounter",
    image: "/knowledge/2.png",
    id: "technical_support",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
  {
    title: "Integration Support",
    description:
      "Integration support focuses on assisting customers in integrating the SaaS product.",
    image: "/knowledge/3.png",
    id: "integration_support",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
  {
    title: "Feature Requests",
    description: "This category deals with collecting customer feedback, suggestions, and features.",
    image: "/knowledge/4.png",
    id: "feature_requests",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  }, {
    title: "Knowledge Base",
    description:
      "Documentation and knowledge base support involves creating and maintaining user guides.",
    image: "/knowledge/5.png",
    id: "knowledge_base",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
  {
    title: "Privacy Support",
    description:
      "This category addresses concerns related to data security, privacy & compliance.",
    image: "/knowledge/6.png",
    id: "privacy_support",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
  {
    title: "Account Termination",
    description: "Account termination and data removal support assists customers in closing accounts.",
    image: "/knowledge/7.png",
    id: "account_termination",
    data: knowledgeDataExample,
    lastUpdate: new Date(),
  },
];

export const KNOWLEDGE_BASE_MOCK_AR: KnowledgeBase[] = [
  {
    title: "الحساب والفواتير",
    description: "تتعامل هذه الفئة مع جميع استفسارات العملاء المتعلقة بإنشاء الحساب.",
    image: "/knowledge/1.png",
    id: "account_and_billing",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "الدعم الفني",
    description: "يقدم الدعم الفني المساعدة للعملاء في حالة وجود مشاكل تقنية.",
    image: "/knowledge/2.png",
    id: "technical_support",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "الدعم في التكامل",
    description: "يتمركز دعم التكامل في مساعدة العملاء على دمج منتج SaaS.",
    image: "/knowledge/3.png",
    id: "integration_support",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "طلبات الميزات",
    description: "تتعامل هذه الفئة مع جمع ملاحظات العملاء واقتراحاتهم وميزاتهم.",
    image: "/knowledge/4.png",
    id: "feature_requests",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "قاعدة المعرفة",
    description: "دعم الوثائق وقاعدة المعرفة يتضمن إنشاء وصيانة دلائل المستخدم.",
    image: "/knowledge/5.png",
    id: "knowledge_base",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "دعم الخصوصية",
    description: "تتناول هذه الفئة مخاوف تتعلق بأمان البيانات والخصوصية والامتثال.",
    image: "/knowledge/6.png",
    id: "privacy_support",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "إنهاء الحساب",
    description: "يقدم دعم إنهاء الحساب وإزالة البيانات المساعدة للعملاء في إغلاق الحسابات.",
    image: "/knowledge/7.png",
    id: "account_termination",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  }
]


export const GET_KNOWLEDGE_BASE = (lang: "ar" | "en" | undefined) =>
  lang === "ar" ? KNOWLEDGE_BASE_MOCK_AR : KNOWLEDGE_BASE_MOCK;
