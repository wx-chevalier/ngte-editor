import * as React from 'react'
const SvgSpeed = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8.965.179c-2.296 0-4.38.926-5.9 2.421a.875.875 0 0 0-.123.125 8.456 8.456 0 0 0-2.41 5.919c0 2.258.877 4.386 2.469 5.985a.85.85 0 1 0 1.204-1.2A6.72 6.72 0 0 1 2.28 9.462h1.34a.85.85 0 1 0 0-1.7H2.29a6.749 6.749 0 0 1 1.48-3.415l.88.88a.85.85 0 0 0 1.202-1.202l-.847-.848a6.675 6.675 0 0 1 3.07-1.24v1.274a.85.85 0 1 0 1.7 0V1.927a6.673 6.673 0 0 1 3.153 1.25l-.847.848a.85.85 0 0 0 1.202 1.202l.88-.88a6.749 6.749 0 0 1 1.48 3.415H14.37a.85.85 0 0 0 0 1.7h1.28a6.72 6.72 0 0 1-1.925 3.967.85.85 0 0 0 1.205 1.2 8.432 8.432 0 0 0 2.468-5.985 8.456 8.456 0 0 0-2.41-5.92.864.864 0 0 0-.124-.124A8.392 8.392 0 0 0 8.965.18Z"
      fill="currentColor"
    />
    <path
      d="M11.73 7.523a.85.85 0 1 0-1.432-.917L8.595 9.264a1.388 1.388 0 1 0 1.563.712l1.571-2.453Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgSpeed
