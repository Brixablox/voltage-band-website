import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-stage-glow flex min-h-[80svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-gradient-volt text-[clamp(4rem,18vw,10rem)] leading-none">404</p>
      <h1 className="font-display text-3xl sm:text-4xl">Page Not Found</h1>
      <p className="max-w-md font-body text-paper-dim">
        This page doesn't exist. Head back home to catch the latest from Voltage.
      </p>
      <Button to="/">Back Home</Button>
    </section>
  )
}
