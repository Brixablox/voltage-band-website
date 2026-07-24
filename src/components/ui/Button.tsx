import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 ' +
  'font-body font-bold text-sm sm:text-base tracking-wide transition-all duration-300 ease-out ' +
  'active:scale-[0.96] focus-visible:outline-offset-4 select-none'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-volt text-ink shadow-[0_0_0_0_rgba(255,212,0,0)] hover:shadow-[0_0_36px_-4px_rgba(255,212,0,0.65)] hover:-translate-y-0.5',
  secondary:
    'bg-transparent text-paper border-2 border-paper/30 hover:border-volt hover:text-volt hover:-translate-y-0.5',
  ghost: 'bg-white/5 text-paper border border-white/10 hover:bg-white/10 hover:border-volt/50',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  icon?: ReactNode
}

type AsLink = CommonProps & { to: LinkProps['to']; href?: never } & Omit<LinkProps, 'to' | 'className'>
type AsAnchor = CommonProps & {
  href: string
  to?: never
  external?: boolean
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>
type AsButton = CommonProps & {
  to?: never
  href?: never
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

type ButtonProps = AsLink | AsAnchor | AsButton

/** Shared call-to-action button. Renders as a router Link, external <a>, or <button>. */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '', icon } = props
  const classes = `${base} ${variantClasses[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  )

  if ('to' in props && props.to !== undefined) {
    const { to, children: _c, variant: _v, className: _cn, icon: _i, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { href, external, children: _c, variant: _v, className: _cn, icon: _i, ...rest } = props
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  const { children: _c, variant: _v, className: _cn, icon: _i, ...rest } = props as AsButton
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
