import React from 'react'
import { withRouter } from 'react-router'

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            position: "Loading...",
            map: {} 
        }
    }

    // the introduce of geolocation api
    componentDidMount(){
        //Geolocation.getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions)
        //NOTE: getCurrentPosition get the current position from the device's hardware by asynchronous, return a low accuracy result. 
        navigator.geolocation.getCurrentPosition(
            (position) => {
                doSomething( position.coords.latitude, position.coords.longitude);
                console.log(position.coords.latitude);
            }, 
            (error) => {
                console.log(error.message);
            },
            {
                enableHighAccuracy: true, // whether to get high precision positioning 
                timeout: 20000,  // the time to wait for a request 
                maximumAge: 1000 // set the maximum age of the position returned
            }
        );

        //Geolocation.watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions)
        //NOTE: 监视定位，可以设定一个回调函数来响应定位数据发生的变更
        var watchID = navigator.geolocation.watchPosition(
            (position) => {
                console.log(position.coords.latitude);
            },
            (error) => {
                console.log(error.message)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
        
        // NOTE: to stop monitoring the position
        navigator.geolocation.clearWatch(watchID);
    }

    doSomething = (latitude, longitude) => {}

    // A demo for geolocation
    findMePosition(){
        if(!navigator.geolocation) {
            this.setState({
                position: "您的浏览器不支持地理位置"
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var img = new Image();
            img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            this.setState({
                position: "成功获取您的位置",
                map: img.src
            })
        }), (error) => {
            this.setState({
                position: "无法获取您的位置"
            })
        }
    }

    render(){
        return(
            <div>
                <div onClick={this.findMePosition.bind(this)}>Find my Position</div>
                <div>{this.state.position}</div>
                <div><img src={this.state.map} /></div>
            </div>
        )
    }
}

module.exports = withRouter(App);


// resources
// https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/Using_geolocation

