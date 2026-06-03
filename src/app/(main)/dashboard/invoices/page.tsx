"use client";

import * as React from "react";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Eye, FileText, MoreHorizontal, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Invoice {
  id: string;
  number: string;
  client: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft";
  dueDate: string;
  issuedDate: string;
}

const invoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    client: "Empresa ABC Ltda",
    email: "contato@empresaabc.com",
    amount: 5500.0,
    status: "paid",
    dueDate: "2024-01-15",
    issuedDate: "2024-01-01",
  },
  {
    id: "2",
    number: "INV-002",
    client: "Tech Solutions",
    email: "financeiro@techsolutions.com",
    amount: 12800.0,
    status: "pending",
    dueDate: "2024-01-25",
    issuedDate: "2024-01-10",
  },
  {
    id: "3",
    number: "INV-003",
    client: "Marketing Pro",
    email: "pagamentos@marketingpro.com",
    amount: 3200.0,
    status: "overdue",
    dueDate: "2024-01-05",
    issuedDate: "2023-12-20",
  },
  {
    id: "4",
    number: "INV-004",
    client: "Design Studio",
    email: "admin@designstudio.com",
    amount: 7800.0,
    status: "paid",
    dueDate: "2024-01-20",
    issuedDate: "2024-01-05",
  },
  {
    id: "5",
    number: "INV-005",
    client: "Consultoria XYZ",
    email: "financas@consultoriaxyz.com",
    amount: 15000.0,
    status: "draft",
    dueDate: "2024-02-01",
    issuedDate: "2024-01-15",
  },
  {
    id: "6",
    number: "INV-006",
    client: "Startup Inovação",
    email: "contato@startupinovacao.com",
    amount: 4500.0,
    status: "pending",
    dueDate: "2024-01-30",
    issuedDate: "2024-01-12",
  },
  {
    id: "7",
    number: "INV-007",
    client: "Global Trade",
    email: "payments@globaltrade.com",
    amount: 22000.0,
    status: "paid",
    dueDate: "2024-01-18",
    issuedDate: "2024-01-02",
  },
  {
    id: "8",
    number: "INV-008",
    client: "Agência Digital",
    email: "financeiro@agenciadigital.com",
    amount: 8900.0,
    status: "overdue",
    dueDate: "2024-01-08",
    issuedDate: "2023-12-25",
  },
];

const statusConfig = {
  paid: { label: "Pago", variant: "default" as const },
  pending: { label: "Pendente", variant: "secondary" as const },
  overdue: { label: "Atrasado", variant: "destructive" as const },
  draft: { label: "Rascunho", variant: "outline" as const },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function InvoiceMetrics() {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pending = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0);
  const overdue = invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Faturado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-2xl">{formatCurrency(total)}</div>
            <Badge>
              <TrendingUp className="size-3" />
              +15%
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Recebido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-2xl text-green-600">{formatCurrency(paid)}</div>
            <Badge>
              <TrendingUp className="size-3" />
              +8%
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pendente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-2xl text-amber-600">{formatCurrency(pending)}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Atrasado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-2xl text-red-600">{formatCurrency(overdue)}</div>
            <Badge variant="destructive">
              <TrendingDown className="size-3" />
              +2
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const filteredInvoices = React.useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.number.toLowerCase().includes(search.toLowerCase()) ||
        invoice.client.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginatedInvoices = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return filteredInvoices.slice(start, start + pagination.pageSize);
  }, [filteredInvoices, pagination]);

  const totalPages = Math.ceil(filteredInvoices.length / pagination.pageSize);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Faturas</h1>
          <p className="text-muted-foreground text-sm">Gerencie suas faturas e pagamentos</p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          Nova Fatura
        </Button>
      </div>

      <InvoiceMetrics />

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Todas as Faturas</CardTitle>
          <CardDescription>Lista completa de faturas emitidas</CardDescription>
          <CardAction className="flex flex-wrap gap-2">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Buscar faturas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger size="sm" className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="overdue">Atrasado</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Exportar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground" />
                      {invoice.number}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.client}</p>
                      <p className="text-muted-foreground text-xs">{invoice.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[invoice.status].variant}>
                      {statusConfig[invoice.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(invoice.issuedDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(invoice.dueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Eye className="size-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="size-4" />
                            Baixar PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-muted-foreground text-sm">
              Mostrando {paginatedInvoices.length} de {filteredInvoices.length} faturas
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPagination((p) => ({ ...p, pageIndex: Math.max(0, p.pageIndex - 1) }))}
                    className={pagination.pageIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setPagination((p) => ({ ...p, pageIndex: i }))}
                      isActive={pagination.pageIndex === i}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPagination((p) => ({ ...p, pageIndex: Math.min(totalPages - 1, p.pageIndex + 1) }))
                    }
                    className={
                      pagination.pageIndex >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
