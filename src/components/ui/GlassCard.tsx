import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & {
  children: React.ReactNode
}

export default function GlassCard({ children, className = '', ...rest }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`glass premium-shadow clip-card edge-highlight ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
