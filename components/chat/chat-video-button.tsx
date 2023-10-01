"use client"

import { usePathname , useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { Video, VideoOff } from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";

export const ChatVideoButton = () => {

  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const onClick = async () => {
    const url = qs.stringifyUrl({
      url: pathName || "",
      query: {
        video: isVideo ? undefined : true
      }
    }, { skipNull: true });

    router.push(url)
  }

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End Video Call" : "Start Video Call";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
      </button>
    </ActionTooltip>
  )
}
