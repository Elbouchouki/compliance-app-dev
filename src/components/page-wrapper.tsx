"use client"

import { motion } from "framer-motion"

interface PageWrapperProps {
  className?: string;
  children?: React.ReactNode;
}


const PageWrapper = ({ className, children }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}

    >
      {children}
    </motion.div>
  )
}
export default PageWrapper