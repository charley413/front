import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {existUser, saveUser} from "../api";

const errorMsg = {
    'empty' : '메일 주소를 입력해주세요',
    'exist_email': '이미 등록된 메일입니다. 다른 메일을 입력해주세요',
}

function Signup(){

    const [user, setUser] = useState({name:'',email:'',password:''}) //회원가입정보 담는 객체
    const [validated, setValidated] = useState(false);  //아마도 이메일 확인할떄 필요 ㄴㄴ
    const [resultMessage,setResultMessage] = useState({code:"200",message:"ok"})

    const [isValid,setIsValid] = useState(false); //아마도 이메일 
    const [errorMail,setErrorMail] = useState(errorMsg.empty);

    function handleName(e){
        console.log(e.target.value);
        setUser({...user,name:e.target.value})
    }

    function handleEmail(e){
        console.log(e.target.value);
        setIsValid(false);
        setErrorMail(errorMsg.empty)
        setUser({...user,email:e.target.value})
    }
    function handlePassword(e){
        setUser({...user,password:e.target.value})

    }

    function handleSubmit(event){
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            saveUser(user).then(response=>{
                setResultMessage({
                    resultCode: response.code,
                    resultMessage: response.message
                })
                if(response.status===400){
                    setIsValid(true);
                    setErrorMail(`[${response.code}] ${errorMsg.exist_email}`);
                    alert("오류");
                }
                if(response.status===200){
                    alert("등록되었습니다.");
                    setIsValid(false);
                }
            });
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    };

    return(
        <Container className={"text-center"} fluid>
            <Form noValidate validated={validated} className="form-signup" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>


                <Form.Group controlId={"formBasicName"}>
                    <Form.Label className="sr-only">Name</Form.Label>
                    <Form.Control className={"form-signup-input"} 
                                  onChange={handleName} 
                                  type={"text"}  
                                  placeholder={"Enter name"} //했고
                                  minLength={"3"}
                                  required  />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        이름을 입력해주세요!(3글자 이상입력)
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId={"formBasicEmail"}>
                    <Form.Label className="sr-only">Email address</Form.Label>
                    <Form.Control className={`form-signup-email ${isValid?'is-invalid':''}`} 
                                  onChange={handleEmail} 
                                  type={"email"} 
                                  placeholder={"Enter email"} 
                                  required />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        {errorMail}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId={"formBasicPassword"}>
                    <Form.Label className="sr-only">Password</Form.Label>
                    <Form.Control className={"form-signup-input"} 
                                  onChange={handlePassword} 
                                  type={"password"} 
                                  placeholder={"Password"} 
                                  required />
                    <Form.Control.Feedback type="invalid" className={"float-left"}>
                        비밀번호를 입력해주세요!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="btn btn-lg btn-primary btn-block" variant={"primary"} type={"submit"}>
                    Sign up
                </Button>
                <p className={"float-left"}><a href={"/signin"}>Sign in</a></p>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </Form>
        </Container>
    )
}

export default Signup;