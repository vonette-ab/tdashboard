
import DataTable from "../../components/DataTable";
import ExpenseTable from "../../components/ExpenseTable";

export default function DataTablePage() {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "320px" }}>
          <DataTable />
        </div>
        <div style={{ flex: 1, minWidth: "320px" }}>
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
}