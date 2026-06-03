import {
  Banknote,
  Bell,
  Calendar,
  ChartBar,
  Fingerprint,
  FolderKanban,
  Forklift,
  Gauge,
  GraduationCap,
  Kanban,
  LayoutDashboard,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  ReceiptText,
  Settings,
  Share2,
  ShoppingBag,
  SquareArrowUpRight,
  Users,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: Gauge,
      },
      {
        title: "Productivity",
        url: "/dashboard/productivity",
        icon: ListTodo,
      },
      {
        title: "E-commerce",
        url: "/dashboard/ecommerce",
        icon: ShoppingBag,
      },
      {
        title: "Academy",
        url: "/dashboard/academy",
        icon: GraduationCap,
        isNew: true,
      },
      {
        title: "Logistics",
        url: "/dashboard/logistics",
        icon: Forklift,
      },
    ],
  },
  {
    id: 2,
    label: "Social Media",
    items: [
      {
        title: "Posts",
        url: "/dashboard/posts",
        icon: Share2,
        isNew: true,
      },
      {
        title: "Chat IA",
        url: "/dashboard/chat",
        icon: MessageSquare,
        isNew: true,
      },
      {
        title: "Calendário",
        url: "/dashboard/calendar",
        icon: Calendar,
        isNew: true,
      },
      {
        title: "Kanban",
        url: "/dashboard/kanban",
        icon: Kanban,
        isNew: true,
      },
    ],
  },
  {
    id: 3,
    label: "Gerenciamento",
    items: [
      {
        title: "Faturas",
        url: "/dashboard/invoices",
        icon: ReceiptText,
        isNew: true,
      },
      {
        title: "Usuários",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Papéis",
        url: "/dashboard/roles",
        icon: Lock,
        isNew: true,
      },
      {
        title: "Projetos",
        url: "/dashboard/projects",
        icon: FolderKanban,
        isNew: true,
      },
    ],
  },
  {
    id: 4,
    label: "Configurações",
    items: [
      {
        title: "Notificações",
        url: "/dashboard/notifications",
        icon: Bell,
        isNew: true,
      },
      {
        title: "Configurações",
        url: "/dashboard/settings",
        icon: Settings,
        isNew: true,
      },
      {
        title: "Email",
        url: "/dashboard/mail",
        icon: Mail,
      },
      {
        title: "Autenticação",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Login v1", url: "/auth/v1/login", newTab: true },
          { title: "Login v2", url: "/auth/v2/login", newTab: true },
          { title: "Register v1", url: "/auth/v1/register", newTab: true },
          { title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Legacy",
    items: [
      {
        title: "Dashboards",
        url: "/dashboard/default-v1",
        subItems: [
          { title: "Default V1", url: "/dashboard/default-v1" },
          { title: "CRM V1", url: "/dashboard/crm-v1" },
          { title: "Finance V1", url: "/dashboard/finance-v1" },
          { title: "Analytics V1", url: "/dashboard/analytics-v1" },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Misc",
    items: [
      {
        title: "Outros",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
    ],
  },
];
