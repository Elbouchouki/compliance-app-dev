"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion"

interface PageWrapperProps {
  className?: string;
  children?: React.ReactNode;
}


const PageWrapper = ({ className, children }: PageWrapperProps) => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 20 }}
      className={cn("py-2 md:py-6 px-3 md:px-10 xl:px-28", className)}

    >
      {children}
    </motion.div>
  )
}
export default PageWrapper