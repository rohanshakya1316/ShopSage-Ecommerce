import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 px-8 py-6 overflow-x-auto">{children}</main>
    </div>
  );
}
