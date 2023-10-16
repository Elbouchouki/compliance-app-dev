import { he } from "date-fns/locale";
import { evidenceRouter } from "./routers/evidence";
import { frameworkRouter } from "./routers/framework";
import { labelRouter } from "./routers/label";
import { policyRouter } from "./routers/policies";
import { tagRouter } from "./routers/tag";
import { tenantRouter } from "./routers/tenant";
import { userRouter } from "./routers/user";
import { router } from "./trpc";
import { mailRouter } from "./routers/mail";

import { riskRouter } from "./routers/risk";
import { riskAssessmentScopeRouter } from "./routers/riskAssessmentScope";
import { assessmentRouter } from "./routers/assessment";
import { controlRouter } from "./routers/control";


export const appRouter = router({
  tag: tagRouter,
  framwork: frameworkRouter,
  label: labelRouter,
  evidence: evidenceRouter,
  policy: policyRouter,
  tenant: tenantRouter,
  user: userRouter,
  mail: mailRouter,
  risk: riskRouter,
  riskAssessmentScope: riskAssessmentScopeRouter,
  assessment: assessmentRouter,
  control: controlRouter
});

export type AppRouter = typeof appRouter;