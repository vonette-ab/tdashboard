


import Header from "@/components/Header";
import BalanceChart from "@/components/BalanceChart";
import BudgetChart from "@/components/BudgetChart";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import Statistics from "@/components/Statistics";

export default function Page() {


  return (
    <div className="app-shell">
      
      < Sidebar  /> 
    
      <div className="main">
       
        <Header />

        <div className="body">

        
          <div className="row stat-row">
            <StatCard
              label="Total balance"
              amount="$15,700.00"
              cents="0.00"
              change={12.1}
              transactions={50}
              categories={15}
              note="You have an extra $1,700 in comparison to last month"
              
            />
            <StatCard
              label="Income"
              amount="$8,500.00"
              cents= "0.00"
              change={6.3}
              transactions={27}
              categories={6}
              note="You earned an extra $500 in comparison to last month"
              
            />
            <StatCard
              label="Expense"
              amount="$6,222.00"
              cents= '0.00'
              change={-2.4}
              transactions={23}
              categories={9}
              note="You spent an extra $1,222 in comparison to last month"
              
            />
          </div>
      
          <div className="row bottom-grid">

            <div className="left-col">
              <BalanceChart />
              <BudgetChart />
            </div>

            <div className="right-col">
              <Statistics />
            </div>

          </div>
        </div>
      </div>

      
    </div>
  );
}
