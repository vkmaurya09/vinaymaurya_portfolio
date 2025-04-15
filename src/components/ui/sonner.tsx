import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-retro-orange group-[.toaster]:text-black group-[.toaster]:font-bold group-[.toaster]:border-2 group-[.toaster]:border-black group-[.toaster]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-[.toaster]:rounded-none",
          title: 
            "text-black font-display tracking-wide uppercase text-lg",
          description: 
            "group-[.toast]:text-black group-[.toast]:font-mono",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:border-2 group-[.toast]:border-black group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:hover:bg-black group-[.toast]:hover:text-white",
          cancelButton:
            "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:border-2 group-[.toast]:border-black group-[.toast]:rounded-none group-[.toast]:font-bold group-[.toast]:hover:bg-black group-[.toast]:hover:text-white",
          closeButton:
            "group-[.toast]:text-black group-[.toast]:bg-transparent group-[.toast]:hover:bg-black/5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
