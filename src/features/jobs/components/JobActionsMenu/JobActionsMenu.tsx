"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { DropdownMenu } from "radix-ui";

type JobMenuAction = {
  label: string;
  disabled?: boolean;
} & (
  | { href: string; onSelect?: never }
  | { href?: never; onSelect: () => void }
);

const itemClassName =
  "block cursor-pointer rounded-md px-3 py-2 text-sm text-[#4F5D75] outline-none data-[highlighted]:bg-[#F1F2F9] data-[disabled]:pointer-events-none data-[disabled]:text-[#B7BAC7]";

export default function JobActionsMenu({
  jobTitle,
  viewHref,
  actions = [],
}: {
  jobTitle: string;
  viewHref: string;
  actions?: JobMenuAction[];
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${jobTitle}`}
          className="inline-flex size-8 items-center justify-center rounded-md text-[#737774] hover:bg-[#F1F2F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6667FF]"
        >
          <MoreVertical className="size-4" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-44 rounded-lg border border-[#F1F2F9] bg-white p-1 shadow-lg"
        >
          {actions.map((action) =>
            action.href && !action.disabled ? (
              <DropdownMenu.Item key={action.label} asChild>
                <Link href={action.href} className={itemClassName}>
                  {action.label}
                </Link>
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                key={action.label}
                disabled={action.disabled}
                onSelect={action.onSelect}
                className={itemClassName}
              >
                {action.label}
              </DropdownMenu.Item>
            ),
          )}
          <DropdownMenu.Item asChild>
            <Link href={viewHref} className={itemClassName}>
              View
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
