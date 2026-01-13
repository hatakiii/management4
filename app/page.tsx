import { Users, CalendarCheck, Wallet, Plane } from "lucide-react";
import React from "react";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Хяналтын самбар</h1>
        <p className="text-sm text-gray-600">Компанийн ерөнхий мэдээлэл</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users size={22} />} title="Нийт ажилтан" value={128} />
        <StatCard
          icon={<CalendarCheck size={22} />}
          title="Өнөөдөр ирсэн"
          value={96}
        />
        <StatCard icon={<Plane size={22} />} title="Чөлөөтэй" value={12} />
        <StatCard
          icon={<Wallet size={22} />}
          title="Цалин бодогдсон"
          value={116}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Сүүлийн зар мэдээ</h2>
          <ul className="space-y-3">
            <AnnouncementItem title="Сар бүрийн хурлын зар" />
            <AnnouncementItem title="Шинэ дотоод журам" />
            <AnnouncementItem title="Цалингийн өдөр өөрчлөгдлөө" />
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Түргэн үйлдэл</h2>
          <div className="space-y-3">
            <ActionButton label="Ажилтан нэмэх" />
            <ActionButton label="Чөлөө батлах" />
            <ActionButton label="Цалин бодох" />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ========== Props types ========== */

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

interface AnnouncementItemProps {
  title: string;
}

function AnnouncementItem({ title }: AnnouncementItemProps) {
  return (
    <li className="text-sm text-gray-700 border-b pb-2 last:border-b-0">
      {title}
    </li>
  );
}

interface ActionButtonProps {
  label: string;
}

function ActionButton({ label }: ActionButtonProps) {
  return (
    <button className="w-full text-sm font-medium px-4 py-2 rounded-lg border hover:bg-gray-50">
      {label}
    </button>
  );
}
