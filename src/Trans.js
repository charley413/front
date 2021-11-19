import React from 'react';
import {Form,ButtonGroup,Button,Container,Row,Image} from 'react-bootstrap';



function Trans(){
    return (
      <div className="Main">
  
        <Form.Group controlId="formFile" className="mb-3">
        <Image  className="temp" src="img/record.png"  />
        <br/>
            <Form.Label>변환할 음성파일을 선택하세요</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
  
        <Container>
          <div style={{paddingTop:"1vh"}}/>
        <Image  className="temp" src="img/exchange.png"  />
          <Row>
          <ButtonGroup size="lg" className="mb-2">
      <Button variant="outline-secondary"style={{color:"black"}}>회의록 변환</Button>
      <Button variant="outline-secondary"style={{color:"black"}}>회의록 요약</Button>
      
    </ButtonGroup>
          </Row>
        </Container>
        
      </div>
    )
  }
  
export default Trans;