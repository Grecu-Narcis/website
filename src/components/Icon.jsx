/**
 * Tiny inline SVG icon set — no icon library dependency, no network request,
 * and every glyph inherits `currentColor` so it themes automatically.
 *
 * Usage:  <Icon name="home" className="size-5" />
 */

// Stroked glyphs (the default): drawn on a 24×24 grid.
const STROKE = {
  home: ['m3 10.6 9-7.1 9 7.1V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z', 'M9.5 21v-6.5h5V21'],
  wallet: [
    'M20 9V7a2 2 0 0 0-2-2H5.5a2.5 2.5 0 0 0 0 5H19a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5V7.5',
    'M16.5 14h.01',
  ],
  refresh: [
    'M20 11.5A8 8 0 0 0 6.6 6.6L4.2 9',
    'M4 4.5V9h4.5',
    'M4 12.5A8 8 0 0 0 17.4 17.4L19.8 15',
    'M20 19.5V15h-4.5',
  ],
  key: [
    'M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z',
    'M16.6 7.4h.01',
  ],
  car: [
    'M5 17H4a1 1 0 0 1-1-1v-3a2 2 0 0 1 1.5-1.9l1.1-4.5A2 2 0 0 1 7.5 5h9a2 2 0 0 1 1.9 1.6l1.1 4.5A2 2 0 0 1 21 13v3a1 1 0 0 1-1 1h-1',
    'M4.8 11.4h14.4',
    'M6.5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
    'M13.5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
    'M10.5 17h3',
  ],
  briefcase: [
    'M3.5 8.5h17V19a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z',
    'M9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5',
    'M3.5 13.5h17',
  ],
  building: [
    'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16',
    'M15 10h4a1 1 0 0 1 1 1v10',
    'M8 8h3M8 12h3M8 16h3M18 14h.01M18 17.5h.01',
    'M2.5 21h19',
  ],
  shield: ['M12 3.2 19 6v6c0 4.6-3 7.8-7 9.1-4-1.3-7-4.5-7-9.1V6z', 'm9 12.2 2.1 2.1 4-4.2'],
  users: [
    'M15.5 20.5v-1.8a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v1.8',
    'M9.5 11a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2',
    'M16.8 4.3a3.6 3.6 0 0 1 0 6.4',
    'M21 20.5v-1.8a4 4 0 0 0-3-3.8',
  ],
  trending: ['m3 17 6-6.2 4 4L21 6.5', 'M14.8 6.5H21v6.2'],
  phone: [
    'M6.8 3.2H5.6A2.6 2.6 0 0 0 3 5.8C3 13.6 10.4 21 18.2 21a2.6 2.6 0 0 0 2.6-2.6v-1.2a1 1 0 0 0-.8-1l-3.3-.7a1 1 0 0 0-1 .3l-1 1.2a14.8 14.8 0 0 1-5.1-5.1l1.2-1a1 1 0 0 0 .3-1l-.7-3.3a1 1 0 0 0-1-.8',
  ],
  mail: ['M3.5 6h17v12h-17z', 'm3.9 6.7 8.1 5.6 8.1-5.6'],
  pin: ['M12 21s6.8-5.6 6.8-11a6.8 6.8 0 1 0-13.6 0C5.2 15.4 12 21 12 21', 'M12 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18', 'M12 7.4V12l3.4 2'],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  chevron: ['m6.5 9.5 5.5 5.5 5.5-5.5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6.2 6.2 11.6 11.6', 'M17.8 6.2 6.2 17.8'],
  arrowRight: ['M4 12h15', 'm13.2 5.5 6.5 6.5-6.5 6.5'],
  arrowUp: ['M12 20V5', 'm5.5 11 6.5-6.5L18.5 11'],
  search: ['M10.8 17.6a6.8 6.8 0 1 0 0-13.6 6.8 6.8 0 0 0 0 13.6', 'm15.8 15.8 4.4 4.4'],
  file: ['M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z', 'M13.8 3.6V8.2h4.6', 'M9 13h6', 'M9 16.5h4'],
  handshake: [
    'm11 17 2 2a1 1 0 1 0 3-3',
    'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4',
    'm21 3 1 11h-2',
    'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3',
    'M3 4h8',
  ],
  calculator: ['M6 3.5h12v17H6z', 'M9 7.5h6', 'M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01'],
  percent: ['M19 5.5 5 18.5', 'M7 9.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8', 'M17 19.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8'],
  lock: ['M5.5 11h13v9.5h-13z', 'M8.5 11V8a3.5 3.5 0 0 1 7 0v3'],
  sparkles: ['M12 3.5l1.7 4.3L18 9.5l-4.3 1.7L12 15.5l-1.7-4.3L6 9.5l4.3-1.7z', 'M18 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z'],
  instagram: [
    'M4 8.2A4.2 4.2 0 0 1 8.2 4h7.6A4.2 4.2 0 0 1 20 8.2v7.6A4.2 4.2 0 0 1 15.8 20H8.2A4.2 4.2 0 0 1 4 15.8z',
    'M12 15.6a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2',
    'M16.9 7.2h.01',
  ],
  linkedin: ['M6.5 9.5V19', 'M6.5 6h.01', 'M11 19v-5.5a3 3 0 0 1 6 0V19', 'M11 19V9.5'],
  youtube: ['M3 8.6A3.1 3.1 0 0 1 6.1 5.5h11.8A3.1 3.1 0 0 1 21 8.6v6.8a3.1 3.1 0 0 1-3.1 3.1H6.1A3.1 3.1 0 0 1 3 15.4z', 'm10.8 9.4 4.4 2.6-4.4 2.6z'],
}

// Solid glyphs, filled with currentColor.
const FILL = {
  star: ['M12 3.4l2.6 5.2 5.8.8-4.2 4.1.9 5.7L12 16.5l-5.1 2.7.9-5.7-4.2-4.1 5.8-.8z'],
  facebook: [
    'M13.5 21v-7.3h2.6l.4-3h-3V9.1c0-.9.3-1.5 1.6-1.5H16.6V4.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.4H7v3h2.6V21z',
  ],
}

export default function Icon({ name, className = 'size-5', strokeWidth = 1.7, ...rest }) {
  const filled = FILL[name]
  const paths = filled ?? STROKE[name]

  // Fail loudly-but-safely in dev rather than rendering an empty box silently.
  if (!paths) {
    if (import.meta.env?.DEV) console.warn(`<Icon /> unknown name: "${name}"`)
    return null
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
