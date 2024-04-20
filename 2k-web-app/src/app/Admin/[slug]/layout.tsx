import { AdminAppshell } from "@/components/admin/AdminAppshell";

export default function Layout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return <AdminAppshell active={params.slug}>{children}</AdminAppshell>;
}
