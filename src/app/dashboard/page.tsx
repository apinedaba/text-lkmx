import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { UserFormModal } from "@/components/dashboard/user-form-modal";
import { UsersByArea } from "@/components/dashboard/users-by-area";

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Estadisticas de usuarios</h1>
                <UserFormModal />
            </div>

            {/* Analytics */}
            <AnalyticsCards />

            {/* Users */}
            <UsersByArea />
        </div>
    );
}
