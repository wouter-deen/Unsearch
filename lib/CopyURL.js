export default function CopyURL(toast, url) {
  toast({
    title: "Page URL copied to clipboard.",
    duration: 4000,
    status: "success"
  })
  navigator.clipboard.writeText(url);
}