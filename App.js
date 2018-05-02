import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, FooterTab, Item, Input, View, Fab } from 'native-base';
import axios from 'axios'

export default class Apply extends Component {
    constructor(){
        super()
        this.state = { 
            resto : [], 
            search : ""
    
        }
    }

    get = () => {
      var uri = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
      var config = {
        headers:{'user-key':'5664240ace1b2c209e6d5127bbe402f3'}
    }

      axios.get(uri, config).then((ambilData)=>{
        this.setState({
          resto : ambilData.data.restaurants,
        })
      })
    };


    renderResto() {
        return this.state.resto.map((x,i) =>
        <Card key={i}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: x.restaurant.thumb}} />
                <Body>
                  <Text>{x.restaurant.name}</Text>
                  <Text note>{x.restaurant.location.city}</Text>
                </Body>
              </Left>
              <Right>
                <Text>Rp.{x.restaurant.average_cost_for_two}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: x.restaurant.thumb}} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name='home' />
                <Text>{x.restaurant.location.address}</Text>
              </Left>
            </CardItem>
          </Card>
        );
    }

    

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(x) => {this.setState({search :x})}} />
          </Item>
          <Button transparent onPress={() => {this.get()}}>
            <Text>Search</Text>
          </Button>
        </Header>
          
        <View style={{ flex: 1 }}>
        <Content>
          {this.renderResto()}
        </Content>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>

      </Container>
    );
  }
}