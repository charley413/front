import React, { useState } from 'react';
import {ButtonGroup,Button} from 'react-bootstrap';
import { useParams } from 'react-router';

function Detail(props){


  let {id} = useParams()
  let selected = props.dataMinutes.find((i)=>{return i.id==id})
  console.log(selected)
    return (

       <>
       <div className="DetailOutLine">
         <div className="DetailCategory">
           회의제목ㅤ:  {selected.title}
         </div>

         <hr/>

         <div className="DetailCategory2">
           회의날짜ㅤ: {selected.date}
         </div>

         <hr/>

         <div className="DetailCategory2">
           참석자ㅤㅤ: {selected.user_in}
         </div>

         <hr/>
         <div className="DetailCategory2">
           회의내용</div>

           <div className="DetailMinutes">

               {selected.content}

           </div>
           <div className="ButtonGroup">
           <ButtonGroup vertical>
           <Button variant="outline-danger">음성파일다운</Button>

           <Button variant="outline-danger">회의록다운</Button>
           <Button variant="outline-success">수정하기</Button>
           <Button variant="outline-success">삭제하기</Button>
           <Button variant="outline-info">메일전송</Button>
           </ButtonGroup >
           </div>








      // </div>
      // </>
    )
  }

export default Detail;
