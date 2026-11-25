import { ShellSwitcher } from "@/components/layout/ShellSwitcher";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <ShellSwitcher>{children}</ShellSwitcher>;
}
