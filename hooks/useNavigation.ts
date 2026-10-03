import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function useNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function navigate(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    const searchQuery = searchParams.get("query");

    // Set the page number into the URL
    params.set("page", pageNumber.toString());

    // If a search term is available, insert it into the URL
    if (searchQuery) params.set("query", searchQuery);

    // Navigate to the new route
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }
  
  return { navigate, isPending };
}
