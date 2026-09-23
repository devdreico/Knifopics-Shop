import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & {
  children: React.ReactNode
}

export default function GlassCard({ children, className = '', ...rest }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass premium-shadow clip-card edge-highlight premium-shadow-hover ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
