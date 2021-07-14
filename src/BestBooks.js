import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Card from 'react-bootstrap/Card'
// import AddBook from './component /AddBook';
import { Button, Form , Modal} from 'react-bootstrap/';
class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props)

    this.state={
      bookArray:[],
      userEmail:'',
      showBooks:false,
      show:false

    }
  }
  componentDidMount=async()=>{
    const {user}=this.props.auth0;

    await this.setState({
      userEmail:`${user.email}`
    })

    //http://localhost:3030/book?userEmail=wijdankhaled178@gmail.com
    let urlbooks=`${process.env.REACT_APP_PORT}/book?userEmail=${this.state.userEmail}`;
    let resultData=await axios.get(urlbooks);

    await this.setState({
      bookArray:resultData.data,
      showBooks:true,
    })
  }
  funClick=()=>{
    this.setState({
      show:true
    })
  }
  funClose=()=>{
    this.setState({
      show:false
    })
  }
addBook =async (e)=>{
  e.preventDefault();
  let server=process.env.REACT_APP_PORT;
  let newBook={
    name:e.target.bookName.value,
    description: e.target.description.value,
    status:e.target.status.value,
    userEmail:this.state.email
  }

  let addBookurl=await axios.post(`${server}/addBook`,newBook);
  this.setState({
    bookArray:addBookurl.data
  })
}
deletBook=async(idex)=>{
let server=process.env.REACT_APP_PORT;
let deleting={
  email:this.state.email,
  index:idex
}
let deletUrl=await axios.delete(`${server}/deletBook`,{params:deleting});
this.setState({
  bookArray:deletUrl.data
});

}


  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Button variant="warning" onClick={this.funClick} >Add Book</Button>
        <div>
          {
            this.state.showBooks &&
            this.state.bookArray.map((val,idex) =>{
              return(
                <Card >
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                  <Card.Img src={val.img} alt={val.name} />
                  
                  <Card.Text>
                  {/* <img src={val.img} alt={val.name}/> */}
                    {val.description}
                  </Card.Text>
                  <Card.Text>
                    {val.status}
                  </Card.Text>
                  <Button variant="warning" onClick={()=>this.deletBook(idex)}>Delete</Button>
                </Card.Body>
              </Card>
              )
            })
          }
           <Modal show={this.state.show} onHide={this.funClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addBook}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book name</Form.Label>
                <Form.Control type="text" placeholder="book name" name='bookName' />

              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Book description</Form.Label>
                <Form.Control type="text" placeholder="description" name='description' />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Book status</Form.Label>
                <Form.Control type="text" placeholder="status" name='status' />
              </Form.Group>
              <Button variant="warning" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.funClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
        </div>
{/* 
        <AddBook
        
        
        /> */}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
