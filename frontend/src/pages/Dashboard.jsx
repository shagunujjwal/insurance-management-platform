import "./Dashboard.css";

import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";


import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaFileAlt,
  FaClipboardList,
  FaMoneyBill,
  FaFolder,
  FaCog,
  FaSignOutAlt,
  FaBell
} from "react-icons/fa";


// Chart JS

import {
  Bar,
  Pie
} from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);



function Dashboard(){


const navigate = useNavigate();



const [user,setUser] = useState(null);



const [stats,setStats] = useState({

  customers:0,

  agents:0,

  policies:0,

  claims:0,

  recentCustomers:[],

  recentPolicies:[],

  recentAgents:[]

});





useEffect(()=>{


const savedUser = localStorage.getItem("user");


if(savedUser){

setUser(JSON.parse(savedUser));

}




const getStats = async()=>{


try{


const res = await axios.get(

"https://insurance-management-platform-iem2.onrender.com/api/dashboard/stats"

);


setStats(res.data);


}
catch(error){

console.log(error);

}


};


getStats();


},[]);





const logout = ()=>{

localStorage.removeItem("user");

navigate("/");

};





// Bar Chart Data

const policyChart = {

labels:[

"Customers",
"Agents",
"Policies",
"Claims"

],

datasets:[

{

label:"Total Records",

data:[

stats.customers,
stats.agents,
stats.policies,
stats.claims

],

backgroundColor:[

"#2563eb",
"#16a34a",
"#f59e0b",
"#ef4444"

],

borderRadius:10

}

]

};





// Pie Chart Data


const agentChart = {


labels:

stats.recentAgents?.map(

(a)=>a.name

),


datasets:[

{

label:"Agents",

data:

stats.recentAgents?.map(

()=>1

),


backgroundColor:[

"#2563eb",
"#16a34a",
"#f59e0b",
"#ef4444",
"#8b5cf6"

]


}

]


};





return(


<div className="dashboard">


<div className="sidebar">


<h2 className="logo">

🛡️ Insurance

</h2>


<ul>


<li>
<Link to="/dashboard">
<FaHome/>
Dashboard
</Link>
</li>


<li>
<Link to="/customers">
<FaUsers/>
Customers
</Link>
</li>


<li>
<Link to="/agents">
<FaUserTie/>
Agents
</Link>
</li>


<li>
<Link to="/policies">
<FaFileAlt/>
Policies
</Link>
</li>


<li>
<Link to="/claims">
<FaClipboardList/>
Claims
</Link>
</li>


<li>
<Link to="/payments">
<FaMoneyBill/>
Payments
</Link>
</li>


<li>
<Link to="/documents">
<FaFolder/>
Documents
</Link>
</li>


<li>
<Link to="/settings">
<FaCog/>
Settings
</Link>
</li>


</ul>


<button
className="logout"
onClick={logout}
>

<FaSignOutAlt/>

Logout

</button>


</div>      <div className="main">


        <div className="topbar">


          <h2>
            Insurance Dashboard
          </h2>



          <div className="profile">

            <FaBell/>

            <span>
              {user?.name || "User"}
            </span>

          </div>


        </div>





        <h1>
          Welcome Back {user?.name || "User"} 👋
        </h1>







        {/* Cards */}



        <div className="cards">



          <div className="card">

            <h3>
              Customers
            </h3>

            <h2>
              {stats.customers}
            </h2>

            <p>
              Total Customers
            </p>

          </div>





          <div className="card">

            <h3>
              Agents
            </h3>

            <h2>
              {stats.agents}
            </h2>

            <p>
              Total Agents
            </p>

          </div>





          <div className="card">

            <h3>
              Policies
            </h3>

            <h2>
              {stats.policies}
            </h2>

            <p>
              Total Policies
            </p>

          </div>





          <div className="card">

            <h3>
              Claims
            </h3>

            <h2>
              {stats.claims}
            </h2>

            <p>
              Total Claims
            </p>

          </div>



        </div>







        {/* Charts */}



        <div className="charts">



          <div className="chart-box">


            <h2>
              📊 Insurance Overview
            </h2>



            <Bar

              data={policyChart}

              options={{

                responsive:true,

                plugins:{

                  legend:{

                    display:false

                  }

                }

              }}

            />


          </div>







          <div className="chart-box">


            <h2>
              🧑‍💼 Agent Performance
            </h2>




            <Pie

              data={agentChart}

              options={{

                responsive:true,

                plugins:{

                  legend:{

                    position:"bottom"

                  }

                }

              }}

            />



          </div>



        </div>        {/* Recent Customers */}


        <div className="table-box">


          <h2>
            Recent Customers
          </h2>



          <table>


            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>


              </tr>


            </thead>




            <tbody>


            {

              stats.recentCustomers?.map((c)=>(


                <tr key={c.id}>


                  <td>
                    {c.name}
                  </td>


                  <td>
                    {c.email}
                  </td>


                  <td>
                    {c.phone}
                  </td>


                </tr>


              ))

            }


            </tbody>


          </table>


        </div>








        {/* Recent Policies */}



        <div className="table-box">


          <h2>
            Recent Policies
          </h2>




          <table>


            <thead>


              <tr>

                <th>Policy Number</th>

                <th>Customer</th>

                <th>Type</th>

                <th>Status</th>


              </tr>


            </thead>




            <tbody>


            {

              stats.recentPolicies?.map((p)=>(


                <tr key={p.id}>


                  <td>
                    {p.policyNumber}
                  </td>


                  <td>
                    {p.customer?.name}
                  </td>


                  <td>
                    {p.policyType}
                  </td>


                  <td>
                    {p.status}
                  </td>


                </tr>


              ))

            }


            </tbody>


          </table>


        </div>









        {/* Recent Agents */}



        <div className="table-box">


          <h2>
            Recent Agents
          </h2>




          <table>


            <thead>


              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Status</th>


              </tr>


            </thead>




            <tbody>


            {

              stats.recentAgents?.map((a)=>(


                <tr key={a.id}>


                  <td>
                    {a.name}
                  </td>


                  <td>
                    {a.email}
                  </td>


                  <td>
                    {a.phone}
                  </td>


                  <td>
                    {a.status}
                  </td>


                </tr>


              ))

            }


            </tbody>


          </table>


        </div>






      </div>


    </div>


  );


}



export default Dashboard;