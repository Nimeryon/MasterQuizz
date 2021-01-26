import React, { Component } from 'react';

import { Button, Card, CardContent, Grid, Container, Input} from '@material-ui/core';


class Reg extends Component {

  constructor() {

    super();

    this.state = {

      UserName: '',

      Email: '',

      Password: '',



    }

    this.Email = this.Email.bind(this);

    this.Password = this.Password.bind(this);

    this.UserName = this.UserName.bind(this);

    this.Password = this.Password.bind(this);

    this.register = this.register.bind(this);

  }


  Email(event) {

    this.setState({ Email: event.target.value })

  }


  

  Password(event) {

    this.setState({ Password: event.target.value })

  }

  

  UserName(event) {

    this.setState({ UserName: event.target.value })
  }

  register(event) {
    fetch('http://localhost:51282/Api/login/InsertEmployee', {
      method: 'post',
      headers: {
        'Accept': 'application/json',

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        UserName: this.state.UserName,

        Password: this.state.Password,

        Email: this.state.Email,


      })

    }).then((Response) => Response.json())

      .then((Result) => {

        if (Result.Status == 'Success')

                this.props.history.push("/Dashboard");

        else

          alert('Sorrrrrry !!!! Un-authenticated User !!!!!')

      })

  }

  render() {
 return (
      <div className="app flex-row align-items-center">
        <Container>
          <Grid className="justify-content-center">
         <Grid md="9" lg="7" xl="6">

              <Card className="mx-4">

                <CardContent className="p-4">

                  <form>
                    
                    <div class="row" className="mb-2 pageheading">

                      <div class="col-sm-12 btn btn-primary">

                        Inscription

                        </div>

                    </div>

                    <div className="mb-3">

                      <Input type="text"  onChange={this.UserName} placeholder="Pseudo" /> <Input type="text"  onChange={this.UserName} placeholder="" />

                    </div>

                    <div className="mb-3">

                      <Input type="text"  onChange={this.UserName} placeholder="Pseudo" />

                    </div>

                    <div className="mb-3">

                      <Input type="text"  onChange={this.Email} placeholder="Email" />

                    </div>
                    <div className="mb-3">

                      <Input type="password"  onChange={this.Password} placeholder="mot de passe" />

                    </div>


                    <Button  onClick={this.register}  color="success" block>Créer mon compte</Button>

                  </form>

                </CardContent>

              </Card>

            </Grid>

          </Grid>

        </Container>

      
      </div>
    );

  }

}


export default Reg;