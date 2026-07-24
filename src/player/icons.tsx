type IconProps = { size?: number; className?: string }

export function PlayIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  )
}

export function PauseIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="6" y="4.5" width="4.5" height="15" rx="1" />
      <rect x="13.5" y="4.5" width="4.5" height="15" rx="1" />
    </svg>
  )
}

export function SkipNextIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 5v14l10-7L6 5Z" />
      <rect x="17" y="5" width="2.2" height="14" rx="0.5" />
    </svg>
  )
}

export function SkipPreviousIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 5v14L8 12l10-7Z" />
      <rect x="4.8" y="5" width="2.2" height="14" rx="0.5" />
    </svg>
  )
}

export function VolumeIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" fill="currentColor" />
      <path d="M16.5 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18.7 6.7a7.5 7.5 0 0 1 0 10.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function MuteIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" fill="currentColor" />
      <path d="M16.5 9.5 20.5 14.5M20.5 9.5l-4 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronUpIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function MusicNoteIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 18a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0 0V6.2l9-2v10.3M9 8.6l9-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 14.5a2.5 2.5 0 1 1-2.5-2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function MicIcon({ size = 14, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function InstrumentalIcon({ size = 14, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 17V5.5L19.5 4v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
