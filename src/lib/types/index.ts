export type NavLinkProps = {
  href: string;
  title: string;
  icon?: React.ReactElement;
  className?: string;
  variant?: "default" | "sidebar" | "header";
};

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  variant: "primary" | "secondary" | "default";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactElement;
}

export interface SearchBarProps {
  setSearch: (search: string) => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
  onSubmit: () => void;
  onVoiceCommand?: () => void;
  showVoiceIcon?: boolean;
  onShowSearchOverlay?: () => void;
}
