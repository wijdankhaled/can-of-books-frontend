import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Card from 'react-bootstrap/Card'
class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props)

    this.state={
      bookArray:[],
      userEmail:'',
      showBooks:false

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
  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div>
          {
            this.state.showBooks &&
            this.state.bookArray.map(val =>{
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
                </Card.Body>
              </Card>
              )
            })
          }
        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
