import { useState } from "react";
import React from "react";
import {Alert,Form,Button} from 'react-bootstrap';
import axios from "axios";
import { useEffect } from "react";






function Register(props){



    

    const [validated, setValidated] = useState(false)
    let [registerInfo,setRegisterInfo]=useState({username:"",password:"",checkpw:"",name:"",phone_number:""})
    
    
    

    // useEffect(()=>{
    //     if (registerInfo.pw.length===registerInfo.checkpw.length && registerInfo.pw!=registerInfo.checkpw){
    //         let copy = {...registerInfo}
    //         setRegisterInfo({...copy,checkpw:" "})
            

    //     }
    // })


    
    function handleEmail(e){
        console.log(e.target.value)
        let copy = {...registerInfo}
        setRegisterInfo({...copy,username:e.target.value})
    }
  
    function handlePw(e){
        console.log(e.target.value)
        let copy = {...registerInfo}
        setRegisterInfo({...copy,password:e.target.value})
    }
  
    function handleCheckPw(e){
        console.log(e.target.value)
        let copy = {...registerInfo}
        setRegisterInfo({...copy,checkpw:e.target.value})
    
      
    }
  
    function handleName(e){
        console.log(e.target.value)
        let copy = {...registerInfo}
        setRegisterInfo({...copy,name:e.target.value})
    }
  
    function handlePhoneNum(e){
        console.log(e.target.value)
        let copy = {...registerInfo}
        setRegisterInfo({...copy,phone_number:e.target.value})
    }
  
    function handleSubmit(event){
        const form = event.currentTarget
        setValidated(true);

        if(form.checkValidity() === true){
            axios.post('http://127.0.0.1:8000/accounts/signup/',registerInfo)
            .then(function (result) {
                console.log(result.data);
            })
            //실패 시 catch 실행
            .catch(function (error) {
                console.log(error);
            });
            
            props.history.push("/main")
        }

        //   setValidated(true);
        event.preventDefault(); //새로고침 방지
        event.stopPropagation(); //부모태그로의 전파 방지
    
        }
  
  
  
    
  
  
    return(
      <div className="Form">
        
        <Form noValidate validated= {validated} onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>회원정보를 입력해주세요</Form.Label>
                <Form.Control  onChange={handleEmail}
                               type="email"
                               placeholder={"이메일 주소"}
                            //    minLength={10}
                               required />
                <Form.Control.Feedback type="invalid">
                이메일을 올바르게 입력해주세요
                </Form.Control.Feedback>           
          </Form.Group>
  

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control  onChange={handlePw} 
                             type="password" 
                             placeholder="비밀번호"
                             minLength={8}
                              required/>
               <Form.Control.Feedback type="invalid">
                8자리 이상 입력해주세요
               </Form.Control.Feedback>
           </Form.Group>
  

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Control onChange={handleCheckPw}
                            type="password"
                            placeholder="비밀번호 확인"
                            minLength={8}            
                            required/>
              <Form.Control.Feedback type="invalid">
                비밀번호가 일치하지 않습니다.
              </Form.Control.Feedback>
            </Form.Group>
  

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control  onChange={handleName}
                               type="text"
                               placeholder="이름"
                               maxLength={4}
                               minLength={2}
                               required />
                <Form.Control.Feedback type="invalid">
                이름을 올바르게 입력해주세요
                </Form.Control.Feedback>
            </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Control  onChange ={handlePhoneNum}
                           type="tel"
                           placeholder="휴대폰 번호"
                           minLength={11}
                           maxLength={11}
                            required/>
            <Form.Control.Feedback type="invalid">
                휴대폰 번호를 정확하게 입력해주세요 ex: 01077779999
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="ㅤ[필수] 만 14세 이상입니다ㅤㅤ"  feedbackType="invalid" required />
            <Form.Check type="checkbox" label="ㅤ[필수] 자동회의록 이용약관 동의" feedbackType="invalid" required />
            <Form.Check type="checkbox" label="ㅤ[필수] 개인정보 수집 및 이용 동의"  feedbackType="invalid" required />
          </Form.Group>


          <Button type="submit" 
                  className="Button"
                  variant="secondary"
                  size="lg" >
            동의하고 가입하기
          </Button>
        
        </Form>
        
       
  
  
    
      </div>
    )
  }

  export default Register;