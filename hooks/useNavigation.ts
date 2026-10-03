import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useCallback } from "react";

export default function useNavigation() {
  // Handles displaying a loading spinner within the GpuList component
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navigate = useCallback(
    (pageNumber: number) => {
      // Prevent double-firing when the page is still loading
      if (!isPending) {
        const params = new URLSearchParams(searchParams);

        // Get the search term, if available
        const searchQuery = searchParams.get("query");

        // Set the page number into the URL
        params.set("page", pageNumber.toString());

        // If a search term is available, insert it into the URL
        if (searchQuery) params.set("query", searchQuery);

        // Navigate to the new route
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: true });
        });
      }
    },
    [pathname, router, searchParams, isPending],
  );

  return { navigate, isPending };
}
