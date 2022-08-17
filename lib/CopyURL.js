export default function CopyURL(toast, url) {
  toast({
    title: "Page URL copied to clipboard.",
    duration: 2000,
    status: "success",
    isClosable: true
  })
  navigator.clipboard.writeText(url);
}