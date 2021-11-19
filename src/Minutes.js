import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';


function Minutes(props){
  

  useEffect(
    // /minutes 마운트 되면 서버로부터 회의록목록 받아온다
    ()=>{
         console.log()


          console.log("useeffect실행 서버로부터 회의록목록 받아옴")
          axios.get("http://127.0.0.1:8000/minutes/input/",{
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then( (result)=>{ 
            props.setDataMinutes([...props.dataMinutes,...result.data])})
          
    // 언마운트 시 회의록목록을 비운다
    return ()=>{ 
      props.setDataMinutes([])
    }
  },[])
    
    
  const SeeDetail = (item)=>{
    props.history.push("/detail/"+item.id)
  }


    return (
       
        <Table striped bordered hover>      
          <thead>
            <tr>
              <th>#</th>
              <th>회의제목</th>
              <th>회의날짜</th>              
            </tr>
          </thead>

          <tbody>
            {props.dataMinutes.map((item,i)=>{
             
              return(
                <tr key={i} onClick={()=>{SeeDetail(item)}} >
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                </tr>
              )
            })}
            
          </tbody>
        </Table> 
        
    )
}

export default Minutes;