
import './App.css';
import {Navbar,Nav,Container,Form,Button,Image} from 'react-bootstrap';
import { Route,Switch,useHistory }from 'react-router-dom';
import { useState,useEffect } from 'react';
import Minutes from './Minutes';
import Register from './Register';
import Trans from './Trans';
import Detail from './Detail';
import axios from 'axios';
import UserInfo from './UserInfo';



function App() {

  
  let [로그인여부,로그인여부변경]=useState(false)
  let history = useHistory() //페이지 이동시 필요

  let [user,setUser]=useState({username: "",password: ""}) //로그인하는 유저 정보
  let [loginSuccess,setLoginSuccess]=useState(true) //로그인 여부 
  
  let [dataMinutes,setDataMinutes] = useState([])



  let [loginedUser,setLoginedUser]=useState([])
  let [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false) //로컬스토리지에 토큰 있을시 true
  const userHasAuthenticated = (authenticated, username, token) => {
    setIsAuthenticated(authenticated)
    setLoginedUser(username)
    localStorage.setItem('token', token);
  }//회원가입이나 로그인이 성공했을 때 토큰을 저장



  useEffect(() => {
    // 토큰(access token)이 이미 존재하는 상황이라면 서버에 GET /validate 요청하여 해당 access token이 유효한지 확인
    if (isAuthenticated) {
      // 현재 JWT 토큰 값이 타당한지 GET /validate 요청을 통해 확인하고
      // 상태 코드가 200이라면 현재 GET /user/current 요청을 통해 user정보를 받아옴
      fetch('http://localhost:8000/accounts/validate/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        fetch('http://localhost:8000/accounts/current/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
          if (json.username) {
            setLoginedUser(json.username);
          }else{
            //유저가 undefined라면 로그인버튼이 나오도록 modal을 false로 항상 맞춰줌
            // setModal(false)
            // setisAuthenticated(false)
          }
          // Refresh Token 발급 받아 token의 만료 시간 연장
          fetch('http://localhost:8000/accounts/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: localStorage.getItem('token')
            })
          })
          .then(res => res.json())
          .then((json)=>{
            userHasAuthenticated(true, json.user.username, json.token);
          })
          .catch(error => {
            console.log(error);
          });;
        })
        .catch(error => {
          // handleLogout();
          console.log(error)
        });
      })
      .catch(error => {
        // handleLogout();
        console.log(error)
      });
    }
  },[isAuthenticated])

  // 백엔드 연동 임시 선언
  function handleUserName(e){
    console.log(e.target.value)
    setUser({...user,username:e.target.value})
  }

  function handlePassword(e){
    console.log(e.target.value)
    setUser({...user,password:e.target.value})
  }







  function handleEmail(e){
    console.log(e.target.value)
    let copy = {...user}
    setUser({...copy,email:e.target.value})
  }

  function handlePw(e){
    console.log(e.target.value)
    let copy = {...user}
    setUser({...copy,pw:e.target.value})
  }

  function handleSubmit(event){
    console.log("버튼누르면")
    console.log(user)

    axios.post('http://localhost:8000/accounts/login/',user)
        .then(function (result) {
              console.log(result.data)
            if (result.data.token && result.data.user.username && result.data.user){
              userHasAuthenticated(true, result.data.user.username, result.data.token);
                      history.push("/trans");

            }

            // if (result.data.key){ //서버로부터 키를 받으면
            //     localStorage.setItem('token',result.data.key) //로.스 에 토큰으로 저장
            //     console.log("토큰저장완료")
            //     // history.push("/trans") //변환페이지로 이동
            // }

            // if (result.status===200){ //로그인하려는  user정보가 올바른 정보일 때
            //     setUser({...user,name:result.data.name})  //서버로부터 name 받아서 user에 저장
            //     setLoginSuccess(true)
            // }


        })
        //실패 시 catch 실행
        .catch(function (error) {
          console.log(error.status)
          console.log("전송실패")
            console.log(error);
        });

        event.preventDefault(); //새로고침 방지
        event.stopPropagation(); //부모태그로의 전파 방지

  }


  return (
    <div className="App">

      <NavBar user={user} loginSuccess={loginSuccess} history={history}/>



      <Switch>
        <Route path="/userinfo">
          <UserInfo/>
        </Route>

        <Route path="/detail/:id">
          <Detail dataMinutes={dataMinutes}/>
        </Route>

        <Route path="/trans">
          <Trans/>
        </Route>

        <Route path="/register">
          <Register history={history}/>
        </Route>

        <Route path="/minutes">
          <Minutes dataMinutes={dataMinutes} setDataMinutes={setDataMinutes} history={history}/>

        </Route>

        <Route path="/">
        <div className="Jumbotron">
            <h1 className="JumboText">손쉽게 회의록을 관리하세요</h1>
        </div>

          <Form className="Form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email"
                            placeholder="e-mail"
                            onChange={handleUserName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password"
                            placeholder="비밀번호"
                            onChange={handlePassword}/>
            </Form.Group>

            <Button className="Button"
                    variant="secondary"
                    size="lg"
                    type="submit"
                    // onClick={()=>{history.push("/trans") ;로그인여부변경(true)}}
            >로그인</Button>
          </Form>
          <br/>
          <hr />
          <p >아직 회원이 아니신가요?</p>
          <Button className="Button" variant="outline-secondary" onClick={()=>{history.push("/register")}}>회원 가입</Button>

        </Route>



    </Switch>



    </div>
  );
}

function NavBar(props){
  return (
    <Navbar bg="light" variant="light" className="Navbar">
          <Container>
            <Navbar.Brand onClick={()=>{
              props.로그인여부===true
              ?props.history.push("/main")
              :props.history.push("/")
            }}>자동회의록</Navbar.Brand>
            <Nav className="me-auto">

              <Nav.Link onClick={()=>{props.history.push("/minutes")}} >나만의 회의록</Nav.Link>
              <Nav.Link >나의 일정</Nav.Link>

            </Nav>
            {
              props.loginSuccess===true
              ? <div onClick={()=>{props.history.push("/userinfo")}}>
              <Image   src="img/user.png"  />
              <Navbar.Text>ㅤ{props.user.name}</Navbar.Text>

              </div>
              : null
            }
          </Container>
       </Navbar>
  )
}




export default App;

  

