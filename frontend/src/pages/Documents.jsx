import { useEffect, useState } from "react";
import axios from "axios";
import "./Documents.css";


function Documents(){

  const [documents,setDocuments] = useState([]);

  const [customers,setCustomers] = useState([]);


  const [formData,setFormData] = useState({

    customerId:"",
    file:null

  });




  const fetchDocuments = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/documents"
      );

      setDocuments(res.data);

    }
    catch(error){

      console.log(error);

    }

  };





  const fetchCustomers = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/customers"
      );

      setCustomers(res.data);

    }
    catch(error){

      console.log(error);

    }

  };





  useEffect(()=>{

    fetchDocuments();

    fetchCustomers();

  },[]);






  const handleChange=(e)=>{


    if(e.target.name === "file"){

      setFormData({

        ...formData,

        file:e.target.files[0]

      });


    }
    else{

      setFormData({

        ...formData,

        [e.target.name]:e.target.value

      });

    }


  };







  const uploadDocument = async()=>{


    try{


      const data = new FormData();


      data.append(
        "customerId",
        formData.customerId
      );


      data.append(
        "file",
        formData.file
      );



      await axios.post(

        "http://localhost:5000/api/documents",

        data

      );



      alert("Document Uploaded Successfully");



      setFormData({

        customerId:"",
        file:null

      });



      fetchDocuments();


    }
    catch(error){

      console.log(error);

      alert("Upload Failed");

    }


  };






  return(


    <div className="documents-page">


      <h1>
        Customer Documents
      </h1>




      <div className="form-box">



        <select

        name="customerId"

        value={formData.customerId}

        onChange={handleChange}

        >

          <option value="">
            Select Customer
          </option>


          {

            customers.map((c)=>(

              <option

              key={c.id}

              value={c.id}

              >

                {c.name}

              </option>


            ))

          }


        </select>





        <input

        type="file"

        name="file"

        onChange={handleChange}

        />





        <button onClick={uploadDocument}>

          Upload Document

        </button>



      </div>






      <table>


        <thead>

          <tr>

            <th>ID</th>

            <th>Customer</th>

            <th>File Name</th>

            <th>View</th>

          </tr>

        </thead>





        <tbody>


        {

          documents.map((doc)=>(


            <tr key={doc.id}>


              <td>
                {doc.id}
              </td>



              <td>
                {doc.customer?.name}
              </td>




              <td>
                {doc.fileName}
              </td>




              <td>

                <a

                href={`http://localhost:5000/${doc.filePath}`}

                target="_blank"

                rel="noreferrer"

                >

                  Open

                </a>


              </td>


            </tr>


          ))

        }


        </tbody>



      </table>



    </div>


  );


}


export default Documents;