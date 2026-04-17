export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
